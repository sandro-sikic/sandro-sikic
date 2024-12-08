require("nvchad.mappings")

local map = vim.keymap.set

map("n", ";", ":", { desc = "CMD enter command mode" })
map("i", "jj", "<ESC>", { desc = "CMD enter normal mode" })

local ooo = function(client, bufnr)
	nvlsp.on_attach(client, bufnr)
	-- map HERE
	vim.keymap.set("n", "gd", "<cmd> Telescope<cr>", { buffer = bufnr })
end

local ooo = function(client, bufnr)
	nvlsp.on_attach(client, bufnr)
	-- map HERE
	vim.keymap.set("n", "gd", "<cmd> Telescope<cr>", { buffer = bufnr })
end

local lspconfig = require("lspconfig")

local servers = { "gopls", "tailwindcss-language-server", "typescript-language-server", "lua-language-server" }

for _, lsp in ipairs(servers) do
	lspconfig[lsp].setup({
		on_attach = ooo,
		on_init = nvlsp.on_init,
		capabilities = nvlsp.capabilities,
	})
end
