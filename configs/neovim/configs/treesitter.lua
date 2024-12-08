local options = {
	ensure_installed = {
		"bash",
		"go",
		"make",
		"markdown",
		"printf",
		"python",
		"toml",
		"vim",
		"vimdoc",
		"yaml",
		"javascript",
		-- "c",
		-- "cmake",
		-- "cpp",
		-- "fish",
		-- "gomod",
		-- "gosum",
		-- "gotmpl",
		-- "gowork",
		-- "haskell",
		-- "lua",
		-- "luadoc",
		-- "odin",
	},

	highlight = {
		enable = true,
		use_languagetree = true,
	},

	indent = { enable = true },
}

require("nvim-treesitter.configs").setup(options)
