FROM alpine:latest

WORKDIR /root

RUN apk add git nodejs neovim ripgrep build-base wget unzip python3 nodejs npm go --update && \
  git clone https://github.com/NvChad/starter ~/.config/nvim

RUN rm -rf ~/.config/nvim/.git

COPY chadrc.lua .config/nvim/lua
COPY mappings.lua .config/nvim/lua

RUN nvim --headless "+Lazy! sync" +qa

RUN nvim --headless "+so ~/.config/nvim/lua/chadrc.lua" +qa

CMD ["nvim"]