// ==UserScript==
// @name        Redirect to tsyoutube by clicking on the video title
// @version     1.2.0
// @match       https://www.youtube.com/*
// @grant       none
// @icon        https://www.gstatic.com/youtube/img/branding/favicon/favicon_144x144_v2.png
// @downloadURL https://github.com/sandro-sikic/sandro-sikic/raw/main/configs/violentMonkey/youtube/index.user.js
// ==/UserScript==

function main() {
	const observer = new MutationObserver(() => {
		if (window.location.pathname != '/watch') return;
		const title = document.getElementById('title');
		console.log('something changed', title, window.location);
		if (!title) return;
		if (title.hasAttribute('data-listeners-added')) return;

		title.style.cursor = 'pointer';

		title.addEventListener('click', (e) => {
			window.location =
				'https://www.tsyoutube.com' +
				window.location.pathname +
				window.location.search;
		});
		title.addEventListener('mouseover', () => {
			title.style.textDecoration = 'underline';
		});
		title.addEventListener('mouseout', () => {
			title.style.textDecoration = 'none';
		});
		title.setAttribute('data-listeners-added', 'true');
	});

	observer.observe(document.body, { childList: true, subtree: true });
}

try {
	main();
} catch (error) {
	console.log('TSYOUTUBE: ', error);
}
