# 梦飞的网络导航

https://mengfei523060.github.io/

<img width="1042" height="237" alt="QQ_2026-11-25_15-08-59" src="https://github.com/user-attachments/assets/7a7f3a5e-8bc1-4f1e-bd2d-b0b6c157a709" />

个人常用站点导航主页，附带两个子站：**梦飞 Blog**（日志 / 教程）与 **拾光阅读**（TXT 小说阅读器）。

零框架、零构建、无依赖——纯 HTML + CSS + 原生 JS，全部相对路径，双击 `index.html` 或整仓库丢到任意静态托管即可运行。

## 目录结构

```
.
├── index.html          导航主页（纯结构，无内联样式/脚本）
├── css/style.css       主页全站样式
├── js/main.js          星空背景 + 站点图标加载
├── icon/               站点图标、头像、favicon 全家桶
├── blog/               梦飞 Blog 子站（自带 css/js/icon/Readme，整目录可独立部署）
│   ├── index.html      文章列表
│   └── posts/          一篇文章一个 HTML（日期-标题拼音.html）
├── txt-reader/         拾光阅读子站（本地 TXT 小说阅读器）
└── Readme.md           本文件
```

## 页面内容

- **简介区**：Tux 头像（光晕呼吸动画）+ 徽章栏（Linux · 摄影 · 电子 · 数码 · 机械）
- **网站导航**：18 张常用站点卡，按分类着色——数码（天蓝）/ linux（琥珀）/ 科技（紫）/ 摄影（绿）
- **GitHub 项目推荐**：一行一条的项目链接，行尾 `*` / `▲` 黑色角标
- **本地站点**：拾光阅读、梦飞 Blog 两个子站入口

## 视觉方案

- **浅色星空 + 毛玻璃**：页面底色三段径向/线性渐变（`background-attachment: fixed`），`canvas` 绘制呼吸星点（数量随视口面积自适应，DPR 上限 2，`resize` 防抖重建）
- **设计令牌**：颜色全部收在 `:root` CSS 变量（`--fg / --muted / --card / --shadow …`）；卡片按 `data-cat` 注入强调色 `--acc`，图标底色、悬停描边与阴影全部由 `color-mix()` 从 `--acc` 派生，新增分类只需一行 CSS
- **组件统一**：毛玻璃面板 + 14px 雾蓝分区标题，主页与两个子站共用同一套视觉语言
- **响应式**：卡片网格 `auto-fill minmax(230px, 1fr)`；`≤640px` 徽章回退文档流居中（防与标题碰撞）；`≤560px` 双列、隐藏卡片描述
- **细节**：正文雾蓝色阶对比度 ≥ WCAG AA；系统「减弱动态效果」时动画全关、星空只渲染一帧

## 图标加载策略（js/main.js）

每张站点图标按顺序回退，全部失败才显示字母占位：

```
data-icon 指定文件 → icon/域名.{png,ico,svg,webp} 本地探测 → 站点自身 favicon → DuckDuckGo 图标服务 → 字母
```

站点 favicon 已批量存于 `icon/`（离线可用），在线源仅作兜底。

## 维护指南

| 想做的事 | 怎么做 |
|---|---|
| 加导航站点 | `index.html` 网格内复制一张 `.card`，改 `data-cat` / `href` / `data-icon` / 名称 / 描述 |
| 加 GitHub 推荐 | `section.project` 内复制一条 `<a>`，`small` 写一句话简介，行尾可加 `<span class="tri">▲</span>` |
| 发 Blog 文章 | 见 [blog/Readme.md](blog/Readme.md)：复制 `posts/` 模板 + 列表页顶部加卡片 |
| 补站点图标 | 把 favicon 存进 `icon/` 并按 `域名.扩展名` 命名即可自动命中 |

## 部署

- **GitHub Pages**：推到仓库根目录开启 Pages（主页即 `/index.html`）
- **NAS / 软路由**：整目录拷贝到 Web 根目录（飞牛 fnOS、iStoreOS 均自带 Web 服务）
- **本地预览**：`python3 -m http.server 8000`

`blog/` 子站完全自包含，单独拷走即可作为独立站点部署。

## 辅助脚本（归档）

| 脚本 | 用途 |
|---|---|
| `fetch_icons.sh` / `fetch-icons.mjs` | 批量抓取域名 favicon 存入 `icon/` |
| `make_tux_avatar.py` | Tux 头像合成（PIL） |
| `make_favicon.py` | 由头像母图生成 favicon.png / apple-touch-icon.png / 自包含 favicon.svg |
| `make_txtreader_icon.py` | 拾光阅读图标生成 |

> 头像与 favicon 的成品已在 `icon/` 中，日常维护无需运行脚本。
