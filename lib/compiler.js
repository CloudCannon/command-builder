module.exports = class Compiler {
	static getPreinstallCommands() {
		return [
			'\tif [ -f ".cloudcannon/preinstall" ]; then',
			'\t\techo "$ bash .cloudcannon/preinstall"',
			'\t\tbash -l .cloudcannon/preinstall',
			'\tfi'
		].join('\n');
	}

	static getPrebuildCommands() {
		return [
			'\tif [ -f "_cloudcannon-prebuild.sh" ]; then',
			'\t\techo "$ bash _cloudcannon-prebuild.sh"',
			'\t\tbash -l _cloudcannon-prebuild.sh',
			'\tfi',
			'\tif [ -f ".cloudcannon/prebuild" ]; then',
			'\t\techo "$ bash .cloudcannon/prebuild"',
			'\t\tbash -l .cloudcannon/prebuild',
			'\tfi'
		].join('\n');
	}

	static getPostbuildCommands() {
		return [
			'\tif [ -f ".cloudcannon/postbuild" ]; then',
			'\t\techo "$ bash .cloudcannon/postbuild"',
			'\t\tbash -l .cloudcannon/postbuild',
			'\tfi'
		].join('\n');
	}

	static getInputState() {
		return 'src';
	}

	static getOutputState() {
		return 'compiled';
	}
};
