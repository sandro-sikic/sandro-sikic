#!/usr/bin/env bash
set -euo pipefail

# Packages to hold back, format: "package=version".
# The package is skipped while the repos offer this version (or older);
# repo versions newer than the pin are allowed through.
# Comparison ignores the Arch pkgrel, so "137.0.1" covers every "137.0.1-x".
PINNED_PACKAGES=(
    # "firefox=137.0.1-1"
    # "linux=6.12.5.arch1-1"
)

DRY_RUN=false

usage() {
    echo "Usage: sudo $0 [-n|--dry-run]"
    echo
    echo "Runs a full system upgrade (pacman -Syu) but holds back pinned"
    echo "packages while the repos offer the pinned version or older."
    echo "Repo versions newer than the pin are allowed through."
    echo
    echo "After the upgrade it re-applies Secure Boot maintenance:"
    echo "limine-enroll-config, limine-update, and re-signing the fwupd"
    echo "EFI binary with sbctl (missing tools are skipped with a warning)."
    echo
    echo "Options:"
    echo "  -n, --dry-run   print decisions and the pacman command, change nothing"
    echo "  -h, --help      show this help"
}

for arg in "$@"; do
    case $arg in
        -n|--dry-run) DRY_RUN=true ;;
        -h|--help) usage; exit 0 ;;
        *) echo "Error: unknown option: $arg" >&2; usage >&2; exit 1 ;;
    esac
done

for dep in pacman vercmp; do
    if ! command -v "$dep" >/dev/null 2>&1; then
        echo "Error: required dependency not found: $dep" >&2
        exit 1
    fi
done

if [[ $DRY_RUN == false && $EUID -ne 0 ]]; then
    exec sudo "$0" "$@"
fi

