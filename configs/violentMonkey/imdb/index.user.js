// ==UserScript==
// @name         IMDb
// @version      1.1.0
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
		backdropFilter: 'blur(10px)',
	});

	// Create iframe
	const iframe = document.createElement('iframe');
	Object.assign(iframe.style, {
		width: '90%',
		height: '90%',
		border: 'none',
		borderRadius: '8px',
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

function playVideo(e) {
	const pathSegments = window.location.pathname
		.split('/')
		.filter((segment) => segment);
	const imdb_id = pathSegments[1];
	const media_type = JSON.parse(
		document.querySelector('script[type="application/ld+json"]').textContent
	)['@type'];
	let base_url = 'https://proxy.garageband.rocks/embed';
	let video_url = base_url + '/tv/' + imdb_id;
	if (media_type === 'Movie') {
		video_url = base_url + '/movie/' + imdb_id;
	}

	if (e.ctrlKey || e.metaKey) {
		window.open(video_url);
	} else {
		createLightbox(video_url);
	}
}

function main() {
	'use strict';

	const observer = new MutationObserver(() => {
		const pageTitle = document.querySelector('h1');
		if (pageTitle && !pageTitle.classList.contains('clickable-title')) {
			pageTitle.classList.add('clickable-title');
			pageTitle.style.cursor = 'pointer';
			pageTitle.title =
				'Click to play in an overlay, ctrl+click (cmd+click on Mac) to open in a new tab.';
			pageTitle.addEventListener('click', playVideo);

			// Add underline on hover
			pageTitle.addEventListener('mouseover', () => {
				pageTitle.style.textDecoration = 'underline';
			});
			pageTitle.addEventListener('mouseout', () => {
				pageTitle.style.textDecoration = 'none';
			});
		}
	});

	observer.observe(document.body, { childList: true, subtree: true });
}

try {
	main();
} catch (error) {
	console.log('IMDb player: ', error);
}
