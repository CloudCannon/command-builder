const { runScriptCommands } = require('./jekyll');

test('outputs with empty config', () => {
	expect(runScriptCommands()).toEqual([
		'echo "$ export JEKYLL_ENV=\\"production\\""',
		'export JEKYLL_ENV="production"',
		'if [ -f ".ruby-version" ]; then',
		'  echo "$ ruby -v (Using .ruby-version)"',
		'  ruby -v || (echo "\\nPlease use one of the following versions:\\n" && rbenv versions 2> /dev/null && false)',
		'else',
		'  echo "$ ruby -v (No ruby version specified)"',
		'  ruby -v',
		'fi',
		"DETECTED_BUNDLE_VERSION=$(bundle version | sed 's/[][]//g')",
		"DETECTED_RUBY_VERSION=$(ruby -v | sed 's/[][]//g')",
		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷bundler:${DETECTED_BUNDLE_VERSION}]"',
		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷ruby:${DETECTED_RUBY_VERSION}]"',
		'if [ -d "undefined" ]; then',
		'  echo "$ rm -rf undefined"',
		'  rm -rf undefined',
		'fi',
		'USE_BUNDLE=false',
		'if [ -f /usr/local/__site/src/"$BUNDLE_GEMFILE" ]; then',
		'  echo "$ export BUNDLE_GEMFILE=/usr/local/__site/src/$BUNDLE_GEMFILE"',
		'  export BUNDLE_GEMFILE=/usr/local/__site/src/"$BUNDLE_GEMFILE"',
		'  USE_BUNDLE=true',
		'elif [ -f /usr/local/__site/src/Gemfile ]; then',
		'  USE_BUNDLE=true',
		'fi',

		'echo "$ source .cloudcannon/preinstall"',
		'if [ -f ".cloudcannon/preinstall" ]; then source .cloudcannon/preinstall; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'if [ "$USE_BUNDLE" = true ]; then',
		'  echo "$ bundle version"',
		'  bundle version',
		'  echo "$ bundle config --global jobs 4"',
		'  bundle config --global jobs 4 && echo "Configured concurrent installs!"',
		'  echo "$ bundle config build.nokogiri --use-system-libraries"',
		'  bundle config build.nokogiri --use-system-libraries && echo "Configured nokogiri flag!"',
		'  echo "$ bundle install"',
		'  bundle install',

		'if [ -f "_cloudcannon-prebuild.sh" ]; then',
		'  echo "$ bash _cloudcannon-prebuild.sh"',
		'  echo "DEPRECATED: _cloudcannon-prebuild.sh should be moved to .cloudcannon/prebuild"',
		'  bash -l _cloudcannon-prebuild.sh',
		'fi',

		'echo "$ source .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then source .cloudcannon/prebuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'  echo "$ bundle exec jekyll build "',
		'  bundle exec jekyll build ',
		'else',

		'if [ -f "_cloudcannon-prebuild.sh" ]; then',
		'  echo "$ bash _cloudcannon-prebuild.sh"',
		'  echo "DEPRECATED: _cloudcannon-prebuild.sh should be moved to .cloudcannon/prebuild"',
		'  bash -l _cloudcannon-prebuild.sh',
		'fi',

		'echo "$ source .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then source .cloudcannon/prebuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'  echo "$ jekyll build ";',
		'  jekyll build ',
		'fi',

		'echo "$ source .cloudcannon/postbuild"',
		'if [ -f ".cloudcannon/postbuild" ]; then source .cloudcannon/postbuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',
		'find /usr/local/__site/compiled/ -mindepth 1 -delete',
		'shopt -s dotglob',
		'[ -z "$(ls _site)" ] || mv _site/* /usr/local/__site/compiled/',
		'shopt -u dotglob',
		'echo "[☁️Start Export]"',
		'echo "{"',
		'echo "\\"syncPaths\\": \\"$SYNC_PATHS\\""',
		'echo "}"'
	]);
});

