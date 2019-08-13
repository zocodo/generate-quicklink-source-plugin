/* eslint-disable */
const fs = require('fs')
const path = require('path')
const join = path.join;

class generateQuicklinkSourcePlugin {
  // 将 `apply` 定义为其原型方法，此方法以 compiler 作为参数
  constructor(option = {}) {
    this.sourceManifestName = option.sourceManifestName || 'js/sourceManifest.json'
    this.filterRegExp = option.filterRegExp
    this.includeSource = option.includeSource
    this.jsonData = []
    this.addFileToSouceManifest.bind(this)
    this.handleEmit.bind(this)
  }

  apply(compiler) {

    if ('hooks' in compiler) {
      // We're in webpack 4+.
      compiler.hooks.emit.tapPromise(
        'GenerateRegisterSwPlugin',
        compilation => this.handleEmit(compilation)
      );
    } else {
      // We're in webpack 2 or 3.
      compiler.plugin('emit', (compilation, callback) => {
        this.handleEmit(compilation).then(callback).catch(callback);
      });
    }
  }

  handleEmit(compilation) {
    return new Promise((res, rej) => {
      this.jsonData = []
      const allBuildFiles = Object.keys(compilation.assets)
      allBuildFiles.forEach((file) => {
        if (this.filterRegExp && this.filterRegExp.test(file)) {
          return
        }
        this.addFileToSouceManifest(file)
      })

      if (this.includeSource && this.includeSource.length) {
        this.includeSource.forEach((item) => {
          this.addFileToSouceManifest(item)
        })
      }

      const source = JSON.stringify(this.jsonData)
      compilation.assets[this.sourceManifestName] = {
        source: () => {
          return source;
        },
        size: () => {
          return source.length;
        }
      }
      res()
    })
  }

  addFileToSouceManifest(file) {
    this.jsonData.push(file)
  }
}

module.exports = generateQuicklinkSourcePlugin;
