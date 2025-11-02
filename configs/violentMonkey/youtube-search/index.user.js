// ==UserScript==
// @name         Youtube search
// @version      1.0.0
// @description  Open youtube search from the title
// @match        https://fitgirl-repacks.site/*
// @icon         https://www.gstatic.com/youtube/img/branding/favicon/favicon_144x144_v2.png
// @downloadURL  https://github.com/sandro-sikic/sandro-sikic/raw/main/configs/violentMonkey/youtube-search/index.user.js
// @grant        none
// ==/UserScript==

function main() {
	const observer = new MutationObserver(() => {
		if (document.querySelector('#youtube-search-link')) return;

		const title = document.querySelector('h1.entry-title');

		if (!title) return;

		const entryMeta = title.nextElementSibling;

		const youtubeLink = document.createElement('a');

		youtubeLink.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(
			title.textContent.trim()
		)}`;

		youtubeLink.target = '_blank';

		youtubeLink.id = 'youtube-search-link';

		youtubeLink.textContent = 'Search on YouTube';

		entryMeta.appendChild(youtubeLink);
	});

	observer.observe(document.body, { childList: true, subtree: true });
}

try {
	main();
} catch (error) {
	console.log('Youtube link: ', error);
}
