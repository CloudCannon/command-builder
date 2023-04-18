const ssgOptions = require('../options/ssg-options');

module.exports = {
	parseOptions(ssg = 'static', buildOptions) {
		const validOptions = (ssgOptions[ssg.toLowerCase()] || ssgOptions.static)
			.options;
		const buildString = [];

		Object.keys(buildOptions).forEach((key) => {
			if (buildOptions[key] && validOptions[key]?.option) {
				buildString.push(validOptions[key].option);
				if (validOptions[key].type !== 'boolean') {
					buildString.push(buildOptions[key]);
				}
			}
		});

		return buildString.join(' ');
	},

	parseCommand(ssg, buildOptions, command) {
		command = command ?? ssgOptions[ssg]?.structure;
		if (!command) {
			return '';
		}

		const parts = command.split(' ');
		const commandParts = [];

		parts.forEach((part) => {
			if (part === '[options]') {
				const options = this.parseOptions(ssg, buildOptions);
				commandParts.push(options);
			} else if (
				part.charAt(0) === '<'
        && part.charAt(part.length - 1) === '>'
			) {
				const optionKey = part.substring(1, part.length - 1);
				const option = buildOptions[optionKey];
				commandParts.push(option);
			} else {
				let openBraceIndex = part.indexOf('{');

				while (openBraceIndex !== -1) {
					let closeBraceIndex = part.indexOf('}', openBraceIndex);
					if (closeBraceIndex === -1) {
						break;
					}

					const optionKey = part.substring(openBraceIndex + 1, closeBraceIndex);
					const option = buildOptions[optionKey] || '';

					const reg = new RegExp(`{${optionKey}}`, 'g');
					part = part.replace(reg, option);

					closeBraceIndex += option.length - (optionKey.length + 2);
					openBraceIndex = part.indexOf('{', closeBraceIndex);
				}

				commandParts.push(part);
			}
		});

		let commandString = commandParts.join(' ');
		if (ssgOptions[ssg]?.postProcessor) {
			commandString = ssgOptions[ssg].postProcessor(commandString);
		}

		return commandString;
	}
};
