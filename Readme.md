# 网络导航
https://mengfei523060.github.io/


## 方案说明

一个**零框架、零构建**的纯静态个人网站：HTML + CSS + 原生 JS，全部相对路径，双击 `index.html` 或丢进任何静态托管即可运行。

### 目录结构

```
.
├── index.html      导航主页（纯结构，无内联样式/脚本）
├── css/style.css   主页全站样式
├── js/main.js      星空背景 + 站点图标加载
├── icon/           站点图标、头像、favicon 全家桶
├── blog/           梦飞 Log 子站（日志 / 教程，css/js 独立分离）
│   ├── index.html  文章列表
│   ├── style.css / stars.js
│   └── posts/      一篇文章一个 HTML（日期-标题.html）
├── txt-reader/     拾光阅读子站（TXT 小说阅读器）
```

### 视觉方案

- **浅色星空 + 毛玻璃**：页面底色为三段径向/线性渐变（`background-attachment: fixed`），`canvas` 绘制呼吸星点（数量随视口面积自适应，DPR 上限 2，`resize` 防抖重建）
- **设计令牌**：全部颜色走 `:root` CSS 变量（`--fg / --muted / --card / --shadow …`）；每张卡片按 `data-cat` 分类注入强调色 `--acc`，悬停边框、阴影、图标底、圆点全部从 `--acc` 派生（`color-mix`），新增分类只需一行 CSS
- **统一组件**：简介区（头像光晕呼吸动画 + 徽章 `·` 分隔）、毛玻璃面板、14px 雾蓝分区标题、页脚与徽章同一套字号/间距规则；主页与 blog 子站共用同一视觉语言
- **响应式**：`auto-fill minmax(230px,1fr)` 网格自适应；`≤640px` 徽章回退文档流居中（防与标题碰撞），`≤560px` 切双列、隐藏描述
- **无障碍**：`--muted` 文本对比度 ≥ AA；系统「减弱动态效果」时星空只渲染一帧、动画全部关闭

### 图标加载策略（js/main.js）

每张卡片按顺序回退，全失败才显示字母占位：
`data-icon 指定文件 → icon/域名.{png,ico,svg,webp} 本地探测 → 站点 favicon → DuckDuckGo 图标服务 → 字母`

### 内容维护

- **加导航站点**：`index.html` 网格内复制一张 `.card`，改 `data-cat / href / data-icon / 名称 / 描述`
- **发 blog 文章**：复制任意 `posts/*.html` 改内容与 `data-cat`（日常 / 学习 / 运维 / 资讯 / 编程），在 `blog/index.html` 网格顶部加一张卡片
- **批量补图标**：`fetch_icons.sh` / `fetch-icons.mjs` 抓取域名 favicon 到 `icon/`
- **头像 / favicon**：`make_tux_avatar.py` + `make_favicon.py`（PIL 合成，favicon 为 512px PNG 内嵌的自包含 SVG）

### 部署

推送到 GitHub 仓库开 Pages 即可（主页即仓库根目录）；或整目录拷到 NAS / 软路由 Web 根目录；本地预览 `python3 -m http.server 8000`。
