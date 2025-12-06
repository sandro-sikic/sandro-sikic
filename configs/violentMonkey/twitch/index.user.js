// ==UserScript==
// @name        Twitch Improvements
// @version     1.0.0
// @match       https://www.twitch.tv/*
// @grant       none
// @icon        https://static.twitchcdn.net/assets/favicon-32-e29e246c157142c94346.png
// @downloadURL https://github.com/sandro-sikic/sandro-sikic/raw/main/configs/violentMonkey/twitch/index.user.js
// ==/UserScript==

function removeSidebar() {
	const sidebar = document.querySelector('div[data-test-selector="side-nav"]');
	console.log('Removing sidebar:', sidebar);

	if (!sidebar) return;

	sidebar.remove();
}

try {
	const observer = new MutationObserver(() => {
		removeSidebar();
	});

	observer.observe(document.body, { childList: true, subtree: true });
} catch (error) {}
