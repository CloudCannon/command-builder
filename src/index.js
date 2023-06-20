const Eleventy = require('./lib/eleventy');
const Hugo = require('./lib/hugo');
const Jekyll = require('./lib/jekyll');
const Reader = require('./lib/reader');
const ReaderNpm = require('./lib/reader-npm');
const Reseed = require('./lib/reseed');
const Rosey = require('./lib/rosey');
const Static = require('./lib/static');

const Parser = require('./helpers/parser');
const BuildOptions = require('./options/ssg-options');

module.exports = {
	Astro: ReaderNpm,
	Bridgetown: Reader,
	Docusaurus: ReaderNpm,
	Eleventy,
	Gatsby: ReaderNpm,
	Hexo: ReaderNpm,
	Hugo,
	Jekyll,
	Lume: Reader,
	MkDocs: Reader,
	NextJs: ReaderNpm,
	NuxtJs: ReaderNpm,
	Other: Reader,
	Reseed,
	Rosey,
	Static,
	SvelteKit: ReaderNpm,

	Parser,
	BuildOptions
};
