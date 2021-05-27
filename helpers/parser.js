const ssgOptions = require('../options/ssg-options');

module.exports = {
	parseOptions: function (ssg, buildOptions) {
		ssg = (ssg || 'static').toLowerCase();
		const validOptions = (ssgOptions[ssg] || ssgOptions.static).options;
		const buildString = [];

		Object.keys(buildOptions).forEach((key) => {
			if (buildOptions[key]) {
				buildString.push(validOptions[key].option);
				if (validOptions[key].type !== 'boolean') {
					buildString.push(buildOptions[key]);
				}
			}
		});

		return buildString.join(' ');
	},

	parseCommand: function (ssg, buildOptions, command) {
		command = command || ssgOptions[ssg].structure;
		const parts = command.split(' ');
		const commandString = [];

		parts.forEach((part) => {
			if (part === '[options]') {
				const options = this.parseOptions(ssg, buildOptions);
				commandString.push(options);
			} else if (part.charAt(0) === '<' && part.charAt(part.length - 1) === '>') {
				// TODO explicit command paramaters (so far only from static and sphinx)
			} else {
				commandString.push(part);
			}
		});

		return commandString.join(' ');
	}
};
