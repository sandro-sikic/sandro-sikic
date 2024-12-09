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
			-- require("nvchad.configs.lspconfig").defaults()
			require("configs.lspconfig")
		end,
	},
}
