const BuildOptions = require('./options/ssg-options');
const Eleventy = require('./lib/eleventy');
const Hugo = require('./lib/hugo');
const Jekyll = require('./lib/jekyll');
const Parser = require('./helpers/parser');
const Reader = require('./lib/reader');
const ReaderNpm = require('./lib/reader-npm');
const Reseed = require('./lib/reseed');
const Rosey = require('./lib/rosey');
const Static = require('./lib/static');

module.exports = {
	Eleventy: Eleventy,
	Gatsby: ReaderNpm,
	Hexo: ReaderNpm,
	Hugo: Hugo,
	Jekyll: Jekyll,
	NextJs: ReaderNpm,
	NuxtJs: ReaderNpm,
	Other: Reader,
	Reseed: Reseed,
	Rosey: Rosey,
	Static: Static,
	SvelteKit: ReaderNpm,
	Astro: ReaderNpm,

	Parser: Parser,
	BuildOptions: BuildOptions
};
