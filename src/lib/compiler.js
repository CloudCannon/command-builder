const versionOptions = require('../options/version-options');

module.exports = class Compiler {
	static hookCommands(path) {
		return [
			`echo "$ source ${path}"`,
			`if [ -f "${path}" ]; then source ${path}; else echo "Not found."; fi`,
			`echo "$ cd ${Compiler.getInputPath()}"`,
			`cd ${Compiler.getInputPath()}`
		];
	}

	static getVersionCommands(buildConfig) {
		return Object.entries(versionOptions).flatMap(([name, options]) => {
			if (buildConfig[name] && buildConfig[name] !== options.default) {
				const command = options.getVersionCommand(buildConfig[name]);
				if (!command) {
					return [];
				}

				return [
					`echo "$ ${command}"`,
					command
				];
			}

			return [];
		});
	}

	static getCheckCommands() {
		const result = Object.entries(versionOptions).flatMap(([name, options]) => {
			const shortName = name.slice(0, -7);
			return [
				`DETECTED_${shortName}_VERSION=${options.checkCommand}`,
				`echo "[🏷${shortName}:\${DETECTED_${shortName}_VERSION}]"`
			];
		});

		result.push(
			"DETECTED_NPM_VERSION=$((npm -v 2> /dev/null || echo 'unknown') | sed \"s/[][]//g\")",
			"DETECTED_YARN_VERSION=$(yarn -v 2> /dev/null || echo 'unknown')",
			'DETECTED_BUNDLE_VERSION=$((bundle -v 2> /dev/null || echo \'unknown\') | sed "s/[][]//g" | sed "s/^Bundler version //g")',

			/* eslint-disable no-template-curly-in-string */
			'echo "[🏷npm:${DETECTED_NPM_VERSION}]"',
			'echo "[🏷yarn:${DETECTED_YARN_VERSION}]"',
			'echo "[🏷bundler:${DETECTED_BUNDLE_VERSION}]"'
			/* eslint-enable no-template-curly-in-string */
		);

		return result;
	}

	static getPreinstallCommands(buildConfig = {}) {
		return [
			...Compiler.getVersionCommands(buildConfig),
			...Compiler.hookCommands('.cloudcannon/preinstall')
		];
	}

	static getPrebuildCommands() {
		return Compiler.hookCommands('.cloudcannon/prebuild');
	}

	static getPostbuildCommands() {
		return Compiler.hookCommands('.cloudcannon/postbuild');
	}

	static getLegacyPrebuildCommands() {
		return [
			'if [ -f "_cloudcannon-prebuild.sh" ]; then',
			'  echo "$ bash _cloudcannon-prebuild.sh"',
			'  echo "DEPRECATED: _cloudcannon-prebuild.sh should be moved to .cloudcannon/prebuild"',
			'  bash -l _cloudcannon-prebuild.sh',
			'fi'
		];
	}

	static getExportCommands() {
		return [
			'echo "[☁️Start Export]"',
			'echo "{"',
			'echo "\\"syncPaths\\": \\"$SYNC_PATHS\\""',
			'echo "}"'
		];
	}

	static getOutputCommands(buildOutputPath, preserveOutput = false) {
		const outputPath = Compiler.getOutputPath();
		const action = preserveOutput ? 'cp -R' : 'mv';

		return [
			`find ${outputPath} -mindepth 1 -delete`,
			'shopt -s dotglob extglob',
			`__OUTPUT_DIR_CONTENT=$(ls "${buildOutputPath}")`,
			`[ -z "$__OUTPUT_DIR_CONTENT" ] || ${action} "${buildOutputPath}"/!(.cloudcannon|..|.) ${outputPath}`,
			'unset __OUTPUT_DIR_CONTENT',
			'shopt -u dotglob extglob'
		];
	}

	static getInputState() {
		return 'src';
	}

	static getOutputState() {
		return 'compiled';
	}

	static getInputPath() {
		return `/usr/local/__site/${Compiler.getInputState()}/`;
	}

	static getOutputPath() {
		return `/usr/local/__site/${Compiler.getOutputState()}/`;
	}
};
