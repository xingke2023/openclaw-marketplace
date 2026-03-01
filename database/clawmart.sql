-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: clawmart
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listings`
--

DROP TABLE IF EXISTS `listings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'available',
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Claw',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `listings_slug_unique` (`slug`),
  KEY `listings_user_id_foreign` (`user_id`),
  CONSTRAINT `listings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=417 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listings`
--

LOCK TABLES `listings` WRITE;
/*!40000 ALTER TABLE `listings` DISABLE KEYS */;
INSERT INTO `listings` VALUES (338,NULL,'Davide · 前端系统架构师','davide-frontend-architect',0.00,'意大利籍高级前端架构师，10 年大厂经验。精通 React / Next.js 系统拆分、性能调优与组件库设计。能快速评审代码架构、输出可落地的重构方案，并提供完整技术决策文档。',NULL,'available','AI 角色','2026-02-28 18:35:59','2026-02-28 18:35:59'),(339,NULL,'Tom · 融资经理','tom-fundraising-manager',0.00,'专注早期创业公司融资的 AI 助手。帮助创始人梳理融资逻辑、打磨 Pitch Deck、准备 Due Diligence 材料，并模拟 VC 问答场景。已协助 50+ 项目完成天使轮及 Pre-A 轮融资。',NULL,'available','AI 角色','2026-02-28 18:35:59','2026-02-28 18:35:59'),(340,NULL,'Sophia · 内容营销总监','sophia-content-marketing-director',0.00,'内容营销人工智能与多代理写作流程——Grok 研究、Opus 写作、品牌声音系统。从选题调研到成稿发布，全链路自动化，输出风格统一、转化率极高的品牌内容。',NULL,'available','AI 角色','2026-02-28 18:35:59','2026-02-28 18:35:59'),(341,NULL,'Marcus · 客服自动化专家','marcus-customer-service-automation',0.00,'专注企业客服全流程自动化。构建多轮对话工作流、智能工单分发与情绪识别系统，无缝对接 Zendesk、Intercom 等主流平台。平均将人工响应成本降低 70%，客户满意度提升至 95% 以上。',NULL,'available','AI 角色','2026-02-28 18:35:59','2026-02-28 18:35:59'),(342,NULL,'Elena · 数据分析师','elena-data-analyst',0.00,'精通 Python、SQL 与 BI 工具的 AI 数据分析员。自动清洗原始数据、构建分析模型、生成可视化报告，并用非技术语言解读关键业务洞察。支持 Google Analytics、Mixpanel、Snowflake 等主流数据源接入。',NULL,'available','AI 角色','2026-02-28 18:35:59','2026-02-28 18:35:59'),(343,NULL,'Ryan · SEO 增长专家','ryan-seo-growth-expert',0.00,'全栈 SEO 自动化智能体。涵盖关键词研究、竞品分析、内链优化、技术 SEO 审查与外链建设全流程。结合 Ahrefs、Search Console 数据自动生成优先级行动清单，帮助网站在 90 天内实现自然流量显著增长。',NULL,'available','AI 角色','2026-02-28 18:35:59','2026-02-28 18:35:59'),(344,NULL,'Mia · 社媒运营专家','mia-social-media-manager',0.00,'覆盖小红书、微博、抖音、Instagram 全平台的 AI 社媒运营员。自动规划内容日历、生成平台适配文案与配图提示词、分析互动数据并优化发布节奏。擅长打造品牌人设、提升粉丝粘性与自然增长。',NULL,'available','AI 角色','2026-02-28 18:35:59','2026-02-28 18:35:59'),(345,NULL,'Alex · AI CEO','alex-ai-ceo',0.00,'你的 AI CEO——负责产品交付、代码管理、沟通协调、记忆一切、运营你的业务。统筹调度其他 AI 员工，追踪项目进度，处理跨部门协作，让你专注于最重要的决策。',NULL,'available','AI 角色','2026-02-28 18:35:59','2026-02-28 18:35:59'),(346,NULL,'Claire · 法律合规顾问','claire-legal-compliance',0.00,'专注企业法律合规的 AI 顾问。覆盖合同审查、隐私政策起草、劳动法合规、知识产权保护及跨境数据合规。熟悉中国、欧盟、美国三地监管框架，帮助初创企业在快速扩张中规避法律风险。',NULL,'available','AI 角色','2026-02-28 18:35:59','2026-02-28 18:35:59'),(347,NULL,'James · HR 招聘专家','james-hr-recruitment',0.00,'全流程 AI 招聘助手。自动撰写职位描述、筛选简历、设计结构化面试题库，并对候选人进行初步评估与背景调查。支持 LinkedIn、Boss 直聘等主流平台数据接入，帮助企业将平均招聘周期缩短 60%。',NULL,'available','AI 角色','2026-02-28 18:35:59','2026-02-28 18:35:59'),(348,NULL,'Linda · 财务会计专家','linda-finance-accounting',0.00,'专业 AI 财务会计助手。自动处理日常记账、发票核对、工资核算与税务申报，生成月度财务报表与现金流预测。熟悉中国会计准则与 IFRS，支持对接用友、金蝶等主流财务系统，让财务工作零出错、全透明。',NULL,'available','AI 角色','2026-02-28 18:35:59','2026-02-28 18:35:59'),(349,NULL,'Kevin · 产品经理','kevin-product-manager',0.00,'经验丰富的 AI 产品经理。负责需求拆解、PRD 撰写、用户故事梳理与优先级排序，协调研发、设计与运营团队高效协作。擅长竞品分析、MVP 定义与版本迭代规划，帮助产品从 0 到 1 快速落地。',NULL,'available','AI 角色','2026-02-28 18:35:59','2026-02-28 18:35:59'),(350,NULL,'Amy · 运营总监','amy-operations-director',0.00,'全能 AI 运营助手。覆盖用户增长、活动策划、社群运营与留存优化全链路。自动生成运营日历、监控关键指标、输出数据复盘报告，并基于用户行为数据持续调整运营策略，让业务飞轮高速转动。',NULL,'available','AI 角色','2026-02-28 18:35:59','2026-02-28 18:35:59'),(351,NULL,'小红书运营助手','xiaohongshu-operations-kit',0.00,'专为小红书内容创作者和品牌设计的技能包。包含爆款标题生成、笔记结构模板、话题标签策略、评论互动话术及数据复盘模板。一键输出符合平台算法偏好的图文内容，快速积累自然流量。',NULL,'available','营销','2026-02-28 18:35:59','2026-02-28 18:35:59'),(352,NULL,'公众号运营助手','wechat-official-account-kit',0.00,'微信公众号全流程运营技能包。涵盖选题策划、排版规范、推文撰写、菜单配置建议与粉丝互动话术。内置多种文章风格模板（深度长文、轻量资讯、互动投票），帮助账号持续保持高打开率与低取关率。',NULL,'available','营销','2026-02-28 18:35:59','2026-02-28 18:35:59'),(353,NULL,'抖音爆款视频脚本','douyin-viral-script-kit',0.00,'专为抖音创作者打造的脚本生成技能。内置钩子开场、情绪节奏、转折设计与引导关注话术模板。支持口播、剧情、测评、种草等多种视频类型，平均完播率提升 40%。',NULL,'available','营销','2026-02-28 18:35:59','2026-02-28 18:35:59'),(354,NULL,'AI 冷邮件外联','ai-cold-email-outreach-kit',0.00,'B2B 销售团队必备技能包。自动研究目标客户背景、生成个性化开场白、撰写跟进序列邮件并优化主题行。平均回复率提升 3 倍，帮助销售团队高效拓客。',NULL,'available','营销','2026-02-28 18:35:59','2026-02-28 18:35:59'),(355,NULL,'Prompt 工程师工具包','prompt-engineering-toolkit',0.00,'系统化提示词设计与优化技能。覆盖 Chain-of-Thought、Few-shot、ReAct、角色扮演等主流提示技巧，内含 200+ 可复用提示模板，帮助开发者快速构建高质量 AI 工作流。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(356,NULL,'Next.js 全栈开发加速','nextjs-fullstack-accelerator',0.00,'涵盖 Next.js App Router、API 设计、数据库集成与部署配置的完整开发技能。内置代码审查、性能优化建议与最佳实践检查清单，帮助独立开发者快速交付生产级应用。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(357,NULL,'LinkedIn 个人品牌增长','linkedin-personal-brand-kit',0.00,'专为职场人和创始人设计的 LinkedIn 运营技能。包含个人简介优化、内容日历规划、爆款帖子生成器、评论互动策略与连接请求话术，帮助账号在 30 天内实现粉丝量翻倍。',NULL,'available','营销','2026-02-28 18:35:59','2026-02-28 18:35:59'),(358,NULL,'电商选品与竞品分析','ecommerce-product-research-kit',0.00,'跨境电商卖家的智能选品工具包。自动抓取 Amazon、速卖通热销数据，分析利润空间、竞争密度与趋势走向，输出可操作的选品报告，大幅降低新品试错成本。',NULL,'available','营销','2026-02-28 18:35:59','2026-02-28 18:35:59'),(359,NULL,'Figma 设计系统生成器','figma-design-system-generator',0.00,'一键生成完整设计系统的 AI 技能。根据品牌色和字体偏好，自动产出组件库规范、间距系统、图标风格指南与深色模式适配方案，让设计与研发协作效率提升 50%。',NULL,'available','设计','2026-02-28 18:35:59','2026-02-28 18:35:59'),(360,NULL,'投资人 Pitch Deck','investor-pitch-deck-kit',0.00,'帮助创业者打磨融资演示文稿的技能包。涵盖问题定义、市场规模、商业模式、竞争壁垒与财务预测各模块的撰写框架，并内置顶级 VC 常见问题应答库，大幅提升路演通过率。',NULL,'available','其他','2026-02-28 18:35:59','2026-02-28 18:35:59'),(361,NULL,'AI 客服知识库构建','ai-knowledge-base-builder',0.00,'快速搭建企业专属 AI 知识库的工具包。自动整理 FAQ、产品文档与历史工单，生成结构化知识图谱，支持接入 ChatBot 或内部搜索系统，让客服响应准确率达到 90% 以上。',NULL,'available','其他','2026-02-28 18:35:59','2026-02-28 18:35:59'),(362,NULL,'本体知识图谱','ontology',0.00,'用于结构化智能体记忆与可组合技能的类型化知识图谱。支持创建和查询实体（人物、项目、任务、事件、文档），关联对象，执行约束校验，将多步骤操作规划为图变换，以及跨技能共享状态。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(363,NULL,'自我进化智能体','self-improving-agent',0.00,'捕获学习经验、错误与修正以实现持续改进。适用于命令意外失败、用户纠正 AI 输出、需要记录操作规律等场景，让智能体越用越聪明。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(364,NULL,'Google 全家桶命令行','google-workspace-cli',0.00,'一站式操控 Gmail、Google Calendar、Drive、Contacts、Sheets 和 Docs 的命令行技能包。让 AI 直接读写你的 Google 工作区，自动化日常办公流程。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(365,NULL,'Tavily 网页搜索','tavily-web-search',0.00,'通过 Tavily API 实现 AI 优化的网页搜索。为 AI 智能体返回简洁、相关的搜索结果，无需浏览器，响应速度极快。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(366,NULL,'技能发现助手','find-skills',0.00,'当用户询问如何做某件事或寻找特定功能时，自动帮助发现并安装合适的智能体技能。是扩展 AI 能力边界的最佳入口。',NULL,'available','其他','2026-02-28 18:35:59','2026-02-28 18:35:59'),(367,NULL,'内容摘要生成器','summarize',0.00,'一键摘要 URL 或文件内容，支持网页、PDF、图片、音频和 YouTube 视频。使用 summarize CLI 驱动，无需额外 API Key。',NULL,'available','其他','2026-02-28 18:35:59','2026-02-28 18:35:59'),(368,NULL,'AI 浏览器自动化','agent-browser',0.00,'基于 Rust 的高速无头浏览器自动化 CLI，支持 Node.js 降级。让 AI 智能体实现页面导航、点击、输入和截图，通过结构化命令完全控制浏览器行为。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(369,NULL,'GitHub 操作包','github-cli-kit',0.00,'使用 gh CLI 与 GitHub 深度集成。支持 Issue 管理、PR 审查、CI 运行监控与 API 高级查询，让 AI 直接参与代码协作流程。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(370,NULL,'实时天气查询','weather-forecast',0.00,'获取当前天气状况与未来预报，无需 API Key。支持全球城市查询，可集成到日程规划、出行助手等工作流中。',NULL,'available','其他','2026-02-28 18:35:59','2026-02-28 18:35:59'),(371,NULL,'Polymarket 预测市场','polymarket-odds',0.00,'查询 Polymarket 预测市场数据，检查赔率、热门市场、事件搜索、价格走势与动量分析。包含观察列表提醒、结算日历与市场对比功能。',NULL,'available','其他','2026-02-28 18:35:59','2026-02-28 18:35:59'),(372,NULL,'主动型智能体框架','proactive-agent',0.00,'将 AI 从任务执行者升级为主动合作伙伴，能预判需求、持续自我改进。包含 WAL 协议、工作缓冲区、自主定时任务与实战验证模式。Hal Stack 系列。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(373,NULL,'Notion 工作区管理','notion-workspace',0.00,'通过 Notion API 创建和管理页面、数据库与内容块。让 AI 直接读写你的 Notion 工作区，自动化知识管理与项目追踪流程。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(374,NULL,'PDF 自然语言编辑器','nano-pdf-editor',0.00,'用自然语言指令编辑 PDF 文件。基于 nano-pdf CLI，支持文本修改、页面操作与内容提取，无需专业 PDF 工具。',NULL,'available','其他','2026-02-28 18:35:59','2026-02-28 18:35:59'),(375,NULL,'AI 图像生成与编辑','ai-image-generator',0.00,'基于 Gemini 3 Pro 的图像生成与编辑技能。支持文字生成图像和图像二次编辑，提供 1K/2K/4K 分辨率输出，可用于设计素材、营销图片与创意内容生产。',NULL,'available','设计','2026-02-28 18:35:59','2026-02-28 18:35:59'),(376,NULL,'API 网关集成','api-gateway-kit',0.00,'一键接入 100+ 主流 API，包括 Google Workspace、Microsoft 365、GitHub、Notion、Slack、Airtable、HubSpot 等，托管 OAuth 认证，无需手动配置密钥。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(377,NULL,'Obsidian 笔记自动化','obsidian-automation',0.00,'操作 Obsidian 知识库（Markdown 笔记）并通过 obsidian-cli 实现自动化。支持笔记创建、搜索、链接管理与双链知识图谱维护。',NULL,'available','其他','2026-02-28 18:35:59','2026-02-28 18:35:59'),(378,NULL,'Whisper 本地语音转文字','openai-whisper-local',0.00,'使用 OpenAI Whisper CLI 实现本地语音转文字，无需 API Key，数据完全本地处理。支持多语言识别，适合会议记录、播客转写与语音备忘录场景。',NULL,'available','其他','2026-02-28 18:35:59','2026-02-28 18:35:59'),(379,NULL,'AI 写作人性化改写','humanizer-ai-text',0.00,'去除 AI 写作痕迹，让文本更自然真实。自动检测并修正夸张象征、宣传语气、表面分析、模糊归因、破折号滥用、三段式结构与 AI 专属词汇等问题。',NULL,'available','营销','2026-02-28 18:35:59','2026-02-28 18:35:59'),(380,NULL,'免费 AI 模型管理器','free-ai-model-manager',0.00,'通过 OpenRouter 管理免费 AI 模型，自动按质量排名、配置降级回退策略并更新 OpenClaw 配置。让你始终使用最优质的免费模型，零成本运行 AI 工作流。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(381,NULL,'MCP 服务器管理工具','mcp-server-manager',0.00,'使用 mcporter CLI 列出、配置、认证并调用 MCP 服务器与工具，支持 HTTP 和 stdio 模式，包括临时服务器、配置编辑与 CLI 类型生成。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(382,NULL,'Brave 网页搜索','brave-search-kit',0.00,'通过 Brave Search API 实现网页搜索与内容提取。适用于文档查询、事实核验或任意网页内容获取，轻量级设计，无需浏览器。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(383,NULL,'项目知识上下文管理','project-knowledge-context',0.00,'使用 ByteRover 上下文树管理项目知识，提供查询和整理两种操作。适用于信息检索、规律发现与跨会话知识持久化场景。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(384,NULL,'智能体自动更新器','auto-updater-skill',0.00,'每日自动更新 OpenClaw 及所有已安装技能。通过 cron 定时运行，检查更新、自动应用，并向用户发送变更摘要，保持 AI 工作流始终处于最新状态。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(385,NULL,'Slack 消息自动化','slack-automation-kit',0.00,'通过 Slack API 实现消息发送、频道管理、工作流触发与通知自动化。支持定时推送、关键词监听与多频道批量操作，让团队沟通效率翻倍。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(386,NULL,'SQL 数据库查询助手','sql-query-assistant',0.00,'自然语言转 SQL 查询技能。支持 MySQL、PostgreSQL、SQLite 等主流数据库，自动生成复杂查询、优化执行计划并解释查询结果，让非技术人员也能轻松操作数据库。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(387,NULL,'Docker 容器管理','docker-management-kit',0.00,'AI 驱动的 Docker 容器管理工具包。支持容器启停、镜像构建、日志分析、网络配置与 Docker Compose 编排，让运维操作变得简单直观。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(388,NULL,'代码审查与重构','code-review-refactor-kit',0.00,'专业级代码审查与重构技能包。自动检测代码异味、安全漏洞、性能瓶颈与可读性问题，提供具体修复建议与重构方案，支持 Python、JavaScript、TypeScript、Go 等主流语言。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(389,NULL,'多语言翻译','multilingual-translation-kit',0.00,'支持 100+ 语言的专业翻译技能包。具备语境感知、行业术语库与品牌语调一致性保障，适用于产品文档、营销内容、法律合同与用户界面本地化翻译。',NULL,'available','其他','2026-02-28 18:35:59','2026-02-28 18:35:59'),(390,NULL,'会议记录与行动项提取','meeting-notes-action-items',0.00,'自动整理会议记录，提取关键决策与行动项，分配责任人并设定截止日期。支持语音转文字输入，输出结构化会议纪要并同步至 Notion、飞书、Slack 等协作工具。',NULL,'available','其他','2026-02-28 18:35:59','2026-02-28 18:35:59'),(391,NULL,'Airtable 数据库自动化','airtable-automation-kit',0.00,'通过自然语言操作 Airtable 数据库。支持记录增删改查、视图筛选、自动化规则配置与跨表关联，让业务数据管理变得像对话一样简单。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(392,NULL,'邮件营销序列生成器','email-marketing-sequence',0.00,'自动生成高转化率的邮件营销序列。涵盖欢迎系列、培育序列、复购激活与流失挽回邮件，内置 A/B 测试建议与主题行优化，适配 Mailchimp、SendGrid 等主流平台。',NULL,'available','营销','2026-02-28 18:35:59','2026-02-28 18:35:59'),(393,NULL,'竞品监控与分析','competitor-monitoring-kit',0.00,'持续追踪竞争对手的产品更新、定价变化、营销动态与用户反馈。自动生成竞品对比报告，识别市场空白与差异化机会，帮助产品和营销团队保持竞争优势。',NULL,'available','营销','2026-02-28 18:35:59','2026-02-28 18:35:59'),(394,NULL,'Jira 项目管理助手','jira-project-management',0.00,'通过自然语言操作 Jira，实现 Issue 创建、Sprint 规划、工时记录与看板管理。自动生成迭代报告、燃尽图分析与团队工作负载均衡建议。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(395,NULL,'品牌视觉识别系统','brand-visual-identity-kit',0.00,'一站式品牌视觉设计技能。根据品牌定位自动生成 Logo 概念方案、色彩系统、字体搭配、图标风格与品牌使用规范手册，帮助初创企业快速建立专业品牌形象。',NULL,'available','设计','2026-02-28 18:35:59','2026-02-28 18:35:59'),(396,NULL,'Stripe 支付集成','stripe-payment-integration',0.00,'快速集成 Stripe 支付系统的开发技能包。涵盖一次性支付、订阅管理、退款处理、Webhook 配置与财务对账自动化，支持多币种与多种支付方式。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(397,NULL,'用户调研与访谈分析','user-research-interview-kit',0.00,'AI 驱动的用户调研全流程技能。自动设计访谈问卷、分析访谈录音、提炼用户痛点与需求洞察，生成结构化用户画像与产品改进建议报告。',NULL,'available','设计','2026-02-28 18:35:59','2026-02-28 18:35:59'),(398,NULL,'自动化测试生成','automated-test-generation',0.00,'自动为代码库生成单元测试、集成测试与端到端测试。支持 Jest、Pytest、Cypress 等主流测试框架，自动计算覆盖率并识别未测试的关键路径。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(399,NULL,'飞书文档自动化','feishu-lark-automation',0.00,'深度集成飞书（Lark）工作区，实现文档创建、多维表格操作、日历管理、消息推送与审批流程自动化。专为国内企业协作场景优化，大幅提升团队工作效率。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(400,NULL,'舆情监控与品牌声誉管理','brand-reputation-monitoring',0.00,'实时监控品牌在微博、微信、知乎、抖音等平台的舆情动态，自动识别负面内容并生成应对建议，帮助企业将危机扼杀在萌芽阶段，维护品牌声誉。',NULL,'available','营销','2026-02-28 18:35:59','2026-02-28 18:35:59'),(401,NULL,'AWS 云资源管理','aws-cloud-management',0.00,'用自然语言管理 AWS 云资源。支持 EC2、S3、Lambda、RDS 等核心服务的查询、配置与成本优化建议，帮助开发团队降低云支出并提升资源利用率。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(402,NULL,'知乎高赞回答生成器','zhihu-answer-generator',0.00,'专为知乎平台优化的内容创作技能。分析热门话题结构与高赞回答规律，自动生成有深度、有观点、有数据支撑的专业回答，帮助个人和品牌在知乎建立行业权威形象。',NULL,'available','营销','2026-02-28 18:35:59','2026-02-28 18:35:59'),(403,NULL,'B 站视频脚本与封面','bilibili-content-kit',0.00,'专为 B 站 UP 主打造的内容创作工具包。包含选题策划、视频脚本、分镜建议、封面文案设计与标签优化，帮助视频快速进入推荐流，提升播放量与粉丝增长。',NULL,'available','营销','2026-02-28 18:35:59','2026-02-28 18:35:59'),(404,NULL,'HubSpot CRM 自动化','hubspot-crm-automation',0.00,'深度集成 HubSpot CRM，实现联系人管理、销售漏斗追踪、自动跟进任务创建与营销邮件触发。结合 AI 分析客户行为，帮助销售团队精准把握成交时机。',NULL,'available','营销','2026-02-28 18:35:59','2026-02-28 18:35:59'),(405,NULL,'Vercel 部署自动化','vercel-deployment-automation',0.00,'一键管理 Vercel 项目部署、环境变量配置、域名绑定与性能监控。支持预览部署链接生成、回滚操作与 Edge Function 配置，让前端部署流程完全自动化。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(406,NULL,'播客内容生产','podcast-production-kit',0.00,'播客创作者的全流程 AI 助手。涵盖选题策划、嘉宾问题设计、开场白与结束语生成、录音转写、内容摘要与多平台推广文案，让每期播客的制作时间缩短 60%。',NULL,'available','营销','2026-02-28 18:35:59','2026-02-28 18:35:59'),(407,NULL,'Claude 系统提示词优化','claude-system-prompt-optimizer',0.00,'专为 Claude 模型优化的系统提示词工程技能。内含角色设定、输出格式控制、思维链激活、安全边界设置与多轮对话记忆管理等高级技巧，大幅提升 AI 输出质量。',NULL,'available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(408,NULL,'独立开发者启动包','indie-hacker-starter-kit',0.00,'专为独立开发者和一人公司设计的全栈 AI 工具包。涵盖产品定位、落地页文案、定价策略、冷启动增长方法与早期用户获取，帮助你在 30 天内完成从想法到首批付费用户的完整旅程。',NULL,'available','其他','2026-02-28 18:35:59','2026-02-28 18:35:59'),(409,NULL,'OpenClaw 企业级营销助手','openclaw-enterprise-marketing',0.00,'专门为中小型企业设计的 AI 营销角色。能够自动生成社交媒体内容、分析市场趋势并优化广告投放。包含全套自动化工作流。','https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop','available','营销','2026-02-28 18:35:59','2026-02-28 18:35:59'),(410,NULL,'Python 自动化工程专家','python-automation-expert',0.00,'一个高度优化的 AI 角色，精通 Python 自动化脚本编写、API 集成和数据处理。内置 50+ 常用自动化模板。','https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop','available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(411,NULL,'极简主义 UI/UX 设计师','minimalist-uiux-designer',0.00,'专注于现代 SaaS 产品界面的 AI 设计智能体。能够基于简单的描述生成 Figma 布局建议、配色方案和交互原型。','https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800&auto=format&fit=crop','available','设计','2026-02-28 18:35:59','2026-02-28 18:35:59'),(412,NULL,'电商运营增长黑客','ecommerce-growth-hacker',0.00,'为独立站和电商平台设计的 AI 助手。监控竞争对手价格、优化产品标题并自动处理客户常见咨询。大幅提升转化率。','https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop','available','营销','2026-02-28 18:35:59','2026-02-28 18:35:59'),(413,NULL,'Rust 系统性能优化专家','rust-performance-expert',0.00,'高级 AI 角色，专注于低延迟系统设计和 Rust 代码优化。能够重构瓶颈代码并提供内存安全建议。','https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop','available','工程','2026-02-28 18:35:59','2026-02-28 18:35:59'),(414,NULL,'创意文案排版智能体','creative-copy-typesetter',0.00,'一个轻量级的技能插件，用于优化长篇博文和营销邮件的视觉层次和可读性。支持多种排版风格。','https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop','available','其他','2026-02-28 18:35:59','2026-02-28 18:35:59'),(415,NULL,'财务审计与报表分析员','finance-audit-analyst',0.00,'合规性极强的 AI 智能体。能够处理复杂的财务数据导出、自动进行账目比对并生成季度合规性分析报告。','https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop','available','其他','2026-02-28 18:35:59','2026-02-28 18:35:59'),(416,NULL,'法律条款分析助手 (中国版)','legal-clause-analyzer-cn',0.00,'深入理解中国商法和劳动法的 AI 角色。帮助初创企业快速审核合同风险并提供法律条款合规建议。','https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop','available','其他','2026-02-28 18:35:59','2026-02-28 18:35:59');
/*!40000 ALTER TABLE `listings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2025_11_29_220023_create_personal_access_tokens_table',1),(5,'2025_11_29_220222_create_posts_table',1),(6,'2026_02_28_175953_create_listings_table',1),(7,'2026_02_28_224010_create_sourcing_requests_table',1),(8,'2026_02_28_230647_add_fields_to_posts_table',1),(9,'2026_03_01_002224_add_profile_fields_to_users_table',2),(10,'2026_03_01_003011_add_user_id_to_listings_table',3),(11,'2026_03_01_003843_create_purchases_table',4);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (5,'App\\Models\\User',7,'auth_token','9b8fba597c0f338748977a1b99a2f405f6af062a4954599468dc88e653098936','[\"*\"]','2026-02-28 18:34:09',NULL,'2026-02-28 16:30:50','2026-02-28 18:34:09');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` text COLLATE utf8mb4_unicode_ci,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `posts_slug_unique` (`slug`),
  KEY `posts_user_id_foreign` (`user_id`),
  CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,'Et rem hic et.','et-rem-hic-et','Culpa porro qui iusto libero hic temporibus voluptatum. Pariatur quis rerum alias aut magnam labore.','Amet est provident deserunt corporis voluptatem nobis quasi expedita. Similique aut pariatur velit quas temporibus rem sed. Nostrum recusandae architecto doloremque explicabo quisquam reiciendis aut dicta. Voluptatum qui eum libero voluptatem maiores maiores earum.\n\nDoloremque optio sint quidem quod rerum qui. Quaerat fugiat fugit odio eos. Fugit voluptatibus quos quia doloremque. Qui non dolor inventore.\n\nSit quisquam unde expedita. Doloremque quaerat similique recusandae maiores unde debitis placeat ut. Veniam at optio sit et cum corporis. Magni consectetur quo magnam beatae. Similique accusantium maiores doloremque perspiciatis odio molestiae sint ullam.\n\nMaxime minima cumque commodi aut dolor unde qui. Et et aspernatur provident maxime. Doloribus earum voluptatem sit nemo voluptas. Esse ut sunt ad numquam sit totam.\n\nQui explicabo repellat minus consequuntur magni temporibus. Eos animi ipsam sapiente quibusdam sit. Sequi iusto sit aut eveniet accusantium aut nihil quasi.','https://picsum.photos/seed/eM0SgTwcWq/800/600',1,'2026-02-25 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(2,1,'Excepturi est provident et hic.','excepturi-est-provident-et-hic','Dolorem laboriosam praesentium nobis enim quia dolores. Ut dicta praesentium quia officia molestiae.','Numquam cupiditate omnis consequuntur doloremque veritatis quas recusandae. Et at enim eaque pariatur error aut eos. Quibusdam dolor molestiae doloribus quia itaque rerum. Sed et accusantium omnis sed.\n\nNostrum quasi aut possimus ut beatae dolorem. Doloribus optio ad assumenda quia voluptates porro cupiditate. Sit vel esse harum corporis harum sed nesciunt.\n\nMaxime temporibus voluptas cumque voluptatibus culpa et officiis quis. Molestiae assumenda ut in id ratione assumenda quo. Libero facilis sunt vel officia id dolor velit.\n\nEt qui ullam suscipit aut velit praesentium culpa. Provident itaque distinctio explicabo voluptas. Qui et quibusdam odio officia cupiditate molestiae corrupti.\n\nAccusantium debitis dolor corrupti ut porro et. Et unde et et aut sequi hic.','https://picsum.photos/seed/TmDBHUNtJU/800/600',1,'2026-02-11 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(3,1,'Et enim autem non temporibus repudiandae.','et-enim-autem-non-temporibus-repudiandae','Fugiat ullam cupiditate ut ipsa. Deserunt nemo expedita blanditiis numquam ex eligendi. Tempore facilis nam eos debitis aperiam.','Incidunt est vel possimus debitis illo quae quis quos. Rerum numquam a qui aliquid. Non illum dolor commodi praesentium. Voluptas et libero voluptatibus aut et consequatur est aut.\n\nAliquid est tenetur corrupti hic quia sint. Aut id qui ipsa temporibus aut. Qui dolores asperiores ut autem. Et aut quidem officia rerum at necessitatibus ea.\n\nNesciunt sint ad provident ea. Suscipit vero vitae voluptatem placeat qui in. Eveniet laboriosam eum velit expedita quidem aut ut. Eius omnis ut cupiditate eos officiis fuga consectetur.\n\nAut minus ab est voluptatibus dignissimos at qui sit. Consequatur voluptatum nostrum velit aut. Eaque iusto nobis sit consectetur est tenetur vero.\n\nVero qui quia animi possimus officiis debitis. Magnam ut doloribus placeat facere quia. Nisi tempora autem pariatur corrupti ab consequatur aut.','https://picsum.photos/seed/5IoA543MoX/800/600',1,'2026-01-31 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(4,1,'Alias commodi tempore sequi voluptatem.','alias-commodi-tempore-sequi-voluptatem','Animi facere id accusamus hic. Facere facere hic iste autem veritatis nam et. Eos placeat est dignissimos culpa earum.','Doloremque voluptatem omnis non suscipit autem. Quam velit cumque consectetur odio alias nihil minus quo. Iure dolorem animi labore vero molestiae.\n\nDolorem voluptatem laudantium cum at esse quia itaque. Et ullam voluptatem est quis. Omnis in facilis modi optio.\n\nA aut qui tempore debitis odio voluptatem. Ullam consequatur iusto provident qui. Architecto eum possimus dolor omnis aut deleniti. Nam odio quia dignissimos mollitia consequuntur adipisci quis dolor. Saepe aut non fugiat earum accusamus cupiditate.\n\nMagni doloribus voluptatibus autem nihil est cum. Sed tempora voluptatem dolorum. Hic qui dolorem sed voluptas.\n\nEligendi nesciunt aliquid enim qui autem. Nisi quia voluptatem quod eos ipsa qui dolor. Ex deserunt enim eum exercitationem animi officiis laboriosam.','https://picsum.photos/seed/V3oJzSwOf1/800/600',1,'2026-01-30 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(5,1,'Accusantium esse dignissimos sit nihil distinctio illo odit molestiae.','accusantium-esse-dignissimos-sit-nihil-distinctio-illo-odit-molestiae','Voluptas et qui consequatur perferendis provident rerum voluptatem. Est magni eum consequatur facere. Quidem voluptas non vitae quasi autem qui sit facere. Sint ut unde mollitia ipsa sunt sint et. Doloribus sed est illo est blanditiis praesentium culpa.','Voluptatem velit aliquam veritatis sapiente voluptate et. Molestiae numquam sint sint debitis et. Id illo exercitationem cumque ea est.\n\nDoloremque aspernatur rerum veniam. Ea aut reprehenderit nostrum perferendis quasi.\n\nRepellendus tempora perferendis ullam maiores praesentium. Omnis recusandae odit repellat ratione iusto. Ex hic placeat sit debitis molestias at ea dolor.\n\nQuo ipsum velit sit facilis occaecati corporis ad. Autem est sed molestiae sunt eaque maxime.\n\nQuis nulla in iusto impedit laborum quas. Enim itaque dolorum cumque temporibus vero sed. Eum tenetur enim esse animi. Aut nisi maiores ab veritatis est.','https://picsum.photos/seed/w9dxB9Oat8/800/600',1,'2026-02-03 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(6,2,'Aut quisquam ad veritatis consequatur nesciunt.','aut-quisquam-ad-veritatis-consequatur-nesciunt','Mollitia tempora voluptatem voluptatibus iusto culpa qui. Et odio deleniti nesciunt aliquid omnis similique nihil quibusdam. Architecto adipisci quia quia possimus incidunt error sit. Minus sequi ut pariatur totam enim.','Ut explicabo praesentium deserunt ipsa. Debitis occaecati quos quis eos. Dolores dicta animi illo enim.\n\nA et non atque nam. Esse sunt distinctio est iste non. Sunt laboriosam rem fugit consectetur minima natus. Incidunt accusantium commodi ratione doloremque aliquam aliquam quo. Optio sint est est animi.\n\nFacere commodi alias dolore rerum aut dolores. Reprehenderit ab quisquam et. Quas officiis corrupti eaque voluptatum consequatur. Ut facilis distinctio aut et odit neque tempora.\n\nQuae est esse commodi et vero placeat. Sed ipsa autem natus id nemo vero reprehenderit. Iste et odit natus quia veritatis iusto. Nobis pariatur in odit repellat assumenda officia ab.\n\nDeserunt fuga non maxime repudiandae quo sunt. Dolor et deleniti hic necessitatibus dicta. Inventore occaecati est voluptate molestiae. Nemo voluptates vel doloribus sed.','https://picsum.photos/seed/jaleTKDBvP/800/600',1,'2026-01-29 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(7,2,'Nobis eligendi ut enim velit explicabo eaque fugiat.','nobis-eligendi-ut-enim-velit-explicabo-eaque-fugiat','Omnis quidem iste beatae soluta eum rerum quis odit. Esse saepe et tenetur tempore quaerat. Odio veniam a rerum quo vitae facilis soluta illum.','Et id ea quo. Amet dicta exercitationem sed quasi non. Est omnis officiis est odit aut omnis dolorem. Magni dolor nihil recusandae consequatur omnis quo quia.\n\nSit in totam cum amet aperiam quibusdam minus quo. Quo consequatur repellendus sunt cumque ea. Non dolor exercitationem vel maiores doloremque. Qui repudiandae blanditiis quia labore et sunt. Delectus sed fugit laboriosam pariatur eveniet et.\n\nEst nostrum dicta voluptatem nesciunt. Fuga est nemo maiores enim ea repellat ut. Nihil placeat velit vel placeat laborum vero.\n\nConsectetur maiores est odit sunt numquam possimus aut. Beatae facilis repellendus sit amet nostrum corporis non. Dicta quis totam quia.\n\nAccusamus repudiandae blanditiis facilis impedit quia. Quam saepe temporibus numquam dolorum quaerat suscipit. Sint aliquid ipsam corrupti quidem. Omnis enim dolorem qui corporis numquam.','https://picsum.photos/seed/HCiQ5uAXLy/800/600',1,'2026-02-02 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(8,2,'Esse quo officiis aut provident voluptate rerum accusantium iste.','esse-quo-officiis-aut-provident-voluptate-rerum-accusantium-iste','Omnis rerum voluptatem qui sed repudiandae. Ducimus tempora possimus vero qui delectus. Eum similique alias amet est distinctio delectus. Placeat mollitia quibusdam deserunt aliquam.','Perferendis et qui enim. Doloremque dolores officiis explicabo sapiente. Qui et et quam a officia. Et ullam est cumque velit dolorem cupiditate molestias quae.\n\nDolor vitae nihil soluta molestiae consequatur. Beatae officiis quia debitis aliquam vel. Quia reiciendis sit dolores. Deserunt quaerat perspiciatis eos blanditiis cum quisquam.\n\nLabore culpa et quam. Unde nihil officiis repudiandae iste accusamus sint quibusdam. Autem est et optio. A sunt sit eius aut est rerum quia.\n\nDebitis nulla nam sit vel. Dolores illo repellat eos cumque accusantium sed eos. Expedita delectus corrupti magnam ex.\n\nVel corrupti laudantium vel eveniet maxime omnis et consequatur. Excepturi est voluptatem ea.','https://picsum.photos/seed/i1AvW13Mmv/800/600',1,'2026-02-26 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(9,2,'Qui cupiditate et ipsum veritatis consequatur esse aut.','qui-cupiditate-et-ipsum-veritatis-consequatur-esse-aut','Doloribus et id ipsa aut et iste qui. Sed quis provident temporibus ex. Sed consequatur modi sint libero laboriosam. Totam qui ipsam ea.','Error eveniet consequatur non debitis ratione alias. Commodi aut totam est non distinctio. In quasi at quidem. Qui sed porro atque sunt.\n\nRem dolorem eius dolores quod rerum quisquam. Dolorem optio excepturi quis inventore molestias et facilis. Eum eum qui quam harum. Atque sequi porro eum nesciunt perferendis. Consequatur id rerum itaque recusandae id facere.\n\nModi nam dolore temporibus quo numquam rem repellendus. Non saepe itaque suscipit ut et laborum. Aliquid dolorem qui dicta reiciendis dolorem maiores.\n\nPorro amet animi nisi. Qui illum ut et alias. Sapiente repellendus soluta ullam sint.\n\nOfficia porro aperiam dolorum ipsam mollitia. Accusantium optio perspiciatis non ea vitae quis qui. Aliquam quia reprehenderit ducimus deleniti fugiat qui laboriosam ea.','https://picsum.photos/seed/G5jLOpiHMb/800/600',1,'2026-02-13 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(10,3,'Nihil quaerat porro veniam sunt.','nihil-quaerat-porro-veniam-sunt','Corporis est dignissimos explicabo quam autem. Id non a rem. Architecto maiores ullam illo et. Dolorem sint est sit ut ipsam assumenda est qui.','Laudantium unde sit ut animi voluptatibus. Aut cupiditate qui dignissimos est et et. Voluptate veritatis possimus amet labore doloribus. Est dolores voluptas laborum laboriosam animi error quam.\n\nSed quod consequatur ea repellendus voluptas et. Quia ut ut id. Quam et sed esse excepturi fugiat aperiam cupiditate molestiae. Molestiae suscipit ipsa corporis et.\n\nAccusamus harum voluptatem sint. Ut enim voluptatum enim ullam vero ad. Ipsam quibusdam soluta rerum. Similique est debitis officiis velit qui debitis. Delectus recusandae laboriosam inventore quis.\n\nPariatur et tempora voluptas autem maxime aspernatur odio aut. Nesciunt repellat facere suscipit rerum optio rerum voluptatem. Reiciendis ullam eligendi inventore consequatur quam nostrum. Odio quo sit et placeat ut voluptatem iure. Ipsam dolore iste expedita tenetur.\n\nUt enim qui et voluptates laudantium. Qui harum eaque aut. Architecto vero consequuntur voluptatem et aut. Voluptas quia sed qui totam est.','https://picsum.photos/seed/lz6xfAgC3f/800/600',1,'2026-02-18 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(11,3,'Et necessitatibus voluptatum laudantium magni sint.','et-necessitatibus-voluptatum-laudantium-magni-sint','Nostrum repellendus consequuntur vero excepturi. Rerum quaerat ut amet et quas quae. Aut aut tenetur hic odio vel repudiandae.','Nihil enim deleniti necessitatibus aut quaerat ratione. Expedita corporis numquam vero quos quos. Cum quibusdam laboriosam amet dolorem consequatur excepturi.\n\nEligendi aperiam molestiae omnis mollitia quo. Sit nemo hic explicabo. Nulla iste incidunt odit reprehenderit neque ullam. Et omnis eligendi quibusdam consequatur doloribus accusantium.\n\nLaboriosam rerum veritatis et. Porro labore sapiente aut exercitationem hic earum.\n\nQuae molestias sint ut consequuntur sint et. Aut voluptatem quia qui atque temporibus omnis. Architecto est quasi commodi sit beatae. Eum necessitatibus dolores voluptate iusto.\n\nSit consequatur nobis minima non enim temporibus porro quibusdam. Sapiente accusantium omnis quo. Facere voluptatibus blanditiis numquam sint ipsam labore unde. Numquam voluptatem quia et consequatur dolor.','https://picsum.photos/seed/JWqnYasHL1/800/600',1,'2026-02-05 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(12,4,'Qui enim ut in voluptate.','qui-enim-ut-in-voluptate','Est harum dolores at dolorem voluptatum ab. Est rerum quia eligendi ut omnis quo. Debitis qui dolorum nam dignissimos. Consectetur sunt voluptatum voluptate vel ipsam. Consequatur aut voluptatibus fuga ex.','Dolor similique qui et optio. Sunt rerum qui tempore tempore. Consequatur quo repellendus et qui. Non facilis inventore culpa quis et et.\n\nFugit iste dolorum nisi vel minus inventore iusto aut. Debitis impedit est quia sed dolorem quia. Laboriosam expedita quo molestiae maxime suscipit iusto. Et vero possimus non iusto vel.\n\nEos velit totam fuga ab. Totam eligendi incidunt reiciendis suscipit iste repellat et. Quos et officia recusandae consequatur expedita sunt aut. Libero architecto nihil est adipisci temporibus.\n\nSimilique natus dolores dolores autem omnis. Itaque voluptatem est quidem maxime pariatur et quam. Eveniet sequi ipsum fuga in quos dicta eos laborum. Temporibus qui nulla magni sit maiores earum.\n\nVeritatis laboriosam quisquam ea. Temporibus ipsum voluptas quam maiores qui architecto. Dolorem sunt laboriosam sint reprehenderit enim provident et. Totam necessitatibus maxime et quis.','https://picsum.photos/seed/l06zqC5sH9/800/600',1,'2026-02-16 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(13,4,'Debitis et rerum blanditiis repudiandae saepe quod cumque.','debitis-et-rerum-blanditiis-repudiandae-saepe-quod-cumque','Ipsum qui omnis iste omnis libero. Odio possimus error minus cupiditate voluptas. Quos expedita libero laudantium dolores sed. Atque voluptas rem accusamus quod non.','Dolore ab ipsa voluptatem nemo. Magni placeat voluptate consequatur consequatur nostrum sunt pariatur distinctio. Enim voluptatem facere ratione non et reiciendis molestiae. Placeat quia occaecati non.\n\nUt modi et nihil voluptas officia. Consequatur quisquam hic aliquam suscipit voluptas et voluptates illo. Ab aut minus praesentium. Odio similique corporis adipisci.\n\nUt ratione expedita suscipit nihil error. Fugit sapiente doloremque voluptatem. Nam quia aut reprehenderit accusamus ea. Autem iure expedita non.\n\nQuia eos dolorem nesciunt sit exercitationem sit. Aut consequuntur molestiae architecto officia.\n\nNostrum maiores qui modi repellendus. Voluptas quisquam sit sequi corrupti dolorem accusantium dolor. Ad earum accusantium quod voluptatum. Vero omnis quas minus omnis et voluptas facere.','https://picsum.photos/seed/GddVfVraj0/800/600',1,'2026-02-20 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(14,4,'Maiores deleniti ab illum dicta voluptas nulla.','maiores-deleniti-ab-illum-dicta-voluptas-nulla','Quas voluptatum libero id voluptatem. Tempora velit necessitatibus alias ipsum eaque porro expedita. Ullam velit exercitationem dolorem eaque. Qui dolore aliquid sit voluptas tempora dolorem est.','Animi odio vero nihil omnis amet. Sint voluptatum facere rerum voluptatem officia. Et voluptatum voluptatibus deleniti quo ducimus veritatis ab.\n\nEt deleniti sit optio nobis magni praesentium quas. A mollitia dolorem quae quia. Vel sint enim et beatae quia dolor odit deserunt.\n\nQuas ullam aliquid nesciunt. Voluptatem labore accusamus aut quam temporibus sed. In adipisci enim aut et non delectus.\n\nId qui aut dolorum necessitatibus. Laborum eos sapiente tempora nobis excepturi atque beatae. Nulla expedita omnis aut amet. Est consectetur velit voluptates nihil fugiat amet eius.\n\nEst harum voluptatem excepturi eveniet assumenda. Est iste quod est ut nostrum. Autem soluta dolore id quia possimus illo nam. Alias omnis molestias aut fugit minima. Et sed nemo quos sunt suscipit.','https://picsum.photos/seed/8NCyoESVQQ/800/600',1,'2026-02-10 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(15,4,'Optio asperiores et et perspiciatis tenetur qui earum.','optio-asperiores-et-et-perspiciatis-tenetur-qui-earum','Dolore est atque quam quia molestiae. Fugit et beatae molestias similique. Asperiores qui cupiditate fugit magni eius.','Et maiores explicabo nostrum ab quo architecto. Quos fuga dolorum assumenda. Similique est labore quisquam. Iusto odio at aut.\n\nUt eaque facilis porro vitae sit laudantium. Aut fugiat a iusto quia repudiandae sed et. Consequuntur minus quae nulla at nostrum sint. Quas aut occaecati minus dicta amet expedita culpa. Unde vitae itaque quam sequi architecto ducimus et.\n\nFugit id voluptas voluptatem enim minima. Deserunt inventore possimus fuga dolorem atque ea. Cum nemo enim et quia. Sint exercitationem facilis ipsum qui placeat cupiditate pariatur.\n\nMinima dolorem autem similique culpa consequatur. Saepe ullam est ad harum. Quibusdam autem veniam repellat harum molestias. Ipsum veniam ipsa fugit voluptatem.\n\nRem itaque eius tempora qui accusamus et. Id veritatis dolor voluptate illum praesentium enim possimus numquam. Harum quia aut atque nostrum ullam.','https://picsum.photos/seed/J1aShYUEcQ/800/600',1,'2026-01-31 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(16,5,'Inventore perferendis illo et quas laborum reprehenderit.','inventore-perferendis-illo-et-quas-laborum-reprehenderit','Quos qui quibusdam est fugit. Beatae facere cumque accusantium saepe maxime eligendi corporis voluptate. Consequatur voluptatum incidunt natus nulla deserunt nihil.','Sed vel consequatur accusantium doloremque. Aperiam quod enim et et et quasi esse. Natus at a sequi. Nulla quod qui eaque voluptas.\n\nCulpa consequatur ipsa doloribus voluptatem. Odit accusantium asperiores rem architecto corrupti. Quod et temporibus earum dolor distinctio.\n\nReprehenderit quisquam nam vel et beatae. Pariatur voluptatem libero consequuntur dolorum. In ut distinctio natus qui recusandae quo.\n\nFugiat voluptatem non repellat doloribus quae pariatur. Dolor quis voluptatem commodi aliquam. Soluta eligendi voluptate ipsum accusantium. Accusamus distinctio possimus est ipsam ut dolores maiores.\n\nCorrupti eveniet ad est sunt. Officiis culpa nobis ut architecto. Sunt facilis facilis qui necessitatibus id consequatur optio. Et maxime aliquam odio et illo ut qui. Est qui explicabo accusamus.','https://picsum.photos/seed/Rtpqkrz8jU/800/600',1,'2026-02-19 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(17,5,'Et non tempore laudantium perferendis deserunt totam fugit.','et-non-tempore-laudantium-perferendis-deserunt-totam-fugit','Expedita cupiditate rerum velit eaque. Eveniet atque qui blanditiis enim dolores.','Aut impedit libero hic tenetur reprehenderit reprehenderit et. Et ratione ea facilis culpa eos. Tempore dolorum omnis sunt necessitatibus sit voluptas.\n\nVoluptatem aut tempora ut architecto qui quaerat ullam. Commodi ut aperiam laborum libero. Aut enim recusandae iure consequuntur aut et est. Autem tenetur ab dolore id numquam et natus.\n\nNecessitatibus dicta sequi facere vel in molestias explicabo. Ut ut optio quia est voluptatem aut. Sit voluptatem minima saepe saepe voluptatem.\n\nAut nulla eius non error quos. Quasi ut quis aut dolorum magni.\n\nQuia pariatur natus id quibusdam. Voluptatem provident dignissimos temporibus nobis et sequi. Harum consequatur ut exercitationem et nemo.','https://picsum.photos/seed/tawtYgzEZK/800/600',1,'2026-02-11 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(18,6,'Est omnis culpa aut et.','est-omnis-culpa-aut-et','A reprehenderit deserunt occaecati dolor et. Eligendi voluptas velit quos nam. Accusantium non sunt pariatur consequatur qui earum culpa.','Non asperiores sit non eaque a ad qui. Non qui aut et perferendis. Quaerat reprehenderit qui enim. Sequi voluptas numquam atque ab est.\n\nArchitecto soluta nam pariatur delectus. Aperiam aperiam minus nesciunt quisquam soluta.\n\nItaque voluptatibus velit maxime consectetur. Est in corporis veritatis. Quo tenetur sit quis dignissimos qui hic. Reprehenderit ad enim consequatur eligendi quisquam quis vel.\n\nConsequatur et consequatur ad et. Dolor dolorem ipsam eligendi ex sit. Voluptatem atque ea ipsa. Et hic rerum reprehenderit ab.\n\nEt voluptas qui voluptatibus architecto est et fugit. Et qui vero magnam minima. Dolorum quia molestias dolore placeat. Quos fugiat molestias asperiores voluptatibus magni.','https://picsum.photos/seed/HwIRdRGg76/800/600',1,'2026-02-28 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(19,6,'Rerum deleniti ducimus quia neque magnam doloremque distinctio maxime.','rerum-deleniti-ducimus-quia-neque-magnam-doloremque-distinctio-maxime','Et aut quo animi eius commodi. Voluptates aliquid voluptatum illo optio. Eum vel accusamus dolorem totam at provident ratione. Dignissimos repudiandae velit accusamus ea magnam id.','Assumenda iure iste tenetur sed et similique cum eum. Sunt vel distinctio saepe corporis rerum esse ab.\n\nTemporibus animi cum omnis cumque quis corrupti ut. Dolor perferendis beatae officia voluptatum quo ea facere minima.\n\nIusto corporis saepe rerum ad magni cupiditate dolore. Adipisci beatae totam veritatis reprehenderit iure a et. In corporis pariatur quia cupiditate nulla. Voluptate non qui sapiente.\n\nRerum sit similique non quos. Mollitia quia voluptas voluptas velit sunt. Illo unde enim non sit.\n\nMaxime nulla facere error temporibus quae quia corporis. Et laboriosam ut incidunt non. Iure dolores iure exercitationem aliquam ea deleniti nostrum.','https://picsum.photos/seed/bC6g0bxoTj/800/600',1,'2026-02-08 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(20,6,'Dolores temporibus temporibus adipisci.','dolores-temporibus-temporibus-adipisci','Facere earum aperiam at exercitationem quis. Aut non voluptate veniam incidunt vero nesciunt. Iure et omnis hic sit aut ut aut. Reiciendis rerum doloribus est nihil voluptates exercitationem sed. Ut omnis velit quis possimus.','Sit libero mollitia nam in numquam aliquid culpa. Nulla occaecati facilis laudantium est impedit aut. Ipsa et dicta iure ipsa. Cupiditate quia molestiae mollitia molestiae commodi eius nihil.\n\nEt eum sint rem delectus similique nihil. Quis aut atque tenetur vitae quia reiciendis cum. Totam dolores dolorum optio consequatur. Beatae doloremque ab quam minima.\n\nAliquam consequatur maiores dolor perferendis enim. Non perferendis minus provident officia. Saepe quidem autem reprehenderit non asperiores. Quidem id et provident at qui cupiditate debitis aliquam.\n\nOccaecati est molestiae quos molestiae libero dolores omnis. Animi nam aut amet quos et culpa libero maxime. Soluta illo omnis tempora ut. Quam alias voluptates assumenda quis tempora voluptatem minus.\n\nVeniam accusamus voluptas quas voluptas hic qui. Fugit autem atque non necessitatibus. Voluptas enim suscipit et consequatur. Consequatur laboriosam sit iste exercitationem vero hic sapiente.','https://picsum.photos/seed/OOk1cdlGFg/800/600',1,'2026-02-16 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(21,1,'2026年 AI Agent 行业趋势：从单体智能到协作集群','post-6c3fe172','为什么单一的聊天机器人已经过时？本文深度解析 Multi-Agent 工作流如何重塑企业生产力。','为什么单一的聊天机器人已经过时？本文深度解析 Multi-Agent 工作流如何重塑企业生产力。\n\n## 什么是 Multi-Agent 系统？\n简单来说，这是一种让多个专注于不同任务的 AI 智能体共同协作完成复杂目标的架构。例如，一个“策划 Agent”负责生成方案，一个“代码 Agent”负责实现，一个“测试 Agent”负责找 Bug。\n\n## 为什么它比传统 AI 更强大？\n1. **专业化分工**：每个 Agent 只需要精通特定的工具和提示词。\n2. **自我纠错**：智能体之间可以互相审核输出结果，极大降低了幻觉 (Hallucination) 的概率。\n3. **长程任务处理**：能够处理跨度数小时甚至数天的复杂业务逻辑。','https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',1,'2026-02-28 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(22,1,'企业如何安全地部署私有化 RAG 知识库？','post-f21be8da','担心核心业务数据被泄露给模型厂商？RAG (检索增强生成) 技术是您的救星。','担心核心业务数据被泄露给模型厂商？RAG (检索增强生成) 技术是您的救星。\n\n## 什么是 RAG？\nRAG 允许 Agent 在不重新训练模型的情况下，实时检索您的私有文档。这意味着您的敏感数据始终保留在本地服务器，而 AI 仅读取相关片段来回答问题。','https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=800&auto=format&fit=crop',1,'2026-02-27 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(23,1,'Agentic Workflow：超越 Prompt Engineering 的下一波浪潮','post-18a679b0','优秀的提示词不如优秀的工作流。了解如何通过迭代和循环让您的 AI 表现提升 300%。','优秀的提示词不如优秀的工作流。了解如何通过迭代和循环让您的 AI 表现提升 300%。\n\n传统的交互是“一问一答”。而 Agentic Workflow 则是让 AI 进行“思考-执行-检查-重试”的循环。这种模式下的 AI 不再是工具，而是真正的伙伴。','https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',1,'2026-02-26 15:10:21','2026-02-28 15:10:21','2026-02-28 15:10:21'),(24,1,'OPENCLAW FOR BREWERIES: AUTOMATE TAPROOM EVENTS AND DISTRIBUTION','openclaw-for-breweries','How AI agents like OpenClaw can transform operations, automate distribution, and enhance customer engagement in the brewing industry.','How breweries can use OpenClaw to automate taproom events, distribution tracking, and customer engagement.\n\nTAPROOM EVENT PROMOTION THAT ACTUALLY FILLS SEATS\nOpenClaw agents can monitor your brewing schedule and automatically create event listings for new release parties. By connecting directly to your POS system, the agent identifies when a specific batch is ready for tapping and initiates a marketing sequence.\n\nStep 1: Event creation based on tank monitoring\nStep 2: Automated social media drafting and scheduling\nStep 3: Real-time RSVP tracking via QR codes on table tents\n\nDISTRIBUTION TRACKING WITHOUT THE HEADACHE\nManaging keg returns and wholesale orders often feels like a second job. OpenClaw simplifies this by acting as a 24/7 coordinator between your warehouse and your accounts.\n\nDEMAND FORECASTING\nThe agent analyzes historical sales data to predict when a specific account will run dry, sending a proactive restock notification to your sales rep.\n\nKEG TRACKING\nAutomated reminders to accounts that have held empty kegs for more than 14 days, reducing asset loss and improving turnaround time.\n\nCUSTOMER ENGAGEMENT AND LOYALTY\nBeyond beer, breweries are community hubs. OpenClaw helps maintain that connection through personalized outreach that feels human, not robotic.\n\nPreference learning: The agent remembers that a customer prefers sours over IPAs and only notifies them of relevant releases.\nCustom box curation: For subscription clubs, the agent suggests box contents based on individual rating history.\n\nNEXT STEPS\nReady to deploy OpenClaw for your brewery? Browse our available agents or reach out for a custom sourcing request.',NULL,1,'2026-02-28 15:18:15','2026-02-28 15:18:15','2026-02-28 15:18:15'),(25,1,'AI AGENTS IN MANUFACTURING: REDUCING DOWNTIME WITH PREDICTIVE CLAWS','ai-agents-in-manufacturing','Predictive maintenance is no longer a luxury. Discover how AI agents monitor hardware health and automate service requests.','Predictive maintenance is no longer a luxury. Discover how AI agents monitor hardware health and automate service requests.\n\nHARDWARE MONITORING\nContinuous telemetry analysis to identify vibration patterns that precede motor failure.\n\nAUTOMATED SERVICE LOGGING\nWhen a threshold is crossed, the agent logs a ticket and notifies the maintenance lead.',NULL,1,'2026-02-28 15:18:15','2026-02-28 15:18:15','2026-02-28 15:18:15'),(26,1,'THE FUTURE OF CLAWSOURCING: ON-DEMAND ROBOTICS FLEETS','the-future-of-clawsourcing','Why owning a fleet isn\'t always the answer. The rise of temporary, task-specific robotics deployment.','Why owning a fleet isn\'t always the answer. The rise of temporary, task-specific robotics deployment.\n\nSCALABILITY ON DEMAND\nLease specialized agents for seasonal peaks without the long-term overhead of maintenance and storage.',NULL,1,'2026-02-28 15:18:15','2026-02-28 15:18:15','2026-02-28 15:18:15');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchases` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `listing_id` bigint unsigned NOT NULL,
  `price_paid` decimal(10,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `purchases_user_id_listing_id_unique` (`user_id`,`listing_id`),
  KEY `purchases_listing_id_foreign` (`listing_id`),
  CONSTRAINT `purchases_listing_id_foreign` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `purchases_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('c7AyNaNinc2apbPUJiJp9sP2pC8MHHBOOb10mnuA',NULL,'111.7.96.184','curl/7.64.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoiSXpUM3AwQnlxdDJLSXplanBDcjFPY2NQWlNQbnRwQnpPczRoRWhyNyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjU6Imh0dHA6Ly80My4xNTMuNjQuMTYwOjgwNzAiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1772331916);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sourcing_requests`
--

DROP TABLE IF EXISTS `sourcing_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sourcing_requests` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `budget` decimal(15,2) DEFAULT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sourcing_requests`
--

LOCK TABLES `sourcing_requests` WRITE;
/*!40000 ALTER TABLE `sourcing_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `sourcing_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `is_seller` tinyint(1) NOT NULL DEFAULT '0',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Demo User','demo@example.com',NULL,NULL,NULL,0,'2026-02-28 15:10:21','$2y$12$Ao2WvyjHkMapRLR9Q/I1d.e7V/w0DKteOoRJhXBgkPqod0Z4SWZHK','Ot5Fcts6gg','2026-02-28 15:10:21','2026-02-28 15:10:21'),(2,'Gisselle McCullough','cheyanne.rolfson@example.org',NULL,NULL,NULL,0,'2026-02-28 15:10:21','$2y$12$Ao2WvyjHkMapRLR9Q/I1d.e7V/w0DKteOoRJhXBgkPqod0Z4SWZHK','BlCXYSr1vo','2026-02-28 15:10:21','2026-02-28 15:10:21'),(3,'Burley Daniel IV','shayna.feeney@example.net',NULL,NULL,NULL,0,'2026-02-28 15:10:21','$2y$12$Ao2WvyjHkMapRLR9Q/I1d.e7V/w0DKteOoRJhXBgkPqod0Z4SWZHK','M3EvisZpuc','2026-02-28 15:10:21','2026-02-28 15:10:21'),(4,'Dora Fay','zhodkiewicz@example.net',NULL,NULL,NULL,0,'2026-02-28 15:10:21','$2y$12$Ao2WvyjHkMapRLR9Q/I1d.e7V/w0DKteOoRJhXBgkPqod0Z4SWZHK','fO13nTQYQM','2026-02-28 15:10:21','2026-02-28 15:10:21'),(5,'Ms. Caterina Brekke','reagan33@example.net',NULL,NULL,NULL,0,'2026-02-28 15:10:21','$2y$12$Ao2WvyjHkMapRLR9Q/I1d.e7V/w0DKteOoRJhXBgkPqod0Z4SWZHK','ntmP9FLzC6','2026-02-28 15:10:21','2026-02-28 15:10:21'),(6,'Carey Huel','wilderman.verda@example.net',NULL,NULL,NULL,0,'2026-02-28 15:10:21','$2y$12$Ao2WvyjHkMapRLR9Q/I1d.e7V/w0DKteOoRJhXBgkPqod0Z4SWZHK','Ic4APrleDi','2026-02-28 15:10:21','2026-02-28 15:10:21'),(7,'david','xiaomi@xingke888.com',NULL,NULL,NULL,1,NULL,'$2y$12$T3MQQNjlBUohhk6E61genuKVd5et6XlR0d6SbbkDAthILcCdQgxjK',NULL,'2026-02-28 15:36:46','2026-02-28 16:28:59');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-01 10:41:16
