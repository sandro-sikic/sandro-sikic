// ==UserScript==
// @name        Youtube Improvements
// @version     2.3.0
// @match       https://*.youtube.com/*
// @grant       none
// @icon        https://www.gstatic.com/youtube/img/branding/favicon/favicon_144x144_v2.png
// @downloadURL https://github.com/sandro-sikic/sandro-sikic/raw/main/configs/violentMonkey/youtube/index.user.js
// ==/UserScript==

const CLOCK_ICON_PATH =
	'm612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z';
const CHECK_ICON_PATH = 'M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z';
const DEBUG = false;
const dbg = (...args) => {
	if (DEBUG) console.log(...args);
};

const TRASH_ICON_PATH =
	'M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z';
const PLAY_ICON_PATH = 'M8 5v14l11-7z';

function ensureStyles() {
	if (document.getElementById('vm-yt-styles')) return;
	const style = document.createElement('style');
	style.id = 'vm-yt-styles';
	style.textContent = [
		'.vm-hover-reveal { visibility: hidden; }',
		'[data-vm-hover-host]:hover .vm-hover-reveal { visibility: visible; }',
		'ytd-video-preview, ytd-video-preview * { pointer-events: none !important; }',
		'.vm-add-wl-btn {',
		'  position: absolute;',
		'  top: 10px;',
		'  left: 10px;',
		'  z-index: 1000;',
		'  width: 36px;',
		'  height: 36px;',
		'  padding: 0;',
		'  display: flex;',
		'  align-items: center;',
		'  justify-content: center;',
		'  border: none;',
		'  border-radius: 9999px;',
		'  cursor: pointer;',
		'  background-color: rgba(0, 0, 0, 0.6);',
		'}',
		'#vm-wl-toolbar {',
		'  display: flex;',
		'  flex-direction: column;',
		'  gap: 8px;',
		'  margin: 0 0 12px;',
		'  padding: 12px;',
		'  background: rgba(255, 255, 255, 0.05);',
		'  border-radius: 12px;',
		'  font-family: Roboto, Arial, sans-serif;',
		'}',
		'.vm-wl-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }',
		'.vm-wl-search {',
		'  background-color: #272727;',
		'  color: #f1f1f1;',
		'  border: 1px solid #3f3f3f;',
		'  border-radius: 18px;',
		'  padding: 8px 14px;',
		'  font-size: 14px;',
		'  font-family: inherit;',
		'  width: 220px;',
		'  outline: none;',
		'  color-scheme: dark;',
		'}',
		'.vm-wl-search:focus { border-color: #3ea6ff; }',
		'.vm-wl-search::placeholder { color: #aaaaaa; }',
		'.vm-wl-combo { width: 200px; }',
		'.vm-wl-status { margin-left: auto; color: #aaaaaa; font-size: 13px; }',
		'.vm-wl-bulk-btn {',
		'  display: inline-flex;',
		'  align-items: center;',
		'  gap: 6px;',
		'  background-color: #cc0000;',
		'  color: #ffffff;',
		'  border: 1px solid #cc0000;',
		'  border-radius: 18px;',
		'  padding: 8px 14px;',
		'  font-size: 14px;',
		'  font-weight: 500;',
		'  font-family: inherit;',
		'  cursor: pointer;',
		'  text-decoration: none;',
		'}',
		'.vm-wl-bulk-btn:hover { background-color: #990000; border-color: #990000; }',
		'.vm-wl-bulk-btn[aria-disabled="true"] {',
		'  opacity: 0.5;',
		'  pointer-events: none;',
		'}',
		'.vm-wl-bulk-btn svg { width: 18px; height: 18px; fill: #ffffff; flex-shrink: 0; }',
		'.vm-wl-play-btn { background-color: #272727; color: #f1f1f1; border-color: #3f3f3f; }',
		'.vm-wl-play-btn:hover { background-color: #3f3f3f; border-color: #3f3f3f; }',
		'.vm-wl-play-btn svg { fill: #f1f1f1; }',
		'.vm-wl-bulk-target {',
		'  outline: 2px solid #cc0000 !important;',
		'  outline-offset: -2px;',
		'  background-color: rgba(204, 0, 0, 0.12) !important;',
		'}',

		/* WL Grid page */
		'body.vm-wl-grid-active ytd-browse[page-subtype="playlist"] { display: none !important; }',
		'#vm-wl-grid-page {',
		'  padding: 24px;',
		'  font-family: Roboto, Arial, sans-serif;',
		'  color: #f1f1f1;',
		'  width: 100%;',
		'}',
		'.vm-wl-grid-header {',
		'  display: flex;',
		'  align-items: center;',
		'  gap: 16px;',
		'  margin-bottom: 16px;',
		'  flex-wrap: wrap;',
		'}',
		'.vm-wl-grid-header h1 {',
		'  margin: 0;',
		'  font-size: 24px;',
		'  font-weight: 600;',
		'  color: #f1f1f1;',
		'}',
		'.vm-grid-btn {',
		'  display: inline-flex;',
		'  align-items: center;',
		'  gap: 6px;',
		'  padding: 8px 16px;',
		'  background-color: #272727;',
		'  color: #f1f1f1;',
		'  border: 1px solid #3f3f3f;',
		'  border-radius: 18px;',
		'  font-size: 14px;',
		'  font-weight: 500;',
		'  font-family: inherit;',
		'  cursor: pointer;',
		'  text-decoration: none;',
		'}',
		'.vm-grid-btn:hover { background-color: #3f3f3f; }',
		'.vm-grid-btn svg { width: 18px; height: 18px; fill: #f1f1f1; flex-shrink: 0; }',
		'.vm-wl-grid-skeleton {',
		'  text-align: center;',
		'  padding: 60px 0;',
		'  color: #aaaaaa;',
		'  font-size: 15px;',
		'}',
		'.vm-wl-grid {',
		'  display: grid;',
		'  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));',
		'  gap: 16px;',
		'}',
		'.vm-wl-card {',
		'  background: #212121;',
		'  border-radius: 12px;',
		'  overflow: hidden;',
		'  cursor: pointer;',
		'  contain: layout style paint;',
		'  content-visibility: auto;',
		'  contain-intrinsic-size: 0 280px;',
		'}',
		'.vm-wl-card:hover { background: #2a2a2a; }',
		'.vm-wl-card-unavailable { opacity: 0.5; }',
		'.vm-wl-card-unavailable .vm-card-thumb { cursor: default; }',
		'.vm-wl-card-highlight {',
		'  outline: 2px solid #cc0000 !important;',
		'  outline-offset: -2px;',
		'  background-color: rgba(204, 0, 0, 0.12) !important;',
		'}',
		'.vm-card-thumb {',
		'  position: relative;',
		'  width: 100%;',
		'  aspect-ratio: 16/9;',
		'  overflow: hidden;',
		'  background: #0f0f0f;',
		'}',
		'.vm-card-thumb img {',
		'  width: 100%;',
		'  height: 100%;',
		'  object-fit: cover;',
		'  display: block;',
		'}',
		'.vm-card-duration {',
		'  position: absolute;',
		'  bottom: 6px;',
		'  right: 6px;',
		'  background: rgba(0, 0, 0, 0.8);',
		'  color: #fff;',
		'  font-size: 12px;',
		'  font-weight: 500;',
		'  padding: 2px 6px;',
		'  border-radius: 4px;',
		'  line-height: 1.3;',
		'}',
		'.vm-card-progress {',
		'  position: absolute;',
		'  bottom: 0;',
		'  left: 0;',
		'  right: 0;',
		'  height: 3px;',
		'  background: rgba(255, 255, 255, 0.15);',
		'}',
		'.vm-card-progress-bar {',
		'  height: 100%;',
		'  background: #ff0000;',
		'  transition: width 0.2s;',
		'}',
		'.vm-card-body { padding: 12px; }',
		'.vm-card-title {',
		'  font-size: 14px;',
		'  font-weight: 500;',
		'  color: #f1f1f1;',
		'  line-height: 1.4;',
		'  display: -webkit-box;',
		'  -webkit-line-clamp: 2;',
		'  -webkit-box-orient: vertical;',
		'  overflow: hidden;',
		'  margin: 0 0 6px;',
		'}',
		'.vm-card-title a {',
		'  color: inherit;',
		'  text-decoration: none;',
		'}',
		'.vm-card-title a:hover { color: #f1f1f1; }',
		'.vm-card-channel {',
		'  font-size: 12px;',
		'  color: #aaaaaa;',
		'  margin: 0 0 2px;',
		'}',
		'.vm-card-channel a {',
		'  color: inherit;',
		'  text-decoration: none;',
		'}',
		'.vm-card-channel a:hover { color: #f1f1f1; }',
		'.vm-card-meta {',
		'  font-size: 12px;',
		'  color: #aaaaaa;',
		'}',
		'.vm-card-remove {',
		'  position: absolute;',
		'  top: 8px;',
		'  right: 8px;',
		'  width: 32px;',
		'  height: 32px;',
		'  padding: 0;',
		'  display: flex;',
		'  align-items: center;',
		'  justify-content: center;',
		'  border: none;',
		'  border-radius: 9999px;',
		'  cursor: pointer;',
		'  background-color: rgba(0, 0, 0, 0.7);',
		'  z-index: 10;',
		'}',
	].join('\n');
	document.head.appendChild(style);
}

