const eleventyOptions = require('./eleventy-options');
const hugoOptions = require('./hugo-options');
const jekyllOptions = require('./jekyll-options');
const staticOptions = require('./static-options');
const readerOptions = require('./reader-options');
const readerNpmOptions = require('./reader-npm-options');
const mkdocsOptions = require('./mkdocs-options');

const getReaderNpmOptions = (outputPathDefault) => ({
	...readerNpmOptions,
	options: {
		...readerNpmOptions.options,
		output_path: {
			...readerNpmOptions.options.output_path,
			default: outputPathDefault
		}
	}
});

module.exports = {
	eleventy: eleventyOptions,
	gatsby: readerNpmOptions,
	hexo: readerNpmOptions,
	hugo: hugoOptions,
	jekyll: jekyllOptions,
	nextjs: getReaderNpmOptions('out'),
	nuxtjs: getReaderNpmOptions('dist'),
	astro: getReaderNpmOptions('dist'),
	other: readerOptions,
	static: staticOptions,
	sveltekit: getReaderNpmOptions('build'),
	mkdocs: mkdocsOptions
};
