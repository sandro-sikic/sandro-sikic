## 📚 Contents

- [🖥️ Text-Based User Interfaces](#️-text-based-user-interfaces)
- [📜 Commands](#-commands)
  - [🐳 Docker TUI](#-docker-tui)
  - [📦 NPM Update](#-npm-update)
  - [📦 NeoVim](#-neovim)
  - [🗄️ Sqlit](#️-sqlit)
  - [🎨 PlantUML Theme](#-plantuml-theme)
- [🚀 Installations](#-installations)
  - [🖥️ WezTerm](#️-wezterm)
  - [🛠️ VSCode](#️-vscode)
  - [✍️ NeoVim](#️-neovim)
  - [📂 Portainer](#-portainer)
  - [🛡️ ViolentMonkey](#️-violentmonkey)
- [🛠️ Scripts](#️-scripts)
  - [🐳 Install Aliases](#-installaliasessh)
  - [📂 List Directory](#-listdirsh)
  - [🛡️ Safe Arch Update](#️-safearchupdate)
  - [🌐 Debian Server Setup](#-debianserversetup)

---

# 🖥️ Text-Based User Interfaces

| Program                                                 | Description                                |
| ------------------------------------------------------- | ------------------------------------------ |
| 📁 [Ranger](https://github.com/ranger/ranger)           | A file manager with Vim keybindings.       |
| 🐳 [Docker Dry](https://github.com/moncho/dry)          | TUI for managing Docker containers.        |
| ✨ [NeoVim](https://github.com/neovim/neovim)           | A hyperextensible Vim-based text editor.   |
| 📊 [Bottom](https://github.com/ClementTsang/bottom)     | A cross-platform process/system monitor.   |
| 🌲 [GitUI](https://github.com/extrawurst/gitui)         | A fast terminal UI for Git.                |
| 📈 [KDash](https://github.com/kdash-rs/kdash)           | TUI dashboard for Kubernetes.              |
| 📡 [Termscp](https://github.com/veeso/termscp)          | A terminal-based SCP client.               |
| 📉 [Ncdu](https://dev.yorhel.nl/ncdu)                   | Disk usage analyzer with an intuitive TUI. |
| 🔍 [NPM-Check](https://www.npmjs.com/package/npm-check) | Tool for managing outdated NPM packages.   |
| 🗄️ [Sqlit](https://github.com/Maxteabag/sqlit)          | A user-friendly TUI for SQL databases.     |

# 📜 Commands

### 🐳 Docker TUI

Run Docker's Dry TUI with the following command:

```bash
docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock -e DOCKER_HOST=$DOCKER_HOST moncho/dry
```

### 📦 NPM Update

To check for outdated packages interactively, use:

```bash
npx npm-check -u
```

### 📦 NeoVim

To run NeoVim from Docker, use the following command:

```bash
docker run --pull=always -v .:/host -w /host -it --rm --cpu-shares=8192 ghcr.io/sandro-sikic/neovim
```

### 🗄️ Sqlit

To run the Sqlit SQL TUI from Docker, mounting the current directory:

```bash
docker run --pull=always --network host -v .:/data -w /data -v /var/run/docker.sock:/var/run/docker.sock -e DOCKER_HOST=$DOCKER_HOST -it --rm ghcr.io/sandro-sikic/sqlit:latest
```

### 🎨 PlantUML Theme

Apply a theme for PlantUML diagrams:

```plantuml
@startuml Tenderi
!theme blueprint from https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/main/configs/plantuml/themes
```

---

# 🚀 Installations

### 🖥️ WezTerm

- **Windows Configuration**: Place the config file at `/Users/{user}/.wezterm.lua`
- **Linux Configuration**: Place the config file at `~/.config/wezterm/wezterm.lua`

### 🛠️ VSCode

1. Install the [Custom CSS and JS Loader](https://marketplace.visualstudio.com/items?itemName=be5invis.vscode-custom-css) extension.
2. Link the CSS and JS files in the `settings.json` by adding the following configuration:

   ```json
   "vscode_custom_css.imports": [
     "https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/main/configs/vscode/style.css",
     "https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/main/configs/vscode/glow.js"
   ]
   ```

3. Run the command `Enable custom CSS and JS`.

🌄 Background Images

To set up custom background images in VSCode:

```json
"background.fullscreen": {
  "images": [
    "https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/main/configs/images/futuristic_alpha_cat.png",
    "https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/main/configs/images/retrowave_cat.png",
    "https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/main/configs/images/retrowave_cat_with_glasses.png",
    "https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/main/configs/images/sunglasses_at_night.png",
    "https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/main/configs/images/wip_synthwave_city__gizille_the_cat.png"
  ],
  "opacity": 0.97,
  "size": "cover",
  "position": "center",
  "interval": 900
}
```

### ✍️ NeoVim

- Place the configuration file at `~/.config/nvim/lua/custom/chadrc.lua`.

### 📂 Portainer

To use a custom template, point to the following `template.json` URL in Portainer settings:

```text
https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/main/configs/portainer/templates/template.json
```

### 🛡️ ViolentMonkey

📝 Installation Instructions

1. **Install ViolentMonkey Extension**  
   Download and install the ViolentMonkey extension for your browser. You can find it in your browser's extension store or on the [official ViolentMonkey website](https://violentmonkey.github.io/get-it/).

2. **Click on a script to install**  
   In the "Import from URL" section, paste the following urls for the matching program.

   | Script                                                                                                       | Description                                           |
   | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
   | [IMDb](https://github.com/sandro-sikic/sandro-sikic/raw/main/configs/violentMonkey/imdb/index.user.js)       | Watch movies and series on IMDb.                      |
   | [Youtube](https://github.com/sandro-sikic/sandro-sikic/raw/main/configs/violentMonkey/youtube/index.user.js) | Links from Youtube to TSYoutube.                      |
   | [Fitgirl](https://github.com/sandro-sikic/sandro-sikic/raw/main/configs/violentMonkey/fitgirl/index.user.js) | Open YouTube search from the game title.              |
   | [Plex](https://github.com/sandro-sikic/sandro-sikic/raw/main/configs/violentMonkey/plex/index.user.js)       | Enhances Plex web interface with additional features. |
   | [Twitch](https://github.com/sandro-sikic/sandro-sikic/raw/main/configs/violentMonkey/twitch/index.user.js)   | Twitch improvements like sidebar removal.             |
   | [Stremlist](https://stremlist.com)                                                                           | Bring your IMDb watchlist directly into Stremio.      |

3. **Install the Script**  
   Click **Install** to add it to ViolentMonkey.

4. **Enjoy the Script**  
   The script is now installed and will run automatically on supported pages.

---

# 🛠️ Scripts

Helper scripts maintained in this repository, runnable straight from the public mirror.

### 🐳 installAliases.sh

Installs Docker-based shell aliases/functions for `nvim` and `sqlit` (see [📜 Commands](#-commands)), plus `cdf`, an [fd](https://github.com/sharkdp/fd) + [fzf](https://github.com/junegunn/fzf) directory jumper. The script auto-detects your shell (`$SHELL`: bash, zsh, or fish) and installs into `~/.bashrc`, `~/.zshrc`, or `~/.config/fish/functions/`, skipping already-installed items and prompting before installing:

```bash
curl -fsSL https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/main/configs/scripts/installAliases.sh | bash
```

- Pass `-y` to skip all prompts and install unattended:

  ```bash
  curl -fsSL https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/main/configs/scripts/installAliases.sh | bash -s -- -y
  ```
- Requires Docker. Re-running the script only fills in missing programs.
- `fd` and `fzf` are optional and only needed for `cdf`.
- After installing, reload your shell (`source ~/.bashrc`, `source ~/.zshrc`) or open a new terminal (fish loads the functions automatically).

### 📂 listDir.sh

Prints an aligned table of a directory's immediate entries — permissions, owner, group, human-readable size, mtime, recursive file count, and name — sorted by file count, with recursive totals at the bottom:

```bash
curl -fsSL https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/main/configs/scripts/listDir.sh -o ~/.local/bin/listdir.sh && chmod +x ~/.local/bin/listdir.sh
listdir.sh <path>
```

- Takes exactly one argument: the directory to inspect.
- Requires GNU coreutils `stat`, `find`, and `sort` (not macOS-safe); `numfmt` is optional and enables human-readable sizes.

### 🛡️ safeUpdateArch.sh

Runs a full Arch Linux upgrade (`pacman -Syu`) while holding back packages listed in the `PINNED_PACKAGES` array at the top of the script. A pinned package is skipped while the repos offer the pinned version (or older); repo versions newer than the pin are allowed through (the comparison ignores the Arch pkgrel):

```bash
sudo ./safeUpdateArch.sh
```

- Arch Linux only — requires `pacman` and `vercmp`.
- Use `-n` / `--dry-run` to print decisions and the pacman command without changing anything.
- The script auto re-execs itself with `sudo` when not run as root.
- Edit `PINNED_PACKAGES` at the top of the script to add pins (`"package=version"`).

### 🌐 serverSetupDebian.sh

Debian server bootstrap: installs base tools (tmux, ncdu, htop, git, curl, make, vim, …), adds Docker's official apt repository and GPG key, removes conflicting container packages, installs `docker-ce` with the compose plugin, then smoke-tests with `docker run hello-world`:

```bash
sudo ./serverSetupDebian.sh
```

- Debian only — uses `$VERSION_CODENAME` from `/etc/os-release` to pick the apt repository.
- Requires `apt` and network access.
- Run from a root-capable shell block; the script uses inline `sudo`.
