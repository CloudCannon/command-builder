const Compiler = require('./compiler');

module.exports = class Static {
	static runScriptCommands(buildConfig) {
		const prebuildScript = Compiler.getPrebuildCommands();
		const outputState = Compiler.getOutputState();

		const src = buildConfig.source || '';
		const fullSrc = `/usr/local/__site/src/${src}/*`.replace(/\/\//g, '/');

		return [
			prebuildScript,

			`echo "$ rm -rf /usr/local/__site/${outputState}/"`,
			`rm -rf /usr/local/__site/${outputState}/`,

			`echo "$ mkdir -p /usr/local/__site/${outputState}/"`,
			`mkdir -p /usr/local/__site/${outputState}/`,

			`echo "$ cp -r ${fullSrc} /usr/local/__site/${outputState}/"`, // Todo change ${src}/ to the publishDir
			`cp -r ${fullSrc} /usr/local/__site/${outputState}/`
		];
	}
};
