# motoquan 摩托圈 — 项目文档

> 摩托产业内容资讯平台，面向行业从业者和爱好者，提供新车发布、行业动态、维修教程、配件选购、改装方案等内容消费体验。

---

## 一、项目概述

**产品定位：** 摩托行业垂直媒体平台（类 FoodTalks 风格）  
**核心用户：** 摩托车从业者、爱好者、经销商、维修技师  
**主要功能：** 文章浏览、分类筛选、站内搜索、管理后台内容运营

---

## 二、技术架构

### 技术栈

| 层级 | 技术选型 | 说明 |
|---|---|---|
| 前端框架 | Next.js 14.2.35 | App Router，React 18，TypeScript |
| 样式方案 | Tailwind CSS 3.4 | H5优先响应式设计 |
| 数据服务 | Supabase | PostgreSQL + REST API，免费额度 |
| 包管理器 | npm | Node.js 25.8.1 |

### 数据库

**托管平台：** Supabase（`https://yplehzgtdgyygywbmldy.supabase.co`）

**表结构：**

#### `categories`（分类表）
| 字段 | 类型 | 说明 |
|---|---|---|
| id | uuid | 主键 |
| name | text | 分类名称，如"新车发布" |
| slug | text | URL别名，唯一 |
| color | text | 主题色，如"#0A84FF" |
| icon | text | Emoji图标，如"🏍️" |
| created_at | timestamptz | 创建时间 |

**初始数据（5个分类）：**
- 🏍️ 新车发布 `#0A84FF`
- 📰 行业动态 `#FF6B35`
- 🔧 维修教程 `#34C759`
- ⚙️ 配件选购 `#AF52DE`
- 🔥 改装方案 `#FF9500`

#### `articles`（文章表）
| 字段 | 类型 | 说明 |
|---|---|---|
| id | uuid | 主键 |
| title | text | 文章标题 |
| slug | text | URL别名，唯一 |
| category | text | 所属分类名称 |
| tags | text[] | 标签数组 |
| summary | text | 摘要（列表页展示） |
| content | text | 正文（支持 Markdown） |
| cover_image | text | 封面图URL |
| status | text | `draft`（草稿）或 `published`（已发布） |
| featured | boolean | 是否设为精选（首页展示） |
| author | text | 作者 |
| read_minutes | integer | 预估阅读时长（分钟） |
| views | text | 阅读量 |
| comments_count | integer | 评论数 |
| published_at | timestamptz | 发布时间 |
| created_at | timestamptz | 创建时间 |

**安全策略：** RLS（行级安全）已开启，allow-all 策略（开发阶段），生产环境建议收紧为仅服务端写入。

---

## 三、目录结构

```
motoquan/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # 首页（服务端组件）
│   │   ├── layout.tsx                # 根布局
│   │   ├── globals.css               # 全局样式
│   │   ├── not-found.tsx             # 404页面
│   │   │
│   │   ├── articles/                 # 前台文章模块
│   │   │   ├── page.tsx              # 文章列表页（客户端，/articles）
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # 文章详情页（客户端，/articles/:slug）
│   │   │
│   │   ├── admin/                    # 管理后台模块
│   │   │   ├── layout.tsx            # Admin 布局（含登录认证 + 侧边栏）
│   │   │   ├── page.tsx              # 数据看板（/admin）
│   │   │   ├── articles/
│   │   │   │   ├── page.tsx          # 文章列表（/admin/articles）
│   │   │   │   ├── article-form.tsx  # 新建/编辑文章表单（共用组件）
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx      # 新建文章（/admin/articles/new）
│   │   │   │   └── [id]/
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx  # 编辑文章（/admin/articles/:id/edit）
│   │   │   └── categories/
│   │   │       └── page.tsx          # 分类管理（/admin/categories）
│   │   │
│   │   └── api/                      # REST API（对接 Supabase）
│   │       ├── articles/
│   │       │   ├── route.ts          # GET列表 / POST新建
│   │       │   ├── [id]/
│   │       │   │   └── route.ts      # GET单条 / PUT更新 / DELETE删除
│   │       │   └── by-slug/
│   │       │       └── [slug]/
│   │       │           └── route.ts  # GET按slug查询
│   │       └── categories/
│   │           ├── route.ts          # GET列表 / POST新建
│   │           └── [id]/
│   │               └── route.ts      # PUT更新 / DELETE删除
│   │
│   ├── components/                   # UI 组件
│   │   ├── article-card.tsx          # 文章卡片（grid/list/compact 三变体）
│   │   ├── category-icon.tsx         # 分类图标组件
│   │   ├── category-tabs.tsx         # 分类标签切换组件
│   │   ├── site-footer.tsx           # 站点底部
│   │   └── site-header.tsx           # 站点导航头部
│   │
│   └── lib/                          # 工具库
│       ├── supabase.ts               # Supabase 客户端初始化
│       ├── public-data.ts            # 前台数据读取（服务端友好）
│       ├── admin-store.ts            # Admin 数据层（API调用封装）
│       └── articles.ts               # [旧] Mock数据，已废弃
│
├── public/                           # 静态资源
│   ├── motoquan.svg                  # 站点logo
│   └── ...
│
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md（本文档）
```

