FROM alpine:latest

WORKDIR /root

RUN apk add git nodejs neovim ripgrep build-base wget unzip python3 nodejs npm build-essentials go --update && \
  git clone https://github.com/NvChad/starter ~/.config/nvim

COPY chadrc.lua /root/.config/nvim/lua/chadrc.lua

CMD ["nvim"]