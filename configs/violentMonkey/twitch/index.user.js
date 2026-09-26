// ==UserScript==
// @name        Twitch Improvements
// @version     1.2.0
// @match       https://www.twitch.tv/*
// @grant       none
// @icon        https://static.twitchcdn.net/assets/favicon-32-e29e246c157142c94346.png
// @downloadURL https://github.com/sandro-sikic/sandro-sikic/raw/main/configs/violentMonkey/twitch/index.user.js
// ==/UserScript==

function removeSidebar() {
	const sidebar = document.querySelector('div[data-test-selector="side-nav"]');
	console.log('Removing sidebar:', sidebar);

	if (!sidebar) return;

	sidebar.remove();
}

try {
	const observer = new MutationObserver(() => {
		removeSidebar();
	});

	observer.observe(document.body, { childList: true, subtree: true });
} catch (error) {}

function currentChannel() {
	const match = location.pathname.match(/^\/(?:popout\/)?([^/]+)/);
	return match ? match[1].toLowerCase() : '';
}

function collectText(node) {
	if (node.nodeType === Node.TEXT_NODE) return node.nodeValue;
	if (node.nodeType !== Node.ELEMENT_NODE) return '';
	if (node.tagName === 'IMG') return node.alt || '';
	if (node.tagName === 'BR') return ' ';
	let text = '';
	for (let child = node.firstChild; child; child = child.nextSibling) text += collectText(child);
	return text;
}

function extractContent(row) {
	const body = row.querySelector('span[data-a-target="chat-line-message-body"]');
	if (!body) return null;
	return collectText(body);
}

function normalizeText(text) {
	return text
		.normalize('NFKD')
		.replace(/[\p{M}\p{P}\p{S}\p{C}\p{Extended_Pictographic}]+/gu, '')
		.toLowerCase()
		.replace(/\s+/g, ' ')
		.trim();
}

function dedupeChat() {
	const seenByChannel = new Map();
	let observer = null;
	let container = null;
	let graceUntil = 0;
	let enabled = false;
	let toggleButton = null;

	const findContainer = () =>
		document.querySelector('.chat-scrollable-area__message-container') ||
		document.querySelector('div[data-a-target="chat-scroller"]');

	const seenSet = () => {
		const channel = currentChannel();
		let set = seenByChannel.get(channel);
		if (!set) {
			set = new Set();
			seenByChannel.set(channel, set);
		}
		return set;
	};

	const handleMessageRow = (row) => {
		if (!row.isConnected) return;
		const content = extractContent(row);
		if (content === null) return;
		const key = normalizeText(content);
		if (!key) return;
		const set = seenSet();
		if (set.has(key)) {
			if (!enabled) return;
			if (Date.now() < graceUntil) return;
			let target = row;
			let parent = row.parentElement;
			while (parent && parent !== container) {
				target = parent;
				parent = parent.parentElement;
			}
			if (parent === container) target.style.display = 'none';
			else row.style.display = 'none';
			return;
		}
		set.add(key);
	};

	const messageRowsIn = (node) => {
		if (node.nodeType !== Node.ELEMENT_NODE) return [];
		if (node.matches('.chat-line__message')) return [node];
		return [...node.querySelectorAll('.chat-line__message')];
	};

	const processMutations = (records) => {
		let removedRows = 0;
		for (const record of records) {
			for (const node of record.removedNodes) removedRows += messageRowsIn(node).length;
		}
		if (removedRows >= 30) graceUntil = Date.now() + 8000;
		for (const record of records) {
			for (const node of record.addedNodes) {
				for (const row of messageRowsIn(node)) handleMessageRow(row);
			}
		}
	};

	const attach = () => {
		const found = findContainer();
		if (!found || found === container) return;
		if (observer) observer.disconnect();
		container = found;
		graceUntil = Date.now() + 8000;
		observer = new MutationObserver(processMutations);
		observer.observe(container, { childList: true, subtree: true });
		const set = seenSet();
		for (const row of container.querySelectorAll('.chat-line__message')) {
			const content = extractContent(row);
			if (content === null) continue;
			const key = normalizeText(content);
			if (key) set.add(key);
		}
	};

	const findCommunityButton = () =>
		document.querySelector('.stream-chat-header button[data-test-selector="chat-viewer-list"]') ||
		document.querySelector('.stream-chat-header button[aria-label="Community"]');

	const updateToggleState = () => {
		if (!toggleButton) return;
		const button = toggleButton.querySelector('button');
		if (!button) return;
		button.setAttribute('aria-pressed', String(enabled));
		button.title = 'Chat message dedupe: ' + (enabled ? 'ON' : 'OFF');
		button.style.color = enabled ? '#00f593' : '';
	};

	const createToggleButton = () => {
		const button = document.createElement('button');
		button.type = 'button';
		button.textContent = 'Dedupe';
		button.style.width = 'auto';
		button.style.minWidth = '32px';
		button.style.padding = '0 8px';
		button.style.fontSize = '12px';
		button.style.whiteSpace = 'nowrap';
		button.addEventListener('click', () => {
			enabled = !enabled;
			updateToggleState();
		});
		const anchor = findCommunityButton();
		if (anchor) button.className = anchor.className;
		const wrapper = document.createElement('div');
		if (anchor?.parentElement) wrapper.className = anchor.parentElement.className;
		wrapper.appendChild(button);
		return wrapper;
	};

	const placeButton = () => {
		const anchor = findCommunityButton();
		if (!anchor?.parentElement?.parentElement) return;
		const group = anchor.parentElement.parentElement;
		if (toggleButton?.isConnected && toggleButton.parentElement === group) return;
		if (!toggleButton || !toggleButton.isConnected) toggleButton = createToggleButton();
		group.insertBefore(toggleButton, anchor.parentElement);
		updateToggleState();
	};

	attach();
	placeButton();
	setInterval(() => {
		attach();
		placeButton();
	}, 1000);
}

try {
	dedupeChat();
} catch (error) {}
