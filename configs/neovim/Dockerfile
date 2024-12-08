FROM alpine:latest

WORKDIR /root

RUN apk add git nodejs neovim ripgrep build-base wget --update && \
  git clone https://github.com/NvChad/starter ~/.config/nvim

CMD ["nvim"]