test('outputs with enable_bundle_cache or use_local_bundle', () => {
	const expected = [
		'echo "$ export JEKYLL_ENV=\\"production\\""',
		'export JEKYLL_ENV="production"',
		'if [ -f ".ruby-version" ]; then',
		'  echo "$ ruby -v (Using .ruby-version)"',
		'  ruby -v || (echo "\\nPlease use one of the following versions:\\n" && rbenv versions 2> /dev/null && false)',
		'else',
		'  echo "$ ruby -v (No ruby version specified)"',
		'  ruby -v',
		'fi',
		"DETECTED_BUNDLE_VERSION=$(bundle version | sed 's/[][]//g')",
		"DETECTED_RUBY_VERSION=$(ruby -v | sed 's/[][]//g')",
		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷bundler:${DETECTED_BUNDLE_VERSION}]"',
		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷ruby:${DETECTED_RUBY_VERSION}]"',
		'if [ -d "undefined" ]; then',
		'  echo "$ rm -rf undefined"',
		'  rm -rf undefined',
		'fi',
		'USE_BUNDLE=false',
		'if [ -f /usr/local/__site/src/"$BUNDLE_GEMFILE" ]; then',
		'  echo "$ export BUNDLE_GEMFILE=/usr/local/__site/src/$BUNDLE_GEMFILE"',
		'  export BUNDLE_GEMFILE=/usr/local/__site/src/"$BUNDLE_GEMFILE"',
		'  USE_BUNDLE=true',
		'elif [ -f /usr/local/__site/src/Gemfile ]; then',
		'  USE_BUNDLE=true',
		'fi',

		'echo "$ source .cloudcannon/preinstall"',
		'if [ -f ".cloudcannon/preinstall" ]; then source .cloudcannon/preinstall; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'if [ "$USE_BUNDLE" = true ]; then',
		'  echo "$ bundle version"',
		'  bundle version',
		'  echo "$ bundle config --global jobs 4"',
		'  bundle config --global jobs 4 && echo "Configured concurrent installs!"',
		'  echo "$ bundle config build.nokogiri --use-system-libraries"',
		'  bundle config build.nokogiri --use-system-libraries && echo "Configured nokogiri flag!"',
		'  if [[ $DETECTED_BUNDLE_VERSION == *"Bundler version 1."* ]]; then',
		'    echo "$ bundle install --path /usr/local/__bundle"',
		'    bundle install --path /usr/local/__bundle',
		'  else',
		'    echo "$ bundle config set path /usr/local/__bundle"',
		'    bundle config set path /usr/local/__bundle',
		'    echo "$ bundle install"',
		'    bundle install',
		'  fi',

		'  echo "$ bundle clean"',
		'  bundle clean && echo "All clean!"',

		'if [ -f "_cloudcannon-prebuild.sh" ]; then',
		'  echo "$ bash _cloudcannon-prebuild.sh"',
		'  echo "DEPRECATED: _cloudcannon-prebuild.sh should be moved to .cloudcannon/prebuild"',
		'  bash -l _cloudcannon-prebuild.sh',
		'fi',

		'echo "$ source .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then source .cloudcannon/prebuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'  echo "$ bundle exec jekyll build "',
		'  bundle exec jekyll build ',
		'else',

		'if [ -f "_cloudcannon-prebuild.sh" ]; then',
		'  echo "$ bash _cloudcannon-prebuild.sh"',
		'  echo "DEPRECATED: _cloudcannon-prebuild.sh should be moved to .cloudcannon/prebuild"',
		'  bash -l _cloudcannon-prebuild.sh',
		'fi',

		'echo "$ source .cloudcannon/prebuild"',
		'if [ -f ".cloudcannon/prebuild" ]; then source .cloudcannon/prebuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',

		'  echo "$ jekyll build ";',
		'  jekyll build ',
		'fi',

		'echo "$ source .cloudcannon/postbuild"',
		'if [ -f ".cloudcannon/postbuild" ]; then source .cloudcannon/postbuild; else echo "Not found."; fi',
		'echo "$ cd /usr/local/__site/src/"',
		'cd /usr/local/__site/src/',
		'find /usr/local/__site/compiled/ -mindepth 1 -delete',
		'shopt -s dotglob',
		'[ -z "$(ls _site)" ] || mv _site/* /usr/local/__site/compiled/',
		'shopt -u dotglob',

		'echo "[☁️Start Export]"',
		'echo "{"',
		'echo "\\"syncPaths\\": \\"$SYNC_PATHS\\""',
		'echo "}"'
	];

	expect(runScriptCommands({ enable_bundle_cache: true })).toEqual(expected);
	expect(runScriptCommands({ use_local_bundle: true })).toEqual(expected);
});
