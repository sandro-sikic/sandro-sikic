FROM alpine:latest

WORKDIR /root

RUN apk update

RUN apk add nodejs python3 npm go

RUN apk add git neovim ripgrep build-base wget unzip neovim-doc --update && \
  git clone https://github.com/NvChad/starter ~/.config/nvim

RUN rm -rf ~/.config/nvim/.git

COPY conform.lua .config/nvim/lua/configs
COPY mason-conform.lua .config/nvim/lua/configs
COPY mason-lspconfig.lua .config/nvim/lua/configs
COPY lspconfig.lua .config/nvim/lua/configs
COPY plugins.lua .config/nvim/lua/plugins/init.lua
COPY chadrc.lua .config/nvim/lua
COPY mappings.lua .config/nvim/lua

RUN nvim --headless "+Lazy! sync" +qa
RUN nvim --headless "+MasonInstallAll" +qa


CMD ["nvim"]