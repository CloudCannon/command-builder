const Static = require('./lib/static');
const Hugo = require('./lib/hugo');
const Gatsby = require('./lib/gatsby');
const Rosey = require('./lib/rosey');
const Jekyll = require('./lib/jekyll');
const Reseed = require('./lib/reseed');
const Parser = require('./helpers/parser');

module.exports = {
	Static: Static,
	Hugo: Hugo,
	Gatsby: Gatsby,
	Rosey: Rosey,
	Jekyll: Jekyll,
	Reseed: Reseed,
	Parser: Parser
};
