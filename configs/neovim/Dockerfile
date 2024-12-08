FROM alpine:latest

WORKDIR /root

RUN apk add git nodejs neovim ripgrep build-base wget unzip python3 nodejs npm go --update && \
  git clone https://github.com/NvChad/starter ~/.config/nvim

RUN nvim --headless "+Lazy! sync" +qa

COPY chadrc.lua .config/nvim/lua

CMD ["nvim"]