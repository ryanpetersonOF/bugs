const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getPages() {
    const pagesDirectory = path.resolve('./src/pages/');
    const pages = glob.sync(path.normalize(`${pagesDirectory}/**/*.tsx`));

    return pages.map((page) => {
        return {
            fileName: path.basename(page),
            extensionlessFileName: path.basename(page, '.tsx'),
            outputPath: path.relative(path.resolve('./src/pages'), path.dirname(page)),
            fullPath: page
        }
    })
}


function generateHTMLPlugins(pages) {
    const templateWindow = new HtmlWebpackPlugin({
        template: './assets/template.html',
        filename: 'template.html',
        chunks: ['index'],
        excludeAssets: [/..*.js/]
    });

    const plugins = pages.map((page) => {
        return new HtmlWebpackPlugin({
            template: './assets/template.html',
            filename: path.normalize(page.outputPath ? `${page.outputPath}/${page.extensionlessFileName}.html` : `${page.extensionlessFileName}.html`),
            chunks: [page.extensionlessFileName]
        });
    });

    plugins.push(templateWindow);
    return plugins;
}


module.exports = { generateHTMLPlugins, getPages };