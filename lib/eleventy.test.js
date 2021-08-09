const { runScriptCommands } = require('./eleventy');

test('outputs with empty config', () => {
	expect(runScriptCommands()).toEqual([
		'echo "$ node -v"',
		'node -v',
		'echo "$ npm -v"',
		'npm -v',

		'echo "$ source .cloudcannon/preinstall"',
		'if [ -f ".cloudcannon/preinstall" ]; then source .cloudcannon/preinstall; else echo "Not found."; fi',
		'echo "$ if [ ! -f package-lock.json ]; then npm install; fi"',
		'if [ ! -f package-lock.json ]; then npm install; fi',

		'echo "$ npm install eleventy-plugin-cloudcannon@latest"',
		'npm install eleventy-plugin-cloudcannon@latest',
		'echo "$ rm -rf cloudcannon"',
		'rm -rf cloudcannon',
		'echo "$ cp -R node_modules/eleventy-plugin-cloudcannon/cloudcannon ."',
		'cp -R node_modules/eleventy-plugin-cloudcannon/cloudcannon .',
		'echo "$ if [ -f .eleventy.js ]; then mv .eleventy.js default-eleventy.config.js; fi"',
		'if [ -f .eleventy.js ]; then mv .eleventy.js default-eleventy.config.js; fi',
		'echo "$ mv cloudcannon/inject-cloudcannon.config.js .eleventy.js"',
		'mv cloudcannon/inject-cloudcannon.config.js .eleventy.js',

		'echo "$ source .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then source .cloudcannon/prebuild; else echo "Not found."; fi',

		'echo "$ npx @11ty/eleventy "',
		'npx @11ty/eleventy ',

		'echo "$ source .cloudcannon/postbuild"',
		'if [ -f ".cloudcannon/postbuild" ]; then source .cloudcannon/postbuild; else echo "Not found."; fi',

		'rm -rf /usr/local/__site/compiled/',
		'mkdir -p /usr/local/__site/compiled/',
		'mv _site/* /usr/local/__site/compiled/',
		'echo "[☁️Start Export]"',
		'echo "{"',
		'echo "\\"syncPaths\\": \\"$SYNC_PATHS\\""',
		'echo "}"'
	]);
});

test('outputs with mange_plugin_manually', () => {
	expect(runScriptCommands({ manage_plugin_manually: true })).toEqual([
		'echo "$ node -v"',
		'node -v',
		'echo "$ npm -v"',
		'npm -v',

		'echo "$ source .cloudcannon/preinstall"',
		'if [ -f ".cloudcannon/preinstall" ]; then source .cloudcannon/preinstall; else echo "Not found."; fi',

		'echo "$ npm install"',
		'npm install',

		'echo "$ source .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then source .cloudcannon/prebuild; else echo "Not found."; fi',

		'echo "$ npx @11ty/eleventy "',
		'npx @11ty/eleventy ',

		'echo "$ source .cloudcannon/postbuild"',
		'if [ -f ".cloudcannon/postbuild" ]; then source .cloudcannon/postbuild; else echo "Not found."; fi',

		'rm -rf /usr/local/__site/compiled/',
		'mkdir -p /usr/local/__site/compiled/',
		'mv _site/* /usr/local/__site/compiled/',
		'echo "[☁️Start Export]"',
		'echo "{"',
		'echo "\\"syncPaths\\": \\"$SYNC_PATHS\\""',
		'echo "}"'
	]);
});
