### 使用方法
``` npm i generate-quicklink-source-plugin ```

### 测试例子
```  npm run example ```

跑完之后可以在 `dist` 目录下找到对应的 `sourceManifest.json` 等文件


### 字段说明
* `sourceManifestName`： 生成资源列表的 json 文件路径名

* `filterRegExp`：对编译出来的资源进行过滤, 不需要预缓存的可以在这里过滤掉

* `includeSource`：不经过编译的文件可以用该字段把文件路径包含进去, 该字段为可访问的链接或相对链接


``` javascript
new WebPackSouceManifest({
  sourceManifestName:'a.json',
  filterRegExp: /(\.json|\.map|service-worker.+\.js|DS_STORE)$/i,
  includeSource: ['js/workbox-sw.js']
}),
```
