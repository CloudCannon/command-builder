const Reader = require('./reader');

module.exports = class ReaderNpm {
	static runScriptCommands(buildConfig = {}) {
		return Reader.runScriptCommands({
			...buildConfig,
			install_command: buildConfig.install_command || 'npm install',
			build_command: buildConfig.build_command || 'npm run build'
		});
	}
};
