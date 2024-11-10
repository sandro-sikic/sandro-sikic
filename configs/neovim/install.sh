curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim.appimage

chmod u+x nvim.appimage

mv nvim.appimage /usr/local/bin/nvim

ln -s /usr/local/bin/nvim /usr/bin/nvim

apt install -y unzip python3 python3-venv nodejs npm ripgrep build-essential

git clone https://github.com/NvChad/NvChad ~/.config/nvim --depth 1

nvim