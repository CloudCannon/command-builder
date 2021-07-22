const { runScriptCommands } = require('./hugo');

test('outputs with empty config', () => {
	expect(runScriptCommands()).toEqual([
		'echo "$ hugo env"',
		'hugo env',

		'echo "$ bash .cloudcannon/preinstall"\nif [ -f ".cloudcannon/preinstall" ]; then\n  bash -l .cloudcannon/preinstall\nelse\n  echo "Not found."\nfi',

		'if [ -f "_cloudcannon-prebuild.sh" ]; then\n  echo "$ bash _cloudcannon-prebuild.sh"\n  echo "DEPRECATED: _cloudcannon-prebuild.sh should be moved to .cloudcannon/prebuild"\n  bash -l _cloudcannon-prebuild.sh\nfi',
		'echo "$ bash .cloudcannon/prebuild"\nif [ -f ".cloudcannon/prebuild" ]; then\n  bash -l .cloudcannon/prebuild\nelse\n  echo "Not found."\nfi',

		'echo "$ hugo "',
		'hugo ',
		'echo "$ cloudcannon-hugo "',
		'cloudcannon-hugo ',

		'echo "$ bash .cloudcannon/postbuild"\nif [ -f ".cloudcannon/postbuild" ]; then\n  bash -l .cloudcannon/postbuild\nelse\n  echo "Not found."\nfi',

		'rm -rf /usr/local/__site/compiled/',
		'mkdir -p /usr/local/__site/compiled/',
		'mv public/* /usr/local/__site/compiled/',
		'echo "[☁️Start Export]"\necho "{"\necho "\\"syncPaths\\": \\"$SYNC_PATHS\\""\necho "}"'
	]);
});

test('outputs with source directory configured', () => {
	expect(runScriptCommands({ source: 'src' })).toEqual([
		'echo "$ hugo env"',
		'hugo env',

		'echo "$ bash .cloudcannon/preinstall"\nif [ -f ".cloudcannon/preinstall" ]; then\n  bash -l .cloudcannon/preinstall\nelse\n  echo "Not found."\nfi',

		'if [ -f "_cloudcannon-prebuild.sh" ]; then\n  echo "$ bash _cloudcannon-prebuild.sh"\n  echo "DEPRECATED: _cloudcannon-prebuild.sh should be moved to .cloudcannon/prebuild"\n  bash -l _cloudcannon-prebuild.sh\nfi',
		'echo "$ bash .cloudcannon/prebuild"\nif [ -f ".cloudcannon/prebuild" ]; then\n  bash -l .cloudcannon/prebuild\nelse\n  echo "Not found."\nfi',

		'echo "$ hugo --source src"',
		'hugo --source src',
		'echo "$ cloudcannon-hugo --source src"',
		'cloudcannon-hugo --source src',

		'echo "$ bash .cloudcannon/postbuild"\nif [ -f ".cloudcannon/postbuild" ]; then\n  bash -l .cloudcannon/postbuild\nelse\n  echo "Not found."\nfi',

		'rm -rf /usr/local/__site/compiled/',
		'mkdir -p /usr/local/__site/compiled/',
		'mv src/public/* /usr/local/__site/compiled/',
		'echo "[☁️Start Export]"\necho "{"\necho "\\"syncPaths\\": \\"$SYNC_PATHS\\""\necho "}"'
	]);
});
