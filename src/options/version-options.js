const versionOptions = {
	hugoVersion: {
		name: 'Hugo version',
		type: 'string',
		default: '0.128.1',
		checkCommand:
      "$((hugo version 2> /dev/null || echo 'unknown') | sed 's/[][]//g' | sed 's/^hugo v//' | cut -d ' ' -f 1 | cut -d '-' -f 1)",
		getVersionCommand: (version) => `install-hugo ${version}`,
		migrateVersion: (version) => ({ version, message: [] })
	},
	rubyVersion: {
		name: 'Ruby version',
		type: 'select',
		default: '2.7.3',
		checkCommand:
      '$((ruby -v 2> /dev/null || echo \'unknown\') | sed "s/[][]//g" | sed "s/^ruby //g" | cut -d " " -f 1 | cut -d "p" -f 1)',
		getVersionCommand: (version) => (version !== 'file' ? `rbenv local ${version}` : null),
		migrateVersion: (version) => ({ version, message: [] }),
		options: [
			{
				value: '2.6.7'
			},
			{
				value: '2.7.3'
			},
			{
				value: '3.0.1'
			},
			{
				value: '3.1.3'
			},
			{
				value: '3.2.0'
			},
			{
				name: 'Use my .ruby-version file',
				value: 'file'
			}
		]
	},
	nodeVersion: {
		name: 'Node version',
		type: 'select',
		default: '18',
		checkCommand:
      '$((node -v 2> /dev/null || echo \'unknown\') | sed "s/[][]//g" | sed "s/^v//")',
		getVersionCommand: (version) => (version !== 'file'
			? `nvm use ${version}`
			: '[ -f .nvmrc ] && nvm install'),
		migrateVersion: (version) => {
			if (version === '10' || version === '12') {
				return {
					version: '14',
					message: [
						`echo "$ nvm use ${version}"`,
						`echo 'Node version ${version} is no longer supported. Falling back to Node version 14.'`
					]
				};
			}
			return { version, message: [] };
		},
		options: [
			{
				value: '14'
			},
			{
				value: '16'
			},
			{
				value: '18'
			},
			{
				value: '20'
			},
			{
				name: 'Use my .nvmrc file',
				value: 'file'
			}
		]
	},
	denoVersion: {
		name: 'Deno version',
		type: 'select',
		default: '1.40.2',
		checkCommand:
      '$((deno -V 2> /dev/null || echo \'unknown\') | sed "s/[][]//g" | sed "s/^deno //")',
		getVersionCommand: (version) => (version !== 'file'
			? `dvm use ${version}`
			: '[ -f .dvmrc ] && dvm install'),
		migrateVersion: (version) => ({ version, message: [] }),
		options: [
			{
				value: '1.40.2'
			},
			{
				name: 'Use my .dvmrc file',
				value: 'file'
			}
		]
	}
};

module.exports = versionOptions;
