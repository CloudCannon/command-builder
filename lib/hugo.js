const Compiler = require('./compiler');
const Parser = require('../helpers/parser');

module.exports = class Hugo {
	static runScriptCommands(buildConfig) {
		const prebuildScript = Compiler.getPrebuildCommands();
		const exportScript = Compiler.getExportCommands();
		const outputState = Compiler.getOutputState();
		const buildParams = Parser.parseOptions('hugo', buildConfig);

		return [
			prebuildScript,

			'echo "$ hugo env"',
			'hugo env',

			`echo "$ hugo ${buildParams}"`,
			`hugo ${buildParams}`, // TODO flags + config

			'echo "$ cloudcannon-hugo"',
			`cloudcannon-hugo ${buildParams}`,

			`echo "$ rm -rf /usr/local/__site/${outputState}/"`,
			`rm -rf /usr/local/__site/${outputState}/`,

			`echo "$ mkdir -p /usr/local/__site/${outputState}/"`,
			`mkdir -p /usr/local/__site/${outputState}/`,

			`echo "$ mv public/* /usr/local/__site/${outputState}/"`, // Todo change public/ to the publishDir
			`mv public/* /usr/local/__site/${outputState}/`,
			exportScript
		];
	}
};
