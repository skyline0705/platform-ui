require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')


// var webpackConfig = require('./webpack.prod.conf')
// var webpackPackageConfig = require('./webpack.package.conf')

var spinner = ora('building for production...')
spinner.start()
rm(path.join(config.build.assetsRoot, process.env.BUILD_ENV === 'package' ? config.build.packageDirectory : config.build.assetsSubDirectory), err => {
  if (err) throw err
    // TODO后续再考虑官网跟组件库打包怎么区分吧…
  var webpackConfig = process.env.BUILD_ENV === 'package'
    ? require('./webpack.package.conf')
    : require('./webpack.prod.conf')
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
