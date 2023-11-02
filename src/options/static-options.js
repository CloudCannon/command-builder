module.exports = {
	structure: 'cp /usr/local/__site/src/{source}/* /usr/local/__site/compiled',
	postProcessor: (command) => command.replace(/\/+/g, '/'),
	source: 'source',
	options: {
		source: {
			name: 'Source',
			description: 'The path to the folder that is copied to the output',
			type: 'string',
			validator: /^[^<>:"|?*/\\]+$/ig
		}
	}
};
