return {
	{
		"stevearc/conform.nvim",
		event = "BufWritePre", -- uncomment for format on save
		opts = require("configs.conform"),
	}, -- These are some examples, uncomment them if you want to see them work!
	{
		"nvim-treesitter/nvim-treesitter",
		opts = {
			ensure_installed = { "vim", "lua", "vimdoc", "html", "css" },
		},
	},
	{
		"neovim/nvim-lspconfig",
		event = { "BufReadPre", "BufNewFile" },
		config = function()
			require("nvchad.configs.lspconfig").defaults()
			require("configs.lspconfig")
		end,
	},
}
