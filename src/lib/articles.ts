export type ArticleCategory =
  | "新车发布"
  | "行业快讯"
  | "技术工程"
  | "装备指南"
  | "改装工场";

export type CategoryMeta = {
  label: ArticleCategory;
  slug: string;
  shortLabel: string;
  icon: "wheel" | "engine" | "helmet" | "wrench" | "flash";
  color: string;
  softColor: string;
};

export type Article = {
  slug: string;
  title: string;
  category: ArticleCategory;
  summary: string;
  deck: string;
  coverLabel: string;
  author: string;
  publishedAt: string;
  readMinutes: number;
  featured?: boolean;
  coverPalette: {
    from: string;
    to: string;
  };
  metrics: {
    views: string;
    comments: number;
  };
  keyPoints: string[];
  paragraphs: string[];
};

export const categoryMeta: CategoryMeta[] = [
  {
    label: "新车发布",
    slug: "launch",
    shortLabel: "Launch",
    icon: "wheel",
    color: "#0A84FF",
    softColor: "#E7F2FF"
  },
  {
    label: "行业快讯",
    slug: "industry",
    shortLabel: "Pulse",
    icon: "flash",
    color: "#FF6B35",
    softColor: "#FFF0EA"
  },
  {
    label: "技术工程",
    slug: "engineering",
    shortLabel: "Tech",
    icon: "engine",
    color: "#00A6A6",
    softColor: "#E5FAF8"
  },
  {
    label: "装备指南",
    slug: "gear",
    shortLabel: "Gear",
    icon: "helmet",
    color: "#7C5CFC",
    softColor: "#F0ECFF"
  },
  {
    label: "改装工场",
    slug: "custom",
    shortLabel: "Build",
    icon: "wrench",
    color: "#F43F5E",
    softColor: "#FFE9EE"
  }
];

export const categories = categoryMeta.map((item) => item.label);