---

## 四、页面路由

### 前台（用户端）
| 路由 | 页面 | 渲染方式 |
|---|---|---|
| `/` | 首页（Featured + 热读 + 最新文章） | 服务端（SSR，每60s缓存） |
| `/articles` | 文章列表（支持分类筛选） | 客户端 |
| `/articles/:slug` | 文章详情 | 客户端 |

### 管理后台
| 路由 | 页面 | 说明 |
|---|---|---|
| `/admin` | 数据看板 | 统计总览 |
| `/admin/articles` | 文章列表 | 支持筛选/搜索/删除 |
| `/admin/articles/new` | 新建文章 | 富表单 |
| `/admin/articles/:id/edit` | 编辑文章 | 同上 |
| `/admin/categories` | 分类管理 | CRUD + 颜色图标选择 |

### API 接口
| 方法 | 路由 | 说明 |
|---|---|---|
| GET | `/api/articles` | 获取文章列表，支持 `?status=` `?category=` `?featured=` `?limit=` |
| POST | `/api/articles` | 新建文章 |
| GET | `/api/articles/:id` | 获取单篇文章 |
| PUT | `/api/articles/:id` | 更新文章 |
| DELETE | `/api/articles/:id` | 删除文章 |
| GET | `/api/articles/by-slug/:slug` | 按slug查询单篇 |
| GET | `/api/categories` | 获取全部分类 |
| POST | `/api/categories` | 新建分类 |
| PUT | `/api/categories/:id` | 更新分类 |
| DELETE | `/api/categories/:id` | 删除分类 |

---

## 五、核心组件说明

### `ArticleCard`
文章卡片组件，支持三种变体：

```tsx
import { ArticleCard } from "@/components/article-card";

// grid变体（默认）- 首页文章网格
<ArticleCard article={article} category={cat} variant="grid" />

// list变体 - 文章列表页
<ArticleCard article={article} category={cat} variant="list" />

// compact变体 - 侧边栏相关阅读
<ArticleCard article={article} category={cat} variant="compact" />
```

**数据源：** 接收 `PublicArticle` + `PublicCategory` 类型，卡片颜色从分类的 `color` 字段动态生成渐变，无封面图时以分类色作为背景。

### `SiteHeader` / `SiteFooter`
全局导航和底部，样式统一，不承载业务数据。

### `CategoryTabs`（已简化）
原型阶段分类标签，当前由 `ArticleCard` 内置处理。

---

## 六、设计规范

### 配色
| 用途 | 色值 | 说明 |
|---|---|---|
| Primary（蓝） | `#0A84FF` | 主操作按钮、重点链接 |
| Secondary（橙） | `#FF6B35` | 热读雷达、强调色 |
| Background | `#F5F6FA` | 页面底色 |
| Surface | `#FFFFFF` | 卡片底色 |
| Heading | `#1A1A2E` | 标题文字 |
| Body | `#6B7280` | 正文辅助文字 |
| Line | `#E5E7EB` | 边框线条 |

### 字体
- 标题：`font-semibold`，使用系统字体栈
- 正文：`text-sm`（14px）起，Tailwind 默认 scale

### 圆角
- 卡片：`rounded-[28px]`
- 大面板：`rounded-[34px]`
- 内嵌元素：`rounded-[20-24px]`
- 按钮/标签：`rounded-full`（全圆角）

---

## 七、开发指南

### 本地启动

```bash
cd ~/Desktop/codex/motoquan
npm install       # 首次或依赖变更后
npm run dev      # 启动开发服务器 http://localhost:3000
```

