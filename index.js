const Static = require('./lib/static');
const Hugo = require('./lib/hugo');
const Gatsby = require('./lib/gatsby');
const Rosey = require('./lib/rosey');
const Jekyll = require('./lib/jekyll');
const Eleventy = require('./lib/eleventy');
const Reseed = require('./lib/reseed');
const Parser = require('./helpers/parser');
const BuildOptions = require('./options/ssg-options');

module.exports = {
	Static: Static,
	Hugo: Hugo,
	Gatsby: Gatsby,
	Rosey: Rosey,
	Eleventy: Eleventy,
	Jekyll: Jekyll,
	Reseed: Reseed,
	Parser: Parser,
	BuildOptions: BuildOptions
};
