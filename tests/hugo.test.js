const { runScriptCommands } = require('../src/lib/hugo');

test('outputs with empty config', () => {
	expect(runScriptCommands()).toEqual([
		'echo "$ source .cloudcannon/preinstall"',
		'if [ -f ".cloudcannon/preinstall" ]; then source .cloudcannon/preinstall; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',
		"echo '$ export NODE_PATH=`pwd`/node_modules:$NODE_PATH'",
		'export NODE_PATH=`pwd`/node_modules:$NODE_PATH',
		"echo '$ if [ -f package.json ]; then npm i; fi'",
		'if [ -f package.json ]; then npm i; fi',

		'if [ -f "_cloudcannon-prebuild.sh" ]; then',
		'  echo "$ bash _cloudcannon-prebuild.sh"',
		'  echo "DEPRECATED: _cloudcannon-prebuild.sh should be moved to .cloudcannon/prebuild"',
		'  bash -l _cloudcannon-prebuild.sh',
		'fi',

		'echo "$ source .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then source .cloudcannon/prebuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'DETECTED_HUGO_VERSION=$(hugo version | sed \'s/[][]//g\' | sed \'s/^hugo v//\' | cut -d \' \' -f 1)',
		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷hugo:${DETECTED_HUGO_VERSION}]"',

		'echo \'$ hugo --destination public\'',
		'hugo --destination public',
		'echo \'$ npx cloudcannon-hugo --destination public\'',
		'npx cloudcannon-hugo --destination public',

		'echo "$ source .cloudcannon/postbuild"',
		'if [ -f ".cloudcannon/postbuild" ]; then source .cloudcannon/postbuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'find /usr/local/__site/compiled/ -mindepth 1 -delete',
		'shopt -s dotglob extglob',
		'[ -z "$(ls public)" ] || mv public/!(.cloudcannon|..|.) /usr/local/__site/compiled/',
		'shopt -u dotglob extglob',
		'echo "[☁️Start Export]"',
		'echo "{"',
		'echo "\\"syncPaths\\": \\"$SYNC_PATHS\\""',
		'echo "}"'
	]);
});

test('outputs with source directory configured', () => {
	expect(runScriptCommands({ source: 'src' })).toEqual([
		'echo "$ source .cloudcannon/preinstall"',
		'if [ -f ".cloudcannon/preinstall" ]; then source .cloudcannon/preinstall; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',
		"echo '$ export NODE_PATH=`pwd`/node_modules:$NODE_PATH'",
		'export NODE_PATH=`pwd`/node_modules:$NODE_PATH',
		"echo '$ if [ -f package.json ]; then npm i; fi'",
		'if [ -f package.json ]; then npm i; fi',

		'if [ -f "_cloudcannon-prebuild.sh" ]; then',
		'  echo "$ bash _cloudcannon-prebuild.sh"',
		'  echo "DEPRECATED: _cloudcannon-prebuild.sh should be moved to .cloudcannon/prebuild"',
		'  bash -l _cloudcannon-prebuild.sh',
		'fi',

		'echo "$ source .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then source .cloudcannon/prebuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'DETECTED_HUGO_VERSION=$(hugo version | sed \'s/[][]//g\' | sed \'s/^hugo v//\' | cut -d \' \' -f 1)',
		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷hugo:${DETECTED_HUGO_VERSION}]"',

		'echo \'$ hugo --source src --destination public\'',
		'hugo --source src --destination public',
		'echo \'$ npx cloudcannon-hugo --source src --destination public\'',
		'npx cloudcannon-hugo --source src --destination public',

		'echo "$ source .cloudcannon/postbuild"',
		'if [ -f ".cloudcannon/postbuild" ]; then source .cloudcannon/postbuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'find /usr/local/__site/compiled/ -mindepth 1 -delete',
		'shopt -s dotglob extglob',
		'[ -z "$(ls src/public)" ] || mv src/public/!(.cloudcannon|..|.) /usr/local/__site/compiled/',
		'shopt -u dotglob extglob',
		'echo "[☁️Start Export]"',
		'echo "{"',
		'echo "\\"syncPaths\\": \\"$SYNC_PATHS\\""',
		'echo "}"'
	]);
});
