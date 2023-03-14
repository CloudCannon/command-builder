module.exports = {
	structure: 'cp /usr/local/__site/src/{source}/* /usr/local/__site/compiled',
	postProcessor: (command) => command.replace(/\/+/g, '/'),
	source: 'source',
	options: {
		source: {
			name: 'Source',
			description: 'The path CloudCannon reads your files.',
			type: 'string',
			validator: /^[^<>:"|?*/\\]+$/ig
		}
	}
};
