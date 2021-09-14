const path = require('path');

const INPUT_STATE = 'compiled';
const LOCALE_FILES_STATE = 'rosey-locales';
const OUTPUT_STATE = 'i18n';

module.exports = class Rosey {
	static runScriptCommands(buildConfig) {
		const sourcePath = Rosey.getSourcePath();
		const sourceLocalePath = path.join(Rosey.getSourceLocalPath(), buildConfig.locale_source);
		const destinationPath = Rosey.getDestinationPath();
		const sourceDestinationPath = path.join(destinationPath, 'cms-current-locale.json');

		const generateCommand = `rosey generate --source ${sourcePath} --tag ${buildConfig.tag}  --version ${buildConfig.version} --locale-dest ${sourceDestinationPath}`;
		const buildCommand = `rosey build --locale-source ${sourceLocalePath} --source ${sourcePath} --tag ${buildConfig.tag} --default-language ${buildConfig.default_language} --version ${buildConfig.version} --dest ${destinationPath} --yes --overwrite`;
		const fallbackBuildCommand = `cp -R ${sourcePath}/* ${destinationPath}`;

		const commands = [
			'echo "$ node -v"',
			'node -v',

			'echo "$ npm -v"',
			'npm -v',

			'echo "$ npm view rosey version"',
			'npm view rosey version'
		];

		if (buildConfig.prevent_generate && buildConfig.prevent_build) {
			commands.push(
				'echo "⚙️ Rosey configuration invalid, please enable generate or build commands"',
				'exit 1'
			);
		} else {
			commands.push(
				`echo "$ ls ${sourceLocalePath}"`,
				`ls ${sourceLocalePath}`,

				`echo "$ rm -rf ${destinationPath}"`,
				`rm -rf ${destinationPath}`
			);

			if (!buildConfig.prevent_build) {
				commands.push(
					`echo "$ ${buildCommand}"`,
					buildCommand
				);
			} else {
				commands.push(
					'echo "Skipping build command, copying files over instead"',
					`echo "$ ${fallbackBuildCommand}"`,
					fallbackBuildCommand
				);
			}

			if (!buildConfig.prevent_generate) {
				commands.push(
					`echo "$ ${generateCommand}"`,
					generateCommand
				);
			} else {
				commands.push(
					'echo "Skipping generate command"',
					`echo "$ ${fallbackBuildCommand}"`,
					fallbackBuildCommand
				);
			}
		}

		return commands;
	}

	static getSourcePath() {
		return path.join(Rosey.getLocalSitePath(), INPUT_STATE);
	}

	static getSourceLocalPath() {
		return path.join(Rosey.getLocalSitePath(), LOCALE_FILES_STATE);
	}

	static getDestinationPath() {
		return path.join(Rosey.getLocalSitePath(), OUTPUT_STATE);
	}

	static getLocalSitePath() {
		return '/usr/local/__site/';
	}
};
