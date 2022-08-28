## 一些说明

组件除了本体内置的几个(内置的按照本体的调试方法就行), 其他都是和本体分离的, 本节包括这些组件的编译和调试方法, 同样适用于插件. 组件的源代码和产物均位于 `registry` 文件夹中.

1. 运行任务 `监视组件 dev:components`, (插件运行 `监视插件 dev:plugins`), 任务会询问要编译的组件是哪个, 从列表中选择即可.
2. 然后运行 `启动服务器(组件) dev:serve components`, 就得到了组件在 `localhost` 下的链接.
3. 进入网站, 打开脚本的设置面板 - 组件管理, (确保`自动更新器`功能开启) 粘贴组件的链接并安装.
4. 监视模式下保存文件构建完成后, 可以在设置里进入组件详情, 从菜单里选择检查更新; 如果开着 `开发者模式` 和 `自动更新器`, 也可以在搜索栏中搜索 `Check Last Update` 来一键更新上一次检查更新的组件.

## 组件

#### 新增
在 `registry/lib/components` 中是所有组件的源代码.

> 你可能还发现 `src/components` 中也有一些组件, 这些是内置组件, 无法独立安装/卸载.

1. 根据类别进入对应的子文件夹, 如样式修改的功能就是 `style/`
2. 新建文件夹, 名称为组件名, 单词短横线分隔
3. 新建文件 `index.ts` 作为组件入口点

   > 此名称不可更改, webpack 配置中将搜索所有 index.ts 作为组件编译入口

4. 在 `index.ts` 中导出 `component` 对象, 实现 `ComponentMetadata` 接口


```ts
import { ComponentMetadata } from "@/components/types";

export const component: ComponentMetadata = {
  // ...
};
```

> 在 `ComponentMetadata` 的源码中有各属性的说明

> `author` 字段记得填, 这个因为我自己写的组件不需要所以就不是 required 的

1. 根据组件的复杂度, 可以自行在文件夹中创建其他文件来组织代码, 下方还列出了一些可用资源可以帮助你加快开发.
2. 编译并调试组件.

#### 修改
找到对应的代码文件修改, 可以搜索组件的 `name` 或 `displayName` 定位文件, 修改后运行对应的编译任务即可.

## 插件

在 `registry/lib/plugins` 中是所有插件的源代码, 步骤和组件基本一致, 只有在第 4 步中, 导出的是 `plugin` 对象, 实现 `PluginMetadata` 接口.
