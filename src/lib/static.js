const Reader = require('./reader');

module.exports = class Static {
	static runScriptCommands(buildConfig = {}) {
		return Reader.runScriptCommands({
			...buildConfig,
			output_path: buildConfig.source || '',
			install_command: '',
			build_command: ''
		});
	}
};
