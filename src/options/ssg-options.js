const astro = require('./astro-options');
const bridgetown = require('./bridgetown-options');
const eleventy = require('./eleventy-options');
const hugo = require('./hugo-options');
const jekyll = require('./jekyll-options');
const lume = require('./lume-options');
const mkdocs = require('./mkdocs-options');
const nextjs = require('./nextjs-options');
const nuxtjs = require('./nuxtjs-options');
const reader = require('./reader-options');
const readerNpm = require('./reader-npm-options');
const statik = require('./static-options');
const sveltekit = require('./sveltekit-options');

module.exports = {
	astro,
	bridgetown,
	eleventy,
	gatsby: readerNpm,
	hexo: readerNpm,
	hugo,
	jekyll,
	lume,
	mkdocs,
	nextjs,
	nuxtjs,
	other: reader,
	static: statik,
	sveltekit
};
