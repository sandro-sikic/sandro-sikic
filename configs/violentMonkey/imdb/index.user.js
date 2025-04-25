// ==UserScript==
// @name         IMDb
// @version      1.3.0
// @description  Play movies directly from IMDb
// @match        https://www.imdb.com/title/tt*
// @icon         https://m.media-amazon.com/images/G/01/imdb/images-ANDW73HA/favicon_desktop_32x32._CB1582158068_.png
// @downloadURL  https://github.com/sandro-sikic/sandro-sikic/raw/main/configs/violentMonkey/imdb/index.user.js
// @grant        none
// ==/UserScript==

function createLightbox(iframeSrc) {
	// Create lightbox container
	const lightbox = document.createElement('div');

	Object.assign(lightbox.style, {
		position: 'fixed',
		top: '0',
		left: '0',
		width: '100vw',
		height: '100vh',
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: '9999',
		backdropFilter: 'blur(15px)',
	});

	// Create iframe
	const iframe = document.createElement('iframe');
	Object.assign(iframe.style, {
		width: '90%',
		height: '90%',
		border: 'none',
		borderRadius: '8px',
		boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
	});
	iframe.allowFullscreen = true;
	iframe.src = iframeSrc;

	// Append iframe to lightbox
	lightbox.appendChild(iframe);

	// Close lightbox when clicking outside iframe
	lightbox.addEventListener('click', (event) => {
		if (event.target === lightbox) {
			lightbox.remove();
		}
	});

	// Close lightbox when ESC is pressed
	document.addEventListener('keyup', function (event) {
		if (event.key === 'Escape') {
			lightbox.remove();
		}
	});

	// Add lightbox to the body
	document.body.appendChild(lightbox);
}

function extractIdFromUrl(url) {
	const match = url.match(/\/title\/(tt\d+)/);
	return match ? match[1] : null;
}

function generateVideoUrl() {
	let base_url = 'https://proxy.garageband.rocks/embed';

	const data = JSON.parse(
		document.querySelector('script[type="application/ld+json"]').textContent
	);

	const type = data['@type'];
	const url = data.url;

	if (type === 'Movie') {
		return base_url + '/movie/' + extractIdFromUrl(url);
	} else if (type === 'TVSeries') {
		return base_url + '/tv/' + extractIdFromUrl(url);
	} else if (type === 'TVEpisode') {
		const series_url = document
			.querySelector('a[data-testid="hero-title-block__series-link"]')
			.getAttribute('href');

		const season_episode = document
			.querySelector(
				'div[data-testid="hero-subnav-bar-season-episode-numbers-section"]'
			)
			.textContent.replace('<!-- -->', '');

		season = season_episode.split('.')[0].replace('S', '');
		episode = season_episode.split('.')[1].replace('E', '');

		return (
			base_url +
			'/tv/' +
			extractIdFromUrl(series_url) +
			'?season=' +
			season +
			'&episode=' +
			episode
		);
	}
}

function playVideo(e) {
	const video_url = generateVideoUrl();

	if (!video_url) {
		return;
	}

	if (e.ctrlKey || e.metaKey) {
		window.open(video_url);
	} else {
		createLightbox(video_url);
	}
}

function resetTitleStyle(title) {
	title.style.cursor = 'default';
	title.title = '';
	title.removeEventListener('click', playVideo);
	title.removeEventListener('mouseover', () => {
		title.style.textDecoration = 'none';
	});
	title.addEventListener('mouseout', () => {});
}

function setTitleStyle(title) {
	title.style.cursor = 'pointer';
	title.title =
		'Click to play in an overlay, ctrl+click (cmd+click on Mac) to open in a new tab.';
	title.addEventListener('click', playVideo);

	title.addEventListener('mouseover', () => {
		title.style.textDecoration = 'underline';
	});

	title.addEventListener('mouseout', () => {
		title.style.textDecoration = 'none';
	});
}

function main() {
	'use strict';

	const observer = new MutationObserver(() => {
		const title = document.querySelector('h1');

		if (!title) {
			return;
		}

		const allowedTypes = ['Movie', 'TVSeries', 'TVEpisode'];

		const media_type = JSON.parse(
			document.querySelector('script[type="application/ld+json"]').textContent
		)['@type'];

		if (!allowedTypes.includes(media_type)) {
			resetTitleStyle(title);
			return;
		}

		setTitleStyle(title);
	});

	observer.observe(document.body, { childList: true, subtree: true });
}

try {
	main();
} catch (error) {
	console.log('IMDb player: ', error);
}
