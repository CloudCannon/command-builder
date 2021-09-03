const eleventyOptions = require('./eleventy-options');
const hugoOptions = require('./hugo-options');
const jekyllOptions = require('./jekyll-options');
const staticOptions = require('./static-options');
const readerOptions = require('./reader-options');

const getReaderOptions = (outputPathDefault) => ({
	...readerOptions,
	options: {
		...readerOptions.options,
		output_path: {
			...readerOptions.options.output_path,
			default: outputPathDefault
		}
	}
});

module.exports = {
	eleventy: eleventyOptions,
	gatsby: getReaderOptions('public'),
	hexo: getReaderOptions('public'),
	hugo: hugoOptions,
	jekyll: jekyllOptions,
	nextjs: getReaderOptions('out'),
	nuxtjs: getReaderOptions('dist'),
	static: staticOptions,
	sveltekit: getReaderOptions('build')
};
