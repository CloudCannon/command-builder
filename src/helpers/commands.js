function addEchoCommand(memo, command) {
	memo.push(`echo '$ ${command}'`, command);
	return memo;
}

module.exports = {
	addEchoCommand
};
