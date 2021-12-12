## 搭建开发环境

- 需要安装 [Node.js](https://nodejs.org/en/download/) (>= 14.0), [Visual Studio Code](https://code.visualstudio.com/) 和 [yarn](https://yarnpkg.com/getting-started/install#global-install).
- 将项目 Fork 至自己账户后, 克隆至本地

```powershell
git clone https://github.com/{{your-name}}/Bilibili-Evolved.git -b preview --single-branch
cd Bilibili-Evolved
```

- 安装依赖

```powershell
yarn
cd registry
yarn
```

需要说明的是, 脚本本体和功能是分开的两个项目, 因此编译时也是分开的. 脚本本体的编译通常使用 `监视开发版 dev:watch` 任务, 会产生 `dist/bilibili-evolved.dev.user.js` 文件.

> 如果不使用 Visual Studio Code, 则需要根据 `.vscode/tasks.json` 中各个任务定义的命令手动在终端执行. (npm scripts 仅用于 CI)


### Chromium

1. Chrome 插件管理 `chrome://extensions/` > Tampermonkey > 详细信息
2. 打开`允许访问文件网址`
3. 新建脚本
4. 粘贴内容:

```js
// ==UserScript==
// @name         Bilibili Evolved (Local)
// @description  Bilibili Evolved (本地)
// @version      300.0
// @author       Grant Howard, Coulomb-G
// @copyright    2021, Grant Howard (https://github.com/the1812) & Coulomb-G (https://github.com/Coulomb-G)
// @license      MIT
// @match        *://*.bilibili.com/*
// @exclude      *://*.bilibili.com/*/mobile.html
// @exclude      *://*.bilibili.com/api/*
// @exclude      *://api.bilibili.com/*
// @exclude      *://api.*.bilibili.com/*
// @exclude      *://live.bilibili.com/h5/*
// @exclude      *://live.bilibili.com/*/h5/*
// @exclude      *://m.bilibili.com/*
// @exclude      *://mall.bilibili.com/*
// @exclude      *://member.bilibili.com/studio/bs-editor/*
// @exclude      *://www.bilibili.com/h5/*
// @exclude      *://www.bilibili.com/*/h5/*
// @exclude      *://message.bilibili.com/pages/nav/index_new_sync
// @exclude      *://message.bilibili.com/pages/nav/index_new_pc_sync
// @exclude      *://t.bilibili.com/h5/dynamic/specification
// @exclude      *://bbq.bilibili.com/*
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_info
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @connect      cdn.jsdelivr.net
// @connect      cn.bing.com
// @connect      www.bing.com
// @connect      translate.google.cn
// @connect      translate.google.com
// @connect      localhost
// @connect      *
// @require      https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js
// @icon         https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@preview/images/logo-small.png
// @icon64       https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@preview/images/logo.png
// ==/UserScript==
```

6. 在那些 `@require` 下面再添加一行 `@require file://{{ bilibili-evolved.dev.user.js的绝对路径 }}`

   > Windows 例子: `@require file://C:/xxx/Bilibili-Evolved/bilibili-evolved.dev.user.js`

   > macOS 例子: `@require file:///Users/xxx/Documents/Bilibili-Evolved/bilibili-evolved.dev.user.js`

7. 保存脚本, 监视模式下保存文件构建完成后, 刷新即可生效

> 上面那些其他的 @require 跟 `src/client/common.meta.json` 里的保持一致就行, 偶尔这些依赖项会变动导致这个本地调试脚本失效, 到时候照着改一下就行.

### Firefox 或 Safari

1. 运行 `启动服务器(本体) dev:serve` 任务, 假设得到的服务链接为`http://localhost:5000/`
2. 继续 Chromium 指南中的第 3~6 步, 但在第 6 步时 `@require` 的链接使用 `http://localhost:5000/bilibili-evolved.dev.user.js`.
3. 保存脚本, 监视模式下保存文件构建完成后, 在 Tampermonkey 中编辑脚本 - 外部, 删除 `localhost` 的缓存文件后生效.
