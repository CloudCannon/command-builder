function template(path) {
	return [
		`echo "$ bash ${path}"`,
		`if [ -f "${path}" ]; then`,
		`  bash -l ${path}`,
		'else',
		'  echo "Not found."',
		'fi'
	].join('\n');
}

module.exports = class Compiler {
	static getPreinstallCommands() {
		return template('.cloudcannon/preinstall');
	}

	static getPrebuildCommands() {
		return template('.cloudcannon/prebuild');
	}

	static getLegacyPrebuildCommands() {
		return [
			'if [ -f "_cloudcannon-prebuild.sh" ]; then',
			'  echo "$ bash _cloudcannon-prebuild.sh"',
			'  echo "DEPRECATED: _cloudcannon-prebuild.sh should be moved to .cloudcannon/prebuild"',
			'  bash -l _cloudcannon-prebuild.sh',
			'fi'
		].join('\n');
	}

	static getExportCommands() {
		return [
			'echo "[☁️Start Export]"',
			'echo "{"',
			'echo "\\"syncPaths\\": \\"$SYNC_PATHS\\""',
			'echo "}"'
		].join('\n');
	}
	
	static getPostbuildCommands() {
		return template('.cloudcannon/postbuild');
	}

	static getInputState() {
		return 'src';
	}

	static getOutputState() {
		return 'compiled';
	}
};
