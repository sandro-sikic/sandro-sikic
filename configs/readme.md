# ⚙️ Configurations

## 📜 Commands

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
docker run -v .:/host -w /host -it --rm --memory="0" --memory-swap="0" --cpu-shares=1024 ghcr.io/sandro-sikic/sandro-sikic-neovim
```

### 🎨 PlantUML Theme

Apply a theme for PlantUML diagrams:

```plantuml
@startuml Tenderi
!theme blueprint from https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/main/configs/plantuml/themes
```

---

# 🚀 Installation

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

#### 🌄 Background Images

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
https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/main/configs/portainer/template.json
```

### 🛡️ Tampermonkey

#### Installation Instructions

1. **Install Tampermonkey Extension**  
   Download and install the Tampermonkey extension for your browser. You can find it in your browser's extension store or on the [official Tampermonkey website](https://www.tampermonkey.net/).

2. **Enable Developer Mode**  
   Open browser extension settings and enable "Developer Mode" for Tampermonkey.

3. **Open Tampermonkey Dashboard**  
   Click on the Tampermonkey icon in your browser extension toolbar and select **Dashboard** from the dropdown menu.

4. **Navigate to Utilities**  
   In the Tampermonkey Dashboard, go to the **Utilities** tab.

5. **Import Script from URL**  
   In the "Import from URL" section, paste the following urls for the matching program.
   
    - **IMDb**  
   ```
    https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/refs/heads/main/configs/tampermonkey/imdb/index.js
   ```

6. **Install the Script**  
   Click the **Import** button, review the script, and click **Install** to add it to Tampermonkey.

7. **Enjoy the Script**  
   The script is now installed and will run automatically on supported pages.


# 🖥️ Text-Based User Interfaces

- 📁 [Ranger](https://github.com/ranger/ranger): A file manager with Vim keybindings.
- 🐳 [Docker Dry](https://github.com/moncho/dry): TUI for managing Docker containers.
- ✨ [NeoVim](https://github.com/neovim/neovim): A hyperextensible Vim-based text editor.
- 📊 [Bottom](https://github.com/ClementTsang/bottom): A cross-platform process/system monitor.
- 🌲 [GitUI](https://github.com/extrawurst/gitui): A fast terminal UI for Git.
- 📈 [KDash](https://github.com/kdash-rs/kdash): TUI dashboard for Kubernetes.
- 📡 [Termscp](https://github.com/veeso/termscp): A terminal-based SCP client.
- 📉 [Ncdu](https://dev.yorhel.nl/ncdu): Disk usage analyzer with an intuitive TUI.
- 🔍 [NPM-Check](https://www.npmjs.com/package/npm-check): Tool for managing outdated NPM packages.
