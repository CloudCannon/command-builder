const BuildOptions = require('./options/ssg-options');
const Eleventy = require('./lib/eleventy');
const Hugo = require('./lib/hugo');
const Jekyll = require('./lib/jekyll');
const Parser = require('./helpers/parser');
const Reader = require('./lib/reader');
const Reseed = require('./lib/reseed');
const Rosey = require('./lib/rosey');
const Static = require('./lib/static');

module.exports = {
	Eleventy: Eleventy,
	Gatsby: Reader,
	Hexo: Reader,
	Hugo: Hugo,
	Jekyll: Jekyll,
	NextJs: Reader,
	NuxtJs: Reader,
	Reseed: Reseed,
	Rosey: Rosey,
	Static: Static,
	SvelteKit: Reader,

	Parser: Parser,
	BuildOptions: BuildOptions
};
