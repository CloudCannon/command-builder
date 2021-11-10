const INPUT_STATE = 'compiled';
const OUTPUT_STATE = 'seeded';

module.exports = class Reseed {
	static runScriptCommands(buildConfig) {
		const sourcePath = `/usr/local/__site/${INPUT_STATE}/`;
		const destinationPath = `/usr/local/__site/${OUTPUT_STATE}/`;
		const buildCommand = `reseed build -b ${buildConfig.baseurl} -s ${sourcePath} -d ${destinationPath} --yes`;

		const commands = [
			'echo "$ node -v"',
			'node -v',

			'echo "$ npm -v"',
			'npm -v',

			'echo "$ npm view reseed version"',
			'npm view reseed version'
		];

		if (!buildConfig.baseurl) {
			commands.push(
				'echo "⚙️ Reseed configuration invalid, please add a subpath"',
				'exit 1'
			);
		} else {
			commands.push(
				`echo "$ rm -rf $(ls -A ${destinationPath})"`,
				`cd ${destinationPath}`,
				`rm -rf $(ls -A ${destinationPath})`,
				'cd /usr/local/__site/',

				`echo "$ ${buildCommand}"`,
				buildCommand
			);
		}

		return commands;
	}
};
