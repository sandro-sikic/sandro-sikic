local options = {
	formatters_by_ft = {
		lua = { "stylua" },
		python = { "black" },
		javascript = { "prettier" },
		typescript = { "prettier" },
		typescriptreact = { "prettier" },
		json = { "prettier" },
		html = { "prettier" },
		css = { "prettier" },
		scss = { "prettier" },
		markdown = { "prettier" },
		yaml = { "prettier" },
	},

	format_on_save = {
		enabled = true,
		timeout_ms = 500,
		lsp_fallback = true,
	},
}

require("conform").setup(options)
