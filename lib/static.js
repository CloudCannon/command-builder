const { join } = require('path');
const Compiler = require('./compiler');

module.exports = class Static {
	static runScriptCommands(buildConfig) {
		const outputPath = join(Compiler.getInputPath(), buildConfig.source || '');

		return [
			...Compiler.getPreinstallCommands(),
			...Compiler.getLegacyPrebuildCommands(),
			...Compiler.getPrebuildCommands(),
			...Compiler.getOutputCommands(outputPath),
			...Compiler.getPostbuildCommands(),
			...Compiler.getExportCommands()
		];
	}
};