### 构建生产版本

```bash
npm run build    # 打包到 .next/
npm run start    # 启动生产服务器
```

### Supabase 配置

如需更换 Supabase 项目，修改以下文件中的 URL 和 Key：

```
src/lib/supabase.ts         # Supabase 客户端
src/lib/public-data.ts      # 前台数据读取
```

### Admin 登录

- 地址：`http://localhost:3000/admin`
- 账号：`admin@motoquan.com`
- 密码：`motoquan2026`

### 添加新分类

在 `/admin/categories` 页面操作，或直接在 Supabase Dashboard 的 SQL Editor 执行：

```sql
insert into categories (name, slug, color, icon) values ('新分类名', 'new-slug', '#颜色', '🔧');
```

---

## 八、数据流向

```
[用户访问前台]
     ↓
 Next.js Server / Client
     ↓
  Supabase REST API
     ↓
 PostgreSQL 数据库
```

```
[Admin 后台发布]
     ↓
 Next.js API Routes（/api/articles）
     ↓
  Supabase REST API
     ↓
 PostgreSQL 数据库
     ↓
 前台立即可见（60s缓存后更新）
```

---

## 九、版本记录

| 版本 | Commit | 说明 |
|---|---|---|
| v0.1.0 | `a2a19fc` | 前后台数据统一，Supabase 全链路接入 |
| — | `d478934` | Supabase 数据层接入，Admin 从 localStorage 迁移 |
| — | `2e1350d` | Next.js 升级到 14.2.35（修复4个高危漏洞） |
| — | `638f969` | Admin 登录修复（router.refresh 方案） |
| — | `8ba786c` | Featured 文章布局修复 |
| — | `42c2ba7` | article-form TypeScript 语法修复 |
| — | `d9ae1fe` | Admin CMS 初版（localStorage） |
| — | `a105370` | FoodTalks 明亮风格 redesign |

---

## 十、后续计划（待办）

- [ ] 种子内容填充（60篇行业文章）
- [ ] 全文搜索功能（Supabase 全文索引）
- [ ] 文章点赞/收藏（前端状态 + 数据库记录）
- [ ] 供应商黄页模块（第二期）
- [ ] 迁移阿里云 RDS（届时从 Supabase 导出 SQL 导入即可）
- [ ] 正式域名绑定与 HTTPS

---

## 十一、参考网站（学习对象）

### 资讯/社区

| 网站 | 网址 | 参考价值 |
|---|---|---|
| FoodTalks | foodtalks.cn | 资讯平台风格、内容分类、视觉设计 |
| 摩托之家 | motohome.com | 资讯+社区，活跃度高，运营模式参考 |
| 58摩托 | 58moto.com | 车型报价为主，内容分类结构 |
| 指尖摩托 | motomsc.com | 行业资讯、论坛形式 |
| 摩托欧耶 | motoyen.com | 资讯+评论风格 |
| 摩托威视 | motovlog.com | 视频内容运营 |
| 汽车之家摩托 | autohome.com.cn/moto | 车型库、媒体内容 |

### 赛事/展会

| 赛事/组织 | 网址 | 参考价值 |
|---|---|---|
| 中国摩托车商会 | chinamotorcycle.com | 行业数据、政策 |
| 中国摩博会 CIMA Motor | cimamotor.com | 展会资讯、行业活动 |
| CSBK 中国超级摩托车锦标赛 | 各赛季媒体合作报道 | 赛事资讯 |
| 泛珠三角超级赛道节 | 泛珠官方渠道 | 民间赛事参考 |

### 厂商官网

| 品牌 | 网址 |
|---|---|
| 春风动力 | cfmoto.com |
| 钱江/赛科龙 | qjmotor.com |
| 隆鑫/无极 | loncin.com |
| 宗申 | zongshen.com |
| 豪爵 | haojue.com |
| 奔达 | benda.com |
| 凯越 | kayole.com |
| 张雪机车 | zxmoto.com / 张雪机车小程序 |

### 海外

| 网站 | 网址 | 参考价值 |
|---|---|---|
| ADVrider | advrider.com | 海外骑行游记社区 |
| RevZilla | revzilla.com | 摩托车配件零售 + 内容媒体 |

---

*文档版本：2026-04-02 | 由 AI 助手六百整理*