function findVideoIdFromHref(href) {
	const m = href.match(/[?&]v=([\w-]{11})/);
	return m ? m[1] : null;
}

async function saveToWatchLater(item) {
	const menuButton =
		item.querySelector(
			'yt-lockup-metadata-view-model button-view-model > button',
		) || item.querySelector('ytd-menu-renderer yt-icon-button#button > button');
	if (!menuButton) {
		dbg('saveToWatchLater: menu button not found');
		return false;
	}

	document.dispatchEvent(
		new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
	);
	menuButton.click();

	for (let attempt = 0; attempt < 12; attempt++) {
		const menus = document.querySelectorAll(
			'tp-yt-iron-dropdown, ytd-popup-container ytd-menu-popup-renderer',
		);

		for (const menu of menus) {
			const rect = menu.getBoundingClientRect();
			if (rect.width === 0 || rect.height === 0) continue;

			const entries = menu.querySelectorAll(
				'yt-list-item-view-model, ytd-menu-service-item-renderer',
			);
			if (entries.length === 0) continue;

			for (const entry of entries) {
				const text = entry.textContent.toLowerCase();
				if (text.includes('watch later') && !text.includes('remove')) {
					(entry.querySelector('button') || entry).click();
					return true;
				}
			}

			menuButton.click();
			return false;
		}

		await new Promise((resolve) => setTimeout(resolve, 50));
	}

	return false;
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

function setIcon(button, pathData, viewBox = '0 -960 960 960') {
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('height', '24px');
	svg.setAttribute('viewBox', viewBox);
	svg.setAttribute('width', '24px');
	svg.setAttribute('fill', '#fff');
	const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path.setAttribute('d', pathData);
	svg.appendChild(path);
	button.replaceChildren(svg);
}

const wlSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let _sapisidCache = { ts: 0, auth: '' };
const SAPISID_MAX_AGE = 30 * 60 * 1000;

async function vmSapisidAuth() {
	if (Date.now() - _sapisidCache.ts < SAPISID_MAX_AGE)
		return _sapisidCache.auth;
	const sapisid = document.cookie
		.split(';')
		.find((c) => c.trim().startsWith('SAPISID='))
		?.split('=')[1]
		?.trim();
	if (!sapisid) return null;
	const time = Math.floor(Date.now() / 1000);
	const hashBuf = await crypto.subtle.digest(
		'SHA-1',
		new TextEncoder().encode(time + ' ' + sapisid + ' https://www.youtube.com'),
	);
	const hex = Array.from(new Uint8Array(hashBuf))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
	const auth =
		'SAPISIDHASH ' +
		time +
		'_' +
		hex +
		' SAPISID1PHASH ' +
		time +
		'_' +
		hex +
		' SAPISID3PHASH ' +
		time +
		'_' +
		hex;
	_sapisidCache = { ts: Date.now(), auth };
	return auth;
}

async function vmApiRemoveFromWL(videoIds) {
	if (videoIds.length === 0) return { ok: [] };
	const apiKey = window.ytcfg?.get?.('INNERTUBE_API_KEY');
	const ctx = window.ytcfg?.get?.('INNERTUBE_CONTEXT');
	if (!apiKey || !ctx)
		return { ok: [], fail: videoIds, error: 'no innertube config' };

	const BATCH_SIZE = 50;
	const chunks = [];
	for (let i = 0; i < videoIds.length; i += BATCH_SIZE)
		chunks.push(videoIds.slice(i, i + BATCH_SIZE));

	const ok = [];
	const fail = [];

	for (let ci = 0; ci < chunks.length; ci++) {
		if (ci > 0) await wlSleep(200);

		const auth = await vmSapisidAuth();
		if (!auth) {
			fail.push(...chunks[ci]);
			continue;
		}

		const actions = chunks[ci].map((id) => ({
			removedVideoId: id,
			action: 'ACTION_REMOVE_VIDEO_BY_VIDEO_ID',
		}));
		let resp;
		try {
			resp = await fetch(
				'https://www.youtube.com/youtubei/v1/browse/edit_playlist?key=' +
					apiKey,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: auth,
						'x-youtube-client-name': '1',
						'x-youtube-client-version': ctx.client.clientVersion,
						'x-origin': 'https://www.youtube.com',
					},
					body: JSON.stringify({ context: ctx, actions, playlistId: 'WL' }),
					credentials: 'same-origin',
				},
			);
		} catch (e) {
			dbg('vmApiRemoveFromWL: fetch failed', e);
			fail.push(...chunks[ci]);
			continue;
		}

		if (resp.status !== 200) {
			dbg('vmApiRemoveFromWL: status', resp.status);
			fail.push(...chunks[ci]);
			continue;
		}

		const body = await resp.text();
		if (body.length < 100) {
			dbg('vmApiRemoveFromWL: likely no-op (short body)', body);
			fail.push(...chunks[ci]);
			continue;
		}

		ok.push(...chunks[ci]);
	}

	_sapisidCache = { ts: 0, auth: '' };
	return { ok, fail };
}

function vmApiRemoveErrorBrief(item, videoId) {
	dbg('Failed to remove', videoId, '— check sign-in/connection');
}

// ── WL Grid Data Layer ────────────────────────────────────────────────

const WL_GRID_MAX = 1000;
const WL_TEMP_PLAYLIST_MAX = 50;
const WL_META_CACHE_KEY = 'vm-wl-pubmeta';
const WL_META_TTL = 7 * 24 * 60 * 60 * 1000;

const WL_AGE_UNITS = {
	s: 1,
	sec: 1,
	secs: 1,
	second: 1,
	seconds: 1,
	m: 60,
	min: 60,
	mins: 60,
	minute: 60,
	minutes: 60,
	h: 3600,
	hr: 3600,
	hrs: 3600,
	hour: 3600,
	hours: 3600,
	d: 86400,
	day: 86400,
	days: 86400,
	w: 604800,
	wk: 604800,
	wks: 604800,
	week: 604800,
	weeks: 604800,
	mo: 2592000,
	mon: 2592000,
	mos: 2592000,
	month: 2592000,
	months: 2592000,
	y: 31536000,
	yr: 31536000,
	yrs: 31536000,
	year: 31536000,
	years: 31536000,
};

function wlParseAgeSec(text) {
	if (!text) return null;
	const m = text.match(
		/^(?:streamed\s+|premiered\s+)?(\d+)\s*([a-z]+)\s+ago$/i,
	);
	if (!m) return null;
	const mult = WL_AGE_UNITS[m[2].toLowerCase()];
	return mult ? Number(m[1]) * mult : null;
}

