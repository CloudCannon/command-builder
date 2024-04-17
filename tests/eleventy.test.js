const { runScriptCommands } = require('../src/lib/eleventy');

test('outputs with empty config', () => {
	expect(runScriptCommands()).toEqual([
		'echo "$ source .cloudcannon/preinstall"',
		'if [ -f ".cloudcannon/preinstall" ]; then source .cloudcannon/preinstall; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'echo \'$ npm pkg set dependencies.eleventy-plugin-cloudcannon=latest || npm install eleventy-plugin-cloudcannon@latest\'',
		'npm pkg set dependencies.eleventy-plugin-cloudcannon=latest || npm install eleventy-plugin-cloudcannon@latest',

		'echo \'$ npm install\'',
		'npm install',

		"export CC_ELEVENTY_VERSION=`npm list @11ty/eleventy | grep @11ty/eleventy | awk -F \"@\" '{print $NF}'`",
		'if [[ -z "$CC_ELEVENTY_VERSION" ]]; then export CC_ELEVENTY_VERSION=unknown; fi',
		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷@11ty/eleventy:${CC_ELEVENTY_VERSION}]"',
		"echo '$ if [ -f eleventy.config.cjs ]; then CONFIG=eleventy.config.cjs; fi'",
		'if [ -f eleventy.config.cjs ]; then CONFIG=eleventy.config.cjs; fi',
		"echo '$ if [ -f eleventy.config.mjs ]; then CONFIG=eleventy.config.mjs; fi'",
		'if [ -f eleventy.config.mjs ]; then CONFIG=eleventy.config.mjs; fi',
		"echo '$ if [ -f eleventy.config.js ]; then CONFIG=eleventy.config.js; fi'",
		'if [ -f eleventy.config.js ]; then CONFIG=eleventy.config.js; fi',
		"echo '$ if [ -f .eleventy.js ]; then CONFIG=.eleventy.js; fi'",
		'if [ -f .eleventy.js ]; then CONFIG=.eleventy.js; fi',
		"echo '$ echo $CONFIG'",
		'echo $CONFIG',
		"echo '$ CONFIG_DIR=`dirname $CONFIG`'",
		'CONFIG_DIR=`dirname $CONFIG`',
		"echo '$ echo $CONFIG_DIR'",
		'echo $CONFIG_DIR',
		"echo '$ CONFIG_BASE=`basename $CONFIG`'",
		'CONFIG_BASE=`basename $CONFIG`',
		"echo '$ echo $CONFIG_BASE'",
		'echo $CONFIG_BASE',
		"echo '$ CONFIG_INJECTED=\"$CONFIG_DIR/inject-cloudcannon.config.cjs\"'",
		'CONFIG_INJECTED="$CONFIG_DIR/inject-cloudcannon.config.cjs"',
		"echo '$ echo $CONFIG_INJECTED'",
		'echo $CONFIG_INJECTED',
		"echo '$ export CC_ELEVENTY_CONFIG=\"$CONFIG_DIR/default-$CONFIG_BASE\"'",
		'export CC_ELEVENTY_CONFIG="$CONFIG_DIR/default-$CONFIG_BASE"',
		"echo '$ echo $CC_ELEVENTY_CONFIG'",
		'echo $CC_ELEVENTY_CONFIG',
		"echo '$ if [ -f $CONFIG ]; then mv $CONFIG $CC_ELEVENTY_CONFIG; fi'",
		'if [ -f $CONFIG ]; then mv $CONFIG $CC_ELEVENTY_CONFIG; fi',
		"echo '$ cp node_modules/eleventy-plugin-cloudcannon/src/inject-cloudcannon.config.cjs $CONFIG_INJECTED'",
		'cp node_modules/eleventy-plugin-cloudcannon/src/inject-cloudcannon.config.cjs $CONFIG_INJECTED',

		'echo "$ source .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then source .cloudcannon/prebuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'DETECTED_NPM_VERSION=$(npm -v | sed \'s/[][]//g\')',
		'DETECTED_NODE_VERSION=$(node -v | sed \'s/[][]//g\' | sed \'s/^v//\')',
		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷npm:${DETECTED_NPM_VERSION}]"',
		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷node:${DETECTED_NODE_VERSION}]"',

		'echo \'$ npx @11ty/eleventy --config=$CONFIG_INJECTED --output _site\'',
		'npx @11ty/eleventy --config=$CONFIG_INJECTED --output _site',

		'echo "$ source .cloudcannon/postbuild"',
		'if [ -f ".cloudcannon/postbuild" ]; then source .cloudcannon/postbuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'find /usr/local/__site/compiled/ -mindepth 1 -delete',
		'shopt -s dotglob extglob',
		'__OUTPUT_DIR_CONTENT=$(ls "_site")',
		'[ -z "$__OUTPUT_DIR_CONTENT" ] || mv "_site"/!(.cloudcannon|..|.) /usr/local/__site/compiled/',
		'unset __OUTPUT_DIR_CONTENT',
		'shopt -u dotglob extglob',
		'echo "[☁️Start Export]"',
		'echo "{"',
		'echo "\\"syncPaths\\": \\"$SYNC_PATHS\\""',
		'echo "}"'
	]);
});