export const articles: Article[] = [
  {
    slug: "qjmotor-midweight-adv-platform-briefing",
    title: "QJMOTOR 中量级 ADV 平台转向双版本策略，长途配置成为核心卖点",
    category: "新车发布",
    summary:
      "新一轮发布不再只拼排量，品牌开始把风挡、电控、行李系统和续航管理整合成更清晰的场景包。",
    deck: "2026 春季新车焦点",
    coverLabel: "ADV PLATFORM",
    author: "张策",
    publishedAt: "2026-03-30",
    readMinutes: 6,
    featured: true,
    coverPalette: { from: "#0A84FF", to: "#66B8FF" },
    metrics: { views: "4.8k", comments: 62 },
    keyPoints: ["双版本覆盖通勤与轻越野", "原厂边箱和快拆支架成套出售", "TFT 仪表 UI 成为销售亮点"],
    paragraphs: [
      "今年春季的 ADV 市场已经从单纯的动力参数比较，进入了配置结构和场景策略的竞争阶段。品牌不再满足于用一台车覆盖所有用户，而是通过标准版和旅行版分开处理通勤、轻穿越和长途摩旅需求。",
      "从发布信息来看，风挡调节范围、站姿把位、辅助灯电源预留以及原厂边箱接口，正在变成中量级探险车的标准化卖点。用户对完成度的要求比过去更高，这让产品规划越来越像消费电子而不是传统机械产品。",
      "对行业媒体而言，这意味着新车解读不能只讲马力、扭矩和坐高，还要拆解品牌如何组织附件、软件和售后体系，因为这部分已经直接影响到下单决策。"
    ]
  },
  {
    slug: "dealer-floor-smart-display-conversion-watch",
    title: "门店观察：智能仪表与手机互联正在提升运动街车试驾转化",
    category: "行业快讯",
    summary:
      "多地门店反馈显示，年轻用户开始把导航投屏、骑行记录和 UI 质感视为决策因素，而不只是动力和声浪。",
    deck: "终端销售观察",
    coverLabel: "SMART DASH",
    author: "李潇",
    publishedAt: "2026-03-27",
    readMinutes: 5,
    coverPalette: { from: "#FF6B35", to: "#FF9A62" },
    metrics: { views: "3.5k", comments: 37 },
    keyPoints: ["试驾后咨询互联功能的比例明显上升", "街车用户更在意夜间界面可读性", "软件更新节奏成为门店话题"],
    paragraphs: [
      "一季度多地经销商都提到同一个变化，250cc 到 500cc 级别的运动街车用户不再只追问加速和极速，而是会主动询问仪表逻辑、导航显示和车辆 App 是否稳定。",
      "这类需求让整车软件体验从过去的附属卖点，变成影响成交转化的新变量。品牌在发布会上强调系统响应速度和数据回看能力，已经不只是宣传包装，而是在回应门店的真实反馈。",
      "对于内容平台来说，后续的评测结构也要同步变化。除了机械层面的表现，交互、亮度、误触和系统稳定性都应该进入标准化测试框架。"
    ]
  },
  {
    slug: "parallel-twin-cooling-service-playbook",
    title: "并列双缸高温巡检清单：水箱、风扇与节温策略怎么一起看",
    category: "技术工程",
    summary:
      "城市拥堵和夏季高温下，冷却系统的综合效率决定了骑行舒适性，也常常暴露保养与设计上的薄弱点。",
    deck: "技术台前",
    coverLabel: "COOLING CHECK",
    author: "周临",
    publishedAt: "2026-03-24",
    readMinutes: 8,
    coverPalette: { from: "#00A6A6", to: "#53D6D0" },
    metrics: { views: "4.1k", comments: 54 },
    keyPoints: ["先看风扇触发逻辑", "水箱泥污会显著影响低速散热", "副水箱液位变化不能只靠目测"],
    paragraphs: [
      "不少车主在夏天会把高温问题简单归因于排量或车型定位，但真正决定体感的，往往是冷却系统在低速工况下的整体协同能力。风扇触发策略、节温器开启区间和散热器清洁状态缺一不可。",
      "巡检时不应该只盯着水温表。风扇是否及时介入、散热器翅片是否积尘、冷却液是否有衰减和泄漏迹象，都会共同影响高温环境下的稳定性。",
      "如果媒体平台要做这类内容，最有价值的部分不是罗列理论结构，而是建立场景化排查顺序，让普通车主知道先看什么、什么时候需要进店。"
    ]
  },
  {
    slug: "summer-riding-gear-commuter-edit",
    title: "夏季通勤装备编辑选：网眼骑行服、短靴与蓝牙耳机怎么配更实用",
    category: "装备指南",
    summary:
      "真正适合高频通勤的装备组合，核心不是单件参数极致，而是穿脱效率、通风和长时间佩戴舒适度。",
    deck: "编辑部装备单",
    coverLabel: "SUMMER GEAR",
    author: "何尧",
    publishedAt: "2026-03-22",
    readMinutes: 7,
    coverPalette: { from: "#7C5CFC", to: "#A793FF" },
    metrics: { views: "3.2k", comments: 29 },
    keyPoints: ["网眼版型比品牌标签更重要", "短靴防护与步行性需要平衡", "蓝牙耳机按键逻辑影响安全"],
    paragraphs: [
      "夏季通勤装备最容易陷入两种误区，要么只看防护等级忽略闷热体感，要么只追求轻便结果牺牲了基本的保护能力。实际高频使用里，穿脱效率和持续舒适度直接决定一件装备会不会被长期使用。",
      "装备编辑在做推荐时，通常会先看骑行服的网眼结构和护具位置是否贴合，再看短靴的脚踝支撑和下车步行表现，最后才考虑蓝牙耳机的续航和音质。",
      "这类内容之所以重要，是因为装备消费本质上是长期使用体验的判断，而不是一次性的参数比较。"
    ]
  },
  {
    slug: "street-bike-brake-upgrade-sequence",
    title: "街车改装先做刹车还是轮胎？一套兼顾日常与山路的升级顺序",
    category: "改装工场",
    summary:
      "成熟的改装逻辑应该先建立反馈基础，再谈风格强化。轮胎、刹车皮和人机三角的优先级远高于外观件。",
    deck: "Build Order",
    coverLabel: "STREET SETUP",
    author: "陈恒",
    publishedAt: "2026-03-19",
    readMinutes: 6,
    coverPalette: { from: "#F43F5E", to: "#FF8A9F" },
    metrics: { views: "4.4k", comments: 48 },
    keyPoints: ["轮胎决定信心边界", "刹车手感比极限参数更重要", "把手脚踏能显著改善控制感"],
    paragraphs: [
      "很多车主第一次改装时，最先想到的是排气和车身件，因为它们带来的感知变化最直接。但如果目标是提升日常和周末山路的综合完成度，基础反馈件永远应该排在前面。",
      "轮胎、刹车皮和把手脚踏这类项目，会直接改变车辆的抓地反馈、制动力建立和身体支撑点。它们不会像排气那样立刻制造戏剧效果，却决定了骑士真正能不能更快更稳地骑。",
      "把升级拆成基础性能、人机优化和风格强化三个阶段，更容易控制预算，也更不容易出现局部提升打乱整车平衡的问题。"
    ]
  },
  {
    slug: "electric-moto-battery-traceability-watch",
    title: "电动摩托进入溯源竞争，电芯透明度和售后能力拉开品牌差距",
    category: "行业快讯",
    summary:
      "在参数宣传趋同之后，用户开始追问电池来源、控制策略和更换周期，真实使用成本成为新焦点。",
    deck: "产业链观察",
    coverLabel: "BATTERY TRACE",
    author: "宋越",
    publishedAt: "2026-03-15",
    readMinutes: 5,
    coverPalette: { from: "#FF7A45", to: "#FFB18C" },
    metrics: { views: "2.6k", comments: 21 },
    keyPoints: ["核心部件透明度影响购买信心", "售后半径开始进入比较维度", "二手残值关注度升高"],
    paragraphs: [
      "电动摩托在城市通勤里仍然有明显优势，但供应链波动正在迫使用户提出更细的问题。电芯来自哪里、控制器策略是否保守、售后更换周期多久，已经比单纯的续航数字更有说服力。",
      "当品牌间的宣传口径越来越接近时，真实使用成本和故障后的响应能力会成为更明确的分水岭。这类变化也要求行业媒体把报道从发布会信息延伸到售后和残值跟踪。",
      "如果平台能持续沉淀样本和维修反馈，它在电动摩托领域的判断力就会明显强于只做参数转述的资讯站。"
    ]
  },
  {
    slug: "retro-400-suspension-upgrade-roundup",
    title: "复古 400 平台更新节奏变快，底盘升级正在取代纯造型竞争",
    category: "新车发布",
    summary:
      "复古车用户依然重视外观完整度，但减震、制动和仪表结构的现代化提升，开始决定实际口碑。",
    deck: "Retro Watch",
    coverLabel: "RETRO CHASSIS",
    author: "韩维",
    publishedAt: "2026-03-13",
    readMinutes: 4,
    coverPalette: { from: "#1A93FF", to: "#8AC7FF" },
    metrics: { views: "2.9k", comments: 25 },
    keyPoints: ["视觉语言维持克制", "底盘规格升级更受欢迎", "城市休闲定位更清晰"],
    paragraphs: [
      "最近更新的复古车型没有在造型上做大刀阔斧的变化，反而把研发重心放在减震设定、前制动和仪表信息层级上。这种方向很务实，因为复古车用户通常既要审美完整，也不想继续忍受过时设定带来的体验妥协。",
      "从终端反馈来看，复古车的用户结构也在变化。新买家更愿意为质感和底盘稳定性付费，而不是只为情绪价值买单。",
      "这意味着复古平台正在从形象型产品转向城市休闲平台，后续发布策略会更强调长期使用的适配性。"
    ]
  },
  {
    slug: "ecu-throttle-map-aftermarket-risk-guide",
    title: "ECU 刷写到底值不值：油门标定、低转顿挫与保修风险一次讲清",
    category: "技术工程",
    summary:
      "刷写并不是简单的动力解锁，油门响应、温度管理和保修边界都要放在同一张表里评估。",
    deck: "工程解读",
    coverLabel: "ECU MAPPING",
    author: "陆景",
    publishedAt: "2026-03-09",
    readMinutes: 7,
    coverPalette: { from: "#0EABAB", to: "#7CE7E1" },
    metrics: { views: "3.8k", comments: 41 },
    keyPoints: ["先确认原厂标定痛点", "低转可控性比峰值更重要", "刷写前要问清售后边界"],
    paragraphs: [
      "ECU 刷写在社交平台上经常被包装成低成本高收益的升级项目，但真正值得关注的不是峰值马力，而是油门标定是否更线性、低转是否更顺，以及车辆在高温和高负载下会不会出现新的问题。",
      "对大多数街车和 ADV 用户来说，改善顿挫和中段衔接的意义，往往比追求纸面动力更大。只是这类修改会牵涉保修、排放和后续维护，不能只看改装店的宣传案例。",
      "内容平台如果要做这类选题，最应该强调的是风险边界，让读者知道哪些收益是可感知的，哪些代价是长期存在的。"
    ]
  },
  {
    slug: "helmet-intercom-2026-buying-matrix",
    title: "头盔蓝牙 2026 购买矩阵：音质、风噪和按键逻辑谁更值得优先",
    category: "装备指南",
    summary:
      "宣传距离不是全部，真正决定体验的通常是安装兼容性、麦克风抑噪和戴手套时的操作效率。",
    deck: "Buyer Matrix",
    coverLabel: "INTERCOM PICK",
    author: "谢衡",
    publishedAt: "2026-03-06",
    readMinutes: 6,
    coverPalette: { from: "#7F63FF", to: "#C2B5FF" },
    metrics: { views: "2.7k", comments: 26 },
    keyPoints: ["戴手套能否盲操非常关键", "耳机厚度会影响长途舒适度", "固件更新能力不能忽略"],
    paragraphs: [
      "头盔蓝牙市场看似同质化，真正拉开差距的却是那些宣传页很少重点讲的细节。戴手套时能不能盲操、麦克风在高速下的收音表现，以及与不同头盔内衬的兼容性，都会决定它是不是一台能长期用下去的设备。",
      "如果是城市通勤用户，开机速度和接打电话效率通常比最远对讲距离更重要。双人摩旅用户则要更关注多设备连接稳定性、防水等级和长时间佩戴的压耳问题。",
      "推荐内容真正的价值，是帮用户把宣传页上的参数转换成真实使用场景里的优先级。"
    ]
  },
  {
    slug: "touring-luggage-weight-balance-roadmap",
    title: "摩旅装载如何不拖慢节奏：边箱、尾包、副油和电源布局的顺序建议",
    category: "改装工场",
    summary:
      "装得多不等于跑得远，真正影响长途效率的是重心分配、拿取顺序和驻车维护便利性。",
    deck: "Touring Layout",
    coverLabel: "LOAD SYSTEM",
    author: "方屿",
    publishedAt: "2026-03-03",
    readMinutes: 8,
    coverPalette: { from: "#F2506A", to: "#FFB1BE" },
    metrics: { views: "3.9k", comments: 34 },
    keyPoints: ["重物尽量居中靠前", "高频装备必须一停就能拿到", "电源接口位置决定补给效率"],
    paragraphs: [
      "很多摩旅改装案例看起来装备齐全，但真正上路之后会暴露出取物低效、重心后移和驻车不稳的问题。长途装载的核心不是堆数量，而是围绕补给频率和路线节奏组织一套顺手的系统。",
      "边箱适合放低频但形态固定的装备，尾包适合雨具和工具包，临时电源和充气泵则应该放在停车后几秒内就能拿到的位置。只有把取用顺序设计清楚，装载系统才算真正成立。",
      "如果路线里包含连续弯道或非铺装路段，更要避免后部负载过重，因为那会直接影响疲劳和车辆稳定性。"
    ]
  }
];

export function getCategoryMeta(category: string) {
  return categoryMeta.find((item) => item.label === category);
}

export function getFeaturedArticles() {
  return articles.filter((article) => article.featured);
}

export function getLatestArticles(limit?: number) {
  const sorted = [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function getTrendingArticles(limit = 4) {
  return [...articles]
    .sort((a, b) => {
      const views = (value: string) => Number.parseFloat(value.replace("k", ""));
      return views(b.metrics.views) - views(a.metrics.views);
    })
    .slice(0, limit);
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category?: string) {
  if (!category || category === "全部") {
    return getLatestArticles();
  }

  return getLatestArticles().filter((article) => article.category === category);
}

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "numeric",
    day: "numeric"
  }).format(new Date(date));
}

export function formatFullDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(date));
}
