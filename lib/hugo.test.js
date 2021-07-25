const { runScriptCommands } = require('./hugo');

test('outputs with empty config', () => {
	expect(runScriptCommands()).toEqual([
		'echo "$ hugo env"',
		'hugo env',

		'echo "$ bash .cloudcannon/preinstall"',
		'if [ -f ".cloudcannon/preinstall" ]; then bash -l .cloudcannon/preinstall; else echo "Not found."; fi',

		'if [ -f "_cloudcannon-prebuild.sh" ]; then',
		'  echo "$ bash _cloudcannon-prebuild.sh"',
		'  echo "DEPRECATED: _cloudcannon-prebuild.sh should be moved to .cloudcannon/prebuild"',
		'  bash -l _cloudcannon-prebuild.sh',
		'fi',

		'echo "$ bash .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then bash -l .cloudcannon/prebuild; else echo "Not found."; fi',

		'echo "$ hugo "',
		'hugo ',
		'echo "$ cloudcannon-hugo "',
		'cloudcannon-hugo ',

		'echo "$ bash .cloudcannon/postbuild"',
		'if [ -f ".cloudcannon/postbuild" ]; then bash -l .cloudcannon/postbuild; else echo "Not found."; fi',

		'rm -rf /usr/local/__site/compiled/',
		'mkdir -p /usr/local/__site/compiled/',
		'mv public/* /usr/local/__site/compiled/',
		'echo "[☁️Start Export]"',
		'echo "{"',
		'echo "\\"syncPaths\\": \\"$SYNC_PATHS\\""',
		'echo "}"'
	]);
});

test('outputs with source directory configured', () => {
	expect(runScriptCommands({ source: 'src' })).toEqual([
		'echo "$ hugo env"',
		'hugo env',

		'echo "$ bash .cloudcannon/preinstall"',
		'if [ -f ".cloudcannon/preinstall" ]; then bash -l .cloudcannon/preinstall; else echo "Not found."; fi',

		'if [ -f "_cloudcannon-prebuild.sh" ]; then',
		'  echo "$ bash _cloudcannon-prebuild.sh"',
		'  echo "DEPRECATED: _cloudcannon-prebuild.sh should be moved to .cloudcannon/prebuild"',
		'  bash -l _cloudcannon-prebuild.sh',
		'fi',

		'echo "$ bash .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then bash -l .cloudcannon/prebuild; else echo "Not found."; fi',

		'echo "$ hugo --source src"',
		'hugo --source src',
		'echo "$ cloudcannon-hugo --source src"',
		'cloudcannon-hugo --source src',

		'echo "$ bash .cloudcannon/postbuild"',
		'if [ -f ".cloudcannon/postbuild" ]; then bash -l .cloudcannon/postbuild; else echo "Not found."; fi',

		'rm -rf /usr/local/__site/compiled/',
		'mkdir -p /usr/local/__site/compiled/',
		'mv src/public/* /usr/local/__site/compiled/',
		'echo "[☁️Start Export]"',
		'echo "{"',
		'echo "\\"syncPaths\\": \\"$SYNC_PATHS\\""',
		'echo "}"'
	]);
});