const wlMetaCache = { entries: null };

function wlMetaCacheLoad() {
	if (wlMetaCache.entries) return;
	try {
		const raw = JSON.parse(localStorage.getItem(WL_META_CACHE_KEY) || '{}');
		wlMetaCache.entries = new Map(Object.entries(raw.entries || {}));
	} catch (e) {
		wlMetaCache.entries = new Map();
	}
}

function wlMetaCacheGetFresh(id) {
	wlMetaCacheLoad();
	const e = wlMetaCache.entries.get(id);
	if (!e || Date.now() - e.t > WL_META_TTL) return null;
	return e;
}

function wlMetaCachePut(id, fields) {
	wlMetaCacheLoad();
	wlMetaCache.entries.set(id, { t: Date.now(), ...fields });
}

function wlMetaCacheSave(keepIds) {
	wlMetaCacheLoad();
	if (keepIds) {
		const keep = new Set(keepIds);
		for (const id of [...wlMetaCache.entries.keys()]) {
			if (!keep.has(id)) wlMetaCache.entries.delete(id);
		}
	}
	try {
		const entries = {};
		for (const [id, e] of wlMetaCache.entries) entries[id] = e;
		localStorage.setItem(WL_META_CACHE_KEY, JSON.stringify({ entries }));
	} catch (e) {
		dbg('wlMetaCacheSave: failed', e);
	}
}

function wlVideoMeta(v) {
	return wlMetaCacheGetFresh(v.videoId);
}

function wlVideoPublishedTs(v) {
	const e = wlVideoMeta(v);
	if (e) {
		if (e.pub != null) return e.pub;
		if (e.dead) return null;
	}
	return v.publishedAgoSec != null
		? Date.now() - v.publishedAgoSec * 1000
		: null;
}

function wlVideoViews(v) {
	const e = wlVideoMeta(v);
	if (e && e.views != null) return e.views;
	return v.views ?? null;
}

function wlVideoLikes(v) {
	const e = wlVideoMeta(v);
	return e && e.likes != null ? e.likes : null;
}

function wlVideoCategory(v) {
	const e = wlVideoMeta(v);
	return e && e.cat ? e.cat : null;
}

async function vmPlayerMetaFetchOne(videoId) {
	const ctx = window.ytcfg?.get?.('INNERTUBE_CONTEXT');
	if (!ctx) return null;
	try {
		const resp = await fetch(
			'https://www.youtube.com/youtubei/v1/player?prettyPrint=false',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ context: ctx, videoId }),
				credentials: 'same-origin',
			},
		);
		if (resp.status !== 200) return null;
		const data = await resp.json();
		const mf = data?.microformat?.playerMicroformatRenderer;
		if (!mf) return { dead: 1 };
		const views = Number(data?.videoDetails?.viewCount ?? mf.viewCount);
		return {
			pub: mf.publishDate ? Date.parse(mf.publishDate) : null,
			views: Number.isFinite(views) ? views : null,
			likes: mf.likeCount != null ? Number(mf.likeCount) : null,
			cat: mf.category ?? null,
			dead: 0,
		};
	} catch (e) {
		dbg('vmPlayerMetaFetchOne: failed', videoId, e);
		return null;
	}
}

const wlMetaBackfill = { gen: 0, running: false, done: 0, total: 0 };

async function wlMetaBackfillRun() {
	const st = wlGrid;
	const snapshot = st.videos.map((v) => v.videoId);
	const todo = [];
	for (const id of snapshot) {
		if (wlMetaCacheGetFresh(id) == null) todo.push(id);
	}
	if (todo.length === 0) return;

	const gen = ++wlMetaBackfill.gen;
	wlMetaBackfill.running = true;
	wlMetaBackfill.done = 0;
	wlMetaBackfill.total = todo.length;

	let dirty = 0;
	let renderTimer = 0;

	const renderSoon = () => {
		if (gen !== wlMetaBackfill.gen) return;
		clearTimeout(renderTimer);
		renderTimer = setTimeout(() => {
			if (gen !== wlMetaBackfill.gen) return;
			wlGridRender();
		}, 500);
	};

	const worker = async () => {
		while (todo.length > 0) {
			if (gen !== wlMetaBackfill.gen) return;
			const id = todo.shift();
			const fields = await vmPlayerMetaFetchOne(id);
			if (fields) {
				wlMetaCachePut(id, fields);
				dirty++;
				if (dirty % 25 === 0) wlMetaCacheSave(snapshot);
				renderSoon();
			}
			wlMetaBackfill.done++;
			const statusEl = st._toolbar?.status;
			if (statusEl?.isConnected) wlGridUpdateStatus(statusEl);
			await wlSleep(75);
		}
	};

	const workers = [];
	for (let i = 0; i < 4; i++) {
		workers.push(worker());
		await wlSleep(75);
	}
	await Promise.all(workers);

	wlMetaBackfill.running = false;
	if (dirty > 0) wlMetaCacheSave(snapshot);
	if (gen === wlMetaBackfill.gen) wlGridRender();
}

function wlExtractContinuationToken(renderer) {
	if (!renderer) return null;
	const json = JSON.stringify(renderer);
	const m = json.match(/"continuationCommand":\s*\{[^}]*"token":"([^"]+)"/);
	return m ? m[1] : null;
}

function wlExtractWatchEndpoint(obj) {
	if (!obj || typeof obj !== 'object') return null;
	if (obj.watchEndpoint) return obj.watchEndpoint;
	for (const k of Object.keys(obj)) {
		if (typeof obj[k] === 'object' && obj[k] !== null) {
			const found = wlExtractWatchEndpoint(obj[k]);
			if (found) return found;
		}
	}
	return null;
}

function wlParseMetaViews(runs) {
	for (const t of runs) {
		const text = t.trim();
		if (/^no views$/i.test(text)) return 0;
		const m = text.match(/^([\d.,]+)\s*([KMB]?)\s*(?:views?)?$/i);
		if (!m) continue;
		let v = parseFloat(m[1].replace(/,/g, ''));
		if (Number.isNaN(v)) continue;
		if (m[2] === 'K' || m[2] === 'k') v *= 1e3;
		else if (m[2] === 'M' || m[2] === 'm') v *= 1e6;
		else if (m[2] === 'B' || m[2] === 'b') v *= 1e9;
		return v;
	}
	return null;
}

function wlMapRenderer(r) {
	const videoId = r.videoId;
	if (!videoId) return null;
	const title = r.title?.runs?.[0]?.text ?? r.title?.simpleText ?? '';
	const byline = r.shortBylineText?.runs?.[0];
	const channel = byline?.text ?? '';
	const channelBrowseId =
		byline?.navigationEndpoint?.browseEndpoint?.browseId ?? '';
	const channelUrl =
		byline?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl ??
		(channelBrowseId ? '/channel/' + channelBrowseId : '');
	const durationSec = r.lengthSeconds ? Number(r.lengthSeconds) : null;
	const metaRuns = (r.videoInfo?.runs || []).map((x) => x.text);
	const meta = metaRuns.join('');
	const views = wlParseMetaViews(metaRuns);
	const thumbs = r.thumbnail?.thumbnails || [];
	const bestThumb = thumbs.length > 0 ? thumbs[thumbs.length - 1] : null;
	const resumeOvl = (r.thumbnailOverlays || []).find(
		(o) => o.thumbnailOverlayResumePlaybackRenderer,
	);
	const progressPct = resumeOvl
		? resumeOvl.thumbnailOverlayResumePlaybackRenderer.percentDurationWatched ||
			0
		: 0;
	const isPlayable = r.isPlayable !== false;
	const indexRaw = r.index?.simpleText ?? r.index;
	const index =
		indexRaw != null && indexRaw !== '' && Number.isFinite(Number(indexRaw))
			? Number(indexRaw)
			: null;
	let publishedAgoSec = null;
	for (const t of metaRuns) {
		const parsed = wlParseAgeSec(t);
		if (parsed != null) publishedAgoSec = parsed;
	}
	return {
		videoId,
		title,
		publishedAgoSec,
		channel,
		channelBrowseId,
		channelUrl,
		durationSec,
		meta,
		views,
		thumbUrl: bestThumb?.url || '',
		progressPct,
		isPlayable,
		index,
	};
}

