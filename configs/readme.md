## 📚 Contents
- [📜 Commands](#-commands)
    - [🐳 Docker TUI](#-docker-tui)
    - [📦 NPM Update](#-npm-update)
    - [📦 NeoVim](#-neovim)
    - [🎨 PlantUML Theme](#-plantuml-theme)
- [🚀 Installation](#-installation)
    - [🖥️ WezTerm](#️-wezterm)
    - [🛠️ VSCode](#️-vscode)
      - [🌄 Background Images](#-background-images)
    - [✍️ NeoVim](#️-neovim)
    - [📂 Portainer](#-portainer)
    - [🛡️ ViolentMonkey](#️-violentmonkey)
      - [📝 Installation Instructions](#-installation-instructions)
    - [Stremio](#stremio)
      - [Installation](#installation)
      - [Plugins](#plugins)
- [🖥️ Text-Based User Interfaces](#️-text-based-user-interfaces)

---

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

### 🛡️ ViolentMonkey

#### 📝 Installation Instructions

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
   

### Stremio


#### Installation
   
1. **Install Stremio**  
   Download and install Stremio from the [official website](https://www.stremio.com/downloads).

#### Plugins

| Name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Description                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [Comet](https://comet.elfhosted.com/eyJtYXhSZXN1bHRzUGVyUmVzb2x1dGlvbiI6MCwibWF4U2l6ZSI6MCwiY2FjaGVkT25seSI6dHJ1ZSwicmVtb3ZlVHJhc2giOnRydWUsInJlc3VsdEZvcm1hdCI6WyJtZXRhZGF0YSIsInNpemUiLCJsYW5ndWFnZXMiXSwiZGVicmlkU2VydmljZSI6InJlYWxkZWJyaWQiLCJkZWJyaWRBcGlLZXkiOiIiLCJkZWJyaWRTdHJlYW1Qcm94eVBhc3N3b3JkIjoiIiwibGFuZ3VhZ2VzIjp7InJlcXVpcmVkIjpbXSwiZXhjbHVkZSI6W10sInByZWZlcnJlZCI6W119LCJyZXNvbHV0aW9ucyI6e30sIm9wdGlvbnMiOnsicmVtb3ZlX3JhbmtzX3VuZGVyIjotMTAwMDAwMDAwMDAsImFsbG93X2VuZ2xpc2hfaW5fbGFuZ3VhZ2VzIjpmYWxzZSwicmVtb3ZlX3Vua25vd25fbGFuZ3VhZ2VzIjpmYWxzZX19/configure)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Stremio's fastest torrent/debrid search add-on.                                                                  |  |
| [AIOstreams](https://aiostreams.elfhosted.com/eyJhcGlLZXkiOiIiLCJvdmVycmlkZU5hbWUiOiIiLCJzdHJlYW1UeXBlcyI6W3sidXNlbmV0IjpmYWxzZX0seyJkZWJyaWQiOnRydWV9LHsidW5rbm93biI6ZmFsc2V9LHsicDJwIjpmYWxzZX0seyJsaXZlIjpmYWxzZX1dLCJyZXNvbHV0aW9ucyI6W3siMjE2MHAiOnRydWV9LHsiMTQ0MHAiOnRydWV9LHsiMTA4MHAiOnRydWV9LHsiNzIwcCI6dHJ1ZX0seyI0ODBwIjp0cnVlfSx7IlVua25vd24iOnRydWV9XSwicXVhbGl0aWVzIjpbeyJCbHVSYXkgUkVNVVgiOnRydWV9LHsiQmx1UmF5Ijp0cnVlfSx7IldFQi1ETCI6dHJ1ZX0seyJXRUJSaXAiOnRydWV9LHsiSERSaXAiOnRydWV9LHsiSEMgSEQtUmlwIjp0cnVlfSx7IkRWRFJpcCI6dHJ1ZX0seyJIRFRWIjp0cnVlfSx7IkNBTSI6ZmFsc2V9LHsiVFMiOnRydWV9LHsiVEMiOnRydWV9LHsiU0NSIjp0cnVlfSx7IlVua25vd24iOmZhbHNlfV0sInZpc3VhbFRhZ3MiOlt7IkhEUitEViI6dHJ1ZX0seyJIRFIxMCsiOnRydWV9LHsiRFYiOnRydWV9LHsiSERSMTAiOnRydWV9LHsiSERSIjp0cnVlfSx7IjEwYml0Ijp0cnVlfSx7IjNEIjpmYWxzZX0seyJJTUFYIjp0cnVlfSx7IkFJIjp0cnVlfSx7IlNEUiI6dHJ1ZX1dLCJhdWRpb1RhZ3MiOlt7IkF0bW9zIjp0cnVlfSx7IkREKyI6dHJ1ZX0seyJERCI6dHJ1ZX0seyJEVFMtSEQgTUEiOnRydWV9LHsiRFRTLUhEIjp0cnVlfSx7IkRUUyI6dHJ1ZX0seyJUcnVlSEQiOnRydWV9LHsiNS4xIjp0cnVlfSx7IjcuMSI6dHJ1ZX0seyJGTEFDIjp0cnVlfSx7IkFBQyI6dHJ1ZX1dLCJlbmNvZGVzIjpbeyJBVjEiOnRydWV9LHsiSEVWQyI6dHJ1ZX0seyJBVkMiOnRydWV9LHsiWHZpZCI6dHJ1ZX0seyJEaXZYIjp0cnVlfSx7IkgtT1UiOnRydWV9LHsiSC1TQlMiOnRydWV9LHsiVW5rbm93biI6dHJ1ZX1dLCJzb3J0QnkiOlt7ImNhY2hlZCI6dHJ1ZSwiZGlyZWN0aW9uIjoiZGVzYyJ9LHsicmVzb2x1dGlvbiI6dHJ1ZX0seyJsYW5ndWFnZSI6dHJ1ZX0seyJzaXplIjp0cnVlLCJkaXJlY3Rpb24iOiJkZXNjIn0seyJzdHJlYW1UeXBlIjpmYWxzZX0seyJ2aXN1YWxUYWciOmZhbHNlfSx7InNlcnZpY2UiOmZhbHNlfSx7ImF1ZGlvVGFnIjpmYWxzZX0seyJlbmNvZGUiOmZhbHNlfSx7InF1YWxpdHkiOmZhbHNlfSx7InNlZWRlcnMiOmZhbHNlLCJkaXJlY3Rpb24iOiJkZXNjIn0seyJhZGRvbiI6ZmFsc2V9XSwib25seVNob3dDYWNoZWRTdHJlYW1zIjp0cnVlLCJwcmlvcml0aXNlZExhbmd1YWdlcyI6W10sImV4Y2x1ZGVkTGFuZ3VhZ2VzIjpudWxsLCJtYXhNb3ZpZVNpemUiOm51bGwsIm1pbk1vdmllU2l6ZSI6bnVsbCwibWF4RXBpc29kZVNpemUiOm51bGwsIm1pbkVwaXNvZGVTaXplIjpudWxsLCJhZGRvbk5hbWVJbkRlc2NyaXB0aW9uIjpmYWxzZSwiY2xlYW5SZXN1bHRzIjp0cnVlLCJtYXhSZXN1bHRzUGVyUmVzb2x1dGlvbiI6bnVsbCwic3RyaWN0SW5jbHVkZUZpbHRlcnMiOm51bGwsImV4Y2x1ZGVGaWx0ZXJzIjpudWxsLCJmb3JtYXR0ZXIiOiJtaW5pbWFsaXN0aWMtZ2RyaXZlIiwibWVkaWFGbG93Q29uZmlnIjp7Im1lZGlhRmxvd0VuYWJsZWQiOmZhbHNlLCJwcm94eVVybCI6IiIsImFwaVBhc3N3b3JkIjoiIiwicHVibGljSXAiOiIiLCJwcm94aWVkQWRkb25zIjpudWxsLCJwcm94aWVkU2VydmljZXMiOm51bGx9LCJhZGRvbnMiOlt7ImlkIjoiY29tZXQiLCJvcHRpb25zIjp7InByaW9yaXRpc2VEZWJyaWQiOiJyZWFsZGVicmlkIn19XSwic2VydmljZXMiOlt7Im5hbWUiOiJSZWFsIERlYnJpZCIsImlkIjoicmVhbGRlYnJpZCIsImVuYWJsZWQiOmZhbHNlLCJjcmVkZW50aWFscyI6eyJhcGlLZXkiOiIifX0seyJuYW1lIjoiQWxsIERlYnJpZCIsImlkIjoiYWxsZGVicmlkIiwiZW5hYmxlZCI6ZmFsc2UsImNyZWRlbnRpYWxzIjp7fX0seyJuYW1lIjoiUHJlbWl1bWl6ZSIsImlkIjoicHJlbWl1bWl6ZSIsImVuYWJsZWQiOmZhbHNlLCJjcmVkZW50aWFscyI6e319LHsibmFtZSI6IkRlYnJpZCBMaW5rIiwiaWQiOiJkZWJyaWRsaW5rIiwiZW5hYmxlZCI6ZmFsc2UsImNyZWRlbnRpYWxzIjp7fX0seyJuYW1lIjoiVG9yQm94IiwiaWQiOiJ0b3Jib3giLCJlbmFibGVkIjpmYWxzZSwiY3JlZGVudGlhbHMiOnt9fSx7Im5hbWUiOiJPZmZjbG91ZCIsImlkIjoib2ZmY2xvdWQiLCJlbmFibGVkIjpmYWxzZSwiY3JlZGVudGlhbHMiOnt9fSx7Im5hbWUiOiJwdXQuaW8iLCJpZCI6InB1dGlvIiwiZW5hYmxlZCI6ZmFsc2UsImNyZWRlbnRpYWxzIjp7fX0seyJuYW1lIjoiRWFzeW5ld3MiLCJpZCI6ImVhc3luZXdzIiwiZW5hYmxlZCI6ZmFsc2UsImNyZWRlbnRpYWxzIjp7fX0seyJuYW1lIjoiRWFzeURlYnJpZCIsImlkIjoiZWFzeWRlYnJpZCIsImVuYWJsZWQiOmZhbHNlLCJjcmVkZW50aWFscyI6e319LHsibmFtZSI6IlBpa1BhayIsImlkIjoicGlrcGFrIiwiZW5hYmxlZCI6ZmFsc2UsImNyZWRlbnRpYWxzIjp7fX0seyJuYW1lIjoiU2VlZHIiLCJpZCI6InNlZWRyIiwiZW5hYmxlZCI6ZmFsc2UsImNyZWRlbnRpYWxzIjp7fX0seyJuYW1lIjoiT3Jpb24iLCJpZCI6Im9yaW9uIiwiZW5hYmxlZCI6ZmFsc2UsImNyZWRlbnRpYWxzIjp7fX1dfQ%3D%3D/configure) | Combine your streams from all your addons into one and filter them by resolution, quality, visual tags and more. |




# 🖥️ Text-Based User Interfaces

| Program                                                | Description                                |
| ------------------------------------------------------ | ------------------------------------------ |
| 📁 [Ranger](https://github.com/ranger/ranger)           | A file manager with Vim keybindings.       |
| 🐳 [Docker Dry](https://github.com/moncho/dry)          | TUI for managing Docker containers.        |
| ✨ [NeoVim](https://github.com/neovim/neovim)           | A hyperextensible Vim-based text editor.   |
| 📊 [Bottom](https://github.com/ClementTsang/bottom)     | A cross-platform process/system monitor.   |
| 🌲 [GitUI](https://github.com/extrawurst/gitui)         | A fast terminal UI for Git.                |
| 📈 [KDash](https://github.com/kdash-rs/kdash)           | TUI dashboard for Kubernetes.              |
| 📡 [Termscp](https://github.com/veeso/termscp)          | A terminal-based SCP client.               |
| 📉 [Ncdu](https://dev.yorhel.nl/ncdu)                   | Disk usage analyzer with an intuitive TUI. |
| 🔍 [NPM-Check](https://www.npmjs.com/package/npm-check) | Tool for managing outdated NPM packages.   |
