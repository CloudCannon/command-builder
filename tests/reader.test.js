const { runScriptCommands } = require('../src/lib/reader');

test('outputs with empty config', () => {
	expect(runScriptCommands()).toMatchSnapshot();
});

test('outputs with @next config', () => {
	expect(runScriptCommands({ use_beta_plugin: true, input: 'src' })).toMatchSnapshot();
});
