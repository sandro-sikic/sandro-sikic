return {
	{
		"stevearc/conform.nvim",
		event = "BufWritePre",
		opts = require("configs.conform"),
	},
	{
		"nvim-treesitter/nvim-treesitter",
		opts = require("configs.treesitter"),
	},
	{
		"neovim/nvim-lspconfig",
		event = { "BufReadPre", "BufNewFile" },
		config = function()
			require("nvchad.configs.lspconfig").defaults()
			require("configs.lspconfig")
		end,
	},
	{
		"telescope.nvim",
		defaults = {
			cmd = { "Telescope" },
			file_ignore_patterns = { "node_modules", "%.jpg", "%.jpeg", "%.png", "%.otf", "%.ttf" },
		},
	},
  {
    "nvim-tree/nvim-tree.lua",
		opts = {
			view = {
				width = 40,
				side = "left",
			},
			filters = {
				dotfiles = false,
			},
			update_focused_file = {
				enable = true,
				update_root = true,
			},
  		actions = {
        open_file = {
          quit_on_open = true,
        },
   		},
		}
  },
}
