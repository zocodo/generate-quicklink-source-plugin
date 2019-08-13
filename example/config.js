var WebPackSouceManifest = require('../build/index.js')
var path = require('path')

module.exports = {
  entry: path.resolve(__dirname, './file.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  plugins: [
    new WebPackSouceManifest({
      sourceManifestName: 'b.json',
      filterRegExp: /(\.json|\.map|service-worker.+\.js|DS_STORE)$/i,
      includeSource: ['js/workbox-sw.js']
    })
  ]
};
