// ==UserScript==
// @name         Plex
// @version      1.0.0
// @description  Enhances Plex web interface with additional features.
// @match        https://app.plex.tv/*
// @icon         https://app.plex.tv/desktop/favicon.ico
// @downloadURL  https://github.com/sandro-sikic/sandro-sikic/raw/main/configs/violentMonkey/plex/index.user.js
// ==/UserScript==

function getPlexAuthCookie() {
	const cookies = document.cookie.split('; ');
	const plexAuthCookie = cookies.find((cookie) =>
		cookie.startsWith('plex_tv_auth=')
	);
	if (!plexAuthCookie) {
		console.log('Cookie "plex_tv_auth" not found.');
		return null;
	}

	const cookieValue = plexAuthCookie.split('=')[1];
	try {
		const decodedCookie = JSON.parse(decodeURIComponent(cookieValue));
		const authToken = decodedCookie.authentication_token;
		console.log('Authentication Token:', authToken);
		return authToken;
	} catch (error) {
		console.error('Failed to decode or parse "plex_tv_auth" cookie:', error);
		return null;
	}
}

function watchlistRemoveVisibleButton() {
	if (
		!/app\.plex\.tv\/desktop\/#!\/u\/[^/]+\/watchlist/.test(
			window.location.href
		)
	) {
		const button = document.getElementById('remove-watchlist-button');
		if (button) {
			button.remove();
		}
		return;
	}

	function getWatchlistKeys() {
		const links = document.querySelectorAll('a[class*="PosterCardLink-link"]');
		const keys = [];
		links.forEach((link) => {
			const href = link.href;
			const keyMatch = href.match(/key=([^&]+)&context/);
			const key = keyMatch ? decodeURIComponent(keyMatch[1]) : null;
			const lastKey = key ? key.split('/').pop() : null;

			if (!lastKey) return;
			keys.push(lastKey);
		});
		console.log('Watchlist Keys:', keys);
		return keys;
	}

	function removeFromWatchlist(key) {
		const url = `https://discover.provider.plex.tv/actions/removeFromWatchlist?ratingKey=${key}`;
		const xhr = new XMLHttpRequest();
		const authToken = getPlexAuthCookie();
		xhr.open('PUT', url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.setRequestHeader('X-Plex-Token', authToken);
		xhr.onload = () => {
			if (xhr.status === 200) {
				console.log(`Successfully removed item with key: ${key}`);
			} else {
				console.error(
					`Failed to remove item with key: ${key}`,
					xhr.responseText
				);
			}
		};
		xhr.onerror = () => {
			console.error(`Error occurred while removing item with key: ${key}`);
		};
		xhr.send();
	}

	if (document.getElementById('remove-watchlist-button')) return;

	const button = document.createElement('button');
	button.textContent = 'Remove First Item from Watchlist';
	button.style.position = 'fixed';
	button.style.bottom = '20px';
	button.style.right = '20px';
	button.style.zIndex = '1000';
	button.id = 'remove-watchlist-button';
	button.addEventListener('click', () => {
		const keys = getWatchlistKeys();
		for (const key of keys) {
			removeFromWatchlist(key);
		}
	});
	document.body.appendChild(button);
}

try {
	const observer = new MutationObserver(() => {
		watchlistRemoveVisibleButton();
	});

	observer.observe(document.body, { childList: true, subtree: true });
} catch (error) {
	console.error('Plex script error: ', error);
}
