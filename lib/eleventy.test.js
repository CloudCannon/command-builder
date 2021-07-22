const { runScriptCommands } = require('./eleventy');

test('outputs with empty config', () => {
	expect(runScriptCommands()).toEqual([
		'echo "$ node -v"',
		'node -v',
		'echo "$ npm -v"',
		'npm -v',

		'echo "$ bash .cloudcannon/preinstall"\nif [ -f ".cloudcannon/preinstall" ]; then\n  bash -l .cloudcannon/preinstall\nelse\n  echo "Not found."\nfi',

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

		'echo "$ bash .cloudcannon/prebuild"\nif [ -f ".cloudcannon/prebuild" ]; then\n  bash -l .cloudcannon/prebuild\nelse\n  echo "Not found."\nfi',

		'echo "$ npx @11ty/eleventy "',
		'npx @11ty/eleventy ',

		'echo "$ bash .cloudcannon/postbuild"\nif [ -f ".cloudcannon/postbuild" ]; then\n  bash -l .cloudcannon/postbuild\nelse\n  echo "Not found."\nfi',

		'rm -rf /usr/local/__site/compiled/',
		'mkdir -p /usr/local/__site/compiled/',
		'mv _site/* /usr/local/__site/compiled/',
		'echo "[☁️Start Export]"\necho "{"\necho "\\"syncPaths\\": \\"$SYNC_PATHS\\""\necho "}"'
	]);
});

test('outputs with mange_plugin_manually', () => {
	expect(runScriptCommands({ manage_plugin_manually: true })).toEqual([
		'echo "$ node -v"',
		'node -v',
		'echo "$ npm -v"',
		'npm -v',

		'echo "$ bash .cloudcannon/preinstall"\nif [ -f ".cloudcannon/preinstall" ]; then\n  bash -l .cloudcannon/preinstall\nelse\n  echo "Not found."\nfi',

		'echo "$ npm install"',
		'npm install',

		'echo "$ bash .cloudcannon/prebuild"\nif [ -f ".cloudcannon/prebuild" ]; then\n  bash -l .cloudcannon/prebuild\nelse\n  echo "Not found."\nfi',

		'echo "$ npx @11ty/eleventy "',
		'npx @11ty/eleventy ',

		'echo "$ bash .cloudcannon/postbuild"\nif [ -f ".cloudcannon/postbuild" ]; then\n  bash -l .cloudcannon/postbuild\nelse\n  echo "Not found."\nfi',

		'rm -rf /usr/local/__site/compiled/',
		'mkdir -p /usr/local/__site/compiled/',
		'mv _site/* /usr/local/__site/compiled/',
		'echo "[☁️Start Export]"\necho "{"\necho "\\"syncPaths\\": \\"$SYNC_PATHS\\""\necho "}"'
	]);
});