test('outputs with @next config', () => {
	expect(runScriptCommands({
		use_beta_plugin: true, input: 'src', incremental: true, ignoreinitial: true
	})).toEqual([
		'echo "$ source .cloudcannon/preinstall"',
		'if [ -f ".cloudcannon/preinstall" ]; then source .cloudcannon/preinstall; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'echo \'$ npm pkg set dependencies.eleventy-plugin-cloudcannon=next || npm install eleventy-plugin-cloudcannon@next\'',
		'npm pkg set dependencies.eleventy-plugin-cloudcannon=next || npm install eleventy-plugin-cloudcannon@next',

		'echo \'$ npm install\'',
		'npm install',

		"export CC_ELEVENTY_VERSION=`npm list @11ty/eleventy | grep @11ty/eleventy | awk -F \"@\" '{print $NF}'`",
		'if [[ -z "$CC_ELEVENTY_VERSION" ]]; then export CC_ELEVENTY_VERSION=unknown; fi',
		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷@11ty/eleventy:${CC_ELEVENTY_VERSION}]"',
		"echo '$ if [ -f eleventy.config.cjs ]; then CONFIG=eleventy.config.cjs; fi'",
		'if [ -f eleventy.config.cjs ]; then CONFIG=eleventy.config.cjs; fi',
		"echo '$ if [ -f eleventy.config.mjs ]; then CONFIG=eleventy.config.mjs; fi'",
		'if [ -f eleventy.config.mjs ]; then CONFIG=eleventy.config.mjs; fi',
		"echo '$ if [ -f eleventy.config.js ]; then CONFIG=eleventy.config.js; fi'",
		'if [ -f eleventy.config.js ]; then CONFIG=eleventy.config.js; fi',
		"echo '$ if [ -f .eleventy.js ]; then CONFIG=.eleventy.js; fi'",
		'if [ -f .eleventy.js ]; then CONFIG=.eleventy.js; fi',
		"echo '$ echo $CONFIG'",
		'echo $CONFIG',
		"echo '$ CONFIG_DIR=`dirname $CONFIG`'",
		'CONFIG_DIR=`dirname $CONFIG`',
		"echo '$ echo $CONFIG_DIR'",
		'echo $CONFIG_DIR',
		"echo '$ CONFIG_BASE=`basename $CONFIG`'",
		'CONFIG_BASE=`basename $CONFIG`',
		"echo '$ echo $CONFIG_BASE'",
		'echo $CONFIG_BASE',
		"echo '$ CONFIG_INJECTED=\"$CONFIG_DIR/inject-cloudcannon.config.cjs\"'",
		'CONFIG_INJECTED="$CONFIG_DIR/inject-cloudcannon.config.cjs"',
		"echo '$ echo $CONFIG_INJECTED'",
		'echo $CONFIG_INJECTED',
		"echo '$ export CC_ELEVENTY_CONFIG=\"$CONFIG_DIR/default-$CONFIG_BASE\"'",
		'export CC_ELEVENTY_CONFIG="$CONFIG_DIR/default-$CONFIG_BASE"',
		"echo '$ echo $CC_ELEVENTY_CONFIG'",
		'echo $CC_ELEVENTY_CONFIG',
		"echo '$ if [ -f $CONFIG ]; then mv $CONFIG $CC_ELEVENTY_CONFIG; fi'",
		'if [ -f $CONFIG ]; then mv $CONFIG $CC_ELEVENTY_CONFIG; fi',
		"echo '$ cp node_modules/eleventy-plugin-cloudcannon/src/inject-cloudcannon.config.cjs $CONFIG_INJECTED'",
		'cp node_modules/eleventy-plugin-cloudcannon/src/inject-cloudcannon.config.cjs $CONFIG_INJECTED',

		'echo \'$ export CC_ELEVENTY_INPUT="src"\'',
		'export CC_ELEVENTY_INPUT="src"',

		'echo "$ source .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then source .cloudcannon/prebuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'DETECTED_NPM_VERSION=$(npm -v | sed \'s/[][]//g\')',
		'DETECTED_NODE_VERSION=$(node -v | sed \'s/[][]//g\' | sed \'s/^v//\')',
		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷npm:${DETECTED_NPM_VERSION}]"',
		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷node:${DETECTED_NODE_VERSION}]"',

		'echo \'$ npx @11ty/eleventy --config=$CONFIG_INJECTED --input src --incremental --ignore-initial --output _site\'',
		'npx @11ty/eleventy --config=$CONFIG_INJECTED --input src --incremental --ignore-initial --output _site',

		'echo "$ source .cloudcannon/postbuild"',
		'if [ -f ".cloudcannon/postbuild" ]; then source .cloudcannon/postbuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'find /usr/local/__site/compiled/ -mindepth 1 -delete',
		'shopt -s dotglob extglob',
		'__OUTPUT_DIR_CONTENT=$(ls "_site")',
		'[ -z "$__OUTPUT_DIR_CONTENT" ] || mv "_site"/!(.cloudcannon|..|.) /usr/local/__site/compiled/',
		'unset __OUTPUT_DIR_CONTENT',
		'shopt -u dotglob extglob',
		'echo "[☁️Start Export]"',
		'echo "{"',
		'echo "\\"syncPaths\\": \\"$SYNC_PATHS\\""',
		'echo "}"'
	]);
});

