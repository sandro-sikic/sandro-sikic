#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
    printf 'Usage: listdir.sh <path>\n' >&2
    exit 1
fi

target="$1"

if [[ ! -e "$target" ]]; then
    printf 'Error: path does not exist: %s\n' "$target" >&2
    exit 1
fi

if [[ ! -d "$target" ]]; then
    printf 'Error: not a directory: %s\n' "$target" >&2
    exit 1
fi

printf '%-11s %-9s %-9s %6s %-17s %6s  %s\n' PERMS OWNER GROUP SIZE MODIFIED FILES NAME

find "$target" -mindepth 1 -maxdepth 1 -print0 \
    | while IFS= read -r -d '' full; do
        IFS='|' read -r perms owner group size mtime < <(stat -c '%A|%U|%G|%s|%y' "$full")
        if command -v numfmt >/dev/null 2>&1; then
            hsize=$(LC_NUMERIC=C numfmt --to=iec "$size")
        else
            hsize=$size
        fi
        mod="${mtime:0:16}"
        name="${full##*/}"
        if [[ -d "$full" ]]; then
            count=$(find "$full" -type f | wc -l)
            sortkey=$((count))
            display="${name}/"
        else
            count=-
            sortkey=0
            display="$name"
        fi
        printf -v line '%-11s %-9s %-9s %6s %-17s %6s  %s' "$perms" "$owner" "$group" "$hsize" "$mod" "$count" "$display"
        printf '%s\0' "${sortkey}|${name}|${line}"
    done \
    | sort -z -t'|' -k1,1nr -k2,2 \
    | while IFS= read -r -d '' record; do
        line=${record#*|}
        printf '%s\n' "${line#*|}"
    done

printf '%s\n' '------------------------------------------------------------------------'

total_files=$(find "$target" -type f | wc -l)
total_dirs=$(find "$target" -mindepth 1 -type d | wc -l)
printf 'Total files (recursive): %s\n' "$total_files"
printf 'Total directories (recursive): %s\n' "$total_dirs"
