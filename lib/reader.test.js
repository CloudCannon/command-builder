const { runScriptCommands } = require('./reader');

test('outputs with empty config', () => {
	expect(runScriptCommands()).toEqual([
		'DETECTED_NPM_VERSION=$(npm -v)',
		"DETECTED_NODE_VERSION=$(node -v | sed 's/^v//')",
		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷npm:${DETECTED_NPM_VERSION}]"',
		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷node:${DETECTED_NODE_VERSION}]"',
		'echo "$ source .cloudcannon/preinstall"',
		'if [ -f ".cloudcannon/preinstall" ]; then source .cloudcannon/preinstall; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',
		'echo "$ source .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then source .cloudcannon/prebuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',
		'echo "$ npx @cloudcannon/reader@latest --output "public""',
		'npx @cloudcannon/reader@latest --output "public"',
		'echo "$ source .cloudcannon/postbuild"',
		'if [ -f ".cloudcannon/postbuild" ]; then source .cloudcannon/postbuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',
		'cd /usr/local/__site/compiled/',
		'rm -rf $(ls -A /usr/local/__site/compiled/)',
		'cd /usr/local/__site/src/',
		'[ -z "$(ls public)" ] || mv public/* /usr/local/__site/compiled/',
		'echo "[☁️Start Export]"',
		'echo "{"',
		'echo "\\"syncPaths\\": \\"$SYNC_PATHS\\""',
		'echo "}"'
	]);
});

test('outputs with @next config', () => {
	expect(runScriptCommands({ use_beta_plugin: true, input: 'src' })).toEqual([
		'DETECTED_NPM_VERSION=$(npm -v)',
		"DETECTED_NODE_VERSION=$(node -v | sed 's/^v//')",
		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷npm:${DETECTED_NPM_VERSION}]"',
		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷node:${DETECTED_NODE_VERSION}]"',
		'echo "$ source .cloudcannon/preinstall"',
		'if [ -f ".cloudcannon/preinstall" ]; then source .cloudcannon/preinstall; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',
		'echo "$ source .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then source .cloudcannon/prebuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',
		'echo "$ npx @cloudcannon/reader@next --output "public""',
		'npx @cloudcannon/reader@next --output "public"',
		'echo "$ source .cloudcannon/postbuild"',
		'if [ -f ".cloudcannon/postbuild" ]; then source .cloudcannon/postbuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',
		'cd /usr/local/__site/compiled/',
		'rm -rf $(ls -A /usr/local/__site/compiled/)',
		'cd /usr/local/__site/src/',
		'[ -z "$(ls public)" ] || mv public/* /usr/local/__site/compiled/',
		'echo "[☁️Start Export]"',
		'echo "{"',
		'echo "\\"syncPaths\\": \\"$SYNC_PATHS\\""',
		'echo "}"'
	]);
});