async function wlFetchAllVideos() {
	const auth = await vmSapisidAuth();
	if (!auth) return null;

	const apiKey = window.ytcfg?.get?.('INNERTUBE_API_KEY');
	const ctx = window.ytcfg?.get?.('INNERTUBE_CONTEXT');
	if (!apiKey || !ctx) return null;

	const browseHeaders = {
		'Content-Type': 'application/json',
		Authorization: auth,
		'x-youtube-client-name': '1',
		'x-youtube-client-version': ctx.client.clientVersion,
		'x-origin': 'https://www.youtube.com',
	};

	let resp;
	try {
		resp = await fetch(
			'https://www.youtube.com/youtubei/v1/browse?prettyPrint=false',
			{
				method: 'POST',
				headers: browseHeaders,
				body: JSON.stringify({ context: ctx, browseId: 'VLWL' }),
				credentials: 'same-origin',
			},
		);
	} catch (e) {
		dbg('wlFetchAllVideos: initial fetch failed', e);
		return null;
	}
	if (resp.status !== 200) return null;

	const data = await resp.json();
	let listRenderer = null;
	let headerRenderer = null;
	const walk = (obj) => {
		if (!obj || typeof obj !== 'object') return;
		if (obj.playlistVideoListRenderer)
			listRenderer = obj.playlistVideoListRenderer;
		if (obj.playlistHeaderRenderer) headerRenderer = obj.playlistHeaderRenderer;
		for (const k of Object.keys(obj)) walk(obj[k]);
	};
	walk(data);

	if (!listRenderer) return null;

	const contents = listRenderer.contents || [];
	const allRenderers = [];
	let continuationToken = null;
	for (const entry of contents) {
		if (entry.playlistVideoRenderer)
			allRenderers.push(entry.playlistVideoRenderer);
		if (entry.continuationItemRenderer) {
			continuationToken = wlExtractContinuationToken(
				entry.continuationItemRenderer,
			);
		}
	}

	while (continuationToken && allRenderers.length < WL_GRID_MAX) {
		try {
			resp = await fetch(
				'https://www.youtube.com/youtubei/v1/browse?prettyPrint=false',
				{
					method: 'POST',
					headers: browseHeaders,
					body: JSON.stringify({
						context: ctx,
						continuation: continuationToken,
					}),
					credentials: 'same-origin',
				},
			);
		} catch (e) {
			dbg('wlFetchAllVideos: continuation fetch failed', e);
			break;
		}
		if (resp.status !== 200) break;

		const contData = await resp.json();
		continuationToken = null;
		const actions = contData?.onResponseReceivedActions || [];
		for (const action of actions) {
			const items =
				action?.appendContinuationItemsAction?.continuationItems || [];
			for (const item of items) {
				if (item.playlistVideoRenderer)
					allRenderers.push(item.playlistVideoRenderer);
				if (item.continuationItemRenderer) {
					continuationToken = wlExtractContinuationToken(
						item.continuationItemRenderer,
					);
				}
			}
		}
	}

	const seen = new Set();
	const videos = [];
	for (const r of allRenderers) {
		const mapped = wlMapRenderer(r);
		if (!mapped || seen.has(mapped.videoId)) continue;
		seen.add(mapped.videoId);
		videos.push(mapped);
		if (videos.length >= WL_GRID_MAX) break;
	}

	let playAllEndpoint = null;
	let shuffleEndpoint = null;
	if (headerRenderer) {
		playAllEndpoint = wlExtractWatchEndpoint(headerRenderer.playButton);
		shuffleEndpoint = wlExtractWatchEndpoint(headerRenderer.shufflePlayButton);
	}

	return {
		videos,
		playAllEndpoint,
		shuffleEndpoint,
	};
}

function addToWatchlistButtonThumbnail() {
	const items = document.querySelectorAll(
		'yt-lockup-view-model, ytd-video-renderer, ytd-compact-video-renderer',
	);

	items.forEach((item) => {
		const host =
			item.tagName === 'YT-LOCKUP-VIEW-MODEL'
				? item.querySelector(':scope > div > a[href*="watch?v="]')
				: item.querySelector('a#thumbnail[href*="watch?v="]');
		if (!host) return;

		const existingButton = host.querySelector(':scope > .vm-add-wl-btn');
		if (existingButton) {
			if (existingButton.dataset.videoHref === host.href) return;
			existingButton.remove();
		}

		const videoId = findVideoIdFromHref(host.href);
		if (!videoId) return;

		if (getComputedStyle(host).position === 'static') {
			host.style.position = 'relative';
		}
		host.setAttribute('data-vm-hover-host', 'true');

		const button = document.createElement('button');
		button.className = 'vm-hover-reveal vm-add-wl-btn';
		button.dataset.videoId = videoId;
		button.dataset.videoHref = host.href;
		button.setAttribute('aria-label', 'Save to Watch later');
		button.setAttribute('title', 'Save to Watch later');
		button.addEventListener('click', async (e) => {
			e.stopPropagation();
			e.preventDefault();

			if (button.dataset.pending) return;
			button.dataset.pending = 'true';
			try {
				const ok = await saveToWatchLater(item);
				if (!ok) return;

				setIcon(button, CHECK_ICON_PATH);
				if (button.dataset.timerId) {
					clearTimeout(Number(button.dataset.timerId));
				}
				const timerId = setTimeout(
					() => setIcon(button, CLOCK_ICON_PATH),
					2000,
				);
				button.dataset.timerId = timerId;
			} finally {
				delete button.dataset.pending;
			}
		});
		setIcon(button, CLOCK_ICON_PATH);

		host.appendChild(button);
	});
}

function addRemoveFromWatchlistButtonWatchSidebar() {
	const isWLWatch =
		window.location.pathname === '/watch' &&
		new URLSearchParams(window.location.search).get('list') === 'WL';

	if (!isWLWatch) {
		for (const btn of document.querySelectorAll(
			'ytd-playlist-panel-renderer button[data-vm-wl-sidebar-remove]',
		)) {
			btn.remove();
		}
		return;
	}

	const panel = document.querySelector(
		'ytd-playlist-panel-renderer[playlist-type="WL"]',
	);
	if (!panel) return;

	const videoItems = panel.querySelectorAll(
		'ytd-playlist-panel-video-renderer',
	);

	videoItems.forEach((item) => {
		const videoLink = item.querySelector('a#wc-endpoint[href*="watch?v="]');
		if (!videoLink) return;

		const videoId = item.data?.videoId ?? findVideoIdFromHref(videoLink.href);
		if (!videoId) return;

		const menu = item.querySelector(':scope > #menu');
		const existingButton = item.querySelector(
			':scope > button[data-vm-wl-sidebar-remove]',
		);

		if (existingButton) {
			if (existingButton.dataset.videoId === videoId) {
				if (menu && existingButton.nextElementSibling !== menu) {
					menu.parentNode.insertBefore(existingButton, menu);
				}
				return;
			}
			existingButton.remove();
		}

		const button = document.createElement('button');
		button.className = 'vm-hover-reveal';
		button.setAttribute('data-vm-wl-sidebar-remove', 'true');
		button.dataset.videoId = videoId;
		button.setAttribute('aria-label', 'Remove from Watch later');
		button.setAttribute('title', 'Remove from Watch later');
		button.addEventListener('click', async (e) => {
			e.stopPropagation();
			e.preventDefault();

			if (button.dataset.pending) return;
			button.dataset.pending = 'true';
			try {
				const result = await vmApiRemoveFromWL([videoId]);
				if (result.ok.length > 0) {
					for (let attempt = 0; attempt < 60; attempt++) {
						if (!item.isConnected) break;
						await wlSleep(50);
					}
					if (item.isConnected) item.remove();
				} else {
					vmApiRemoveErrorBrief(item, videoId);
				}
			} finally {
				delete button.dataset.pending;
			}
		});

		button.style.width = '36px';
		button.style.height = '36px';
		button.style.display = 'flex';
		button.style.alignItems = 'center';
		button.style.justifyContent = 'center';
		button.style.alignSelf = 'center';
		button.style.color = 'white';
		button.style.border = 'none';
		button.style.borderRadius = '9999px';
		button.style.cursor = 'pointer';
		button.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
		button.style.flexShrink = '0';
		setIcon(button, TRASH_ICON_PATH);

		item.setAttribute('data-vm-hover-host', 'true');
		item.insertBefore(button, menu);
	});
}

