const { runScriptCommands } = require('../src/lib/jekyll');

test('outputs with empty config', () => {
	expect(runScriptCommands()).toMatchSnapshot();
});

test('outputs with enable_bundle_cache or use_local_bundle', () => {
	expect(runScriptCommands({ enable_bundle_cache: true })).toMatchSnapshot();
	expect(runScriptCommands({ use_local_bundle: true })).toMatchSnapshot();
});
