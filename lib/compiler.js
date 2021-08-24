function hookCommands(path) {
	return [
		`echo "$ source ${path}"`,
		`if [ -f "${path}" ]; then source ${path}; else echo "Not found."; fi`
	];
}

module.exports = class Compiler {
	static getPreinstallCommands() {
		return hookCommands('.cloudcannon/preinstall');
	}

	static getPrebuildCommands() {
		return hookCommands('.cloudcannon/prebuild');
	}

	static getPostbuildCommands() {
		return hookCommands('.cloudcannon/postbuild');
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

	static getOutputCommands(outputPath) {
		const dest = `/usr/local/__site/${Compiler.getOutputState()}/`;

		return [
			`rm -rf ${dest}`,
			`mkdir -p ${dest}`,
			`[ -z "$(ls ${outputPath})" ] || mv ${outputPath}/* ${dest}`
		];
	}

	static getInputState() {
		return 'src';
	}

	static getOutputState() {
		return 'compiled';
	}
};
