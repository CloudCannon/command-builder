module.exports = {
	addEchoCommand: (memo, command) => [...memo, `echo '$ ${command}'`, command]
};