test('outputs with mange_plugin_manually', () => {
	expect(runScriptCommands({ manage_plugin_manually: true })).toEqual([
		'echo "$ source .cloudcannon/preinstall"',
		'if [ -f ".cloudcannon/preinstall" ]; then source .cloudcannon/preinstall; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'echo \'$ npm install\'',
		'npm install',

		'echo "$ source .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then source .cloudcannon/prebuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'DETECTED_NPM_VERSION=$(npm -v | sed \'s/[][]//g\')',
		'DETECTED_NODE_VERSION=$(node -v | sed \'s/[][]//g\' | sed \'s/^v//\')',
		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷npm:${DETECTED_NPM_VERSION}]"',
		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷node:${DETECTED_NODE_VERSION}]"',

		"echo '$ npx @11ty/eleventy --config=$CONFIG_INJECTED --output _site'",
		'npx @11ty/eleventy --config=$CONFIG_INJECTED --output _site',

		'echo "$ source .cloudcannon/postbuild"',
		'if [ -f ".cloudcannon/postbuild" ]; then source .cloudcannon/postbuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'find /usr/local/__site/compiled/ -mindepth 1 -delete',
		'shopt -s dotglob extglob',
		'__OUTPUT_DIR_CONTENT=$(ls "_site")',
		'[ -z "$__OUTPUT_DIR_CONTENT" ] || mv "_site"/!(.cloudcannon|..|.) /usr/local/__site/compiled/',
		'unset __OUTPUT_DIR_CONTENT',
		'shopt -u dotglob extglob',
		'echo "[☁️Start Export]"',
		'echo "{"',
		'echo "\\"syncPaths\\": \\"$SYNC_PATHS\\""',
		'echo "}"'
	]);
});
