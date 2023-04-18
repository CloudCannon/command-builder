module.exports = class Compiler {
	static hookCommands(path) {
		return [
			`echo "$ source ${path}"`,
			`if [ -f "${path}" ]; then source ${path}; else echo "Not found."; fi`,
			`echo "$ cd ${Compiler.getInputPath()}"`,
			`cd ${Compiler.getInputPath()}`
		];
	}

	static getPreinstallCommands() {
		return Compiler.hookCommands('.cloudcannon/preinstall');
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
