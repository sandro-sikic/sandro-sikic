(function () {
	function addOpacity(color) {
		const opacity = 0.2;

		const hexOpacity = Math.floor(opacity * 255)
			.toString(16)
			.padStart(2, '0');

		return `${color}${hexOpacity}`;
	}

	function addGlow(styles) {
		const regex = /color:\s*(.*?);/g;
		const listOfStylesColors = styles.match(regex);
		console.log('listOfStylesColors', listOfStylesColors);

		for (const style of listOfStylesColors) {
			const color = style.replace(/color:\s*|\s*;/g, '');
			const colorWithOpacity = addOpacity(color);

			if (!color.includes('#')) {
				continue;
			}

			styles = styles.replace(
				style,
				`color: ${color}; text-shadow: 0 0 2px ${colorWithOpacity}, 0 0 10px ${colorWithOpacity}, 0 0 5px ${colorWithOpacity}, 0 0 25px ${colorWithOpacity}; backface-visibility: hidden;`
			);
		}

		return styles;
	}

	const readyForReplacement = (tokensEl) => {
		if (!tokensEl) {
			return false;
		}

		if (tokensEl.innerText === '') {
			return false;
		}

		return true;
	};

	const initNeonDreams = (obs) => {
		const tokensEl = document.querySelector('.vscode-tokens-styles');

		if (!readyForReplacement(tokensEl)) {
			return;
		}

		const initialThemeStyles = tokensEl.innerText;

		let updatedThemeStyles = addGlow(initialThemeStyles);

		/* append the remaining styles */
		updatedThemeStyles = `${updatedThemeStyles}[CHROME_STYLES]`;

		const newStyleTag = document.createElement('style');
		newStyleTag.setAttribute('id', 'neon-glow-styles');
		newStyleTag.innerText = updatedThemeStyles.replace(/(\r\n|\n|\r)/gm, '');
		document.body.appendChild(newStyleTag);

		// disconnect the observer because we don't need it anymore
		if (obs) {
			obs.disconnect();
			obs = null;
		}
	};

	// /**
	//  * @summary A MutationObserver callback that attempts to bootstrap the theme and assigns a retry attempt if it fails */
	const watchForBootstrap = function (mutationsList, observer) {
		console.log('watchForBootstrap');

		for (let mutation of mutationsList) {
			if (mutation.type === 'attributes') {
				// does the style div exist yet?
				const tokensEl = document.querySelector('.vscode-tokens-styles');

				initNeonDreams(observer);
				observer.disconnect();
				observer.observe(tokensEl, { childList: true });
			}
			if (mutation.type === 'childList') {
				const tokensEl = document.querySelector('.vscode-tokens-styles');
				if (readyForReplacement(tokensEl)) {
					// Everything we need should be ready now, so initialise
					initNeonDreams(observer);
					observer.disconnect();
				}
			}
		}
	};

	//=============================
	// Start bootstrapping!
	//=============================
	initNeonDreams();
	// Grab body node
	const bodyNode = document.querySelector('body');
	// Use a mutation observer to check when we can bootstrap the theme
	const observer = new MutationObserver(watchForBootstrap);
	observer.observe(bodyNode, { attributes: true });
})();
