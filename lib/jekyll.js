const Compiler = require('./compiler');
const Parser = require('../helpers/parser');

module.exports = class Jekyll {
	static runScriptCommands(buildConfig, options) {
		const inputState = Compiler.getInputState();
		const outputState = Compiler.getOutputState();

		const jekyllArguments = Parser.parseOptions('jekyll', buildConfig);
		const environment = buildConfig.jekyll_environment.replace(/[^a-zA-Z]/, '');

		const commands = [];

		commands.push(
			// eslint-disable-next-line no-useless-escape
			`echo "$ export JEKYLL_ENV=\"${environment}\""`,
			`export JEKYLL_ENV="${environment}"`,
			'if [ -f ".ruby-version" ]; then',
			'\techo "$ ruby -v (Using .ruby-version)"',
			'\truby -v || (echo "\\nPlease use one of the following versions:\\n" && rbenv versions 2> /dev/null && false)',
			'else',
			'\techo "$ ruby -v (No ruby version specified)"',
			'\truby -v',
			'fi'
		);

		const { bundleFolderPath } = options;
		commands.push(
			'DETECTED_BUNDLE_VERSION=$(bundle version | sed \'s/[][]//g\')',
			'DETECTED_RUBY_VERSION=$(ruby -v | sed \'s/[][]//g\')',

			// eslint-disable-next-line no-template-curly-in-string
			'echo "[🏷bundler:${DETECTED_BUNDLE_VERSION}]"',

			// eslint-disable-next-line no-template-curly-in-string
			'echo "[🏷ruby:${DETECTED_RUBY_VERSION}]"',

			`if [ -d "${bundleFolderPath}" ]; then`,
			`\techo "$ rm -rf ${bundleFolderPath}"`,
			`\trm -rf ${bundleFolderPath}`,
			'fi',
			// 'exit 1',

			'USE_BUNDLE=false',
			`if [ -f /usr/local/__site/${inputState}/"$BUNDLE_GEMFILE" ]; then`,
			`\techo "$ export BUNDLE_GEMFILE=/usr/local/__site/${inputState}/$BUNDLE_GEMFILE"`,
			`\texport BUNDLE_GEMFILE=/usr/local/__site/${inputState}/"$BUNDLE_GEMFILE"`,
			'\tUSE_BUNDLE=true',
			`elif [ -f /usr/local/__site/${inputState}/Gemfile ]; then`,
			'\tUSE_BUNDLE=true',
			'fi',

			Compiler.getPreinstallCommands(),

			'if [ "$USE_BUNDLE" = true ]; then',
			'\techo "$ bundle version"',
			'\tbundle version',

			'\techo "$ bundle config --global jobs 4"',
			'\tbundle config --global jobs 4 && echo "Configured concurrent installs!"',

			'\techo "$ bundle config build.nokogiri --use-system-libraries"',
			'\tbundle config build.nokogiri --use-system-libraries && echo "Configured nokogiri flag!"',

			Jekyll.bundleInstallCommands(buildConfig),

			Compiler.getPrebuildCommands(),
			`\techo "$ bundle exec jekyll build ${jekyllArguments}"`,
			`\tbundle exec jekyll build --destination /usr/local/__site/${outputState}/ ${jekyllArguments}`,
			'else',
			Compiler.getPrebuildCommands(),
			`\techo "$ jekyll build ${jekyllArguments}";`,
			`\tjekyll build --destination /usr/local/__site/${outputState}/ ${jekyllArguments}`,
			'fi',
			Compiler.getPostbuildCommands()
		);

		return commands;
	}

	static bundleInstallCommands(buildConfig) {
		const useLocalBundle = buildConfig.enable_bundle_cache || buildConfig.use_local_bundle;
		let bundleInstall = [
			'\t\techo "$ bundle install"',
			'\t\tbundle install'
		].join('\n');

		if (useLocalBundle) {
			bundleInstall = [
				'\tif [[ $DETECTED_BUNDLE_VERSION == *"Bundler version 1."* ]]; then',
				'\t\techo "$ bundle install --path /usr/local/__bundle"',
				'\t\tbundle install --path /usr/local/__bundle',
				'\telse',
				'\t\techo "$ bundle config set path /usr/local/__bundle"',
				'\t\tbundle config set path /usr/local/__bundle',
				'\t\techo "$ bundle install"',
				'\t\tbundle install',
				'\tfi',

				'\techo "$ bundle clean"',
				'\tbundle clean && echo "All clean!"'
			].join('\n');
		}
		return bundleInstall;
	}
};
