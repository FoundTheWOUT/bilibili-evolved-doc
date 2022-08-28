### 全局

全局变量, 无需 `import` 就可以直接使用. (Tampermonkey API 这里不再列出了, 可根据代码提示使用)

- `Vue`: Vue 库的主对象, 在创建 `.vue` 组件时, 其中的 `<script>` 可以直接使用 `Vue.extend()`

  > 出于历史原因, 项目中用的还是 Vue 2, 由于其糟糕的 TypeScript 支持, 在 VS Code + Vetur 的环境下浏览 `.vue` 文件可能会报各种奇奇怪怪的类型错误, 无视就好. (类型是否正确以 `yarn type` 的结果为准)

- `lodash`: 包含所有 Lodash 库提供的方法
- `dq` / `dqa`: `document.querySelector` 和 `document.querySelectorAll` 的简写, `dqa` 会返回真实数组

  > 在 `bwp-video` 出现后, 这两个查询函数还会自动将对 `video` 的查询扩展到 `bwp-video`

- `none`: 什么都不做的空函数
- `componentTags`: 预置的一些组件标签, 实现 `ComponentMetadata.tags` 时常用

### 本体 API

仅介绍常用 API, 其他可以翻阅源代码了解, 代码中均带有文档.

- `core/ajax`: 封装 `XMLHttpRequest` 常见操作, 以及 `bilibiliApi` 作为 b 站 API 的响应处理 (`fetch` 可以直接用)
- `core/download`: `DownloadPackage` 类封装了下载文件的逻辑, 可以添加单个或多个文件, 多个文件时自动打包为 `.zip`, 确定是单个文件时也可以直接调用静态方法 `single`
- `core/file-picker`: 打开系统的文件选择对话框
- `core/life-cycle`: 控制在网页的不同生命周期执行代码
- `core/meta`: 获取脚本的自身元数据, 如名称, 版本等/
- `core/observer`: 封装各种监视器, 包括元素增删, 进入/离开视图, 大小变化, 以及当前页面视频的更换
- `core/spin-query`: 轮询器, 等待页面上异步加载的元素, 也可以自定义查询条件
- `core/runtime-library`: 运行时代码库, 目前支持导入 protobufjs 和 JSZip 使用
- `core/user-info`: 获取当前用户的登录信息
- `core/version`: 版本比较
- `core/settings`: 脚本设置 API, 可监听设置变更, 获取组件设置, 判断组件是否开启等
- `core/toast`: 通知 API, 能够在左下角显示通知
- `core/utils`: 工具集, 包含各种常量, 格式化函数, 排序工具, 标题获取, 日志等
- [`theWorld`](https://zh.moegirl.org.cn/THE_WORLD): ~~并没有什么用的API，~~与 `debugger` 几乎等价，不同的是，它是一个函数，参数是`time: number`，代表`time`毫秒后时停。

### 组件 API

- `components/types`: 组件相关接口定义
- `components/styled-components`: 包含样式的组件 entry 简化包装函数
- `components/user-component`: 用户组件的安装/卸载 API
- `components/description`: 获取组件或插件的描述, 会自动匹配语言并插入作者标记, 支持 HTML, Markdown 和纯文本形式
- `components/feeds/`:
  - `api`: 动态相关 API 封装, 获取动态流, 对每一个动态卡片执行操作等
  - `BangumiCard.vue`: 番剧卡片
  - `VideoCard.vue`: 视频卡片
  - `ColumnCard.vue`: 专栏卡片
  - `notify`: 获取未读动态数目, 最后阅读的动态 ID 等
- `components/video/`:
  - `ass-utils`: ASS 字幕工具函数
  - `player-light`: 控制播放器开关灯
  - `video-danmaku`: 对每一条视频弹幕执行操作
  - `video-info`: 根据 av 号查询视频信息
  - `video-quality`: 视频清晰度列表
  - `video-context-menu`: 向播放器右键菜单插入内容
  - `video-control-bar`: 向播放器控制栏插入内容
  - `watchlater`: 稍后再看列表获取, 添加/移除稍后再看等
- `components/live/`:
  - `live-control-bar`: 向直播控制栏插入内容
  - `live-socket`: 直播间弹幕的 WebSocket 封装
- `components/utils/`:
  - `comment-apis`: 对每条评论执行操作
  - `categories/data`: 主站分区数据
- `components/i18n/machine-translator/MachineTranslator.vue`: 机器翻译器组件
- `components/switch-options`: SwitchOptions API, 方便创建含有多个独立开闭的子选项的功能
- `components/launch-bar/LaunchBar.vue`: 搜索栏组件

### 插件 API

- `plugins/data`: 数据注入 API

持有数据的一方使用特定的 `key` 调用 `registerAndGetData` 注册并获取数据, 在这之前或之后所有的 `addData` 调用都能修改这些数据. 两方通过使用相同的 `key` 交换数据, 可以有效降低代码耦合.

例如, 自定义顶栏功能的顶栏元素列表就是合适的数据, 夜间模式的插件可以向其中添加一个快速切换夜间模式的开关, 而不需要修改自定义顶栏的代码.

> 有时候需要分开数据的注册和获取, 可以分别调用 `registerData` 和 `getData`

> 从设计上考虑好你的数据是否适合此 API, `addData` 做出的数据修改是单向累加式的, 不能够撤销.

- `plugins/hook`: 钩子函数 API

对于某种特定时机发生的事件, 可以调用 `getHook` 允许其他地方注入钩子提高扩展性, 其他地方可以嗲用 `addHook` 进行注入.

例如, 自动更新器在组件管理面板注入了钩子, 在新组件安装时记录安装来源, 实现自动更新. 组件管理面板没有任何更新相关代码.

- `plugins/style`: 提供简单的自定义样式增删 API (复杂样式请考虑组件或者 Stylus)

### UI

所有的 UI 组件建议使用 `'@/ui'` 导入, 大部分看名字就知道是什么, 这里只列几个特殊的.

- `ui/icon/VIcon.vue`: 图标组件, 自带 MDI 图标集, b 站图标集, 支持自定义图标注入
- `ui/_common.scss`: 一些通用的 Sass Mixin, 在代码中可以直接使用 `@import "common"` 导入
- `ui/_markdown.scss`: 提供一个 Markdown Mixin, 导入这个 Mixin 的地方将获得为各种 HTML 元素适配的 Markdown 样式. 在代码中可以直接使用 `@import "markdown"` 导入
- `ui/ScrollTrigger.vue`: 进入视图时触发事件, 通常用于实现无限滚动
- `ui/VEmpty.vue`: 表示无数据, 界面可被插件更改
- `ui/VLoading.vue`: 表示数据加载中, 界面可被插件更改
