FROM alpine:latest

WORKDIR /root

RUN apk update

RUN apk add nodejs python3 npm go

RUN apk add git neovim ripgrep build-base wget unzip neovim-doc --update && \
  git clone https://github.com/NvChad/starter ~/.config/nvim

RUN rm -rf ~/.config/nvim/.git

COPY chadrc.lua .config/nvim/lua
COPY configs/conform.lua .config/nvim/lua/configs
COPY configs/lspconfig.lua .config/nvim/lua/configs
COPY configs/treesitter.lua .config/nvim/lua/configs
COPY plugins.lua .config/nvim/lua/plugins/init.lua
COPY mappings.lua .config/nvim/lua
COPY init.lua .config/nvim/init.lua

RUN nvim --headless "+Lazy! sync" +qa

# Language Servers 
RUN nvim --headless "+MasonInstall html-lsp" +qa
RUN nvim --headless "+MasonInstall gopls" +qa
RUN nvim --headless "+MasonInstall tailwindcss-language-server" +qa
RUN nvim --headless "+MasonInstall typescript-language-server" +qa
# RUN nvim --headless "+MasonInstall lua-language-server" +qa
RUN nvim --headless "+MasonInstall nginx-language-server" +qa
RUN nvim --headless "+MasonInstall pyright" +qa
RUN nvim --headless "+MasonInstall prisma-language-server" +qa

# Formatters
RUN nvim --headless "+MasonInstall stylua" +qa
RUN nvim --headless "+MasonInstall black" +qa
RUN nvim --headless "+MasonInstall prettier" +qa

CMD ["nvim"]