#!/usr/bin/env bash

set -euo pipefail

ASSUME_YES=false
if [[ "${1:-}" == "-y" || "${1:-}" == "--yes" ]]; then
  ASSUME_YES=true
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "Warning: 'docker' was not found in PATH. The aliases will not work until Docker is installed." >&2
fi

for dep in fd fzf; do
  if ! command -v "$dep" >/dev/null 2>&1; then
    echo "Warning: '$dep' was not found in PATH. The cdf function will not work until $dep is installed." >&2
  fi
done

if ! $ASSUME_YES && [[ ! -t 0 ]] && ! : 2>/dev/null </dev/tty; then
  echo "Warning: no interactive terminal detected — prompts cannot be shown, missing programs will be skipped." >&2
  echo "Re-run with -y to install automatically." >&2
fi

NVIM_ALIAS="alias nvim='docker run --pull=always -v .:/host -w /host -it --rm --cpu-shares=8192 ghcr.io/sandro-sikic/neovim'"
SQLIT_ALIAS="alias sqlit='docker run --pull=always --network host -v .:/data -w /data -v /var/run/docker.sock:/var/run/docker.sock -e DOCKER_HOST=\$DOCKER_HOST -it --rm ghcr.io/sandro-sikic/sqlit:latest'"

FISH_FUNCTIONS_DIR="${HOME}/.config/fish/functions"

confirm() {
  if $ASSUME_YES; then
    return 0
  fi
  local prompt="$1" answer=""
  if [[ -t 0 ]]; then
    read -rp "$prompt" answer
  elif : 2>/dev/null </dev/tty; then
    read -rp "$prompt" answer </dev/tty || answer=""
  else
    return 1
  fi
  [[ "$answer" == "y" || "$answer" == "Y" || "$answer" == "yes" ]]
}

detect_shell() {
  case "${SHELL:-}" in
    */bash|bash) echo "bash" ;;
    */zsh|zsh) echo "zsh" ;;
    */fish|fish) echo "fish" ;;
    *) echo "" ;;
  esac
}

detect_rc_file() {
  case "$1" in
    bash) echo "${HOME}/.bashrc" ;;
    zsh) echo "${HOME}/.zshrc" ;;
    *) echo "" ;;
  esac
}

is_program_installed() {
  command -v "$1" >/dev/null 2>&1
}

is_alias_installed() {
  local prog="$1"
  if [[ "$SHELL_NAME" == "fish" ]]; then
    if command -v fish >/dev/null 2>&1; then
      fish -c "type -q ${prog}" >/dev/null 2>&1
    else
      [[ -f "${FISH_FUNCTIONS_DIR}/${prog}.fish" ]]
    fi
  else
    grep -Eq "^[[:space:]]*alias[[:space:]]+${prog}=|# sandro-sikic-aliases:${prog}" "$RC_FILE" 2>/dev/null
  fi
}

install_posix_program() {
  local prog="$1"
  local marker="# sandro-sikic-aliases:${prog}"
  local alias_line
  case "$prog" in
    nvim) alias_line="$NVIM_ALIAS" ;;
    sqlit) alias_line="$SQLIT_ALIAS" ;;
    cdf) alias_line="cdf() { local dir; dir=\$(fd --type d . ~ 2>/dev/null | fzf); [ -n \"\$dir\" ] && cd \"\$dir\"; }" ;;
  esac
  touch "$RC_FILE"
  sed -i "/^${marker}:start$/,/^${marker}:end$/d" "$RC_FILE"
  {
    echo "${marker}:start"
    echo "$alias_line"
    echo "${marker}:end"
  } >>"$RC_FILE"
}

install_fish_program() {
  local prog="$1"
  mkdir -p "$FISH_FUNCTIONS_DIR"
  case "$prog" in
    nvim)
      cat >"${FISH_FUNCTIONS_DIR}/nvim.fish" <<'EOF'
function nvim --description 'NeoVim via Docker'
    docker run --pull=always -v .:/host -w /host -it --rm --cpu-shares=8192 ghcr.io/sandro-sikic/neovim $argv
end
EOF
      ;;
    sqlit)
      cat >"${FISH_FUNCTIONS_DIR}/sqlit.fish" <<'EOF'
function sqlit --description 'Sqlit via Docker'
    docker run --pull=always --network host -v .:/data -w /data -v /var/run/docker.sock:/var/run/docker.sock -e DOCKER_HOST=$DOCKER_HOST -it --rm ghcr.io/sandro-sikic/sqlit:latest $argv
end
EOF
      ;;
    cdf)
      cat >"${FISH_FUNCTIONS_DIR}/cdf.fish" <<'EOF'
function cdf --description 'cd to a directory picked via fd + fzf'
    set -l dir (fd --type d . ~ 2>/dev/null | fzf)
    if test -n "$dir"
        cd "$dir"
    end
end
EOF
      ;;
  esac
}

process_program() {
  local prog="$1" path=""
  if path=$(command -v "$prog" 2>/dev/null); then
    echo "${prog}: already installed (${path}) — skipping"
    return 0
  fi

  if is_alias_installed "$prog"; then
    echo "${prog}: alias already installed for ${SHELL_NAME} — skipping"
    return 0
  fi

  if [[ "$SHELL_NAME" == "fish" ]]; then
    if confirm "${prog} is not found. Install the ${prog} function for fish (${FISH_FUNCTIONS_DIR})? [y/N] "; then
      install_fish_program "$prog"
      echo "Installed ${prog} function for fish in ${FISH_FUNCTIONS_DIR}"
    else
      echo "${prog}: skipped (declined)"
    fi
  else
    if confirm "${prog} is not found. Install the ${prog} alias for ${SHELL_NAME} (${RC_FILE})? [y/N] "; then
      install_posix_program "$prog"
      echo "Installed ${prog} alias for ${SHELL_NAME} in ${RC_FILE}"
    else
      echo "${prog}: skipped (declined)"
    fi
  fi
}

SHELL_NAME=$(detect_shell)
case "$SHELL_NAME" in
  bash|zsh) RC_FILE=$(detect_rc_file "$SHELL_NAME") ;;
  fish) RC_FILE="" ;;
  *)
    echo "Error: could not detect a supported shell (SHELL='${SHELL:-}'). Supported: bash, zsh, fish." >&2
    exit 1
    ;;
esac

for prog in nvim sqlit cdf; do
  process_program "$prog"
done

if [[ "$SHELL_NAME" == "fish" ]]; then
  echo "Done. Open a new terminal to use the functions (fish loads them automatically)."
else
  echo "Done. Restart your terminal or run 'source ${RC_FILE}' to use the aliases."
fi
