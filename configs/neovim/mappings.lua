require("nvchad.mappings")

local map = vim.keymap.set

map("n", ";", ":", { desc = "CMD enter command mode" })
map("i", "jj", "<ESC>", { desc = "CMD enter normal mode" })

local ooo = function(client, bufnr)
	nvlsp.on_attach(client, bufnr)
	-- map HERE
	vim.keymap.set("n", "gd", "<cmd> Telescope<cr>", { buffer = bufnr })
end
