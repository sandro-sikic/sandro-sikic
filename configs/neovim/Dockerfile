FROM alpine:latest

WORKDIR /root

RUN apk update

RUN apk add nodejs python3 npm go

RUN apk add git neovim ripgrep build-base wget unzip neovim-doc --update && \
  git clone https://github.com/NvChad/starter ~/.config/nvim

RUN rm -rf ~/.config/nvim/.git

COPY chadrc.lua .config/nvim/lua
COPY configs/conform.lua .config/nvim/lua/configs
COPY configs/lint.lua .config/nvim/lua/configs
COPY configs/treesitter.lua .config/nvim/lua/configs
COPY plugins.lua .config/nvim/lua/plugins/init.lua
COPY mappings.lua .config/nvim/lua
COPY init.lua .config/nvim/init.lua

RUN nvim --headless "+Lazy! sync" +qa
RUN nvim --headless "+MasonInstall gopls" +qa
RUN nvim --headless "+MasonInstall tailwindcss-language-server" +qa
RUN nvim --headless "+MasonInstall typescript-language-server" +qa
RUN nvim --headless "+MasonInstall pyright" +qa
RUN nvim --headless "+MasonInstall prisma-language-server" +qa

# disabled because of older version of python requirement
# RUN nvim --headless "+MasonInstall nginx-language-server" +qa

CMD ["sh"]