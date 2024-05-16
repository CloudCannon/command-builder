const { runScriptCommands } = require('../src/lib/eleventy');

test('outputs with empty config', () => {
	expect(runScriptCommands()).toMatchSnapshot();
});

test('outputs with @next config', () => {
	expect(runScriptCommands({
		use_beta_plugin: true, input: 'src', incremental: true, ignoreinitial: true
	})).toMatchSnapshot();
});

test('outputs with mange_plugin_manually', () => {
	expect(runScriptCommands({ manage_plugin_manually: true })).toMatchSnapshot();
});