// ── WL Grid Page ──────────────────────────────────────────────────────

const wlGrid = {
	mounted: false,
	mounting: false,
	root: null,
	videos: [],
	search: '',
	channel: '',
	categoryF: '',
	status: 'all',
	duration: 'all',
	sort: 'added_new',
	playAllHref: '',
	shuffleHref: '',
	bulk: {
		phase: 'idle',
		button: null,
		label: null,
		targets: [],
		confirmTimer: 0,
	},
	playFiltered: { button: null, label: null },
	_datalistLen: -1,
};

function wlGridIsOnPage() {
	return window.location.href.includes('/playlist?list=WL');
}

function wlGridMakeCombo(label, listId, options, onChange) {
	const input = document.createElement('input');
	input.type = 'search';
	input.className = 'vm-wl-search vm-wl-combo';
	input.setAttribute('list', listId);
	input.setAttribute('aria-label', label);
	input.placeholder = label;

	const datalist = document.createElement('datalist');
	datalist.id = listId;
	for (const [, text] of options) {
		const opt = document.createElement('option');
		opt.value = text;
		datalist.appendChild(opt);
	}

	const resolve = (raw) => {
		const query = raw.trim().toLowerCase();
		if (!query) return options[0][0];
		for (const [val, text] of options) {
			if (text.toLowerCase() === query) return val;
		}
		for (const [val, text] of options) {
			if (text.toLowerCase().startsWith(query)) return val;
		}
		return options[0][0];
	};

	let timer = 0;
	input.addEventListener('input', () => {
		clearTimeout(timer);
		timer = setTimeout(() => onChange(resolve(input.value)), 150);
	});

	const frag = document.createDocumentFragment();
	frag.append(input, datalist);
	return frag;
}

function wlGridUpdateStatus(labelEl) {
	const st = wlGrid;
	const filtered = wlGridFilteredVideos();
	const total = st.videos.length;
	if (st.mounting) {
		labelEl.textContent =
			total > 0 ? `Loading… (${total} loaded so far)` : 'Loading…';
	} else if (wlMetaBackfill.running) {
		labelEl.textContent = `Fetching dates ${wlMetaBackfill.done}/${wlMetaBackfill.total}…`;
	} else {
		labelEl.textContent = `Showing ${filtered.length} of ${total}`;
	}
}

function wlGridFilteredVideos() {
	const st = wlGrid;
	const query = st.search.trim().toLowerCase();
	return st.videos.filter((v) => {
		if (query && !v.title.toLowerCase().includes(query)) return false;
		const channelQuery = st.channel.trim().toLowerCase();
		if (channelQuery && !v.channel.toLowerCase().includes(channelQuery))
			return false;
		const categoryQuery = st.categoryF.trim().toLowerCase();
		if (
			categoryQuery &&
			(wlVideoCategory(v) || '').toLowerCase() !== categoryQuery
		)
			return false;
		if (st.status === 'unwatched' && v.progressPct > 0) return false;
		if (st.status === 'progress' && !(v.progressPct > 0 && v.progressPct < 80))
			return false;
		if (st.status === 'watched' && v.progressPct < 80) return false;
		if (
			st.duration === 'short' &&
			(v.durationSec == null || v.durationSec >= 240)
		)
			return false;
		if (
			st.duration === 'medium' &&
			(v.durationSec == null || v.durationSec < 240 || v.durationSec > 1200)
		)
			return false;
		if (
			st.duration === 'long' &&
			(v.durationSec == null || v.durationSec <= 1200)
		)
			return false;
		return true;
	});
}

function wlSortIndexCmp(a, b) {
	return (a.index ?? Infinity) - (b.index ?? Infinity);
}

function wlSortNumCmp(valFn, dir) {
	return (a, b) => {
		const av = valFn(a);
		const bv = valFn(b);
		if (av == null && bv == null) return wlSortIndexCmp(a, b);
		if (av == null) return 1;
		if (bv == null) return -1;
		const r = dir === 'desc' ? bv - av : av - bv;
		return r || wlSortIndexCmp(a, b);
	};
}

function wlSortTextCmp(valFn, dir) {
	return (a, b) => {
		const r = (valFn(a) ?? '').localeCompare(valFn(b) ?? '');
		return (dir === 'asc' ? r : -r) || wlSortIndexCmp(a, b);
	};
}

function wlGridSortVideos(videos) {
	const st = wlGrid;
	const sorted = [...videos];
	const cmp = {
		added_new: (a, b) => wlSortIndexCmp(a, b),
		added_old: (a, b) => wlSortIndexCmp(b, a),
		published_new: wlSortNumCmp(wlVideoPublishedTs, 'desc'),
		published_old: wlSortNumCmp(wlVideoPublishedTs, 'asc'),
		title_az: wlSortTextCmp((v) => v.title, 'asc'),
		title_za: wlSortTextCmp((v) => v.title, 'desc'),
		channel_az: wlSortTextCmp((v) => v.channel, 'asc'),
		channel_za: wlSortTextCmp((v) => v.channel, 'desc'),
		duration_long: wlSortNumCmp((v) => v.durationSec, 'desc'),
		duration_short: wlSortNumCmp((v) => v.durationSec, 'asc'),
		progress_high: wlSortNumCmp((v) => v.progressPct, 'desc'),
		progress_low: wlSortNumCmp((v) => v.progressPct, 'asc'),
		views_high: wlSortNumCmp(wlVideoViews, 'desc'),
		views_low: wlSortNumCmp(wlVideoViews, 'asc'),
		likes_high: wlSortNumCmp(wlVideoLikes, 'desc'),
		likes_low: wlSortNumCmp(wlVideoLikes, 'asc'),
	};
	sorted.sort(cmp[st.sort] || cmp.added_new);
	return sorted;
}

function wlGridFormatDuration(sec) {
	if (sec == null) return '';
	const h = Math.floor(sec / 3600);
	const m = Math.floor((sec % 3600) / 60);
	const s = sec % 60;
	if (h > 0)
		return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
	return `${m}:${String(s).padStart(2, '0')}`;
}

