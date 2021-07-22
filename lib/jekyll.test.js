const { runScriptCommands } = require('./jekyll');

test('outputs with empty config', () => {
	expect(runScriptCommands()).toEqual([
		'echo "$ export JEKYLL_ENV="production""',
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
		'echo "$ bash .cloudcannon/preinstall"\nif [ -f ".cloudcannon/preinstall" ]; then\n  bash -l .cloudcannon/preinstall\nelse\n  echo "Not found."\nfi',
		'if [ "$USE_BUNDLE" = true ]; then',
		'  echo "$ bundle version"',
		'  bundle version',
		'  echo "$ bundle config --global jobs 4"',
		'  bundle config --global jobs 4 && echo "Configured concurrent installs!"',
		'  echo "$ bundle config build.nokogiri --use-system-libraries"',
		'  bundle config build.nokogiri --use-system-libraries && echo "Configured nokogiri flag!"',
		'  echo "$ bundle install"\n  bundle install',

		'if [ -f "_cloudcannon-prebuild.sh" ]; then\n  echo "$ bash _cloudcannon-prebuild.sh"\n  echo "DEPRECATED: _cloudcannon-prebuild.sh should be moved to .cloudcannon/prebuild"\n  bash -l _cloudcannon-prebuild.sh\nfi',
		'echo "$ bash .cloudcannon/prebuild"\nif [ -f ".cloudcannon/prebuild" ]; then\n  bash -l .cloudcannon/prebuild\nelse\n  echo "Not found."\nfi',

		'  echo "$ bundle exec jekyll build "',
		'  bundle exec jekyll build --destination /usr/local/__site/compiled/ ',
		'else',

		'if [ -f "_cloudcannon-prebuild.sh" ]; then\n  echo "$ bash _cloudcannon-prebuild.sh"\n  echo "DEPRECATED: _cloudcannon-prebuild.sh should be moved to .cloudcannon/prebuild"\n  bash -l _cloudcannon-prebuild.sh\nfi',
		'echo "$ bash .cloudcannon/prebuild"\nif [ -f ".cloudcannon/prebuild" ]; then\n  bash -l .cloudcannon/prebuild\nelse\n  echo "Not found."\nfi',

		'  echo "$ jekyll build ";',
		'  jekyll build --destination /usr/local/__site/compiled/ ',
		'fi',
		'echo "$ bash .cloudcannon/postbuild"\nif [ -f ".cloudcannon/postbuild" ]; then\n  bash -l .cloudcannon/postbuild\nelse\n  echo "Not found."\nfi'
	]);
});

test('outputs with enable_bundle_cache or use_local_bundle', () => {
	const expected = [
		'echo "$ export JEKYLL_ENV="production""',
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
		'echo "$ bash .cloudcannon/preinstall"\nif [ -f ".cloudcannon/preinstall" ]; then\n  bash -l .cloudcannon/preinstall\nelse\n  echo "Not found."\nfi',
		'if [ "$USE_BUNDLE" = true ]; then',
		'  echo "$ bundle version"',
		'  bundle version',
		'  echo "$ bundle config --global jobs 4"',
		'  bundle config --global jobs 4 && echo "Configured concurrent installs!"',
		'  echo "$ bundle config build.nokogiri --use-system-libraries"',
		'  bundle config build.nokogiri --use-system-libraries && echo "Configured nokogiri flag!"',
		'  if [[ $DETECTED_BUNDLE_VERSION == *"Bundler version 1."* ]]; then\n    echo "$ bundle install --path /usr/local/__bundle"\n    bundle install --path /usr/local/__bundle\n  else\n    echo "$ bundle config set path /usr/local/__bundle"\n    bundle config set path /usr/local/__bundle\n    echo "$ bundle install"\n    bundle install\n  fi\n  echo "$ bundle clean"\n  bundle clean && echo "All clean!"',

		'if [ -f "_cloudcannon-prebuild.sh" ]; then\n  echo "$ bash _cloudcannon-prebuild.sh"\n  echo "DEPRECATED: _cloudcannon-prebuild.sh should be moved to .cloudcannon/prebuild"\n  bash -l _cloudcannon-prebuild.sh\nfi',
		'echo "$ bash .cloudcannon/prebuild"\nif [ -f ".cloudcannon/prebuild" ]; then\n  bash -l .cloudcannon/prebuild\nelse\n  echo "Not found."\nfi',

		'  echo "$ bundle exec jekyll build "',
		'  bundle exec jekyll build --destination /usr/local/__site/compiled/ ',
		'else',

		'if [ -f "_cloudcannon-prebuild.sh" ]; then\n  echo "$ bash _cloudcannon-prebuild.sh"\n  echo "DEPRECATED: _cloudcannon-prebuild.sh should be moved to .cloudcannon/prebuild"\n  bash -l _cloudcannon-prebuild.sh\nfi',
		'echo "$ bash .cloudcannon/prebuild"\nif [ -f ".cloudcannon/prebuild" ]; then\n  bash -l .cloudcannon/prebuild\nelse\n  echo "Not found."\nfi',

		'  echo "$ jekyll build ";',
		'  jekyll build --destination /usr/local/__site/compiled/ ',
		'fi',
		'echo "$ bash .cloudcannon/postbuild"\nif [ -f ".cloudcannon/postbuild" ]; then\n  bash -l .cloudcannon/postbuild\nelse\n  echo "Not found."\nfi'
	];

	expect(runScriptCommands({ enable_bundle_cache: true })).toEqual(expected);
	expect(runScriptCommands({ use_local_bundle: true })).toEqual(expected);
});
