// ==UserScript==
// @name         IMDb
// @version      1.5.0
// @description  IMDb Improvements
// @match        https://www.imdb.com/title/tt*
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
		height: '100vh',
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: '9999',
		backdropFilter: 'blur(15px)',
	});

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

function addRealDebridLink() {
	if (!isMediaPage()) return;

	let base_url = 'https://debridmediamanager.com';

	const imdb = getIMDbData();
	if (!imdb.id) return;

	let debridUrl = '#';

	if (imdb.type === 'Movie') {
		debridUrl = `${base_url}/movie/${imdb.id}`;
	} else if (imdb.type === 'TVSeries') {
		debridUrl = `${base_url}/show/${imdb.id}`;
	} else if (imdb.type === 'TVEpisode') {
		debridUrl = `${base_url}/show/${imdb.seriesId}/${imdb.season}`;
	}

	addLink('Debrid Media Manager', (e) => {
		if (e.ctrlKey || e.metaKey) {
			window.open(debridUrl);
		} else {
			createLightbox(debridUrl);
		}
	});
}

function addOpenInStremioLink() {
	if (!isMediaPage()) return;

	const imdb = getIMDbData();
	if (!imdb.id) return;

	let stremioUrl = '#';

	if (imdb.type === 'Movie') {
		stremioUrl = `stremio:///detail/movie/${imdb.id}`;
	} else if (imdb.type === 'TVSeries') {
		stremioUrl = `stremio:///detail/series/${imdb.id}`;
	} else if (imdb.type === 'TVEpisode') {
		stremioUrl = `stremio:///detail/series/${imdb.seriesId}/${imdb.seriesId}:${imdb.season}:${imdb.episode}`;
	}

	addLink('Stremio', stremioUrl);
}

function addWatchNowLink() {
	if (!isMediaPage()) return;

	let base_url = 'https://proxy.garageband.rocks/embed';
	const imdb = getIMDbData();
	let videoUrl = '#';

	if (imdb.type === 'Movie') {
		videoUrl = `${base_url}/movie/${imdb.id}`;
	} else if (imdb.type === 'TVSeries') {
		videoUrl = `${base_url}/tv/${imdb.id}`;
	} else if (imdb.type === 'TVEpisode') {
		videoUrl = `${base_url}/tv/${imdb.seriesId}?season=${imdb.season}&episode=${imdb.episode}`;
	}

	if (!videoUrl) {
		return;
	}

	addLink('Watch Now', (e) => {
		if (e.ctrlKey || e.metaKey) {
			window.open(videoUrl);
		} else {
			createLightbox(videoUrl);
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