# Strip a trailing numeric pkgrel ("1.2.3-1" -> "1.2.3"),
# keeping hyphenated upstream versions like "1.2.3-beta".
strip_pkgrel() {
    local version=$1
    if [[ $version == *-* && ${version##*-} =~ ^[0-9] ]]; then
        printf '%s\n' "${version%-*}"
    else
        printf '%s\n' "$version"
    fi
}

# True if version A is older than or equal to version B.
vercmp_le() {
    [[ $(vercmp "$1" "$2") -le 0 ]]
}

# Run one Secure Boot maintenance step, warn instead of aborting on failure.
run_sb_step() {
    local desc=$1
    shift
    local rc=0
    echo ">> $desc"
    "$@" || rc=$?
    if [[ $rc -ne 0 ]]; then
        echo "Warning: $desc failed (exit $rc)" >&2
        return 1
    fi
    return 0
}

# Re-apply Secure Boot setup after a system update. Each step is
# independent; missing tools or failures are warned about, never fatal here.
secure_boot_fix() {
    local failed=0

    if command -v limine-enroll-config >/dev/null 2>&1; then
        run_sb_step "limine-enroll-config" limine-enroll-config || failed=1
    else
        echo "Warning: limine-enroll-config not found, skipping" >&2
    fi

    if command -v limine-update >/dev/null 2>&1; then
        run_sb_step "limine-update" limine-update || failed=1
    else
        echo "Warning: limine-update not found, skipping" >&2
    fi

    if command -v sbctl >/dev/null 2>&1; then
        if [[ -f /usr/lib/fwupd/efi/fwupdx64.efi ]]; then
            run_sb_step "sbctl sign fwupd EFI binary" sbctl sign -s -o /usr/lib/fwupd/efi/fwupdx64.efi.signed /usr/lib/fwupd/efi/fwupdx64.efi || failed=1
        else
            echo "Warning: /usr/lib/fwupd/efi/fwupdx64.efi not found, skipping sbctl sign" >&2
        fi
    else
        echo "Warning: sbctl not found, skipping" >&2
    fi

    return $failed
}

# Print a prominent warning box around the given lines.
print_warning_box() {
    local width=0 line border
    for line in "$@"; do
        if (( ${#line} > width )); then
            width=${#line}
        fi
    done
    border=$(printf '%*s' $((width + 6)) '' | tr ' ' '!')
    echo "$border"
    for line in "$@"; do
        printf '!! %-*s !!\n' "$width" "$line"
    done
    echo "$border"
}

if [[ $DRY_RUN == true ]]; then
    echo "Dry run: using the current sync databases, nothing will be refreshed."
else
    echo "Refreshing package databases..."
    pacman -Sy
fi
echo

ignore_list=()

for entry in "${PINNED_PACKAGES[@]}"; do
    if [[ $entry != *=* ]]; then
        echo "Warning: '$entry' is not in 'package=version' form, skipping" >&2
        continue
    fi

    pkg=${entry%%=*}
    pin=${entry#*=}

    if [[ -z $pkg || -z $pin ]]; then
        echo "Warning: '$entry' needs both package and version, skipping" >&2
        continue
    fi

    installed_ver=$(pacman -Q "$pkg" 2>/dev/null | awk '{print $2}') || installed_ver=""
    if [[ -z $installed_ver ]]; then
        echo ">> $pkg: not installed, nothing to hold back"
        continue
    fi

    repo_ver=$(pacman -Si "$pkg" 2>/dev/null | awk -F': ' '/^Version/{print $2; exit}') || repo_ver=""
    if [[ -z $repo_ver ]]; then
        echo ">> $pkg: not found in any repository, skipping"
        continue
    fi

    if vercmp_le "$repo_ver" "$installed_ver"; then
        echo ">> $pkg: already up to date ($installed_ver), skipping"
        continue
    fi

    if vercmp_le "$(strip_pkgrel "$repo_ver")" "$(strip_pkgrel "$pin")"; then
        echo ">> $pkg: holding back $installed_ver -> $repo_ver (pinned at $pin)"
        ignore_list+=("$pkg")
    else
        echo ">> $pkg: allowing $installed_ver -> $repo_ver (newer than pinned $pin)"
    fi
done

echo

if [[ ${#ignore_list[@]} -gt 0 ]]; then
    ignore_flag=$(IFS=','; echo "${ignore_list[*]}")
    run_pacman=(pacman -Su --ignore="$ignore_flag")
else
    run_pacman=(pacman -Su)
fi

echo "Running: ${run_pacman[*]}"
if [[ $DRY_RUN == true ]]; then
    echo "Dry run: nothing executed."
    echo
    echo "Would then run Secure Boot maintenance:"
    echo "  limine-enroll-config"
    echo "  limine-update"
    echo "  sbctl sign -s -o /usr/lib/fwupd/efi/fwupdx64.efi.signed /usr/lib/fwupd/efi/fwupdx64.efi"
    exit 0
fi

pacman_rc=0
"${run_pacman[@]}" || pacman_rc=$?
if [[ $pacman_rc -ne 0 ]]; then
    echo "Warning: pacman exited with status $pacman_rc, continuing with Secure Boot maintenance" >&2
fi

echo
fix_rc=0
if ! secure_boot_fix; then
    fix_rc=1
fi

# Warn about pinned packages installed with a version newer than their
# pin, whether updated past it in this run or an earlier one.
pin_warnings=()
for entry in "${PINNED_PACKAGES[@]}"; do
    if [[ $entry != *=* ]]; then
        continue
    fi
    pkg=${entry%%=*}
    pin=${entry#*=}
    if [[ -z $pkg || -z $pin ]]; then
        continue
    fi
    installed_ver=$(pacman -Q "$pkg" 2>/dev/null | awk '{print $2}') || installed_ver=""
    if [[ -z $installed_ver ]]; then
        continue
    fi
    if ! vercmp_le "$(strip_pkgrel "$installed_ver")" "$(strip_pkgrel "$pin")"; then
        pin_warnings+=("$pkg $installed_ver (pin: $pin)")
    fi
done

if [[ ${#pin_warnings[@]} -gt 0 ]]; then
    echo
    print_warning_box \
        "WARNING: newer version than the pin installed" \
        "" \
        "${pin_warnings[@]}" \
        "" \
        "These packages are installed with a newer version than" \
        "pinned. Check that they work correctly, then update or" \
        "remove their pins."
fi

if [[ $pacman_rc -ne 0 ]]; then
    exit $pacman_rc
fi
exit $fix_rc
