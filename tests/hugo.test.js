const { runScriptCommands } = require('../src/lib/hugo');

test('outputs with empty config', () => {
	expect(runScriptCommands()).toMatchSnapshot();
});

test('outputs with source directory configured', () => {
	expect(runScriptCommands({ source: 'src' })).toMatchSnapshot();
});
