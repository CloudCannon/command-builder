const { runScriptCommands } = require('../src/lib/reader-npm');

test('outputs with empty config', () => {
	expect(runScriptCommands()).toEqual([
		'echo "$ source .cloudcannon/preinstall"',
		'if [ -f ".cloudcannon/preinstall" ]; then source .cloudcannon/preinstall; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',
		"echo '$ npm install'",
		'npm install',
		"echo '$ cd /usr/local/__site/src/'",
		'cd /usr/local/__site/src/',
		'echo "$ source .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then source .cloudcannon/prebuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',
		"DETECTED_NPM_VERSION=$((npm -v 2> /dev/null || echo 'unknown') | sed \"s/[][]//g\")",
		'DETECTED_NODE_VERSION=$((node -v 2> /dev/null || echo \'unknown\') | sed "s/[][]//g" | sed "s/^v//")',
		'DETECTED_DENO_VERSION=$((deno -V 2> /dev/null || echo \'unknown\') | sed "s/[][]//g" | sed "s/^deno //")',
		"DETECTED_YARN_VERSION=$(yarn -v 2> /dev/null || echo 'unknown')",
		'DETECTED_BUNDLE_VERSION=$((bundle -v 2> /dev/null || echo \'unknown\') | sed "s/[][]//g" | sed "s/^Bundler version //g")',
		'DETECTED_RUBY_VERSION=$((ruby -v 2> /dev/null || echo \'unknown\') | sed "s/[][]//g" | sed "s/^ruby //g" | cut -d " " -f 1)',
		/* eslint-disable no-template-curly-in-string */
		'echo "[🏷npm:${DETECTED_NPM_VERSION}]"',
		'echo "[🏷node:${DETECTED_NODE_VERSION}]"',
		'echo "[🏷deno:${DETECTED_DENO_VERSION}]"',
		'echo "[🏷yarn:${DETECTED_YARN_VERSION}]"',
		'echo "[🏷ruby-bundler:${DETECTED_BUNDLE_VERSION}]"',
		'echo "[🏷ruby:${DETECTED_RUBY_VERSION}]"',
		/* eslint-enable no-template-curly-in-string */
		"echo '$ npm run build'",
		'npm run build',
		"echo '$ cd /usr/local/__site/src/'",
		'cd /usr/local/__site/src/',
		'__CURRENT_NVM_VERSION=$(nvm current)',
		'nvm use default > /dev/null',
		"echo '$ npx @cloudcannon/reader --output \"public\"'",
		'npx @cloudcannon/reader --output "public"',
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

test('outputs with @next config', () => {
	expect(runScriptCommands({ use_beta_plugin: true, input: 'src' })).toEqual([
		'echo "$ source .cloudcannon/preinstall"',
		'if [ -f ".cloudcannon/preinstall" ]; then source .cloudcannon/preinstall; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',
		"echo '$ npm install'",
		'npm install',
		"echo '$ cd /usr/local/__site/src/'",
		'cd /usr/local/__site/src/',
		'echo "$ source .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then source .cloudcannon/prebuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',
		"DETECTED_NPM_VERSION=$((npm -v 2> /dev/null || echo 'unknown') | sed \"s/[][]//g\")",
		'DETECTED_NODE_VERSION=$((node -v 2> /dev/null || echo \'unknown\') | sed "s/[][]//g" | sed "s/^v//")',
		'DETECTED_DENO_VERSION=$((deno -V 2> /dev/null || echo \'unknown\') | sed "s/[][]//g" | sed "s/^deno //")',
		"DETECTED_YARN_VERSION=$(yarn -v 2> /dev/null || echo 'unknown')",
		'DETECTED_BUNDLE_VERSION=$((bundle -v 2> /dev/null || echo \'unknown\') | sed "s/[][]//g" | sed "s/^Bundler version //g")',
		'DETECTED_RUBY_VERSION=$((ruby -v 2> /dev/null || echo \'unknown\') | sed "s/[][]//g" | sed "s/^ruby //g" | cut -d " " -f 1)',
		/* eslint-disable no-template-curly-in-string */
		'echo "[🏷npm:${DETECTED_NPM_VERSION}]"',
		'echo "[🏷node:${DETECTED_NODE_VERSION}]"',
		'echo "[🏷deno:${DETECTED_DENO_VERSION}]"',
		'echo "[🏷yarn:${DETECTED_YARN_VERSION}]"',
		'echo "[🏷ruby-bundler:${DETECTED_BUNDLE_VERSION}]"',
		'echo "[🏷ruby:${DETECTED_RUBY_VERSION}]"',
		/* eslint-enable no-template-curly-in-string */
		"echo '$ npm run build'",
		'npm run build',
		"echo '$ cd /usr/local/__site/src/'",
		'cd /usr/local/__site/src/',
		'__CURRENT_NVM_VERSION=$(nvm current)',
		'nvm use default > /dev/null',
		"echo '$ npx @cloudcannon/reader@next --output \"public\"'",
		'npx @cloudcannon/reader@next --output "public"',
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
