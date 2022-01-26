const { runScriptCommands } = require('./eleventy');

test('outputs with empty config', () => {
	expect(runScriptCommands()).toEqual([
		'echo "$ node -v"',
		'node -v',
		'echo "$ npm -v"',
		'npm -v',

		'echo "$ source .cloudcannon/preinstall"',
		'if [ -f ".cloudcannon/preinstall" ]; then source .cloudcannon/preinstall; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',
		'echo "$ if [ ! -f package-lock.json ] && [ -f package.json ]; then npm install; fi"',
		'if [ ! -f package-lock.json ] && [ -f package.json ]; then npm install; fi',

		'echo "$ npm install eleventy-plugin-cloudcannon@latest"',
		'npm install eleventy-plugin-cloudcannon@latest',

		'echo "$ if [ -f .eleventy.js ]; then mv .eleventy.js default-eleventy.config.js; fi"',
		'if [ -f .eleventy.js ]; then mv .eleventy.js default-eleventy.config.js; fi',

		'echo "$ cp node_modules/eleventy-plugin-cloudcannon/src/inject-cloudcannon.config.js .eleventy.js"',
		'cp node_modules/eleventy-plugin-cloudcannon/src/inject-cloudcannon.config.js .eleventy.js',

		'echo "$ source .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then source .cloudcannon/prebuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'echo "$ npx @11ty/eleventy --output _site"',
		'npx @11ty/eleventy --output _site',

		'echo "$ source .cloudcannon/postbuild"',
		'if [ -f ".cloudcannon/postbuild" ]; then source .cloudcannon/postbuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'find /usr/local/__site/compiled/ -mindepth 1 -delete',
		'shopt -s dotglob extglob',
		'[ -z "$(ls _site)" ] || mv _site/!(.cloudcannon|..|.) /usr/local/__site/compiled/',
		'shopt -u dotglob extglob',
		'echo "[☁️Start Export]"',
		'echo "{"',
		'echo "\\"syncPaths\\": \\"$SYNC_PATHS\\""',
		'echo "}"'
	]);
});

test('outputs with @next config', () => {
	expect(runScriptCommands({ use_beta_plugin: true, input: 'src' })).toEqual([
		'echo "$ node -v"',
		'node -v',
		'echo "$ npm -v"',
		'npm -v',

		'echo "$ source .cloudcannon/preinstall"',
		'if [ -f ".cloudcannon/preinstall" ]; then source .cloudcannon/preinstall; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',
		'echo "$ if [ ! -f package-lock.json ] && [ -f package.json ]; then npm install; fi"',
		'if [ ! -f package-lock.json ] && [ -f package.json ]; then npm install; fi',

		'echo "$ npm install eleventy-plugin-cloudcannon@next"',
		'npm install eleventy-plugin-cloudcannon@next',

		'echo "$ if [ -f .eleventy.js ]; then mv .eleventy.js default-eleventy.config.js; fi"',
		'if [ -f .eleventy.js ]; then mv .eleventy.js default-eleventy.config.js; fi',

		'echo "$ cp node_modules/eleventy-plugin-cloudcannon/src/inject-cloudcannon.config.js .eleventy.js"',
		'cp node_modules/eleventy-plugin-cloudcannon/src/inject-cloudcannon.config.js .eleventy.js',

		'echo "$ export CC_ELEVENTY_INPUT="src""',
		'export CC_ELEVENTY_INPUT="src"',

		'echo "$ source .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then source .cloudcannon/prebuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'echo "$ npx @11ty/eleventy --input src --output _site"',
		'npx @11ty/eleventy --input src --output _site',

		'echo "$ source .cloudcannon/postbuild"',
		'if [ -f ".cloudcannon/postbuild" ]; then source .cloudcannon/postbuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'find /usr/local/__site/compiled/ -mindepth 1 -delete',
		'shopt -s dotglob extglob',
		'[ -z "$(ls _site)" ] || mv _site/!(.cloudcannon|..|.) /usr/local/__site/compiled/',
		'shopt -u dotglob extglob',
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
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'echo "$ npm install"',
		'npm install',

		'echo "$ source .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then source .cloudcannon/prebuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'echo "$ npx @11ty/eleventy --output _site"',
		'npx @11ty/eleventy --output _site',

		'echo "$ source .cloudcannon/postbuild"',
		'if [ -f ".cloudcannon/postbuild" ]; then source .cloudcannon/postbuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'find /usr/local/__site/compiled/ -mindepth 1 -delete',
		'shopt -s dotglob extglob',
		'[ -z "$(ls _site)" ] || mv _site/!(.cloudcannon|..|.) /usr/local/__site/compiled/',
		'shopt -u dotglob extglob',
		'echo "[☁️Start Export]"',
		'echo "{"',
		'echo "\\"syncPaths\\": \\"$SYNC_PATHS\\""',
		'echo "}"'
	]);
});
