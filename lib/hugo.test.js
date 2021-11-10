const { runScriptCommands } = require('./hugo');

test('outputs with empty config', () => {
	expect(runScriptCommands()).toEqual([
		'echo "$ hugo env"',
		'hugo env',

		'echo "$ source .cloudcannon/preinstall"',
		'if [ -f ".cloudcannon/preinstall" ]; then source .cloudcannon/preinstall; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'if [ -f "_cloudcannon-prebuild.sh" ]; then',
		'  echo "$ bash _cloudcannon-prebuild.sh"',
		'  echo "DEPRECATED: _cloudcannon-prebuild.sh should be moved to .cloudcannon/prebuild"',
		'  bash -l _cloudcannon-prebuild.sh',
		'fi',

		'echo "$ source .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then source .cloudcannon/prebuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'echo "$ hugo "',
		'hugo ',
		'echo "$ cloudcannon-hugo "',
		'cloudcannon-hugo ',

		'echo "$ source .cloudcannon/postbuild"',
		'if [ -f ".cloudcannon/postbuild" ]; then source .cloudcannon/postbuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'rm -rf $(ls -A /usr/local/__site/compiled/)',
		'[ -z "$(ls public)" ] || mv public/* /usr/local/__site/compiled/',
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

		'echo "$ source .cloudcannon/preinstall"',
		'if [ -f ".cloudcannon/preinstall" ]; then source .cloudcannon/preinstall; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'if [ -f "_cloudcannon-prebuild.sh" ]; then',
		'  echo "$ bash _cloudcannon-prebuild.sh"',
		'  echo "DEPRECATED: _cloudcannon-prebuild.sh should be moved to .cloudcannon/prebuild"',
		'  bash -l _cloudcannon-prebuild.sh',
		'fi',

		'echo "$ source .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then source .cloudcannon/prebuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'echo "$ hugo --source src"',
		'hugo --source src',
		'echo "$ cloudcannon-hugo --source src"',
		'cloudcannon-hugo --source src',

		'echo "$ source .cloudcannon/postbuild"',
		'if [ -f ".cloudcannon/postbuild" ]; then source .cloudcannon/postbuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'rm -rf $(ls -A /usr/local/__site/compiled/)',
		'[ -z "$(ls src/public)" ] || mv src/public/* /usr/local/__site/compiled/',
		'echo "[☁️Start Export]"',
		'echo "{"',
		'echo "\\"syncPaths\\": \\"$SYNC_PATHS\\""',
		'echo "}"'
	]);
});
