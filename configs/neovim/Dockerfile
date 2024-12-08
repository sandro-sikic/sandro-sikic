FROM debian:latest

WORKDIR /root

RUN apt install git nodejs neovim ripgrep build-base wget unzip python3 npdejs npm build-essential go --update && \
  git clone https://github.com/NvChad/starter ~/.config/nvim

COPY chadrc.lua /root/.config/nvim/lua/chadrc.lua

CMD ["nvim"]