function wlGridThumbUrl(videoId) {
	return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function wlGridRenderCard(v) {
	const st = wlGrid;
	const card = document.createElement('div');
	card.className =
		'vm-wl-card' + (v.isPlayable ? '' : ' vm-wl-card-unavailable');
	card.dataset.videoId = v.videoId;

	const thumb = document.createElement('div');
	thumb.className = 'vm-card-thumb';
	thumb.setAttribute('data-vm-hover-host', 'true');

	if (v.isPlayable) {
		const link = document.createElement('a');
		link.href = `/watch?v=${v.videoId}&list=WL`;
		link.style.display = 'contents';
		const img = document.createElement('img');
		img.loading = 'lazy';
		img.src = wlGridThumbUrl(v.videoId);
		img.alt = v.title;
		img.addEventListener(
			'error',
			() => {
				if (v.thumbUrl && img.src !== v.thumbUrl) img.src = v.thumbUrl;
			},
			{ once: true },
		);
		link.appendChild(img);
		thumb.appendChild(link);
	}

	if (v.durationSec != null) {
		const badge = document.createElement('span');
		badge.className = 'vm-card-duration';
		badge.textContent = wlGridFormatDuration(v.durationSec);
		thumb.appendChild(badge);
	}

	if (v.progressPct > 0) {
		const prog = document.createElement('div');
		prog.className = 'vm-card-progress';
		const bar = document.createElement('div');
		bar.className = 'vm-card-progress-bar';
		bar.style.width = v.progressPct + '%';
		prog.appendChild(bar);
		thumb.appendChild(prog);
	}

	const removeBtn = document.createElement('button');
	removeBtn.className = 'vm-card-remove vm-hover-reveal';
	removeBtn.setAttribute('aria-label', 'Remove from Watch later');
	removeBtn.setAttribute('title', 'Remove from Watch later');
	setIcon(removeBtn, TRASH_ICON_PATH);
	removeBtn.addEventListener('click', async (e) => {
		e.stopPropagation();
		e.preventDefault();
		if (removeBtn.dataset.pending) return;
		removeBtn.dataset.pending = 'true';
		try {
			const result = await vmApiRemoveFromWL([v.videoId]);
			if (result.ok.length > 0) {
				st.videos = st.videos.filter((x) => x.videoId !== v.videoId);
				wlGridRender();
			} else {
				dbg('Grid remove failed for', v.videoId);
			}
		} finally {
			delete removeBtn.dataset.pending;
		}
	});
	thumb.appendChild(removeBtn);
	card.appendChild(thumb);

	const body = document.createElement('div');
	body.className = 'vm-card-body';

	const titleEl = document.createElement('h3');
	titleEl.className = 'vm-card-title';
	if (v.isPlayable) {
		const titleLink = document.createElement('a');
		titleLink.href = `/watch?v=${v.videoId}&list=WL`;
		titleLink.textContent = v.title;
		titleEl.appendChild(titleLink);
	} else {
		titleEl.textContent = v.title || '[Unavailable]';
	}
	body.appendChild(titleEl);

	if (v.channel) {
		const channelEl = document.createElement('p');
		channelEl.className = 'vm-card-channel';
		const channelLink = document.createElement('a');
		channelLink.href = v.channelUrl || '#';
		channelLink.textContent = v.channel;
		channelEl.appendChild(channelLink);
		body.appendChild(channelEl);
	}

	if (v.meta) {
		const metaEl = document.createElement('p');
		metaEl.className = 'vm-card-meta';
		metaEl.textContent = v.meta;
		body.appendChild(metaEl);
	}

	card.appendChild(body);
	return card;
}

function wlGridRenderToolbar(container) {
	const st = wlGrid;
	const toolbar = document.createElement('div');
	toolbar.id = 'vm-wl-toolbar';

	const row = document.createElement('div');
	row.className = 'vm-wl-row';

	const search = document.createElement('input');
	search.type = 'search';
	search.className = 'vm-wl-search';
	search.placeholder = 'Search titles';
	search.setAttribute('aria-label', 'Search Watch Later videos by title');
	let searchTimer = 0;
	search.addEventListener('input', () => {
		clearTimeout(searchTimer);
		searchTimer = setTimeout(() => {
			st.search = search.value;
			wlGridRender();
		}, 150);
	});
	row.appendChild(search);

	row.appendChild(
		wlGridMakeCombo(
			'Watch status',
			'vm-wl-status-list',
			[
				['all', 'Any watch status'],
				['unwatched', 'Unwatched'],
				['progress', 'In progress'],
				['watched', 'Watched (80%+)'],
			],
			(v) => {
				st.status = v;
				wlGridRender();
			},
		),
	);

	row.appendChild(
		wlGridMakeCombo(
			'Duration',
			'vm-wl-duration-list',
			[
				['all', 'Any duration'],
				['short', 'Under 4 minutes'],
				['medium', '4 - 20 minutes'],
				['long', 'Over 20 minutes'],
			],
			(v) => {
				st.duration = v;
				wlGridRender();
			},
		),
	);

	row.appendChild(
		wlGridMakeCombo(
			'Sort',
			'vm-wl-sort-list',
			[
				['added_new', 'Date added (newest)'],
				['added_old', 'Date added (oldest)'],
				['published_new', 'Date published (newest)'],
				['published_old', 'Date published (oldest)'],
				['title_az', 'Title (A-Z)'],
				['title_za', 'Title (Z-A)'],
				['channel_az', 'Channel (A-Z)'],
				['channel_za', 'Channel (Z-A)'],
				['duration_long', 'Duration (longest)'],
				['duration_short', 'Duration (shortest)'],
				['progress_high', 'Watch progress (highest)'],
				['progress_low', 'Watch progress (lowest)'],
				['views_high', 'Views (highest)'],
				['views_low', 'Views (lowest)'],
				['likes_high', 'Likes (highest)'],
				['likes_low', 'Likes (lowest)'],
			],
			(v) => {
				st.sort = v;
				wlGridRender();
			},
		),
	);

	const channelInput = document.createElement('input');
	channelInput.type = 'search';
	channelInput.className = 'vm-wl-search';
	channelInput.placeholder = 'Search channels';
	channelInput.setAttribute('list', 'vm-wl-channels');
	channelInput.setAttribute('aria-label', 'Filter by channel');
	let channelTimer = 0;
	channelInput.addEventListener('input', () => {
		clearTimeout(channelTimer);
		channelTimer = setTimeout(() => {
			const raw = channelInput.value;
			const cleaned = wlGrid._channelLookup?.get(raw) ?? raw;
			if (cleaned !== raw) channelInput.value = cleaned;
			st.channel = cleaned;
			wlGridRender();
		}, 150);
	});
	row.appendChild(channelInput);

	const channelDatalist = document.createElement('datalist');
	channelDatalist.id = 'vm-wl-channels';
	row.appendChild(channelDatalist);

	const categoryInput = document.createElement('input');
	categoryInput.type = 'search';
	categoryInput.className = 'vm-wl-search vm-wl-combo';
	categoryInput.placeholder = 'Category';
	categoryInput.setAttribute('list', 'vm-wl-categories');
	categoryInput.setAttribute('aria-label', 'Filter by category');
	let categoryTimer = 0;
	categoryInput.addEventListener('input', () => {
		clearTimeout(categoryTimer);
		categoryTimer = setTimeout(() => {
			const raw = categoryInput.value;
			const cleaned = wlGrid._catLookup?.get(raw) ?? raw;
			if (cleaned !== raw) categoryInput.value = cleaned;
			st.categoryF = cleaned;
			wlGridRender();
		}, 150);
	});
	row.appendChild(categoryInput);

	const categoryDatalist = document.createElement('datalist');
	categoryDatalist.id = 'vm-wl-categories';
	row.appendChild(categoryDatalist);

	const playButton = document.createElement('a');
	playButton.className = 'vm-wl-bulk-btn vm-wl-play-btn';
	playButton.setAttribute('aria-label', 'Play filtered Watch Later videos');
	playButton.setAttribute('aria-disabled', 'true');
	setIcon(playButton, PLAY_ICON_PATH, '0 0 24 24');
	const playLabel = document.createElement('span');
	playLabel.textContent = 'Play filtered';
	playButton.appendChild(playLabel);
	st.playFiltered.button = playButton;
	st.playFiltered.label = playLabel;
	row.appendChild(playButton);

	const bulkButton = document.createElement('button');
	bulkButton.type = 'button';
	bulkButton.className = 'vm-wl-bulk-btn';
	bulkButton.setAttribute('aria-label', 'Remove filtered Watch Later videos');
	bulkButton.setAttribute('aria-disabled', 'true');
	setIcon(bulkButton, TRASH_ICON_PATH);
	const bulkLabel = document.createElement('span');
	bulkLabel.textContent = 'Remove filtered';
	bulkButton.appendChild(bulkLabel);
	bulkButton.addEventListener('click', () => wlGridBulkHandleClick());
	st.bulk.button = bulkButton;
	st.bulk.label = bulkLabel;
	row.appendChild(bulkButton);

	const status = document.createElement('span');
	status.className = 'vm-wl-status';
	row.appendChild(status);

	toolbar.appendChild(row);
	container.appendChild(toolbar);

	wlGrid._toolbar = { status, channelDatalist, categoryDatalist };
}

function wlGridRefreshChannelDatalist() {
	const st = wlGrid;
	const dl = st._toolbar?.channelDatalist;
	if (!dl) return;
	const counts = new Map();
	for (const v of st.videos) {
		if (!v.channel) continue;
		counts.set(v.channel, (counts.get(v.channel) || 0) + 1);
	}
	dl.replaceChildren();
	st._channelLookup = new Map();
	const names = [...counts.keys()].sort((a, b) => a.localeCompare(b));
	for (const name of names) {
		const display = `${name} (${counts.get(name)})`;
		st._channelLookup.set(display, name);
		const opt = document.createElement('option');
		opt.value = display;
		dl.appendChild(opt);
	}
}

function wlGridRefreshCategoryDatalist() {
	const st = wlGrid;
	const dl = st._toolbar?.categoryDatalist;
	if (!dl) return;
	const counts = new Map();
	for (const v of st.videos) {
		const cat = wlVideoCategory(v);
		if (!cat) continue;
		counts.set(cat, (counts.get(cat) || 0) + 1);
	}
	dl.replaceChildren();
	st._catLookup = new Map();
	const names = [...counts.keys()].sort((a, b) => a.localeCompare(b));
	for (const name of names) {
		const display = `${name} (${counts.get(name)})`;
		st._catLookup.set(display, name);
		const opt = document.createElement('option');
		opt.value = display;
		dl.appendChild(opt);
	}
}

function wlGridBulkRefresh() {
	const st = wlGrid;
	const btn = st.bulk.button;
	const lbl = st.bulk.label;
	if (btn?.isConnected && st.bulk.phase === 'idle') {
		const hasFilters = Boolean(
			st.search.trim() ||
			st.channel.trim() ||
			st.categoryF.trim() ||
			st.status !== 'all' ||
			st.duration !== 'all',
		);
		if (!hasFilters) {
			lbl.textContent = 'Remove filtered';
			btn.setAttribute('aria-disabled', 'true');
			btn.title = 'Filter the list first';
		} else {
			const count = wlGridFilteredVideos().length;
			lbl.textContent = `Remove filtered (${count})`;
			btn.setAttribute('aria-disabled', count === 0 ? 'true' : 'false');
			btn.title = count === 0 ? 'No videos match the current filters' : '';
		}
	}

	const playBtn = st.playFiltered.button;
	const playLbl = st.playFiltered.label;
	if (playBtn?.isConnected && playLbl) {
		const count = wlGridFilteredVideos().filter((v) => v.isPlayable).length;
		const queued = Math.min(count, WL_TEMP_PLAYLIST_MAX);
		playLbl.textContent =
			count > WL_TEMP_PLAYLIST_MAX
				? `Play filtered (${queued}/${count})`
				: `Play filtered (${count})`;
		playBtn.setAttribute('aria-disabled', count === 0 ? 'true' : 'false');
		const playHref = wlGridPlayFilteredHref();
		if (playHref) playBtn.setAttribute('href', playHref);
		else playBtn.removeAttribute('href');
		playBtn.title =
			count > WL_TEMP_PLAYLIST_MAX
				? `YouTube temp playlists hold at most ${WL_TEMP_PLAYLIST_MAX} videos — the first ${queued} will queue`
				: '';
	}
}

function wlGridBulkClearHighlights() {
	for (const v of wlGrid.bulk.targets) {
		const card = wlGrid.root?.querySelector(
			`.vm-wl-card[data-video-id="${v.videoId}"]`,
		);
		if (card) card.classList.remove('vm-wl-card-highlight');
	}
	wlGrid.bulk.targets = [];
}

async function wlGridBulkConfirmRemoval() {
	const st = wlGrid;
	const targets = st.bulk.targets.filter((v) => true);
	st.bulk.phase = 'removing';
	st.bulk.button.setAttribute('aria-disabled', 'true');
	st.bulk.label.textContent = `Removing ${targets.length} videos…`;

	const ids = targets.map((v) => v.videoId);
	const result = await vmApiRemoveFromWL(ids);
	if (result.ok.length > 0) {
		const okSet = new Set(result.ok);
		st.videos = st.videos.filter((v) => !okSet.has(v.videoId));
	}

	wlGridBulkClearHighlights();
	st.bulk.phase = 'idle';
	st.bulk.label.textContent = 'Remove filtered';
	wlGridRender();

	if (result.fail.length > 0 && result.ok.length > 0) {
		st.bulk.button.title = `Removed ${result.ok.length}, ${result.fail.length} failed`;
	} else if (result.fail.length > 0) {
		st.bulk.button.title = 'No videos were removed — check sign-in';
	}
}

function wlGridBulkHandleClick() {
	const st = wlGrid;
	if (st.bulk.phase === 'removing') return;

	if (st.bulk.phase === 'armed') {
		clearTimeout(st.bulk.confirmTimer);
		wlGridBulkConfirmRemoval();
		return;
	}

	const targets = wlGridFilteredVideos();
	const hasFilters = Boolean(
		st.search.trim() ||
		st.channel.trim() ||
		st.categoryF.trim() ||
		st.status !== 'all' ||
		st.duration !== 'all',
	);
	if (!hasFilters || targets.length === 0) return;

	st.bulk.targets = targets;
	for (const v of targets) {
		const card = wlGrid.root?.querySelector(
			`.vm-wl-card[data-video-id="${v.videoId}"]`,
		);
		if (card) card.classList.add('vm-wl-card-highlight');
	}
	st.bulk.phase = 'armed';
	st.bulk.label.textContent = `Confirm (${targets.length})`;
	st.bulk.button.setAttribute('aria-disabled', 'true');
	st.bulk.confirmTimer = setTimeout(() => {
		if (st.bulk.phase !== 'armed') return;
		st.bulk.button.setAttribute('aria-disabled', 'false');
	}, 2000);
}

function wlGridPlayFilteredHref() {
	const videos = wlGridSortVideos(wlGridFilteredVideos()).filter(
		(v) => v.isPlayable,
	);
	if (videos.length === 0) return null;
	const videoIds = videos.slice(0, WL_TEMP_PLAYLIST_MAX).map((v) => v.videoId);
	return '/watch_videos?video_ids=' + videoIds.join(',');
}

function wlGridRenderGrid() {
	const st = wlGrid;
	const grid = st.root?.querySelector('.vm-wl-grid');
	if (!grid) return;

	const filtered = wlGridFilteredVideos();
	const sorted = wlGridSortVideos(filtered);
	const frag = document.createDocumentFragment();
	for (const v of sorted) {
		frag.appendChild(wlGridRenderCard(v));
	}
	grid.replaceChildren(frag);

	if (wlGrid._toolbar) wlGridUpdateStatus(wlGrid._toolbar.status);
	wlGridBulkRefresh();
	wlGridRefreshCategoryDatalist();
	if (st.videos.length !== st._datalistLen) {
		st._datalistLen = st.videos.length;
		wlGridRefreshChannelDatalist();
	}
}

function wlGridRender() {
	if (!wlGrid.root || !wlGrid.root.isConnected) return;
	const grid = wlGrid.root.querySelector('.vm-wl-grid');
	if (grid) wlGridRenderGrid();
}

function wlGridBuildPage(playAllEndpoint, shuffleEndpoint) {
	const st = wlGrid;
	const page = document.createElement('div');
	page.id = 'vm-wl-grid-page';

	const header = document.createElement('div');
	header.className = 'vm-wl-grid-header';

	const title = document.createElement('h1');
	title.textContent = 'Watch later';
	header.appendChild(title);

	const playAllLink = document.createElement('a');
	playAllLink.className = 'vm-grid-btn';
	playAllLink.textContent = 'Play all';
	if (playAllEndpoint?.videoId) {
		playAllLink.href = `/watch?v=${playAllEndpoint.videoId}&list=WL`;
		if (playAllEndpoint.index)
			playAllLink.href += `&index=${playAllEndpoint.index}`;
	} else if (st.videos.length > 0) {
		playAllLink.href = `/watch?v=${st.videos[0].videoId}&list=WL`;
	}
	header.appendChild(playAllLink);

	const shuffleLink = document.createElement('a');
	shuffleLink.className = 'vm-grid-btn';
	shuffleLink.textContent = 'Shuffle';
	if (shuffleEndpoint?.videoId) {
		shuffleLink.href = `/watch?v=${shuffleEndpoint.videoId}&list=WL`;
	} else if (st.videos.length > 1) {
		const randIdx = Math.floor(Math.random() * st.videos.length);
		shuffleLink.href = `/watch?v=${st.videos[randIdx].videoId}&list=WL`;
	}
	header.appendChild(shuffleLink);

	page.appendChild(header);

	wlGridRenderToolbar(page);

	const skeleton = document.createElement('div');
	skeleton.className = 'vm-wl-grid-skeleton';
	skeleton.textContent = 'Loading Watch Later…';
	page.appendChild(skeleton);

	const grid = document.createElement('div');
	grid.className = 'vm-wl-grid';
	grid.style.display = 'none';
	page.appendChild(grid);

	return page;
}

async function wlGridMount() {
	const st = wlGrid;
	if (st.mounted || st.mounting) return;
	st.mounting = true;

	try {
		const pageManager = document.querySelector('#page-manager');
		const browse = pageManager?.querySelector(
			'ytd-browse[page-subtype="playlist"]',
		);
		if (!pageManager || !browse) return;

		const result = await wlFetchAllVideos();
		if (!result || !wlGridIsOnPage()) return;

		st.videos = result.videos;

		const page = wlGridBuildPage(
			result.playAllEndpoint,
			result.shuffleEndpoint,
		);
		pageManager.insertBefore(page, browse);
		browse.style.display = 'none';
		document.body.classList.add('vm-wl-grid-active');

		const skeleton = page.querySelector('.vm-wl-grid-skeleton');
		const grid = page.querySelector('.vm-wl-grid');
		if (skeleton) skeleton.style.display = 'none';
		grid.style.display = '';

		st.root = page;
		st.mounted = true;

		wlGridRenderGrid();
		wlMetaBackfillRun();
	} finally {
		st.mounting = false;
	}
	wlGridRender();
}

function wlGridUnmount() {
	const st = wlGrid;
	if (!st.mounted && !st.mounting) return;

	if (st.root && st.root.isConnected) st.root.remove();

	const browse = document.querySelector(
		'#page-manager > ytd-browse[page-subtype="playlist"]',
	);
	if (browse) browse.style.display = '';
	document.body.classList.remove('vm-wl-grid-active');

	st.mounted = false;
	st.mounting = false;
	st.root = null;
	st.videos = [];
	st.search = '';
	st.channel = '';
	st.categoryF = '';
	st.status = 'all';
	st.duration = 'all';
	st.sort = 'added_new';
	st._datalistLen = -1;
	st.bulk.phase = 'idle';
	st.bulk.targets = [];
	clearTimeout(st.bulk.confirmTimer);
	st.playFiltered.button = null;
	st.playFiltered.label = null;
}

function watchLaterGridPage() {
	if (wlGridIsOnPage()) {
		if (!wlGrid.mounted && !wlGrid.mounting) {
			wlGridMount();
		}
	} else {
		if (wlGrid.mounted || wlGrid.mounting) {
			wlGridUnmount();
		}
	}
}

const _channelIdCache = new Map();
let _channelIdCacheKey = '';

function findChannelId(channelTag) {
	if (_channelIdCache.has(channelTag)) return _channelIdCache.get(channelTag);

	const scripts = document.querySelectorAll('script');
	let data = null;
	for (const script of scripts) {
		const text = script.textContent;
		if (text.includes('var ytInitialData')) {
			const match = text.match(/var ytInitialData = ({.+?});/);
			if (match) {
				try {
					data = JSON.parse(match[1]);
				} catch (e) {
					dbg('findChannelId: Failed to parse ytInitialData', e);
				}
				break;
			}
		}
	}

	if (!data) {
		dbg('findChannelId: ytInitialData not found');
		return null;
	}

	function search(obj) {
		if (typeof obj !== 'object' || obj === null) return null;

		if (obj.browseEndpoint && obj.browseEndpoint.canonicalBaseUrl) {
			if (obj.browseEndpoint.canonicalBaseUrl === '/' + channelTag) {
				return obj.browseEndpoint.browseId;
			}
		}

		if (Array.isArray(obj)) {
			for (const item of obj) {
				const result = search(item);
				if (result) return result;
			}
		} else {
			for (const key in obj) {
				if (obj.hasOwnProperty(key)) {
					const result = search(obj[key]);
					if (result) return result;
				}
			}
		}

		return null;
	}

	const result = search(data);
	_channelIdCache.set(channelTag, result ?? null);
	return result;
}

function addPlayAllButton() {
	const header = document.querySelector(
		'#header chip-bar-view-model .ytChipBarViewModelChipBarScrollContainer',
	);
	if (header && header.querySelector('.play-all-button')) return;

	const pathPattern = /\/[^/]+\/videos$/;
	if (!pathPattern.test(window.location.pathname)) return;

	const currentChannelTag = window.location.pathname.split('/')[1];
	if (!currentChannelTag) return;

	if (_channelIdCacheKey !== location.pathname) {
		_channelIdCache.clear();
		_channelIdCacheKey = location.pathname;
	}

	const channelId = findChannelId(currentChannelTag);
	if (!channelId) return;

	if (!header) return;

	const playlistId = channelId.replace(/^UC/, 'UU');
	const container = header;
	if (container.querySelector('.play-all-button')) return;

	const playAllLink = document.createElement('a');
	playAllLink.className = 'play-all-button';
	playAllLink.textContent = 'Play All';
	playAllLink.href = '/playlist?list=' + playlistId;

	playAllLink.style.display = 'inline-flex';
	playAllLink.style.alignItems = 'center';
	playAllLink.style.padding = '8px 16px';
	playAllLink.style.backgroundColor = '#cc0000';
	playAllLink.style.color = '#ffffff';
	playAllLink.style.textDecoration = 'none';
	playAllLink.style.borderRadius = '18px';
	playAllLink.style.fontSize = '14px';
	playAllLink.style.fontWeight = '500';
	playAllLink.style.cursor = 'pointer';
	playAllLink.style.transition = 'background-color 0.2s';
	playAllLink.style.marginRight = '16px';

	playAllLink.addEventListener('mouseover', () => {
		playAllLink.style.backgroundColor = '#990000';
	});
	playAllLink.addEventListener('mouseout', () => {
		playAllLink.style.backgroundColor = '#cc0000';
	});

	container.insertBefore(playAllLink, container.firstChild);
}

try {
	ensureStyles();

	const runFeatures = () => {
		const features = [
			redirectToTSYouTube,
			addToWatchlistButtonThumbnail,
			addRemoveFromWatchlistButtonWatchSidebar,
			watchLaterGridPage,
			addPlayAllButton,
		];
		for (const feature of features) {
			try {
				feature();
			} catch (error) {
				dbg(`feature failed: ${feature.name}`, error);
			}
		}
	};

	runFeatures();

	let _featureTimer = 0;

	const observer = new MutationObserver((records) => {
		for (const record of records) {
			const target = record.target;
			if (target.nodeType !== 1) continue;
			if (target.closest('#vm-wl-toolbar, #vm-wl-grid-page, ytd-video-preview'))
				continue;
			clearTimeout(_featureTimer);
			_featureTimer = setTimeout(runFeatures, 120);
			return;
		}
	});
	observer.observe(document.body, { childList: true, subtree: true });

	document.addEventListener('yt-navigate-finish', () => {
		clearTimeout(_featureTimer);
		_featureTimer = setTimeout(runFeatures, 120);
	});
} catch (error) {}
