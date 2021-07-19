const { join } = require('path');
const Compiler = require('./compiler');

module.exports = class Static {
	static runScriptCommands(buildConfig) {
		const outputState = Compiler.getOutputState();

		const src = buildConfig.source || '';
		const fullSrc = join('/usr/local/__site/src', src, '*');

		return [
			Compiler.getPreinstallCommands(),
			Compiler.getLegacyPrebuildCommands(),
			Compiler.getPrebuildCommands(),

			`echo "$ rm -rf /usr/local/__site/${outputState}/"`,
			`rm -rf /usr/local/__site/${outputState}/`,

			`echo "$ mkdir -p /usr/local/__site/${outputState}/"`,
			`mkdir -p /usr/local/__site/${outputState}/`,

			`echo "$ cp -R ${fullSrc} /usr/local/__site/${outputState}/"`,
			`cp -R ${fullSrc} /usr/local/__site/${outputState}/`,

			Compiler.getPostbuildCommands()
		];
	}
};
