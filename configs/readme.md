# Configs

## Commands 

#### Docker DRY TUI
```
docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock -e DOCKER_HOST=$DOCKER_HOST moncho/dry
```

#### NPM update
```
npx npm-check -u

```

#### PlantUML theme

```
@startuml Tenderi
!theme blueprint from https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/main/plantuml/themes
```


# Installation

### wezterm

- windows config goes to `/Users/{user}/.wezterm.lua`
- linux config goes to `~/.config/wezterm/wezterm.lua`

### vscode

- to install modification you need [Custom CSS and JS Loader](https://marketplace.visualstudio.com/items?itemName=be5invis.vscode-custom-css) extension, point the files to settings JSON and run command `Enable custom CSS and JS`

- images:
```
  "background.fullscreen": {
    "images": [
      "https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/main/images/futuristic_alpha_cat.png",
      "https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/main/images/retrowave_cat.png",
      "https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/main/images/retrowave_cat_with_glasses.png",
      "https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/main/images/sunglasses_at_night.png",
      "https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/main/images/wip_synthwave_city__gizille_the_cat.png"
    ],
    "opacity": 0.97,
    "size": "cover",
    "position": "center",
    "interval": 900
  }
```

### neovim

- config goes to `~/.config/nvim/lua/custom/chadrc.lua`

### portainer

- you can point the template.json in the settings of portainer 
`https://raw.githubusercontent.com/sandro-sikic/sandro-sikic/main/configs/portainer/termplate.json`

# Text-based user interface

- [Ranger](https://github.com/ranger/ranger)
- [Docker](https://github.com/moncho/dry)
- [NeoVim](https://github.com/neovim/neovim)
- [Bottom](https://github.com/ClementTsang/bottom)
- [GitUi](https://github.com/extrawurst/gitui)
- [KDash](https://github.com/kdash-rs/kdash)
- [Termscp](https://github.com/veeso/termscp)
- [Ncdu](https://dev.yorhel.nl/ncdu)
- [NPM-check](https://www.npmjs.com/package/npm-check)
