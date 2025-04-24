// ==UserScript==
// @name        Redirect to tsyoutube by clicking on the video title
// @version     1.0
// @match       https://www.youtube.com/watch*
// @grant       none
// @icon        https://www.gstatic.com/youtube/img/branding/favicon/favicon_144x144_v2.png
// @downloadURL https://github.com/sandro-sikic/sandro-sikic/raw/main/configs/violentMonkey/youtube/index.user.js
// ==/UserScript==

function main() {
	const observer = new MutationObserver(() => {
		if (document.getElementById('tsyoutube')) return;
		const title = document.getElementById('title').querySelector('h1');

		if (!title) return;

		title.style.cursor = 'pointer';
		title.id = 'tsyoutube';
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
	});

	observer.observe(document.body, { childList: true, subtree: true });
}

try {
	main();
} catch (error) {
	console.log('TSYOUTUBE: ', error);
}
