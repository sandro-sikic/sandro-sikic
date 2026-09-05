local wezterm = require 'wezterm'
local act = wezterm.action
local config = {}
local is_mac = wezterm.target_triple:find 'darwin' ~= nil

config.font_dirs = { wezterm.config_dir }
config.font = wezterm.font 'FiraCode Nerd Font'
config.color_scheme = 'Catppuccin Mocha'

config.keys = {
  {
    key = 'v',
    mods = 'CTRL|SHIFT',
    action = act.PasteFrom 'Clipboard',
  },
  {
    key = 'c',
    mods = 'CTRL|SHIFT',
    action = wezterm.action.CopyTo 'ClipboardAndPrimarySelection',
  },
}

if is_mac then
  config.send_composed_key_when_left_alt_is_pressed = true
  table.insert(config.keys, {
    key = 'c',
    mods = 'SUPER',
    action = wezterm.action.CopyTo 'ClipboardAndPrimarySelection',
  })
  table.insert(config.keys, {
    key = 'v',
    mods = 'SUPER',
    action = act.PasteFrom 'Clipboard',
  })
end

config.colors = {
  tab_bar = {
    background = '#0b0022',
    active_tab = {
      bg_color = '#2b2042',
      fg_color = '#c0c0c0',
      intensity = 'Normal',
      underline = 'None',
      italic = false,
      strikethrough = false,
    },
    inactive_tab = {
      bg_color = '#1b1032',
      fg_color = '#808080',
    },
    inactive_tab_hover = {
      bg_color = '#3b3052',
      fg_color = '#909090',
      italic = true,
    },
    new_tab = {
      bg_color = '#1b1032',
      fg_color = '#808080',
    },
    new_tab_hover = {
      bg_color = '#3b3052',
      fg_color = '#909090',
      italic = true,
    },
  },
}

config.window_padding = {
  left = 12,
  right = 12,
  top = 10,
  bottom = 10,
}

config.initial_cols = 125
config.initial_rows = 35

config.window_background_opacity = 0.95
config.scrollback_lines = 10000

config.hide_tab_bar_if_only_one_tab = true

return config

