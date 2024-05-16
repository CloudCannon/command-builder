const Compiler = require('./compiler');
const Parser = require('../helpers/parser');

function bundleInstallCommands(buildConfig) {
	if (buildConfig.enable_bundle_cache || buildConfig.use_local_bundle) {
		return [
			'  if [[ $DETECTED_BUNDLE_VERSION == "1."* ]]; then',
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

			...Compiler.getPreinstallCommands(buildConfig),

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
			...Compiler.getCheckCommands(),
			`  echo "$ jekyll build ${buildOptions}";`,
			`  jekyll build ${buildOptions}`,
			'fi',
			...Compiler.getPostbuildCommands(),
			...Compiler.getOutputCommands(buildOutputPath, buildConfig.preserveOutput),
			...Compiler.getExportCommands()
		];
	}
};
