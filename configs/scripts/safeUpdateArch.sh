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
    echo "Running: pacman -Su --ignore=$ignore_flag"
    if [[ $DRY_RUN == true ]]; then
        echo "Dry run: nothing executed."
        exit 0
    fi
    exec pacman -Su --ignore="$ignore_flag"
else
    echo "Running: pacman -Su"
    if [[ $DRY_RUN == true ]]; then
        echo "Dry run: nothing executed."
        exit 0
    fi
    exec pacman -Su
fi
