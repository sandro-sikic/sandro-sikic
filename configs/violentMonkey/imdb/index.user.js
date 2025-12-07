// ==UserScript==
// @name         IMDb
// @version      1.6.0
// @description  IMDb Improvements
// @match        https://www.imdb.com/*
// @match        https://m.imdb.com/*
// @icon         https://m.media-amazon.com/images/G/01/imdb/images-ANDW73HA/favicon_desktop_32x32._CB1582158068_.png
// @downloadURL  https://github.com/sandro-sikic/sandro-sikic/raw/main/configs/violentMonkey/imdb/index.user.js
// @grant        none
// ==/UserScript==

function createLightbox(iframeSrc) {
	const lightbox = document.createElement('div');

	Object.assign(lightbox.style, {
		position: 'fixed',
		top: '0',
		left: '0',
		width: '100vw',
		height: '100svh',
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: '9999',
		backdropFilter: 'blur(20px)',
		opacity: '0',
		transition: 'opacity 0.5s',
	});

	const iframe = document.createElement('iframe');
	Object.assign(iframe.style, {
		width: '90%',
		height: '90%',
		border: 'none',
		borderRadius: '8px',
		boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
		opacity: '0',
		transition: '1s',
		transitionDelay: '0.5s',
		transform: 'scale(0.95)',
	});
	iframe.allowFullscreen = true;
	iframe.src = iframeSrc;

	// Append iframe to lightbox
	lightbox.appendChild(iframe);

	// Helper to restore scroll
	const restoreScroll = () => {
		document.body.style.overflow = '';
		document.removeEventListener('keyup', escHandler);
	};

	// Close lightbox when clicking outside iframe
	lightbox.addEventListener('click', (event) => {
		if (event.target === lightbox) {
			lightbox.remove();
			restoreScroll();
		}
	});

	// Close lightbox when ESC is pressed
	const escHandler = function (event) {
		if (event.key === 'Escape') {
			lightbox.remove();
			restoreScroll();
		}
	};
	document.addEventListener('keyup', escHandler);

	// Add lightbox to the body
	document.body.appendChild(lightbox);

	// Disable body scroll
	document.body.style.overflow = 'hidden';

	// Trigger opacity transition
	requestAnimationFrame(() => {
		iframe.style.opacity = '1';
		lightbox.style.opacity = '1';
		iframe.style.transform = 'scale(1)';
	});
}

function addLink(label, action) {
	const id = label.toLowerCase().replace(' ', '_');
	if (document.getElementById(id)) return;

	const title = document.querySelector('h1');
	if (!title) return;

	const inlineList = title.parentNode.querySelector('ul.ipc-inline-list');
	if (!inlineList) return;

	const link = document.createElement('a');
	link.id = id;
	link.textContent = label;
	link.className = 'ipc-link ipc-link--baseAlt ipc-link--inherit-color';

	if (typeof action == 'string') {
		link.href = action;
		link.target = '_blank';
	} else if (typeof action == 'function') {
		link.addEventListener('click', (e) => {
			e.stopPropagation();
			action(e);
		});
	}

	const listItem = document.createElement('li');
	listItem.className = 'ipc-inline-list__item';
	listItem.appendChild(link);

	inlineList.appendChild(listItem);
}

function getIMDbData() {
	const data = JSON.parse(
		document.querySelector('script[type="application/ld+json"]').textContent
	);

	const type = data['@type'];
	const url = data.url;

	const imdbId = url.match(/\/title\/(tt\d+)/);
	let seriesId = null;
	let seasonEpisode = null;

	if (type === 'TVEpisode') {
		const seriesUrl = document
			.querySelector('a[data-testid="hero-title-block__series-link"]')
			.getAttribute('href');

		seriesId = seriesUrl.match(/\/title\/(tt\d+)\//)[1];

		seasonEpisode = document
			.querySelector(
				'div[data-testid="hero-subnav-bar-season-episode-numbers-section"]'
			)
			.textContent.replace('<!-- -->', '');
	}

	return {
		id: imdbId ? imdbId[1] : null,
		type: type,
		seriesId,
		season: seasonEpisode ? seasonEpisode.split('.')[0].replace('S', '') : null,
		episode: seasonEpisode
			? seasonEpisode.split('.')[1].replace('E', '')
			: null,
	};
}

function isMediaPage() {
	const allowedTypes = ['Movie', 'TVSeries', 'TVEpisode'];

	const imdb = getIMDbData();
	if (!imdb.type) return;

	return allowedTypes.includes(imdb.type);
}

function addWatchNowLink() {
	if (!isMediaPage()) return;

	let baseUrl = 'https://proxy.garageband.rocks/embed';
	const imdb = getIMDbData();
	let videoUrl = null;

	if (imdb.type === 'Movie') {
		videoUrl = `${baseUrl}/movie/${imdb.id}`;
	} else if (imdb.type === 'TVSeries') {
		videoUrl = `${baseUrl}/tv/${imdb.id}`;
	} else if (imdb.type === 'TVEpisode') {
		videoUrl = `${baseUrl}/tv/${imdb.seriesId}?season=${imdb.season}&episode=${imdb.episode}`;
	}

	if (!videoUrl) return;

	addLink('Watch Now', (e) => {
		if (e.ctrlKey || e.metaKey) {
			window.open(videoUrl);
		} else {
			createLightbox(videoUrl);
		}
	});
}

function addOpenInStremioLink() {
	if (!isMediaPage()) return;

	const imdb = getIMDbData();
	if (!imdb.id) return;

	let stremioUrl = null;

	if (imdb.type === 'Movie') {
		stremioUrl = `stremio:///detail/movie/${imdb.id}`;
	} else if (imdb.type === 'TVSeries') {
		stremioUrl = `stremio:///detail/series/${imdb.id}`;
	} else if (imdb.type === 'TVEpisode') {
		stremioUrl = `stremio:///detail/series/${imdb.seriesId}/${imdb.seriesId}:${imdb.season}:${imdb.episode}`;
	}

	if (!stremioUrl) return;

	addLink('Stremio', stremioUrl);
}

function addRealDebridLink() {
	if (!isMediaPage()) return;

	let baseUrl = 'https://debridmediamanager.com';

	const imdb = getIMDbData();
	if (!imdb.id) return;

	let debridUrl = null;

	if (imdb.type === 'Movie') {
		debridUrl = `${baseUrl}/movie/${imdb.id}`;
	} else if (imdb.type === 'TVSeries') {
		debridUrl = `${baseUrl}/show/${imdb.id}`;
	} else if (imdb.type === 'TVEpisode') {
		debridUrl = `${baseUrl}/show/${imdb.seriesId}/${imdb.season}`;
	}

	if (!debridUrl) return;

	addLink('Debrid Media Manager', (e) => {
		if (e.ctrlKey || e.metaKey) {
			window.open(debridUrl);
		} else {
			createLightbox(debridUrl);
		}
	});
}

try {
	const observer = new MutationObserver(() => {
		addWatchNowLink();
		addOpenInStremioLink();
		addRealDebridLink();
	});

	observer.observe(document.body, { childList: true, subtree: true });
} catch (error) {
	console.error('IMDb Improvements: ', error);
}
