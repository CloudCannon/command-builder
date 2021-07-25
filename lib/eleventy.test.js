const { runScriptCommands } = require('./eleventy');

test('outputs with empty config', () => {
	expect(runScriptCommands()).toEqual([
		'echo "$ node -v"',
		'node -v',
		'echo "$ npm -v"',
		'npm -v',

		'echo "$ bash .cloudcannon/preinstall"',
		'if [ -f ".cloudcannon/preinstall" ]; then bash -l .cloudcannon/preinstall; else echo "Not found."; fi',

		'echo "$ npm install eleventy-plugin-cloudcannon@latest"',
		'npm install eleventy-plugin-cloudcannon@latest',
		'echo "$ rm -rf cloudcannon"',
		'rm -rf cloudcannon',
		'echo "$ cp -R node_modules/eleventy-plugin-cloudcannon/cloudcannon ."',
		'cp -R node_modules/eleventy-plugin-cloudcannon/cloudcannon .',
		'echo "$ [ ! -f .eleventy.js ] || mv .eleventy.js default-eleventy.config.js"',
		'[ ! -f .eleventy.js ] || mv .eleventy.js default-eleventy.config.js',
		'echo "$ mv cloudcannon/inject-cloudcannon.config.js .eleventy.js"',
		'mv cloudcannon/inject-cloudcannon.config.js .eleventy.js',

		'echo "$ bash .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then bash -l .cloudcannon/prebuild; else echo "Not found."; fi',

		'echo "$ npx @11ty/eleventy "',
		'npx @11ty/eleventy ',

		'echo "$ bash .cloudcannon/postbuild"',
		'if [ -f ".cloudcannon/postbuild" ]; then bash -l .cloudcannon/postbuild; else echo "Not found."; fi',

		'rm -rf /usr/local/__site/compiled/',
		'mkdir -p /usr/local/__site/compiled/',
		'mv _site/* /usr/local/__site/compiled/'
	]);
});

test('outputs with mange_plugin_manually', () => {
	expect(runScriptCommands({ manage_plugin_manually: true })).toEqual([
		'echo "$ node -v"',
		'node -v',
		'echo "$ npm -v"',
		'npm -v',

		'echo "$ bash .cloudcannon/preinstall"',
		'if [ -f ".cloudcannon/preinstall" ]; then bash -l .cloudcannon/preinstall; else echo "Not found."; fi',

		'echo "$ npm install"',
		'npm install',

		'echo "$ bash .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then bash -l .cloudcannon/prebuild; else echo "Not found."; fi',

		'echo "$ npx @11ty/eleventy "',
		'npx @11ty/eleventy ',

		'echo "$ bash .cloudcannon/postbuild"',
		'if [ -f ".cloudcannon/postbuild" ]; then bash -l .cloudcannon/postbuild; else echo "Not found."; fi',

		'rm -rf /usr/local/__site/compiled/',
		'mkdir -p /usr/local/__site/compiled/',
		'mv _site/* /usr/local/__site/compiled/'
	]);
});
