const Compiler = require('./compiler');
const Parser = require('../helpers/parser');

function bundleInstallCommands(buildConfig) {
	if (buildConfig.enable_bundle_cache || buildConfig.use_local_bundle) {
		return [
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
			'  bundle clean && echo "All clean!"'
		];
	}

	return [
		'  echo "$ bundle install"',
		'  bundle install'
	];
}

module.exports = class Jekyll {
	static runScriptCommands(buildConfig = {}, options = {}) {
		const inputPath = Compiler.getInputPath();
		const buildOptions = Parser.parseOptions('jekyll', buildConfig);
		const environment = buildConfig.jekyll_environment?.replace(/[^a-zA-Z]/, '') || 'production';
		const buildOutputPath = options.destination || '_site';

		return [
			`echo "$ export JEKYLL_ENV=\\"${environment}\\""`,
			`export JEKYLL_ENV="${environment}"`,

			'if [ -f ".ruby-version" ]; then',
			'  echo "$ ruby -v (Using .ruby-version)"',
			'  ruby -v || (echo "\\nPlease use one of the following versions:\\n" && rbenv versions 2> /dev/null && false)',
			'else',
			'  echo "$ ruby -v (No ruby version specified)"',
			'  ruby -v',
			'fi',

			'DETECTED_BUNDLE_VERSION=$(bundle version | sed \'s/[][]//g\')',
			'DETECTED_RUBY_VERSION=$(ruby -v | sed \'s/[][]//g\')',

			// eslint-disable-next-line no-template-curly-in-string
			'echo "[🏷bundler:${DETECTED_BUNDLE_VERSION}]"',

			// eslint-disable-next-line no-template-curly-in-string
			'echo "[🏷ruby:${DETECTED_RUBY_VERSION}]"',

			`if [ -d "${options.bundleFolderPath}" ]; then`,
			`  echo "$ rm -rf ${options.bundleFolderPath}"`,
			`  rm -rf ${options.bundleFolderPath}`,
			'fi',

			'USE_BUNDLE=false',
			`if [ -f ${inputPath}"$BUNDLE_GEMFILE" ]; then`,
			`  echo "$ export BUNDLE_GEMFILE=${inputPath}$BUNDLE_GEMFILE"`,
			`  export BUNDLE_GEMFILE=${inputPath}"$BUNDLE_GEMFILE"`,
			'  USE_BUNDLE=true',
			`elif [ -f ${inputPath}Gemfile ]; then`,
			'  USE_BUNDLE=true',
			'fi',

			...Compiler.getPreinstallCommands(),

			'if [ "$USE_BUNDLE" = true ]; then',
			'  echo "$ bundle version"',
			'  bundle version',

			'  echo "$ bundle config --global jobs 4"',
			'  bundle config --global jobs 4 && echo "Configured concurrent installs!"',

			'  echo "$ bundle config build.nokogiri --use-system-libraries"',
			'  bundle config build.nokogiri --use-system-libraries && echo "Configured nokogiri flag!"',

			...bundleInstallCommands(buildConfig),

			...Compiler.getLegacyPrebuildCommands(),
			...Compiler.getPrebuildCommands(),
			`  echo "$ bundle exec jekyll build ${buildOptions}"`,
			`  bundle exec jekyll build ${buildOptions}`,
			'else',
			...Compiler.getLegacyPrebuildCommands(),
			...Compiler.getPrebuildCommands(),
			`  echo "$ jekyll build ${buildOptions}";`,
			`  jekyll build ${buildOptions}`,
			'fi',
			...Compiler.getPostbuildCommands(),
			...Compiler.getOutputCommands(buildOutputPath, buildConfig.preserveOutput),
			...Compiler.getExportCommands()
		];
	}
};
