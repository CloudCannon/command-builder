module.exports = class Compiler {
	static getPrebuildCommands() {
		return [
			'\tif [ -f "_cloudcannon-prebuild.sh" ]; then',
			'\t\techo "$ bash _cloudcannon-prebuild.sh"',
			'\t\techo "Starting prebuild script..."',
			'\t\tbash -l _cloudcannon-prebuild.sh',
			'\tfi'
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

	static getInputState() {
		return 'src';
	}

	static getOutputState() {
		return 'compiled';
	}
};
