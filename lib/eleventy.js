const Compiler = require('./compiler');

module.exports = class Eleventy {
	static runScriptCommands(buildConfig) {
		const prebuildScript = Compiler.getPrebuildCommands();
		const exportScript = Compiler.getExportCommands();
		const outputState = Compiler.getOutputState();

		// TODO: Implement Eleventy in the parser
		const buildParams = Eleventy.getBuildParams(buildConfig).join(' ');

		return [
			prebuildScript,

			'echo "$ node -v"',
			'node -v',

			'echo "$ npm -v"',
			'npm -v',

			'echo "$ npm install"',
			'npm config set registry https://registry.npmjs.org/',
			'npm config set cache-lock-stale 10',
			'npm config set cache-lock-wait 10',
			'npm install',

			// Inject the templates for _cloudcannon/details.json and _cloudcannon/config.json
			'echo "$ cp -R node_modules/eleventy-plugin-cloudcannon/cloudcannon ."',
			'cp -R node_modules/eleventy-plugin-cloudcannon/cloudcannon .', // TODO . should be the input folder configured

			`echo "$ npm run build ${buildParams}"`,
			`npm run build ${buildParams}`,

			`echo "$ rm -rf /usr/local/__site/${outputState}/"`,
			`rm -rf /usr/local/__site/${outputState}/`,

			`echo "$ mkdir -p /usr/local/__site/${outputState}/"`,
			`mkdir -p /usr/local/__site/${outputState}/`,

			`echo "$ cp -R _site/* /usr/local/__site/${outputState}/"`,
			`cp -R _site/* /usr/local/__site/${outputState}/`, // TODO _site/ should be the the output folder configured
			exportScript
		];
	}

	static getBuildParams(buildConfig) {
		const buildParams = [];

		if (buildConfig.config) {
			buildParams.push('--config', buildConfig.config);
		}

		if (buildConfig.input) {
			buildParams.push('--input', buildConfig.input);
		}

		if (buildConfig.formats) {
			buildParams.push('--formats', buildConfig.formats);
		}

		if (buildConfig.pathprefix) {
			buildParams.push('--pathprefix', buildConfig.pathprefix);
		}

		if (buildConfig.quiet) {
			buildParams.push('--quiet', buildConfig.quiet);
		}

		return buildParams;
	}
};
