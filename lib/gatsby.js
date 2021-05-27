const Compiler = require('./compiler');

module.exports = class Gatsby {
	static runScriptCommands() {
		const outputState = Compiler.getOutputState();

		return [
			'echo "$ node -v"',
			'node -v',
			'echo "$ npm -v"',
			'npm -v',

			'echo "$ npm install"',
			'npm config set registry https://registry.npmjs.org/',
			'npm config set cache-lock-stale 10',
			'npm config set cache-lock-wait 10',
			'npm install',

			'echo "$ npm run build"',
			'npm run build',

			`echo "$ rm -rf /usr/local/__site/${outputState}/"`,
			`rm -rf /usr/local/__site/${outputState}/`,

			`echo "$ mkdir -p /usr/local/__site/${outputState}/"`,
			`mkdir -p /usr/local/__site/${outputState}/`,

			`echo "$ mv public/* /usr/local/__site/${outputState}/"`,
			`mv public/* /usr/local/__site/${outputState}/`
		];
	}
};
