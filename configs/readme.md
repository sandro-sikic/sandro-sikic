## 📚 Contents

- [🖥️ Text-Based User Interfaces](#️-text-based-user-interfaces)
- [📜 Commands](#-commands)
  - [🐳 Docker TUI](#-docker-tui)
  - [📦 NPM Update](#-npm-update)
  - [📦 NeoVim](#-neovim)
  - [🎨 PlantUML Theme](#-plantuml-theme)
- [🚀 Installations](#-installations)
  - [🖥️ WezTerm](#️-wezterm)
  - [🛠️ VSCode](#️-vscode)
  - [✍️ NeoVim](#️-neovim)
  - [📂 Portainer](#-portainer)
  - [🛡️ ViolentMonkey](#️-violentmonkey)

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
docker run --pull=always -v .:/host -w /host -it --rm --cpu-shares=8192 ghcr.io/sandro-sikic/sandro-sikic-neovim
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
https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/main/configs/portainer/apps/template.json
```

### 🛡️ ViolentMonkey

📝 Installation Instructions

1. **Install ViolentMonkey Extension**  
   Download and install the ViolentMonkey extension for your browser. You can find it in your browser's extension store or on the [official ViolentMonkey website](https://violentmonkey.github.io/get-it/).

2. **Click on a script to install**  
   In the "Import from URL" section, paste the following urls for the matching program.

   | Script                                                                                                       | Description                                      |
   | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
   | [IMDb](https://github.com/sandro-sikic/sandro-sikic/raw/main/configs/violentMonkey/imdb/index.user.js)       | Watch movies and series on IMDb.                 |
   | [Youtube](https://github.com/sandro-sikic/sandro-sikic/raw/main/configs/violentMonkey/youtube/index.user.js) | Links from Youtube to TSYoutube.                 |
   | [Fitgirl](https://github.com/sandro-sikic/sandro-sikic/raw/main/configs/violentMonkey/fitgirl/index.user.js) | Links from Youtube to TSYoutube.                 |
   | [Stremlist](https://stremlist.com)                                                                           | Bring your IMDb watchlist directly into Stremio. |

3. **Install the Script**  
   Click **Install** to add it to Tampermonkey.

4. **Enjoy the Script**  
   The script is now installed and will run automatically on supported pages.
