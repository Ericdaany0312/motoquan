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
  },
  {
    slug: "zxmoto-wsbk-championship-double-win",
    title: "张雪机车WSBK双冠：2年品牌如何打破欧美日37年垄断",
    category: "行业快讯",
    summary:
      "2026年3月WSBK葡萄牙站，张雪机车在WorldSSP中量级组别背靠背双冠，以领先近4秒的绝对优势打破欧美日品牌垄断，创造中国摩托历史。",
    deck: "历史性时刻",
    coverLabel: "WSBK CHAMPION",
    author: "李潇",
    publishedAt: "2026-04-05",
    readMinutes: 7,
    featured: true,
    coverPalette: { from: "#FF6B35", to: "#FFD700" },
    metrics: { views: "12.4k", comments: 89 },
    keyPoints: ["中国品牌首夺WSBK WorldSSP组别冠军", "820RR-RS零百加速2.81秒，100%自研三电", "订单已超1万台，门店爆单到5-6月"],
    paragraphs: [
      "2026年3月28日至29日，世界超级摩托车锦标赛（WSBK）葡萄牙站波尔蒂芒赛道传来捷报——成立仅两年的中国品牌张雪机车（ZXMOTO），在WorldSSP中量级组别实现背靠背双冠，以领先第二名近4秒的绝对优势打破欧美日品牌对该组别长达37年的垄断。这是中国摩托品牌首次登顶WSBK组别领奖台最高位置。",
      "参赛车型为张雪820RR-RS，搭载819cc直列三缸发动机，零百加速仅2.81秒，发动机、车架、电控实现100%国产自研。创始人张雪1987年生于湖南山村，14岁当修车学徒，26岁揣2万元赴重庆创业，2024年创立张雪机车，2025年产值已达7.5亿元。",
      "WSBK夺冠后全国门店爆单，截至2026年4月初，两款在售车型全国总订单已突破1万台，多款热门车型订单排至5至6月。行业认为，张雪机车证明了国产大排量发动机自主研发能力已获国际认可，是中国摩托车从性价比向技术领先跃迁的标志性事件。"
    ]
  },
  {
    slug: "cfmoto-2026-spring-day-racing-for-you",
    title: "CFMOTO 2026春风日：500SR最强原厂车发布，V4引擎跻身世界一线",
    category: "新车发布",
    summary:
      "2026春风日CFMOTO发布500SR仿赛，号称最强原厂车；V4 SR-RR公升级超跑正式亮相，157kW动力、整备质量低于200kg，标志中国超级跑车正式跻身世界第一梯队。",
    deck: "中国动力运动",
    coverLabel: "CFMOTO SPRING DAY",
    author: "张策",
    publishedAt: "2026-04-04",
    readMinutes: 6,
    coverPalette: { from: "#0A84FF", to: "#66B8FF" },
    metrics: { views: "7.2k", comments: 56 },
    keyPoints: ["500SR素车天马赛道圈速1分08秒", "V4 SR-RR 157kW/210匹+极速300+", "2025年前三季度营收148.96亿元同比+30%"],
    paragraphs: [
      "2026春风日活动上，CFMOTO正式发布运动仿赛500SR，搭载企业自主研发水冷直列四缸发动机，最大功率61kW，天马赛道素车圈速1分08秒，号称最强原厂车。同时CFMOTO V4 SR-RR国内动态首秀，997cc V4引擎，整备质量低于200kg，马力推重比达国际一线高性能超跑水准，标志中国超级跑车正式跻身世界第一梯队。",
      "2025年前三季度CFMOTO营业收入148.96亿元，同比增长30.10%；净利润14.15亿元，同比增长30.89%。全球7000+经销商，覆盖100+国家。赛事方面，2024赛季斩获Moto3车手、车队、制造商三项世界冠军，2025年拓展至Moto2赛事，赛事技术反哺量产车型的自研水冷直列四缸发动机已应用于500SR。",
      "亚摩联A级赛道成都天府国际赛道也在本次春风日活动中亮相，300名骑手巡游，700+车友现场体验。同时宣布CFMOTO Racing天才计划升级，9-12岁小车手选拔启动。"
    ]
  },
  {
    slug: "cfmoto-v4-sr-rr-milan-moto-show",
    title: "V4 SR与公升MT双旗舰并场！CFMOTO新车亮相米兰车展",
    category: "新车发布",
    summary:
      "CFMOTO携V4 SR-RR超级跑车和1000MT-X亮相米兰国际车展，V4引擎157kW极速300+，计划量产500辆以上冲击WSBK。",
    deck: "米兰车展",
    coverLabel: "EICMA MILAN",
    author: "张策",
    publishedAt: "2026-03-30",
    readMinutes: 5,
    coverPalette: { from: "#0A84FF", to: "#3B82F6" },
    metrics: { views: "5.8k", comments: 43 },
    keyPoints: ["V4 SR-RR 157kW计划量产500辆冲击WSBK", "1000MT-X 946cc双缸199kg干重", "GP版花675NK（Aspar车队版）亮相"],
    paragraphs: [
      "CFMOTO在米兰国际车展上展出V4 SR-RR超级跑车，搭载997cc V4水冷发动机，最大功率157kW（约210匹以上），整备质量低于200kg，推重比大于1，极速300+km/h，计划量产500辆以上冲击WSBK赛事。同期展出的还有1000MT-X，946.2cc并列双缸发动机，105Nm@6250rpm，83kW@8500rpm，199kg干重，450公里续航，配备Brembo辐照卡钳和倍耐力Scorpion STR轮组。",
      "展台上还出现了GP版花675NK，即CFMOTO Aspar车队参赛车型。此外，以MotoGP为主题的电影《Idols偶像》2026年3月19日上映，讲述春风Aspar车队故事，赛事文化输出持续深化。",
      "CFMOTO的全球化策略以本土生产+本地适配为核心，欧洲市场中国品牌占有率连续十年第一。CFMOTO DAY已落地全球20余个国家和地区，从产品出海向文化出海升级。"
    ]
  },
  {
    slug: "zxmoto-820rr-rs-500rr-full-intro",
    title: "张雪820RR-RS技术拆解：2.81秒破百的国产三缸旗舰",
    category: "技术工程",
    summary:
      "张雪820RR-RS零百加速2.81秒的背后，是819cc直列三缸100%自研的动力系统，本文拆解发动机、车架和电控三大核心。",
    deck: "技术深读",
    coverLabel: "ZX820RR TECH",
    author: "周临",
    publishedAt: "2026-04-04",
    readMinutes: 8,
    coverPalette: { from: "#FF6B35", to: "#FF9A62" },
    metrics: { views: "6.1k", comments: 47 },
    keyPoints: ["819cc直列三缸100%自研", "零百加速2.81秒", "车架和电控同样100%国产自研"],
    paragraphs: [
      "张雪820RR-RS的核心竞争力来自一套完全自主研发的动力系统。819cc直列三缸水冷发动机配合完善的电控系统，零百加速实测2.81秒，这一数据已经进入国际顶级运动车型行列。更重要的是，发动机、车架和电控三大核心全部实现国产自研，不依赖外部供应商。",
      "从赛道表现来看，背靠背双冠、领先第二名近4秒的成绩证明了整车完成度而非单纯参数。WSBK赛场的高温、高负载、连续高强度驾驶环境，是最严苛的量产车验证条件。",
      "对于国产摩托行业而言，张雪机车的意义在于证明了中国品牌不仅能够造出高参数的发动机，更能够在顶级赛事环境中验证其可靠性和综合性能。这一步的跨越比单纯的数据突破更有长期价值。"
    ]
  },
  {
    slug: "cfmoto-800mt-x-utility-review",
    title: "CFMOTO 800MT-X综合测评：22.5升油箱拉力风，真实长途能力如何",
    category: "装备指南",
    summary:
      "799cc直列双缸水冷电喷发动机，83kW最大功率，22.5升大容量油箱，3种骑行模式+定速巡航，800MT-X长途舒适性实地测评。",
    deck: "长途ADV实测",
    coverLabel: "800MT-X REVIEW",
    author: "何尧",
    publishedAt: "2026-04-02",
    readMinutes: 7,
    coverPalette: { from: "#00A6A6", to: "#53D6D0" },
    metrics: { views: "4.3k", comments: 38 },
    keyPoints: ["22.5升油箱续航覆盖450公里", "3种骑行模式+定速巡航", "799cc双缸低转扭矩充沛"],
    paragraphs: [
      "800MT-X是CFMOTO拉力系列的的重要补全车型，799cc直列双缸水冷电喷发动机输出83kW最大功率，22.5升大容量油箱提供450公里级别续航，3种骑行模式加定速巡航覆盖了长途旅行的核心需求。",
      "从实际骑行反馈来看，双缸发动机的低转扭矩特性对载重和烂路环境更为友好，相比同级别四缸机型在非铺装路面上的可控性更优。拉力风格的车架和长行程减震设定，让这台车在复杂路况下的信心建立比纯公路ADV更为扎实。",
      "800MT-X的亮相也出现在第138届广交会上，与U6 EV四轮全地形车、ZEEHO AE7电动摩托等组成CFMOTO全动力产品矩阵。"
    ]
  },
  {
    slug: "cfmoto-750sr-s-street-track-dual-purpose",
    title: "2026 CFMOTO 750SR-S街跑实测：111匹马力双用途定位是否成立",
    category: "装备指南",
    summary:
      "749cc水冷直列四缸，111.52ps最大马力，8.16kg-m扭力，街道与赛道双用途定位，750SR-S综合测评。",
    deck: "双用途街跑",
    coverLabel: "750SR-S REVIEW",
    author: "韩维",
    publishedAt: "2026-04-01",
    readMinutes: 6,
    coverPalette: { from: "#7C5CFC", to: "#A793FF" },
    metrics: { views: "3.8k", comments: 29 },
    keyPoints: ["749cc四缸111.52ps街道可用性高", "6前速滑动离合+单向电子快排", "MAXXIS SP轮胎兼顾街道和赛道"],
    paragraphs: [
      "750SR-S搭载749cc水冷直列四缸DOHC 16气门发动机，最大功率111.52ps/10,250rpm，最大扭力8.16kg-m/9,000rpm，匹配6前速滑动离合器和单向电子快排，定位街道与赛道双用途。",
      "从动力特性来看，四缸发动机的高转延伸提供了激情驾驶的基础，而滑动离合器的加入让换挡操作更顺滑，日常通勤和周末跑山的容错率都更高。MAXXIS SP轮胎在街道和轻赛道环境中表现均衡，兼顾了使用寿命和抓地表现。",
      "这台车的核心价值在于用一台车覆盖了多数用户的真实使用场景——工作日通勤代步，周末山道或赛道体验，不需要在两台车之间做取舍。"
    ]
  },
  {
    slug: "mcn-2026-new-bikes-comprehensive-overview",
    title: "MCN 2026新车综合：杜卡迪复古、Zero电动踏板、凯旋限量同步登场",
    category: "新车发布",
    summary:
      "MotorCycle News梳理2026年新车阵容，杜卡迪DesertX Gen2和Formula 73复古限量、Zero LS1电动踏板、凯旋Speed Twin 1200限量版等悉数在列。",
    deck: "2026新车总览",
    coverLabel: "2026 NEW BIKES",
    author: "宋越",
    publishedAt: "2026-03-31",
    readMinutes: 5,
    coverPalette: { from: "#F43F5E", to: "#FF8A9F" },
    metrics: { views: "4.1k", comments: 35 },
    keyPoints: ["Ducati DesertX Gen2 890cc V2双缸", "Ducati Formula 73 Scrambler限量100周年", "Zero LS1电动踏板英国起售4.5万元"],
    paragraphs: [
      "MCN梳理的2026新车阵容涵盖了从公升级探险到电动通勤的完整价格区间。杜卡迪DesertX Gen2搭载890cc V2双缸发动机，售价14,995英镑起，复古风格的Formula 73 Scrambler限量版售价15,095英镑，庆祝品牌100周年。",
      "电动阵营中，Zero Motorcycles LS1电动踏板车进入欧洲市场，售价从4,500英镑起，成为目前市场上最具性价比的电动摩托入门选项之一。凯旋Speed Twin 1200 Café Racer Edition限量800台，15,995英镑。",
      "值得注意的是，2026年新车趋势明显向双用途和电动化两个方向分化，单纯的性能旗舰数量在减少，品牌更注重在特定场景下的体验完成度。"
    ]
  },
  {
    slug: "mcn-2026-adv-bikes-recommendation",
    title: "MCN 2026 ADV探险摩托推荐：从中量级到旗舰，全路况选择指南",
    category: "装备指南",
    summary:
      "MCN发布2026年ADV推荐榜单，从BMW F900GS到R1250GS Adventure，从Honda Africa Twin到Ducati Multistrada，中量级到公升级全覆盖。",
    deck: "ADV购买指南",
    coverLabel: "BEST ADV 2026",
    author: "谢衡",
    publishedAt: "2026-03-29",
    readMinutes: 6,
    coverPalette: { from: "#0EABAB", to: "#7CE7E1" },
    metrics: { views: "5.2k", comments: 44 },
    keyPoints: ["BMW F900GS适合中量级入门ADV", "Honda Africa Twin公路越野双用途均衡", "Ducati Multistrada 950 S运动ADV首选"],
    paragraphs: [
      "MCN的2026 ADV推荐覆盖了从入门到旗舰的完整产品线。BMW F900GS Adventure以中量级车身提供长途舒适性和轻度越野能力，是目前市场上最均衡的中量级ADV选项之一。旗舰方面，R1250GS Adventure凭借水平对置双缸的独特骑行三角和丰富电控，依然是长途穿越的首选。",
      "Honda Africa Twin Adventure Sports在公路和越野之间取得了最佳平衡点，适合不需要最强动力但要求全面性的用户。Ducati Multistrada 950 S则以运动基因为卖点，在弯道中的灵活性和快速换装能力是其区别于对手的核心优势。",
      "2026年的ADV市场另一个显著变化是电子悬挂和驾驶辅助系统的下放速度加快，中量级车型的配置水平已经接近三年前的旗舰规格，这让选购逻辑变得更复杂——不再是单纯比较排量大小。"
    ]
  },
  {
    slug: "advrider-tat-2026-ride-report-preview",
    title: "ADVrider TAT 2026横穿美国计划启动：7月出发21天穿越路线前瞻",
    category: "行业快讯",
    summary:
      "ADVrider论坛发起2026年横穿美国TAT路线计划，7月13日出发，预计21天完成从东向西的完整穿越，多辆不同品牌ADV参与。",
    deck: "环球摩旅",
    coverLabel: "TAT 2026",
    author: "方屿",
    publishedAt: "2026-04-03",
    readMinutes: 5,
    coverPalette: { from: "#7F63FF", to: "#C2B5FF" },
    metrics: { views: "2.8k", comments: 22 },
    keyPoints: ["TAT路线从东向西横穿美国", "7月13日出发预计21天完成", "论坛多车种、多品牌ADV参与"],
    paragraphs: [
      "ADVrider论坛每年一度的横穿美国TAT（Trans America Trail）计划2026年再次启动，本次车队计划7月13日出发，预计21天完成从东向西的完整路线穿越。TAT路线以非铺装路面为主，途经美国多个州的山地、沙漠和森林地形，对车辆续航、减震和装载系统都有较高要求。",
      "相比Ducati DesertX Gen2等新型ADV的发布，TAT这类真实穿越故事在ADVrider社区更受欢迎。论坛的精华Ride Reports栏目一直是全球摩旅爱好者关注的核心内容，涵盖从突尼斯沙漠到缅甸高原的各种极端路况骑行经验。",
      "对于长途探险摩旅爱好者而言，ADVrider的精华帖比任何官方评测都有更高的参考价值，因为这些内容来自真实长时间、多路况的连续使用反馈。"
    ]
  },
  {
    slug: "advrider-turkey-tet-epic-ride",
    title: "土耳其TET意外冒险：三人三车两周4000公里野营穿越",
    category: "行业快讯",
    summary:
      "ADVrider论坛一篇土耳其TET路线野营穿越帖引发关注，三人三车两周时间纯骑行乐趣，4000+公里穿越土耳其全境。",
    deck: "精华摩旅",
    coverLabel: "TET TURKEY",
    author: "方屿",
    publishedAt: "2026-04-02",
    readMinutes: 4,
    coverPalette: { from: "#F2506A", to: "#FFB1BE" },
    metrics: { views: "2.4k", comments: 18 },
    keyPoints: ["土耳其TET路线三人三车野营穿越", "两周4000+公里", "意外冒险故事性极强"],
    paragraphs: [
      "ADVrider论坛一篇题为《TET Turkey: The Adventure We Didnt Plan》的帖子记录了一场三人三车、两周时间、穿越土耳其全境的真实野营摩旅经历。帖子以意外冒险为主题，骑行过程中遭遇了计划外的路况挑战，但正是这些非预期元素让故事更具参考价值。",
      "土耳其TET路线的特点在于兼顾了沿海公路的舒适性和内陆高原的越野挑战，加上相对友好的物价和极高的当地人对摩托车的友好度，是全球摩旅爱好者公认的性价比极高的长途目的地。",
      "ADVrider社区的Ride Reports栏目之所以质量极高，核心在于这些内容来自普通车友的真实记录，没有任何商业目的，器材、路线和后勤安排都代表了真实使用场景。"
    ]
  },
  {
    slug: "mcn-2026-superbike-ranking",
    title: "MCN 2026超级摩托排行榜：200匹成入门门槛，公升级竞争格局解读",
    category: "装备指南",
    summary:
      "MCN年度超级摩托排行榜显示，200hp已成为公升级超级摩托的入门门槛，Yamaha R1英国停产仅保留赛道版，Ducati Panigale V4 R持续进化。",
    deck: "超级摩托榜单",
    coverLabel: "SUPERBIKE RANKING",
    author: "李潇",
    publishedAt: "2026-03-28",
    readMinutes: 6,
    coverPalette: { from: "#F43F5E", to: "#FF6B6B" },
    metrics: { views: "5.6k", comments: 51 },
    keyPoints: ["200hp成为公升级超跑入门门槛", "Yamaha R1英国停产仅保留赛道版", "KTM 990 RCR街道赛道两用定位清晰"],
    paragraphs: [
      "MCN 2026超级摩托排行榜揭示了一个明确趋势：200匹马力已经从性能目标变成了公升级超级摩托的入门门槛。各品牌在这一区间的产品力已经高度同质化，差异化主要来自电子系统、骑行三角和售后服务体系。",
      "值得注意的是Yamaha R1在英国市场已停止量产，仅保留赛道版本。这标志着传统顶级的公升级超级摩托正在从大众消费品向小众赛道专用方向收缩，公路骑士的主流选择已经下移到200匹级别的中量级超级摩托。",
      "Ducati Panigale V4 R依然是榜单中最极致的存在，2026款持续针对空气动力学和高转延伸进行优化。KTM 990 RCR则代表了一种更务实的方向——街道和赛道的两用平衡，吸引了不需要极致参数但要求综合完成度的用户。"
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
