// ==UserScript==
// @name        Youtube Improvements
// @version     1.4.0
// @match       https://www.youtube.com/*
// @grant       none
// @icon        https://www.gstatic.com/youtube/img/branding/favicon/favicon_144x144_v2.png
// @downloadURL https://github.com/sandro-sikic/sandro-sikic/raw/main/configs/violentMonkey/youtube/index.user.js
// ==/UserScript==

async function addToWatchListDropdownClick(item) {
	return new Promise((resolve) => {
		const menuButton = item.querySelector(
			'#content > yt-lockup-view-model > div > div > yt-lockup-metadata-view-model > div.yt-lockup-metadata-view-model__menu-button > button-view-model > button'
		);

		menuButton.click();

		setTimeout(() => {
			const menuItems = document.querySelectorAll(
				'tp-yt-iron-dropdown #contentWrapper yt-sheet-view-model yt-contextual-sheet-layout yt-list-view-model yt-list-item-view-model'
			);

			if (menuItems.length == 0) return;

			const isFound = false;
			for (const menuItem of menuItems) {
				if (menuItem.textContent.includes('Save to Watch Later')) {
					menuItem.addEventListener('click', () => {
						resolve();
					});

					menuItem.click();
					isFound = true;
					break;
				}
			}

			if (!isFound) {
				console.log('Menu item not found, clicking first item as fallback');
				menuButton.click();
				resolve();
			}
		}, 50);
	});
}

function redirectToTSYouTube() {
	if (window.location.pathname != '/watch') return;
	const title = document.querySelector('ytd-watch-metadata #title');
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
}

function addToWatchlistButtonThumbnail() {
	const urls = ['/', '/feed/trending', '/feed/subscriptions'];
	if (!urls.includes(window.location.pathname)) return;

	const thumbnails = document.querySelectorAll(
		'#contents > ytd-rich-item-renderer'
	);

	thumbnails.forEach((thumbnail) => {
		const videoLink = thumbnail.querySelector(
			'#content > yt-lockup-view-model > div > a'
		);
		if (!videoLink) return;

		const urlParams = new URLSearchParams(new URL(videoLink.href).search);
		const videoId = urlParams.get('v');
		if (!videoId) return;

		const buttonId = `add-to-watchlist-button-${videoId}`;
		if (document.getElementById(buttonId)) {
			return;
		}

		const button = document.createElement('button');
		button.id = buttonId;
		button.addEventListener('click', async (e) => {
			e.stopPropagation();
			e.preventDefault();

			await addToWatchListDropdownClick(thumbnail);
		});

		button.style.position = 'absolute';
		button.style.top = '10px';
		button.style.left = '10px';
		button.style.zIndex = '1000';
		button.style.fontSize = '12px';
		button.style.width = '36px';
		button.style.height = '36px';
		button.style.display = 'flex';
		button.style.alignItems = 'center';
		button.style.justifyContent = 'center';
		button.style.color = 'white';
		button.style.border = 'none';
		button.style.borderRadius = '9999px';
		button.style.cursor = 'pointer';
		button.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
		button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>`;

		thumbnail.appendChild(button);
	});
}

function addRemoveFromWatchlistButtonWatchList() {
	if (!window.location.href.includes('/playlist?list=WL')) return;

	const videoItems = document.querySelectorAll(
		'#contents > ytd-playlist-video-renderer'
	);

	videoItems.forEach((item) => {
		const videoLink = item.querySelector('#content a#thumbnail');
		if (!videoLink) return;

		const urlParams = new URLSearchParams(new URL(videoLink.href).search);
		const videoId = urlParams.get('v');
		if (!videoId) return;

		const buttonId = `remove-from-watchlist-button-${videoId}`;
		if (item.querySelector(`#${buttonId}`)) {
			return;
		}

		const existingButton = item.querySelector(
			'[data-remove-from-watchlist-button="true"]'
		);

		if (existingButton) {
			existingButton.remove();
		}

		const button = document.createElement('button');
		button.id = buttonId;
		button.setAttribute('data-remove-from-watchlist-button', 'true');
		button.addEventListener('click', async (e) => {
			e.stopPropagation();
			e.preventDefault();

			const menuButton = item.querySelector('yt-icon-button#button');

			menuButton.click();

			setTimeout(() => {
				const menuItems = document.querySelectorAll(
					'ytd-popup-container ytd-menu-popup-renderer ytd-menu-service-item-renderer'
				);

				if (menuItems.length > 0) {
					for (const menuItem of menuItems) {
						if (menuItem.textContent.includes('Remove from Watch Later')) {
							menuItem.click();
							break;
						}
					}
				}
			}, 100);
		});

		button.style.width = '36px';
		button.style.height = '36px';
		button.style.display = 'flex';
		button.style.alignItems = 'center';
		button.style.justifyContent = 'center';
		button.style.color = 'white';
		button.style.border = 'none';
		button.style.borderRadius = '9999px';
		button.style.cursor = 'pointer';
		button.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
		button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;

		item.appendChild(button);
	});
}

try {
	const observer = new MutationObserver(() => {
		redirectToTSYouTube();
		addToWatchlistButtonThumbnail();
		addRemoveFromWatchlistButtonWatchList();
	});

	observer.observe(document.body, { childList: true, subtree: true });
} catch (error) {}
