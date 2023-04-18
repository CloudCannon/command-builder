const { runScriptCommands } = require('../src/lib/hugo');

test('outputs with empty config', () => {
	expect(runScriptCommands()).toEqual([
		'echo "$ source .cloudcannon/preinstall"',
		'if [ -f ".cloudcannon/preinstall" ]; then source .cloudcannon/preinstall; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',
		"echo '$ export NODE_PATH=`pwd`/node_modules:$NODE_PATH'",
		'export NODE_PATH=`pwd`/node_modules:$NODE_PATH',
		"echo '$ [ -f package.json ] && npm i'",
		'[ -f package.json ] && npm i',
		"echo '$ cd /usr/local/__site/src/'",
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

		"DETECTED_HUGO_VERSION=$(hugo version | sed 's/[][]//g' | sed 's/^hugo v//' | cut -d ' ' -f 1)",
		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷hugo:${DETECTED_HUGO_VERSION}]"',

		"echo '$ hugo --destination public'",
		'hugo --destination public',
		'__CURRENT_NVM_VERSION=$(nvm current)',
		'nvm use default > /dev/null',
		"echo '$ npx cloudcannon-hugo --destination public'",
		'npx cloudcannon-hugo --destination public',
		'nvm use "$__CURRENT_NVM_VERSION" > /dev/null',
		'unset __CURRENT_NVM_VERSION',

		'echo "$ source .cloudcannon/postbuild"',
		'if [ -f ".cloudcannon/postbuild" ]; then source .cloudcannon/postbuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'find /usr/local/__site/compiled/ -mindepth 1 -delete',
		'shopt -s dotglob extglob',
		'__OUTPUT_DIR_CONTENT=$(ls "public")',
		'[ -z "$__OUTPUT_DIR_CONTENT" ] || mv "public"/!(.cloudcannon|..|.) /usr/local/__site/compiled/',
		'unset __OUTPUT_DIR_CONTENT',
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
		"echo '$ [ -f package.json ] && npm i'",
		'[ -f package.json ] && npm i',
		"echo '$ cd /usr/local/__site/src/'",
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

		"DETECTED_HUGO_VERSION=$(hugo version | sed 's/[][]//g' | sed 's/^hugo v//' | cut -d ' ' -f 1)",
		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷hugo:${DETECTED_HUGO_VERSION}]"',

		"echo '$ hugo --source src --destination public'",
		'hugo --source src --destination public',
		'__CURRENT_NVM_VERSION=$(nvm current)',
		'nvm use default > /dev/null',
		"echo '$ npx cloudcannon-hugo --source src --destination public'",
		'npx cloudcannon-hugo --source src --destination public',
		'nvm use "$__CURRENT_NVM_VERSION" > /dev/null',
		'unset __CURRENT_NVM_VERSION',

		'echo "$ source .cloudcannon/postbuild"',
		'if [ -f ".cloudcannon/postbuild" ]; then source .cloudcannon/postbuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'find /usr/local/__site/compiled/ -mindepth 1 -delete',
		'shopt -s dotglob extglob',
		'__OUTPUT_DIR_CONTENT=$(ls "src/public")',
		'[ -z "$__OUTPUT_DIR_CONTENT" ] || mv "src/public"/!(.cloudcannon|..|.) /usr/local/__site/compiled/',
		'unset __OUTPUT_DIR_CONTENT',
		'shopt -u dotglob extglob',
		'echo "[☁️Start Export]"',
		'echo "{"',
		'echo "\\"syncPaths\\": \\"$SYNC_PATHS\\""',
		'echo "}"'
	]);
});
