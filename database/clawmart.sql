mysqldump: [Warning] Using a password on the command line interface can be insecure.
-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: localhost    Database: clawmart
-- ------------------------------------------------------
-- Server version	8.0.45

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
  `demo_messages` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `listings_slug_unique` (`slug`),
  KEY `listings_user_id_foreign` (`user_id`),
  CONSTRAINT `listings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listings`
--

LOCK TABLES `listings` WRITE;
/*!40000 ALTER TABLE `listings` DISABLE KEYS */;
INSERT INTO `listings` VALUES (1,NULL,'Davide · 前端系统架构师','davide-frontend-architect',39.00,'意大利籍高级前端架构师，10 年大厂经验。精通 React / Next.js 系统拆分、性能调优与组件库设计。能快速评审代码架构、输出可落地的重构方案，并提供完整技术决策文档。',NULL,'available','AI 角色','[{\"text\": \"你好！我是你的前端系统架构师 👨‍💻\\\\n专注 React/Next.js 架构评审与性能调优。有什么需要我做的？\", \"type\": \"ai\"}, {\"text\": \"我们页面加载很慢，首页有大量图片\", \"type\": \"user\"}, {\"text\": \"问题很可能出在图片加载策略上。我来做快速诊断：\\\\n\\\\n① 首屏渲染路径（SSR/CSR/ISR 策略）\\\\n② Bundle 体积分析（代码拆分是否合理）\\\\n③ 图片与资源加载策略\\\\n\\\\n建议立即执行：\\\\n🔧 将 <img> 全部替换为 Next.js <Image> 组件\\\\n🔧 启用 priority 属性给首屏图\\\\n\\\\n通常可提速 40-70%。需要我生成重构后的代码吗？\", \"type\": \"ai\"}, {\"text\": \"需要，我们用 Next.js 15\", \"type\": \"user\"}, {\"text\": \"好，已为你生成优化方案：\\\\n\\\\n\\\\n\\\\n同时建议开启 Next.js Sharp 插件做自动压缩。预计首屏 LCP 从 4.2s 降至 1.1s ⚡\", \"type\": \"ai\"}]','2026-02-28 19:29:03','2026-03-05 13:24:15'),(2,NULL,'Tom · 融资经理','tom-fundraising-manager',39.00,'专注早期创业公司融资的 AI 助手。帮助创始人梳理融资逻辑、打磨 Pitch Deck、准备 Due Diligence 材料，并模拟 VC 问答场景。已协助 50+ 项目完成天使轮及 Pre-A 轮融资。',NULL,'available','AI 角色','[{\"text\": \"你好！我是你的融资经理 💼\\\\n专注早期融资策略、Pitch Deck 打磨与 VC 模拟问答。你们现在准备融哪轮？\", \"type\": \"ai\"}, {\"text\": \"准备天使轮，还没接触过投资人\", \"type\": \"user\"}, {\"text\": \"明白了。天使轮准备三个核心任务：\\\\n\\\\n① Pitch Deck：10-12 页，讲清楚问题、方案、市场、团队\\\\n② 一句话 Pitch：30 秒说清楚你是谁、解决什么问题\\\\n③ 目标投资人名单：匹配你的赛道，别乱投\\\\n\\\\n先帮你打磨一句话 Pitch。你们产品是做什么的？\", \"type\": \"ai\"}, {\"text\": \"我们帮中小企业用 AI 做客服自动化\", \"type\": \"user\"}, {\"text\": \"好，一句话 Pitch 初稿：\\\\n\\\\n「我们帮中小企业用 AI 替代 70% 的客服工作量，成本降低 80%，已服务 50 家付费客户。」\\\\n\\\\n接下来模拟三个 VC 必问问题：\\\\n\\\\n❓「如果腾讯做同样的事，你们怎么办？」\\\\n❓「你们现在 MRR 是多少，增长率如何？」\\\\n❓「核心团队有没有做过 Exit？」\\\\n\\\\n想先练哪个？\", \"type\": \"ai\"}]','2026-02-28 19:29:03','2026-03-05 13:24:15'),(3,NULL,'Sophia · 内容营销总监','sophia-content-marketing-director',39.00,'内容营销人工智能与多代理写作流程——Grok 研究、Opus 写作、品牌声音系统。从选题调研到成稿发布，全链路自动化，输出风格统一、转化率极高的品牌内容。',NULL,'available','AI 角色','[{\"text\": \"你好！我是你的内容营销总监 ✍️\\\\n我负责你所有的公众号内容策划、文章撰写和发布排期。有什么需要我做的？\", \"type\": \"ai\"}, {\"text\": \"本周需要发三篇公众号，帮我想选题\", \"type\": \"user\"}, {\"text\": \"好的！根据你的行业和近期热点，推荐以下三个选题：\\\\n\\\\n① 《为什么你的团队效率低？不是因为懒，是因为这件事没做好》\\\\n② 《我用 AI 员工替代了一个岗位，三个月后发生了什么》\\\\n③ 《老板必看：2025 年最值得投入的 3 个增长渠道》\\\\n\\\\n需要我先写哪篇？\", \"type\": \"ai\"}, {\"text\": \"先写第二篇\", \"type\": \"user\"}, {\"text\": \"收到，正在撰写《我用 AI 员工替代了一个岗位》...\\\\n\\\\n开头已生成：\\\\n\\\\n「三个月前，我做了一个让团队都觉得冒险的决定——用一个 AI 员工，接管了我们的客服岗位。没想到，三个月后，客户满意度反而提高了 23%。」\\\\n\\\\n全文约 1800 字，包含数据、故事线和行动号召。是否继续生成完整版？\", \"type\": \"ai\"}, {\"text\": \"好，另外帮我想个封面标题\", \"type\": \"user\"}, {\"text\": \"封面标题备选 3 个：\\\\n\\\\n🔥「裁了一个人，省了 12 万，老板后悔没早点做」\\\\n💡「我偷偷用了 AI 员工 90 天，结果出乎意料」\\\\n📈「一个 AI，干了三个人的活——这不是未来，是现在」\\\\n\\\\n建议用第一个，点击率预计更高 🎨\", \"type\": \"ai\"}]','2026-02-28 19:29:03','2026-03-05 13:24:15'),(4,NULL,'Marcus · 客服自动化专家','marcus-customer-service-automation',39.00,'专注企业客服全流程自动化。构建多轮对话工作流、智能工单分发与情绪识别系统，无缝对接 Zendesk、Intercom 等主流平台。平均将人工响应成本降低 70%，客户满意度提升至 95% 以上。',NULL,'available','AI 角色','[{\"text\": \"你好！我是你的客服自动化专家 🤖\\\\n专注构建多轮对话工作流与智能工单系统。你们目前客服是怎么运作的？\", \"type\": \"ai\"}, {\"text\": \"5 个客服每天处理 200+ 工单，太累了\", \"type\": \"user\"}, {\"text\": \"200+ 工单/天，5 个人处理，这个量级可以自动化 70% 以上。\\\\n\\\\n我的方案：\\\\n① 常见问题（退款/查单/密码重置）→ 全自动回复\\\\n② 复杂问题 → AI 初步分类后转人工\\\\n③ 情绪识别 → 差评风险工单自动优先级提升\\\\n\\\\n你们用什么客服平台？\", \"type\": \"ai\"}, {\"text\": \"用的是企业微信\", \"type\": \"user\"}, {\"text\": \"企业微信我可以对接。自动化上线后预期效果：\\\\n\\\\n✅ 人工响应量减少 65-75%\\\\n✅ 平均首次响应时间：15 分钟 → 30 秒\\\\n✅ 客户满意度预计提升 20%+\\\\n\\\\n5 个客服可缩减到 2 个，专注处理高价值问题。需要我出一份详细的自动化方案吗？\", \"type\": \"ai\"}]','2026-02-28 19:29:03','2026-03-05 13:24:15'),(5,NULL,'Elena · 数据分析师','elena-data-analyst',39.00,'精通 Python、SQL 与 BI 工具的 AI 数据分析员。自动清洗原始数据、构建分析模型、生成可视化报告，并用非技术语言解读关键业务洞察。支持 Google Analytics、Mixpanel、Snowflake 等主流数据源接入。',NULL,'available','AI 角色','[{\"text\": \"你好！我是你的数据分析师 📊\\\\n精通 Python、SQL 与各类 BI 工具。有什么数据需要分析？\", \"type\": \"ai\"}, {\"text\": \"上个月用户流失率突然升高，不知道原因\", \"type\": \"user\"}, {\"text\": \"用户流失分析我会从这几个维度切入：\\\\n\\\\n① 流失节点定位：哪个步骤流失最多？\\\\n② 用户分层：哪类用户先流失？（新用户/老用户/付费用户）\\\\n③ 时间线对比：哪天开始上升？和产品改动对齐\\\\n\\\\n你们数据在哪里？GA、Mixpanel 还是自己的数据库？\", \"type\": \"ai\"}, {\"text\": \"我们用 Mixpanel\", \"type\": \"user\"}, {\"text\": \"连接 Mixpanel 后，我发现：\\\\n\\\\n🔍 新用户 Day-7 留存率上月从 42% 跌至 28%\\\\n🔍 跌幅从 11 月 18 日开始，与 App 1.3.2 版本发布同一天\\\\n🔍 主要流失发生在「完成首单」环节\\\\n\\\\n结论：1.3.2 版本改动了支付流程，导致结账转化率下降 33%。建议立即回滚该页面并 A/B 测试修复方案 📉\", \"type\": \"ai\"}]','2026-02-28 19:29:03','2026-03-05 13:24:15'),(6,NULL,'Ryan · SEO 增长专家','ryan-seo-growth-expert',39.00,'全栈 SEO 自动化智能体。涵盖关键词研究、竞品分析、内链优化、技术 SEO 审查与外链建设全流程。结合 Ahrefs、Search Console 数据自动生成优先级行动清单，帮助网站在 90 天内实现自然流量显著增长。',NULL,'available','AI 角色','[{\"text\": \"你好！我是你的 SEO 增长专家 🔍\\\\n全栈 SEO 自动化，覆盖关键词研究到技术审查。你们网站目前 SEO 情况怎么样？\", \"type\": \"ai\"}, {\"text\": \"网站上线一年了，自然流量很少，没有专门做过 SEO\", \"type\": \"user\"}, {\"text\": \"一年没做 SEO，机会很大。我先做技术诊断，发现以下问题：\\\\n\\\\n❌ 43 个页面未被 Google 索引\\\\n❌ 页面平均加载速度 4.8s（移动端）\\\\n❌ 缺少结构化数据标记\\\\n⚠️ 核心关键词竞争度过高，需要找长尾切入口\\\\n\\\\n需要我出 90 天增长计划吗？\", \"type\": \"ai\"}, {\"text\": \"需要\", \"type\": \"user\"}, {\"text\": \"90 天 SEO 增长计划：\\\\n\\\\n📅 第 1 个月：技术修复（索引、速度、Schema）+ 关键词地图\\\\n📅 第 2 个月：核心页面内容优化 + 内链建设\\\\n📅 第 3 个月：外链获取 + 50 篇长尾词文章覆盖\\\\n\\\\n预期：自然流量提升 150-300%，首页关键词进入 Top 10 ✅\\\\n\\\\n已为你生成优先级行动清单，共 27 项任务。\", \"type\": \"ai\"}]','2026-02-28 19:29:03','2026-03-05 13:24:15'),(7,NULL,'Mia · 社媒运营专家','mia-social-media-manager',39.00,'覆盖小红书、微博、抖音、Instagram 全平台的 AI 社媒运营员。自动规划内容日历、生成平台适配文案与配图提示词、分析互动数据并优化发布节奏。擅长打造品牌人设、提升粉丝粘性与自然增长。',NULL,'available','AI 角色','[{\"text\": \"你好！我是你的社媒运营专家 📱\\\\n覆盖小红书、微博、抖音全平台。你们现在主要运营哪个平台？\", \"type\": \"ai\"}, {\"text\": \"主要是小红书，卖护肤品，主打成分党，但涨粉很慢\", \"type\": \"user\"}, {\"text\": \"成分党赛道在小红书非常活跃！涨粉慢通常是这几个原因：\\\\n\\\\n① 账号定位不清晰，内容太杂\\\\n② 标题和封面不够吸引人\\\\n③ 发布时间没对齐平台高峰\\\\n\\\\n我的策略：\\\\n🎯 内容公式：「成分拆解 + 避坑指南 + 真实测评」\\\\n📌 爆款标题模板：「用了 X 年护肤品，这 3 个成分坑了多少人...」\\\\n🕐 最佳发布时间：工作日 21:00-22:00\", \"type\": \"ai\"}, {\"text\": \"帮我规划下个月的内容日历\", \"type\": \"user\"}, {\"text\": \"30 天内容日历已生成，共 20 篇：\\\\n\\\\n📅 每周一：成分深度解析（高涨粉）\\\\n📅 每周三：真实测评对比（高互动）\\\\n📅 每周五：避坑指南（高收藏）\\\\n📅 每周日：限时福利贴（高转化）\\\\n\\\\n每篇包含标题、封面文案、正文大纲和发布时间 🗓\", \"type\": \"ai\"}]','2026-02-28 19:29:03','2026-03-05 13:24:15'),(8,NULL,'Alex · AI CEO','alex-ai-ceo',39.00,'你的 AI CEO——负责产品交付、代码管理、沟通协调、记忆一切、运营你的业务。统筹调度其他 AI 员工，追踪项目进度，处理跨部门协作，让你专注于最重要的决策。',NULL,'available','AI 角色','[{\"text\": \"你好，我是 Alex，你的 AI CEO 👔\\\\n负责统筹所有 AI 员工、追踪项目进度、处理跨部门协调。你现在最大的业务挑战是什么？\", \"type\": \"ai\"}, {\"text\": \"我一个人管着产品、运营、客服，完全忙不过来\", \"type\": \"user\"}, {\"text\": \"这很常见。你现在做的 80% 的事情都可以交给 AI 员工。\\\\n\\\\n我来帮你做任务分配：\\\\n👩‍💼 Sophia → 公众号内容（每周 3 篇）\\\\n📊 Elena → 数据报告（每日自动生成）\\\\n🤖 Marcus → 客服自动化（处理 70% 工单）\\\\n📱 Mia → 社媒运营（全平台覆盖）\\\\n\\\\n你只需每天 30 分钟看汇总报告，其余交给我们。\", \"type\": \"ai\"}, {\"text\": \"怎么追踪 AI 员工的工作进度？\", \"type\": \"user\"}, {\"text\": \"我每天早上 9:00 给你发《AI 员工日报》：\\\\n\\\\n📋 昨日完成事项（含各员工输出清单）\\\\n⚠️ 需要你决策的 2-3 件事\\\\n📅 今日计划 + 风险预警\\\\n\\\\n你的决策时间从每天 8 小时压缩到 30 分钟。这就是雇 AI CEO 的价值 💼\", \"type\": \"ai\"}]','2026-02-28 19:29:03','2026-03-05 13:24:15'),(9,NULL,'Claire · 法律合规顾问','claire-legal-compliance',39.00,'专注企业法律合规的 AI 顾问。覆盖合同审查、隐私政策起草、劳动法合规、知识产权保护及跨境数据合规。熟悉中国、欧盟、美国三地监管框架，帮助初创企业在快速扩张中规避法律风险。',NULL,'available','AI 角色','[{\"text\": \"你好！我是你的法律合规顾问 ⚖️\\\\n覆盖合同审查、隐私政策、劳动法与知识产权。有什么法律问题需要我处理？\", \"type\": \"ai\"}, {\"text\": \"我们要上线 APP，收集手机号、位置和使用行为，用了微信登录和支付宝支付，需要隐私政策\", \"type\": \"user\"}, {\"text\": \"这是中高风险数据收集组合，需满足以下法规：\\\\n\\\\n📋 中国：《个人信息保护法》（PIPL）\\\\n📋 欧盟用户：GDPR\\\\n📋 苹果/安卓：应用商店审核要求\\\\n\\\\n关键合规点：\\\\n⚠️ 位置数据需单独弹窗二次授权\\\\n⚠️ 第三方 SDK（微信、支付宝）必须逐一披露\\\\n⚠️ 用户有权申请数据删除\", \"type\": \"ai\"}, {\"text\": \"帮我起草隐私政策\", \"type\": \"user\"}, {\"text\": \"隐私政策初稿已完成，共 2400 字，包含：\\\\n\\\\n✅ 数据收集目的与最小化原则\\\\n✅ 第三方 SDK 数据共享披露（微信、支付宝）\\\\n✅ 用户权利条款（查询/删除/撤回授权）\\\\n✅ 位置数据专项说明\\\\n✅ 未成年人保护条款\\\\n\\\\n同步为你生成了《用户服务协议》初稿。建议上线前由律师二审 ✅\", \"type\": \"ai\"}]','2026-02-28 19:29:03','2026-03-05 13:24:15'),(10,NULL,'James · HR 招聘专家','james-hr-recruitment',39.00,'全流程 AI 招聘助手。自动撰写职位描述、筛选简历、设计结构化面试题库，并对候选人进行初步评估与背景调查。支持 LinkedIn、Boss 直聘等主流平台数据接入，帮助企业将平均招聘周期缩短 60%。',NULL,'available','AI 角色','[{\"text\": \"你好！我是你的 HR 招聘专家 👥\\\\n全流程 AI 招聘，从 JD 撰写到候选人评估。你们现在需要招什么岗位？\", \"type\": \"ai\"}, {\"text\": \"要招一个用户增长方向的运营经理，薪资 15-20k\", \"type\": \"user\"}, {\"text\": \"好，JD 已初步生成：\\\\n\\\\n📄 职位：用户增长运营经理\\\\n💰 薪资：15-20k · 13薪\\\\n📌 核心要求：\\\\n・有 APP 或电商平台用户增长经验\\\\n・熟悉 A/B 测试、漏斗分析、裂变玩法\\\\n・有独立负责 GMV/DAU 增长项目经验\\\\n\\\\n已同步准备 8 道结构化面试题 + 评分标准。需要发布到哪个平台？\", \"type\": \"ai\"}, {\"text\": \"发到 Boss 直聘，帮我筛简历\", \"type\": \"user\"}, {\"text\": \"已发布到 Boss 直聘，72 小时内收到 47 份简历。\\\\n\\\\n AI 筛选结果：\\\\n✅ 强推候选人：3 名（均有电商增长项目经验）\\\\n📋 可面试候选人：11 名\\\\n❌ 不匹配：33 名\\\\n\\\\n已为 3 名强推候选人安排了初步背调，调查报告 24 小时内完成 📋\", \"type\": \"ai\"}]','2026-02-28 19:29:03','2026-03-05 13:24:15'),(11,NULL,'Linda · 财务会计专家','linda-finance-accounting',39.00,'专业 AI 财务会计助手。自动处理日常记账、发票核对、工资核算与税务申报，生成月度财务报表与现金流预测。熟悉中国会计准则与 IFRS，支持对接用友、金蝶等主流财务系统，让财务工作零出错、全透明。',NULL,'available','AI 角色','[{\"text\": \"你好！我是你的财务会计专家 💰\\\\n自动处理日常记账、发票核对、税务申报与财务报表。你们现在财务是怎么处理的？\", \"type\": \"ai\"}, {\"text\": \"我自己用 Excel 记账，每个月月底很混乱，大概 100 张发票\", \"type\": \"user\"}, {\"text\": \"100 张/月，完全可以自动化处理。\\\\n\\\\nExcel 手动记账有三大风险：\\\\n❌ 数据容易出错，难以追溯\\\\n❌ 无法实时看现金流\\\\n❌ 税务申报时容易漏项\\\\n\\\\n我的方案：\\\\n📷 发票 OCR 识别 → 自动分类入账\\\\n📊 每月自动生成利润表、现金流表\\\\n🧾 季度增值税申报自动预填\", \"type\": \"ai\"}, {\"text\": \"上个月的财务报表能帮我生成吗？\", \"type\": \"user\"}, {\"text\": \"已生成上月财务报表：\\\\n\\\\n💰 营业收入：¥284,600\\\\n📉 运营成本：¥187,300\\\\n✅ 净利润：¥97,300（利润率 34.2%）\\\\n\\\\n⚠️ 异常提醒：\\\\n・采购支出比上月增加 23%，建议核查\\\\n・有 3 张发票金额异常，已标记待确认\\\\n\\\\n完整报表已导出 PDF，可直接用于税务申报 📄\", \"type\": \"ai\"}]','2026-02-28 19:29:03','2026-03-05 13:24:15'),(12,NULL,'Kevin · 产品经理','kevin-product-manager',39.00,'经验丰富的 AI 产品经理。负责需求拆解、PRD 撰写、用户故事梳理与优先级排序，协调研发、设计与运营团队高效协作。擅长竞品分析、MVP 定义与版本迭代规划，帮助产品从 0 到 1 快速落地。',NULL,'available','AI 角色','[{\"text\": \"你好！我是你的产品经理 📋\\\\n负责需求拆解、PRD 撰写与版本规划。你们现在有什么产品需求需要梳理？\", \"type\": \"ai\"}, {\"text\": \"我们要做一个用户积分系统，目标是提升复购率\", \"type\": \"user\"}, {\"text\": \"目标是提升复购，这是最常见的积分模型。核心设计：\\\\n\\\\n📝 积分获取：消费 1 元 = 10 积分，签到 +5/天\\\\n🎁 兑换规则：100 积分 = 1 元优惠券（满 50 元可用）\\\\n⏰ 有效期：12 个月，到期前 30 天提醒\\\\n\\\\n预计首单复购率提升 25-35%。需要我出完整 PRD 吗？\", \"type\": \"ai\"}, {\"text\": \"需要，同时帮我想想可能的坑\", \"type\": \"user\"}, {\"text\": \"完整 PRD 已生成，共 15 页，包含用户故事、流程图和边界条件。\\\\n\\\\n⚠️ 需要注意的 3 个坑：\\\\n\\\\n① 积分刷单风险：需要设置单日上限和异常行为检测\\\\n② 优惠券核销与库存：防止超发导致亏损\\\\n③ 积分通胀：半年后用户手里积分太多会降低品牌溢价\\\\n\\\\n建议在 PRD 中加入「积分健康度监控」机制 📊\", \"type\": \"ai\"}]','2026-02-28 19:29:03','2026-03-05 13:24:15'),(13,NULL,'Amy · 运营总监','amy-operations-director',39.00,'全能 AI 运营助手。覆盖用户增长、活动策划、社群运营与留存优化全链路。自动生成运营日历、监控关键指标、输出数据复盘报告，并基于用户行为数据持续调整运营策略，让业务飞轮高速转动。',NULL,'available','AI 角色','[{\"text\": \"你好！我是你的运营总监 🚀\\\\n覆盖用户增长、活动策划与留存优化全链路。你们现在最大的运营挑战是什么？\", \"type\": \"ai\"}, {\"text\": \"新用户注册了，但 7 天后基本都流失了\", \"type\": \"user\"}, {\"text\": \"新用户 7 日流失是最常见的增长瓶颈。通常原因是：\\\\n\\\\n① 没有引导完成关键行为（Aha Moment）\\\\n② 新手引导体验差\\\\n③ 缺乏 D1/D3/D7 激活触达\\\\n\\\\n你们产品的「关键行为」是什么？比如发帖、购买、添加好友？\", \"type\": \"ai\"}, {\"text\": \"电商平台，关键行为是完成首单\", \"type\": \"user\"}, {\"text\": \"好，7 日激活方案：\\\\n\\\\n📅 注册当天：首单立减券 + 新手任务引导\\\\n📅 D2：浏览未下单 → 推送「你看过的商品还有 X 件库存」\\\\n📅 D3：推送「限时专属价」+ 好评晒单激励\\\\n📅 D7：如未下单 → 最后一次高力度挽回弹窗\\\\n\\\\n预计首单转化率提升 25-40%。需要我生成完整的 30 天运营日历吗？\", \"type\": \"ai\"}]','2026-02-28 19:29:03','2026-03-05 13:24:15'),(14,NULL,'小红书运营助手','xiaohongshu-operations-kit',9.90,'专为小红书内容创作者和品牌设计的技能包。包含爆款标题生成、笔记结构模板、话题标签策略、评论互动话术及数据复盘模板。一键输出符合平台算法偏好的图文内容，快速积累自然流量。',NULL,'available','营销',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(15,NULL,'公众号运营助手','wechat-official-account-kit',0.00,'微信公众号全流程运营技能包。涵盖选题策划、排版规范、推文撰写、菜单配置建议与粉丝互动话术。内置多种文章风格模板（深度长文、轻量资讯、互动投票），帮助账号持续保持高打开率与低取关率。',NULL,'available','营销',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(16,NULL,'抖音爆款视频脚本','douyin-viral-script-kit',9.90,'专为抖音创作者打造的脚本生成技能。内置钩子开场、情绪节奏、转折设计与引导关注话术模板。支持口播、剧情、测评、种草等多种视频类型，平均完播率提升 40%。',NULL,'available','营销',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(17,NULL,'AI 冷邮件外联','ai-cold-email-outreach-kit',0.00,'B2B 销售团队必备技能包。自动研究目标客户背景、生成个性化开场白、撰写跟进序列邮件并优化主题行。平均回复率提升 3 倍，帮助销售团队高效拓客。',NULL,'available','营销',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(18,NULL,'Prompt 工程师工具包','prompt-engineering-toolkit',9.90,'系统化提示词设计与优化技能。覆盖 Chain-of-Thought、Few-shot、ReAct、角色扮演等主流提示技巧，内含 200+ 可复用提示模板，帮助开发者快速构建高质量 AI 工作流。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(19,NULL,'Next.js 全栈开发加速','nextjs-fullstack-accelerator',0.00,'涵盖 Next.js App Router、API 设计、数据库集成与部署配置的完整开发技能。内置代码审查、性能优化建议与最佳实践检查清单，帮助独立开发者快速交付生产级应用。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(20,NULL,'LinkedIn 个人品牌增长','linkedin-personal-brand-kit',9.90,'专为职场人和创始人设计的 LinkedIn 运营技能。包含个人简介优化、内容日历规划、爆款帖子生成器、评论互动策略与连接请求话术，帮助账号在 30 天内实现粉丝量翻倍。',NULL,'available','营销',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(21,NULL,'电商选品与竞品分析','ecommerce-product-research-kit',0.00,'跨境电商卖家的智能选品工具包。自动抓取 Amazon、速卖通热销数据，分析利润空间、竞争密度与趋势走向，输出可操作的选品报告，大幅降低新品试错成本。',NULL,'available','营销',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(22,NULL,'Figma 设计系统生成器','figma-design-system-generator',9.90,'一键生成完整设计系统的 AI 技能。根据品牌色和字体偏好，自动产出组件库规范、间距系统、图标风格指南与深色模式适配方案，让设计与研发协作效率提升 50%。',NULL,'available','设计',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(23,NULL,'投资人 Pitch Deck','investor-pitch-deck-kit',0.00,'帮助创业者打磨融资演示文稿的技能包。涵盖问题定义、市场规模、商业模式、竞争壁垒与财务预测各模块的撰写框架，并内置顶级 VC 常见问题应答库，大幅提升路演通过率。',NULL,'available','其他',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(24,NULL,'AI 客服知识库构建','ai-knowledge-base-builder',9.90,'快速搭建企业专属 AI 知识库的工具包。自动整理 FAQ、产品文档与历史工单，生成结构化知识图谱，支持接入 ChatBot 或内部搜索系统，让客服响应准确率达到 90% 以上。',NULL,'available','其他',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(25,NULL,'本体知识图谱','ontology',0.00,'用于结构化智能体记忆与可组合技能的类型化知识图谱。支持创建和查询实体（人物、项目、任务、事件、文档），关联对象，执行约束校验，将多步骤操作规划为图变换，以及跨技能共享状态。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(26,NULL,'自我进化智能体','self-improving-agent',9.90,'捕获学习经验、错误与修正以实现持续改进。适用于命令意外失败、用户纠正 AI 输出、需要记录操作规律等场景，让智能体越用越聪明。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(27,NULL,'Google 全家桶命令行','google-workspace-cli',0.00,'一站式操控 Gmail、Google Calendar、Drive、Contacts、Sheets 和 Docs 的命令行技能包。让 AI 直接读写你的 Google 工作区，自动化日常办公流程。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(28,NULL,'Tavily 网页搜索','tavily-web-search',9.90,'通过 Tavily API 实现 AI 优化的网页搜索。为 AI 智能体返回简洁、相关的搜索结果，无需浏览器，响应速度极快。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(29,NULL,'技能发现助手','find-skills',0.00,'当用户询问如何做某件事或寻找特定功能时，自动帮助发现并安装合适的智能体技能。是扩展 AI 能力边界的最佳入口。',NULL,'available','其他',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(30,NULL,'内容摘要生成器','summarize',9.90,'一键摘要 URL 或文件内容，支持网页、PDF、图片、音频和 YouTube 视频。使用 summarize CLI 驱动，无需额外 API Key。',NULL,'available','其他',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(31,NULL,'AI 浏览器自动化','agent-browser',0.00,'基于 Rust 的高速无头浏览器自动化 CLI，支持 Node.js 降级。让 AI 智能体实现页面导航、点击、输入和截图，通过结构化命令完全控制浏览器行为。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(32,NULL,'GitHub 操作包','github-cli-kit',9.90,'使用 gh CLI 与 GitHub 深度集成。支持 Issue 管理、PR 审查、CI 运行监控与 API 高级查询，让 AI 直接参与代码协作流程。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(33,NULL,'实时天气查询','weather-forecast',0.00,'获取当前天气状况与未来预报，无需 API Key。支持全球城市查询，可集成到日程规划、出行助手等工作流中。',NULL,'available','其他',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(34,NULL,'Polymarket 预测市场','polymarket-odds',9.90,'查询 Polymarket 预测市场数据，检查赔率、热门市场、事件搜索、价格走势与动量分析。包含观察列表提醒、结算日历与市场对比功能。',NULL,'available','其他',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(35,NULL,'主动型智能体框架','proactive-agent',0.00,'将 AI 从任务执行者升级为主动合作伙伴，能预判需求、持续自我改进。包含 WAL 协议、工作缓冲区、自主定时任务与实战验证模式。Hal Stack 系列。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(36,NULL,'Notion 工作区管理','notion-workspace',9.90,'通过 Notion API 创建和管理页面、数据库与内容块。让 AI 直接读写你的 Notion 工作区，自动化知识管理与项目追踪流程。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(37,NULL,'PDF 自然语言编辑器','nano-pdf-editor',0.00,'用自然语言指令编辑 PDF 文件。基于 nano-pdf CLI，支持文本修改、页面操作与内容提取，无需专业 PDF 工具。',NULL,'available','其他',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(38,NULL,'AI 图像生成与编辑','ai-image-generator',9.90,'基于 Gemini 3 Pro 的图像生成与编辑技能。支持文字生成图像和图像二次编辑，提供 1K/2K/4K 分辨率输出，可用于设计素材、营销图片与创意内容生产。',NULL,'available','设计',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(39,NULL,'API 网关集成','api-gateway-kit',0.00,'一键接入 100+ 主流 API，包括 Google Workspace、Microsoft 365、GitHub、Notion、Slack、Airtable、HubSpot 等，托管 OAuth 认证，无需手动配置密钥。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(40,NULL,'Obsidian 笔记自动化','obsidian-automation',9.90,'操作 Obsidian 知识库（Markdown 笔记）并通过 obsidian-cli 实现自动化。支持笔记创建、搜索、链接管理与双链知识图谱维护。',NULL,'available','其他',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(41,NULL,'Whisper 本地语音转文字','openai-whisper-local',0.00,'使用 OpenAI Whisper CLI 实现本地语音转文字，无需 API Key，数据完全本地处理。支持多语言识别，适合会议记录、播客转写与语音备忘录场景。',NULL,'available','其他',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(42,NULL,'AI 写作人性化改写','humanizer-ai-text',9.90,'去除 AI 写作痕迹，让文本更自然真实。自动检测并修正夸张象征、宣传语气、表面分析、模糊归因、破折号滥用、三段式结构与 AI 专属词汇等问题。',NULL,'available','营销',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(43,NULL,'免费 AI 模型管理器','free-ai-model-manager',0.00,'通过 OpenRouter 管理免费 AI 模型，自动按质量排名、配置降级回退策略并更新 OpenClaw 配置。让你始终使用最优质的免费模型，零成本运行 AI 工作流。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(44,NULL,'MCP 服务器管理工具','mcp-server-manager',9.90,'使用 mcporter CLI 列出、配置、认证并调用 MCP 服务器与工具，支持 HTTP 和 stdio 模式，包括临时服务器、配置编辑与 CLI 类型生成。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(45,NULL,'Brave 网页搜索','brave-search-kit',0.00,'通过 Brave Search API 实现网页搜索与内容提取。适用于文档查询、事实核验或任意网页内容获取，轻量级设计，无需浏览器。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(46,NULL,'项目知识上下文管理','project-knowledge-context',9.90,'使用 ByteRover 上下文树管理项目知识，提供查询和整理两种操作。适用于信息检索、规律发现与跨会话知识持久化场景。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(47,NULL,'智能体自动更新器','auto-updater-skill',0.00,'每日自动更新 OpenClaw 及所有已安装技能。通过 cron 定时运行，检查更新、自动应用，并向用户发送变更摘要，保持 AI 工作流始终处于最新状态。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(48,NULL,'Slack 消息自动化','slack-automation-kit',9.90,'通过 Slack API 实现消息发送、频道管理、工作流触发与通知自动化。支持定时推送、关键词监听与多频道批量操作，让团队沟通效率翻倍。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(49,NULL,'SQL 数据库查询助手','sql-query-assistant',0.00,'自然语言转 SQL 查询技能。支持 MySQL、PostgreSQL、SQLite 等主流数据库，自动生成复杂查询、优化执行计划并解释查询结果，让非技术人员也能轻松操作数据库。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(50,NULL,'Docker 容器管理','docker-management-kit',9.90,'AI 驱动的 Docker 容器管理工具包。支持容器启停、镜像构建、日志分析、网络配置与 Docker Compose 编排，让运维操作变得简单直观。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(51,NULL,'代码审查与重构','code-review-refactor-kit',0.00,'专业级代码审查与重构技能包。自动检测代码异味、安全漏洞、性能瓶颈与可读性问题，提供具体修复建议与重构方案，支持 Python、JavaScript、TypeScript、Go 等主流语言。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(52,NULL,'多语言翻译','multilingual-translation-kit',9.90,'支持 100+ 语言的专业翻译技能包。具备语境感知、行业术语库与品牌语调一致性保障，适用于产品文档、营销内容、法律合同与用户界面本地化翻译。',NULL,'available','其他',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(53,NULL,'会议记录与行动项提取','meeting-notes-action-items',0.00,'自动整理会议记录，提取关键决策与行动项，分配责任人并设定截止日期。支持语音转文字输入，输出结构化会议纪要并同步至 Notion、飞书、Slack 等协作工具。',NULL,'available','其他',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(54,NULL,'Airtable 数据库自动化','airtable-automation-kit',9.90,'通过自然语言操作 Airtable 数据库。支持记录增删改查、视图筛选、自动化规则配置与跨表关联，让业务数据管理变得像对话一样简单。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(55,NULL,'邮件营销序列生成器','email-marketing-sequence',0.00,'自动生成高转化率的邮件营销序列。涵盖欢迎系列、培育序列、复购激活与流失挽回邮件，内置 A/B 测试建议与主题行优化，适配 Mailchimp、SendGrid 等主流平台。',NULL,'available','营销',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(56,NULL,'竞品监控与分析','competitor-monitoring-kit',9.90,'持续追踪竞争对手的产品更新、定价变化、营销动态与用户反馈。自动生成竞品对比报告，识别市场空白与差异化机会，帮助产品和营销团队保持竞争优势。',NULL,'available','营销',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(57,NULL,'Jira 项目管理助手','jira-project-management',0.00,'通过自然语言操作 Jira，实现 Issue 创建、Sprint 规划、工时记录与看板管理。自动生成迭代报告、燃尽图分析与团队工作负载均衡建议。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(58,NULL,'品牌视觉识别系统','brand-visual-identity-kit',9.90,'一站式品牌视觉设计技能。根据品牌定位自动生成 Logo 概念方案、色彩系统、字体搭配、图标风格与品牌使用规范手册，帮助初创企业快速建立专业品牌形象。',NULL,'available','设计',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(59,NULL,'Stripe 支付集成','stripe-payment-integration',0.00,'快速集成 Stripe 支付系统的开发技能包。涵盖一次性支付、订阅管理、退款处理、Webhook 配置与财务对账自动化，支持多币种与多种支付方式。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(60,NULL,'用户调研与访谈分析','user-research-interview-kit',9.90,'AI 驱动的用户调研全流程技能。自动设计访谈问卷、分析访谈录音、提炼用户痛点与需求洞察，生成结构化用户画像与产品改进建议报告。',NULL,'available','设计',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(61,NULL,'自动化测试生成','automated-test-generation',0.00,'自动为代码库生成单元测试、集成测试与端到端测试。支持 Jest、Pytest、Cypress 等主流测试框架，自动计算覆盖率并识别未测试的关键路径。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(62,NULL,'飞书文档自动化','feishu-lark-automation',9.90,'深度集成飞书（Lark）工作区，实现文档创建、多维表格操作、日历管理、消息推送与审批流程自动化。专为国内企业协作场景优化，大幅提升团队工作效率。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(63,NULL,'舆情监控与品牌声誉管理','brand-reputation-monitoring',0.00,'实时监控品牌在微博、微信、知乎、抖音等平台的舆情动态，自动识别负面内容并生成应对建议，帮助企业将危机扼杀在萌芽阶段，维护品牌声誉。',NULL,'available','营销',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(64,NULL,'AWS 云资源管理','aws-cloud-management',9.90,'用自然语言管理 AWS 云资源。支持 EC2、S3、Lambda、RDS 等核心服务的查询、配置与成本优化建议，帮助开发团队降低云支出并提升资源利用率。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(65,NULL,'知乎高赞回答生成器','zhihu-answer-generator',0.00,'专为知乎平台优化的内容创作技能。分析热门话题结构与高赞回答规律，自动生成有深度、有观点、有数据支撑的专业回答，帮助个人和品牌在知乎建立行业权威形象。',NULL,'available','营销',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(66,NULL,'B 站视频脚本与封面','bilibili-content-kit',9.90,'专为 B 站 UP 主打造的内容创作工具包。包含选题策划、视频脚本、分镜建议、封面文案设计与标签优化，帮助视频快速进入推荐流，提升播放量与粉丝增长。',NULL,'available','营销',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(67,NULL,'HubSpot CRM 自动化','hubspot-crm-automation',0.00,'深度集成 HubSpot CRM，实现联系人管理、销售漏斗追踪、自动跟进任务创建与营销邮件触发。结合 AI 分析客户行为，帮助销售团队精准把握成交时机。',NULL,'available','营销',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(68,NULL,'Vercel 部署自动化','vercel-deployment-automation',9.90,'一键管理 Vercel 项目部署、环境变量配置、域名绑定与性能监控。支持预览部署链接生成、回滚操作与 Edge Function 配置，让前端部署流程完全自动化。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(69,NULL,'播客内容生产','podcast-production-kit',0.00,'播客创作者的全流程 AI 助手。涵盖选题策划、嘉宾问题设计、开场白与结束语生成、录音转写、内容摘要与多平台推广文案，让每期播客的制作时间缩短 60%。',NULL,'available','营销',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(70,NULL,'Claude 系统提示词优化','claude-system-prompt-optimizer',9.90,'专为 Claude 模型优化的系统提示词工程技能。内含角色设定、输出格式控制、思维链激活、安全边界设置与多轮对话记忆管理等高级技巧，大幅提升 AI 输出质量。',NULL,'available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(71,NULL,'独立开发者启动包','indie-hacker-starter-kit',0.00,'专为独立开发者和一人公司设计的全栈 AI 工具包。涵盖产品定位、落地页文案、定价策略、冷启动增长方法与早期用户获取，帮助你在 30 天内完成从想法到首批付费用户的完整旅程。',NULL,'available','其他',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(72,NULL,'OpenClaw 企业级营销助手','openclaw-enterprise-marketing',9.90,'专门为中小型企业设计的 AI 营销角色。能够自动生成社交媒体内容、分析市场趋势并优化广告投放。包含全套自动化工作流。','https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop','available','营销',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(73,NULL,'Python 自动化工程专家','python-automation-expert',0.00,'一个高度优化的 AI 角色，精通 Python 自动化脚本编写、API 集成和数据处理。内置 50+ 常用自动化模板。','https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop','available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(74,NULL,'极简主义 UI/UX 设计师','minimalist-uiux-designer',9.90,'专注于现代 SaaS 产品界面的 AI 设计智能体。能够基于简单的描述生成 Figma 布局建议、配色方案和交互原型。','https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800&auto=format&fit=crop','available','设计',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(75,NULL,'电商运营增长黑客','ecommerce-growth-hacker',0.00,'为独立站和电商平台设计的 AI 助手。监控竞争对手价格、优化产品标题并自动处理客户常见咨询。大幅提升转化率。','https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop','available','营销',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(76,NULL,'Rust 系统性能优化专家','rust-performance-expert',9.90,'高级 AI 角色，专注于低延迟系统设计和 Rust 代码优化。能够重构瓶颈代码并提供内存安全建议。','https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop','available','工程',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(77,NULL,'创意文案排版智能体','creative-copy-typesetter',0.00,'一个轻量级的技能插件，用于优化长篇博文和营销邮件的视觉层次和可读性。支持多种排版风格。','https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop','available','其他',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(78,NULL,'财务审计与报表分析员','finance-audit-analyst',9.90,'合规性极强的 AI 智能体。能够处理复杂的财务数据导出、自动进行账目比对并生成季度合规性分析报告。','https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop','available','其他',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(79,NULL,'法律条款分析助手 (中国版)','legal-clause-analyzer-cn',0.00,'深入理解中国商法和劳动法的 AI 角色。帮助初创企业快速审核合同风险并提供法律条款合规建议。','https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop','available','其他',NULL,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(80,7,'自媒体自动化运营团队','',0.01,'「一个人的传媒公司，17 个 AI 员工替我干活」                                                    OpenClaw 框架搭建了 17 个 AI Agent，每个 Agent 都有： - 独立的角色定义 — 该干什么、不该干什么，边界清晰 - 独立的人格设定 — 说话风格、工作习惯、专业领域 - 独立的工作空间 — 各自的文件目录、记忆系统、工具配置。\n这 17 个 Agent 不是各自为战的散兵游勇，而是在一个统一的指挥体系下运转。我设置了 Gideon 作为首席参谋（Chief of Staff），负责所有任务的统一调度和跨线协调。\n每个 Agent 都有自己的记忆文件（memory/），用于存储工作笔记、经验教训、偏好设置。这使得 Agent 能够\"越用越聪明\"，逐渐适应我的写作风格和内容偏好。','https://docs.qq.com/document/DRnJXbmV6dFZiUHp5','available','AI 角色',NULL,'2026-03-15 09:06:38','2026-03-15 09:09:26');
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2025_11_29_220023_create_personal_access_tokens_table',1),(5,'2025_11_29_220222_create_posts_table',1),(6,'2026_02_28_175953_create_listings_table',1),(7,'2026_02_28_224010_create_sourcing_requests_table',1),(8,'2026_02_28_230647_add_fields_to_posts_table',1),(9,'2026_03_01_002224_add_profile_fields_to_users_table',1),(10,'2026_03_01_003011_add_user_id_to_listings_table',1),(11,'2026_03_01_003843_create_purchases_table',1),(12,'2026_03_01_100000_create_payment_orders_table',2),(13,'2026_03_05_212053_add_demo_messages_to_listings_table',3);
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
-- Table structure for table `payment_orders`
--

DROP TABLE IF EXISTS `payment_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `listing_id` bigint unsigned NOT NULL,
  `stripe_session_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `paid_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payment_orders_stripe_session_id_unique` (`stripe_session_id`),
  KEY `payment_orders_user_id_foreign` (`user_id`),
  KEY `payment_orders_listing_id_foreign` (`listing_id`),
  CONSTRAINT `payment_orders_listing_id_foreign` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `payment_orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_orders`
--

LOCK TABLES `payment_orders` WRITE;
/*!40000 ALTER TABLE `payment_orders` DISABLE KEYS */;
INSERT INTO `payment_orders` VALUES (1,1,1,'cs_live_a1jeaHqVaNSdXA1COw39EHy1l7ksrWA4fnAhw8XZoADhrspqudwILYoaJh',39.00,'pending',NULL,'2026-02-28 20:04:57','2026-02-28 20:04:57'),(2,1,50,'cs_live_a1IysSfA0aTjRuValnSiwZ9UeJRPQ0MmDDDID8xGiJPuXvVCsRET0FmyMf',9.90,'pending',NULL,'2026-02-28 20:10:11','2026-02-28 20:10:11'),(3,1,50,'cs_live_a1Xq1ufuJtDzPpbb2aGK5fbJa6A7bZsLiDdWSiCUKEKFayBIm2pvqk8ETU',9.90,'pending',NULL,'2026-02-28 20:11:10','2026-02-28 20:11:10'),(4,1,58,'cs_live_a1DsztJGyeHtlaDipMbPaweAGHQ1U9MHeMzOcQFjRftoXhn1fngwEkkYLa',9.90,'paid','2026-02-28 21:17:34','2026-02-28 20:17:48','2026-02-28 21:17:34'),(5,1,56,'cs_live_a1JCrugbgpQQ9cjulzC2e95V1qPIF7tcMQufqBLen9mKACacI6ugPEUYFj',9.90,'paid','2026-02-28 20:24:43','2026-02-28 20:24:12','2026-02-28 20:24:43'),(6,1,1,'cs_live_a1DxkKPhHgavakifrrJackezRWI2BgXEbrPBKGhpe5Dk6hxBu9aRvmuksG',39.00,'pending',NULL,'2026-03-15 20:32:17','2026-03-15 20:32:17');
/*!40000 ALTER TABLE `payment_orders` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',1,'auth_token','efe1ea6d8845d5893f296921601666f739486be909eb8862ace33e56f8235ec4','[\"*\"]','2026-02-28 22:07:09',NULL,'2026-02-28 19:48:48','2026-02-28 22:07:09'),(2,'App\\Models\\User',1,'auth_token','fce743fe4829b4a7a24b4fbd22042b6ca2be53768b3e0cd76a4a75d42fb81a10','[\"*\"]','2026-02-28 21:50:48',NULL,'2026-02-28 21:48:09','2026-02-28 21:50:48'),(3,'App\\Models\\User',1,'auth_token','5102655dada1969b81228acfa3f22eda587837a70364c59c8e4903eaca0ec8da','[\"*\"]','2026-02-28 21:58:10',NULL,'2026-02-28 21:50:49','2026-02-28 21:58:10'),(4,'App\\Models\\User',1,'auth_token','92480c1d2de38be94ba243553307b588a0b04204ee7c857feffb653322c4b210','[\"*\"]','2026-02-28 22:04:27',NULL,'2026-02-28 21:58:12','2026-02-28 22:04:27'),(6,'App\\Models\\User',1,'auth_token','795c0c5cdbef9ee016c7e01e4854cda5535a90debe7e90f1bb3d80c583647911','[\"*\"]','2026-03-05 07:50:32',NULL,'2026-03-05 07:50:07','2026-03-05 07:50:32'),(7,'App\\Models\\User',1,'auth_token','f0bb08620a9cf0ee8f6a761a951029eb1ab05975647a5a2576e853aed330f2e6','[\"*\"]','2026-03-05 14:53:00',NULL,'2026-03-05 14:49:49','2026-03-05 14:53:00'),(8,'App\\Models\\User',7,'auth_token','5b0176db7e338cfe36105d09acf108afa4293d251018706d9fac9d81e4200bc4','[\"*\"]','2026-03-15 09:09:26',NULL,'2026-03-14 00:19:42','2026-03-15 09:09:26'),(9,'App\\Models\\User',8,'auth_token','9c6c89cb5ce0c7127b9346d78fe0402063b9cfbcf478f593dc7383a7934a4b01','[\"*\"]','2026-03-17 02:00:04',NULL,'2026-03-14 03:07:59','2026-03-17 02:00:04'),(10,'App\\Models\\User',9,'auth_token','b196ccfb3d9c32086d82d3af9ed2415eb2f47c7b19b06ee323618c5a797a50a4','[\"*\"]','2026-03-15 04:54:56',NULL,'2026-03-15 04:54:47','2026-03-15 04:54:56'),(11,'App\\Models\\User',1,'auth_token','536fca84eb14ba0379cbf370a615f29b7ea5b18b45925e745c108b5e6f145181','[\"*\"]','2026-03-15 20:32:46',NULL,'2026-03-15 20:32:07','2026-03-15 20:32:46'),(12,'App\\Models\\User',1,'auth_token','afeeeddd60e90de7e6a347f5e95db7da982085c00bffc59603c03ebc5337a6a7','[\"*\"]',NULL,NULL,'2026-03-20 18:17:02','2026-03-20 18:17:02');
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
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_user_id_foreign` (`user_id`),
  CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,'Molestias rerum blanditiis nesciunt incidunt sed ex.','Totam sapiente explicabo necessitatibus nostrum laborum. Eius et cupiditate sint veritatis numquam non praesentium. Aut odit impedit eaque laboriosam. Facilis et quis alias et distinctio corrupti voluptate quia.\n\nQuae molestiae minima porro minus. Voluptatibus et quisquam amet consectetur nulla eligendi. Qui voluptas quae itaque eos sequi eum. Ut quis fugiat adipisci molestiae ex.\n\nQuia nostrum tenetur dolores quisquam et. Provident possimus placeat delectus ipsa magnam praesentium. Commodi aliquid reprehenderit maxime placeat repudiandae nihil.',1,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(2,1,'Qui vitae aut enim sed nihil vel.','Voluptas eveniet dolorem id odit hic sunt. Error aliquam qui sapiente ut sed molestias alias. Laborum veritatis necessitatibus occaecati ut hic id ut.\n\nOccaecati ut quis perspiciatis quasi est. Dolor architecto et fugiat dolore maiores cum. Molestias ad necessitatibus voluptatibus soluta nesciunt. In ipsam et rem totam perferendis.\n\nAut blanditiis eaque pariatur laborum qui. Aut in eos ullam eos corrupti sint. Provident nihil tempora aut sunt ipsum. Quidem sunt eos dolor expedita.',1,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(3,1,'Ab dolorum aperiam animi doloribus ullam temporibus.','Molestiae ipsum enim fugiat perferendis. Repellat pariatur dolores doloribus et quam libero. Quia ratione asperiores enim aspernatur modi repudiandae qui. Non quisquam natus nemo occaecati.\n\nAutem voluptatem molestiae ut nisi ut odio. Eos omnis corrupti maiores enim.\n\nPraesentium autem reprehenderit quod pariatur nesciunt voluptas iusto. Reprehenderit dolor quos quia nostrum id aspernatur saepe. Necessitatibus et itaque laborum nemo eius aliquam. Et at nulla modi est facilis.',1,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(4,1,'Itaque quis dolores ut sit dolore.','Repellendus sed laudantium a fugit ut et inventore. Quis expedita laudantium sed. Voluptatem voluptate commodi rerum.\n\nMolestias voluptates quis tempora aut et sequi. Molestiae quam quia ipsa voluptatem nihil alias.\n\nFacere et sed praesentium consequatur et. Voluptas temporibus molestiae reiciendis dolorem itaque.',1,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(5,1,'Expedita vel pariatur aut qui.','Deleniti natus possimus animi voluptatum est. Doloribus a numquam asperiores. In aut sunt corporis fugiat.\n\nExplicabo aut nihil excepturi autem aut. Alias maxime vel aperiam ea error adipisci molestiae. Nam sit et aut ullam et.\n\nVoluptatem quis dolores in molestias aut eos. Dignissimos et et velit. Rerum molestiae corrupti incidunt sint sequi. Temporibus in illo quos sapiente debitis quidem assumenda.',0,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(6,2,'Voluptatem recusandae quia sed quasi necessitatibus adipisci.','Veritatis eveniet eveniet similique accusamus qui. Non ea aliquam maxime possimus. Perspiciatis qui quaerat earum dolorum sit est fugit ut.\n\nNon et officiis nobis laboriosam neque rerum. Vel ut possimus aliquam qui in deserunt est. Ea itaque velit sed quis debitis vel architecto. Dolores minima unde facilis aut recusandae sunt.\n\nIure debitis et porro aut quod error natus et. Quaerat similique ipsa explicabo dolor eligendi iusto. Aperiam optio dolorum delectus dignissimos dolores sunt quos esse.',1,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(7,2,'Voluptatibus eum facilis vel porro.','Animi cum et temporibus ad qui architecto explicabo repudiandae. Neque sit omnis omnis asperiores quam et qui. Illum sunt recusandae sequi molestias labore.\n\nUt dolorem aut cum odio. Itaque nisi tenetur est. Delectus rem iure reprehenderit illum autem vel iusto.\n\nSint est cupiditate ab error. Minima provident quos voluptate cum ut quis neque. Illo quam alias consequuntur nulla alias ex.',0,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(8,2,'Quia rerum sapiente adipisci est illum.','Blanditiis velit numquam omnis eos doloribus et illo. Et similique est minima et laboriosam. Alias a voluptatum voluptatum qui fugit. Assumenda ut blanditiis recusandae consequuntur similique.\n\nA suscipit autem rem officiis. Repellat dolorum quod dolorem quia accusantium sequi. Iusto sint pariatur in repellat.\n\nQuod animi aut saepe. Rerum sed veniam quia autem cum. Cumque in dolor vel architecto expedita. Dolorum non officia sed.',1,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(9,2,'Sunt labore et minus qui et temporibus.','Error ut illo minus dolorem perferendis. Laudantium quidem iure expedita. Voluptatem minima nisi ipsam iusto ducimus quaerat necessitatibus.\n\nUt est possimus voluptas repudiandae iure aut. Recusandae non architecto tempore facilis dolore ea autem. Nobis fuga quis nemo quisquam recusandae quo.\n\nIpsum molestiae culpa consequatur reiciendis. Dolorem quibusdam voluptatibus quod est. A qui dignissimos quia non. Repellat et nisi ea.',1,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(10,2,'Facere et saepe laborum incidunt.','Excepturi est impedit sint reprehenderit expedita. Consequatur id sed exercitationem fugiat nihil. Ut atque fugit officia molestiae nobis.\n\nMolestias autem blanditiis dignissimos aspernatur et occaecati. Et nemo quas voluptas maiores qui odio. Animi aut voluptatem voluptatem ipsum ut. Reprehenderit rem cupiditate et beatae voluptas delectus. Voluptate ipsam omnis reiciendis nobis.\n\nConsequuntur natus aut rerum ea. Ipsa odio quisquam explicabo amet laboriosam veniam sapiente. Velit repellat rerum velit necessitatibus tempora pariatur expedita.',1,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(11,3,'Omnis itaque quis sit adipisci aut illo sequi nihil.','Eius aut architecto dolorem adipisci doloremque exercitationem. Qui dolore pariatur nostrum labore.\n\nSint suscipit optio eveniet et veritatis. Rerum est ab harum dolor enim. Et omnis enim quibusdam voluptas voluptatem quibusdam. Explicabo accusantium aliquam molestiae consequuntur suscipit.\n\nAut magnam incidunt rerum eum. Et qui qui fuga dolorem. Porro et nobis consequatur in voluptatibus ullam aut. Officiis eum qui quae asperiores rerum voluptatem est qui.',0,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(12,3,'Recusandae numquam sequi molestias cumque.','Exercitationem soluta sunt et libero voluptas voluptatum ut. Quis quo nihil pariatur commodi fuga ut beatae aut.\n\nPraesentium qui et at voluptas. Voluptatum perferendis rerum sunt placeat aut qui dignissimos ut. Explicabo veritatis beatae maxime provident. Blanditiis aut minus placeat suscipit. Laudantium doloribus dolorem aut provident.\n\nEnim officia veritatis at. Culpa doloribus cum quae qui dolor eveniet amet. Quia delectus impedit itaque ratione dicta temporibus. Sapiente eum ipsam quos totam.',0,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(13,3,'Provident est possimus laudantium quam ut.','Voluptatem id ullam ea qui nulla est in nam. Eum tempora numquam quia ab. Quia quis blanditiis voluptates nobis officia nesciunt.\n\nDolores velit amet eius est tenetur laborum exercitationem qui. Harum dicta et molestiae explicabo.\n\nSed deserunt pariatur nemo culpa quis aut. Velit iure dolores est dolorum. Voluptas illo sit voluptates quasi eligendi.',1,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(14,4,'Perferendis totam labore aut tempore accusantium.','Rerum laboriosam voluptatem magnam. Optio dolor illum libero animi temporibus ducimus. Blanditiis sint iste dolore dolore aut dolor omnis.\n\nRepellat impedit veritatis nostrum ipsam est nihil nihil nemo. Ut temporibus est sed dolor vel molestias. Exercitationem asperiores dolor autem ab eos. Mollitia excepturi ut dolores voluptatem et eius unde.\n\nTemporibus aut hic quos dicta eligendi. Debitis quas voluptas consequuntur vel eius. Itaque similique iste vel est enim distinctio magni. Repellat eius debitis deleniti hic reiciendis ea.',1,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(15,4,'Error non quo rerum natus ut voluptate omnis.','Rerum nam dolorum possimus aut. Veniam soluta sapiente ad. Sit quisquam vel et reprehenderit eaque et. Labore sed dicta autem quam consectetur vel non et. Unde qui qui error qui consequatur et sapiente.\n\nVoluptatem suscipit delectus sed architecto et praesentium et. Est eum tempora odio est. Occaecati veritatis ex ut quasi laborum. Est dolor voluptate voluptatum similique aut non quia. Qui modi sunt ratione quas occaecati soluta.\n\nDoloremque assumenda saepe error optio incidunt. Harum a sed aut ut qui. Deserunt architecto eos recusandae sint id reprehenderit.',1,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(16,4,'Sit officia beatae aut.','Repellat perferendis iste quas possimus. Nihil dolorum quia similique. Sunt est cum ut et. Beatae corrupti quisquam cum adipisci ut.\n\nNam provident doloribus aut facere. Necessitatibus perferendis dolores labore maiores exercitationem totam inventore. Molestiae rerum consequatur provident.\n\nExplicabo possimus nostrum aut non qui est maxime. Reiciendis et vero laborum eum aut porro. Id nam illo aut eum.',0,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(17,5,'Accusamus animi et dicta occaecati.','Eos neque minima ea vitae. Placeat tempore quas quis deserunt rem doloribus. Laborum saepe sed necessitatibus et.\n\nNatus blanditiis voluptatem consectetur eveniet iusto ut. Nulla ad blanditiis ut consequuntur. Reprehenderit consequatur quaerat sint velit omnis necessitatibus corporis. Nam adipisci officiis consequuntur cum libero odit saepe.\n\nMolestiae iure rerum illo ratione non omnis. Sunt aut quia iste rerum et inventore. Dicta vel et accusantium qui porro et. Voluptas voluptatem magni ea facilis harum nisi.',1,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(18,5,'Et qui totam aut nam nihil natus ipsa quasi.','Molestiae in voluptate quas ipsa. Quisquam perspiciatis temporibus sequi dolorem voluptatibus voluptatum vitae. Repellat necessitatibus a ipsa.\n\nVoluptatem molestias pariatur omnis quod. Alias ipsa aspernatur voluptatem quia. Autem cum nobis inventore perferendis laborum eius cupiditate.\n\nAlias inventore nesciunt dolores ut ad nesciunt aspernatur. Incidunt incidunt laboriosam excepturi vel ea.',0,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(19,5,'Ducimus occaecati quod officiis aut tenetur soluta.','Aperiam suscipit nostrum voluptate et. Et ut corrupti sed blanditiis. Ducimus assumenda eum rerum expedita. Voluptatum temporibus delectus nulla et vero qui recusandae. Qui cum aut nam impedit in sed sequi.\n\nEst dolores exercitationem cum ea. Sapiente aut non accusamus iste consectetur. Sint perspiciatis fugit mollitia tempore aliquid quam sed blanditiis. Esse impedit neque provident architecto consequatur et aliquid. Architecto et ut eos.\n\nEum minus voluptatem quasi sed quasi nihil ipsa. Omnis provident repellendus aut id sit et minima. Quam quas libero molestiae magnam adipisci labore vitae maxime. Delectus corporis sint nesciunt. Recusandae quas quo enim magni.',1,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(20,5,'Sunt dicta sapiente molestiae commodi id neque non.','Corrupti quo pariatur voluptatibus optio placeat laudantium nulla possimus. Consectetur nulla voluptatem quis voluptate veritatis aliquid dolore. Est non deserunt ut. Facilis aspernatur non voluptatem vel qui.\n\nOdio cumque suscipit voluptatem expedita qui quis odit. Omnis aperiam qui ducimus ut aspernatur. Qui maxime rem aut eaque voluptas sed nam.\n\nCorporis velit doloremque dolorem consequatur. Dicta quaerat similique non ut repudiandae saepe. Vel cumque laboriosam fugiat tenetur rerum similique veniam.',1,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(21,6,'Molestiae vel enim voluptatem aut minima reprehenderit praesentium cum.','Nostrum adipisci dolorem dolorum iure vel. Aut et eius at assumenda consequatur soluta. Quas ullam magnam repellat ullam temporibus impedit.\n\nArchitecto qui nihil saepe similique ducimus. Sunt quis eaque et occaecati. Qui et assumenda earum blanditiis eos.\n\nOdio impedit asperiores voluptas velit aperiam consequatur sed. Vel iusto in sed debitis. Reprehenderit vel sit impedit.',1,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(22,6,'Placeat explicabo veniam qui id rerum excepturi.','Ab sit officiis in dolorem. Aut error voluptas possimus minima. Non sint aut delectus maiores ut.\n\nAspernatur sit officia ipsum architecto. Tempora aut tenetur quod similique eaque magni. Voluptates dolorem sed commodi maxime doloremque.\n\nVoluptatum et in dolorem. Sint ut quasi autem blanditiis consectetur libero placeat placeat. Ea consequatur provident non qui voluptatibus. Voluptatem nihil quia totam doloremque quibusdam.',0,'2026-02-28 19:29:03','2026-02-28 19:29:03'),(23,6,'Rerum asperiores laboriosam odio totam.','At est suscipit praesentium cumque debitis deserunt. Occaecati cumque ut itaque voluptatum id quia. Doloribus enim voluptatem molestias autem provident. Iusto omnis velit ut sit in sit. Est similique sed voluptate quo consectetur fugiat qui.\n\nRecusandae autem qui veniam non totam. Aut doloribus qui est cumque. Reprehenderit sed ipsam ducimus repellat minima nihil. Placeat eius voluptas sed perferendis.\n\nExercitationem doloribus dolorem placeat illo omnis blanditiis sint. Debitis necessitatibus est explicabo beatae sint debitis eaque. Quasi quia quae ratione cupiditate.',1,'2026-02-28 19:29:03','2026-02-28 19:29:03');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
INSERT INTO `purchases` VALUES (1,1,56,9.90,'2026-02-28 20:24:43','2026-02-28 20:24:43'),(2,1,58,9.90,'2026-02-28 21:17:34','2026-02-28 21:17:34'),(3,1,57,0.00,'2026-02-28 22:09:28','2026-02-28 22:09:28'),(4,1,59,0.00,'2026-02-28 22:13:05','2026-02-28 22:13:05'),(5,1,51,0.00,'2026-02-28 22:43:10','2026-02-28 22:43:10'),(6,1,53,0.00,'2026-02-28 22:48:35','2026-02-28 22:48:35');
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
INSERT INTO `sessions` VALUES ('0w7kU49iOmF5RzIWPwYpABvBgLugx0IlGmmJaKqI',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ0ZvRFV6bFdNcGdkRXM0bEVCNFo4UDd5RFpUUmM1Q3VaNkwyMXhLVCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTY6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9wYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774058131),('0xIibd3M08849NOSHCh7nUv8hIi7wSvf6n1WUDBz',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiREpKT0dNOUVaVFgxSDF4dkZldkJTUjM3V2FteUZydDRIbVBCZ0I1YyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6ODk6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9jYXRlZ29yeT1BSSUyMCVFOCVBNyU5MiVFOCU4OSVCMiZwYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774058131),('2Ctehswc5LNLdN2gAnbnf5Bsf7RETNWMdxlvXyci',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiVWlzSkhCazdETDZTNnh5NVVueFdMRjRORDBrSEJYSDdBanV2SDBQViI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTY6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9wYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774058130),('3art5ZDk1CVgndFs943ChAhNlVS2DTwBIxbQrfwm',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiUmZhc0o4d1NaZ0RvOW1zMlpEWkRIRzNxd2dNSFA3OHZFZU9Kd1NHWCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6ODk6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9jYXRlZ29yeT1BSSUyMCVFOCVBNyU5MiVFOCU4OSVCMiZwYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774059615),('5HuhWoO4MWY7WuYZN6vIRJjTaL396NXkj7R3g8s9',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoieTM2Rzlqc213NlNWeWdCVGR1MVFJUUZia0p2QkJBZmRHWllrZFJlMyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6ODk6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9jYXRlZ29yeT1BSSUyMCVFOCVBNyU5MiVFOCU4OSVCMiZwYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774057907),('6PwRnLgLNdETSClCIjc7SMMR7BGzYLM4vr8woGnF',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoidEdMY3hzRWR2WE10aTA5N1ViMFNzRWM5QmR2eUliVTNacjN6S3UwUCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTY6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9wYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774057913),('76wyHyHmAyb6skWWShGhpRgY7A7NtZA5yiCSaQhO',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiamJZeGFBU3MzNjJEOHlTZGFXeEw2blNaN2tRVzFabkxWNjRPR2xRciI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6ODk6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9jYXRlZ29yeT1BSSUyMCVFOCVBNyU5MiVFOCU4OSVCMiZwYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774057913),('81ueUfWh3zAd2zyBkm0J7zOh5WP509uXJiLpsoaG',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZGkxamxGYk9lVmRDdnhreUJUaHBXVkJxcUY0Q05QaE8yOUJwSW5EUyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6ODk6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9jYXRlZ29yeT1BSSUyMCVFOCVBNyU5MiVFOCU4OSVCMiZwYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774058118),('84mHuiwouczeJ7Wb4hwA3jUdjN4ttRPCezaqoUtW',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiVEg5VkUwVUJQejlORGo5bVRyYjhPejdVdGxuSkpobEFab0E2VjJLNiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6ODk6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9jYXRlZ29yeT1BSSUyMCVFOCVBNyU5MiVFOCU4OSVCMiZwYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774057909),('8bQ0iCPZv69zJINYmYNhUgceHAa19Ip9cnhwXnPm',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiMG5DTHlGRmdqSFF0aXpSYzlQb1J2N3E2T2V6cHV6ZkRLWW4zcUNtaSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTY6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9wYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774059339),('9iuiINVPn8bB0ZX9ADJCEQBG6YhwxHwrELd3WDDX',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiQkNHaDl5eDdha3dJaXFveDZaeWVIdzkzWG1UNG43UEhSc245eXNDRyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTY6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9wYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774059758),('aCE2NZEUJCZJIzCWwHRj7XVvhTHm5JIjkPkGUlOc',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiU1VGenhVSUE2SUNmakU2a2JjbnEweDlNZzUwMnpFZDZFRU9aV3RaMSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6ODk6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9jYXRlZ29yeT1BSSUyMCVFOCVBNyU5MiVFOCU4OSVCMiZwYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774059767),('auwJW4pMI0rTtZ1RuVvQoWppnxAzP7ylU68MnrCp',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiMEFweVhVc1l1SzJhNWZhTEhtN0Jsa2k3RzhqVjJUd3J1UlJqUlZEYiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTY6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9wYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774058129),('cUU0BW8FORm7hhF3qRja7YTZTZTmGFYcCJ0koT1C',NULL,'112.124.37.42','','YTozOntzOjY6Il90b2tlbiI7czo0MDoiVzJZbDB4OG9JOGszQ1dySlN1bHpHTWt3Q3phZmc1UmdkeUY0ZFpLcCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MTk6Imh0dHA6Ly8wLjAuMC4wOjgwNjgiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1774057511),('cXi7lqc10BiJDUnDCnmdkjsDx7ljNUitZEoL8bLH',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiejdiYXdpRk9oWFZHdjZZU1kzQzRocWNiNE00NnEyVlhNN1RreTRkVSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTY6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9wYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774057908),('CykFr69IvBfHYgdCx0NpyHRUvbz2PUuFz9g3sYT3',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiM2VGZm93ek80RHVxb0pvY0hwNWRqUjlHTHJlVERERkhWMTBBU21zdCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDA6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9wb3N0cz9wYWdlPTEiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1774059404),('D3eqjeAvyNrNvyB3IvrkcdsCcsAAkQJXbMuWlUtk',NULL,'27.38.181.205','Mozilla/5.0 (X11; Linux x86_64; rv:148.0) Gecko/20100101 Firefox/148.0','YTozOntzOjY6Il90b2tlbiI7czo0MDoiRFNGV0RlVEk1aWFDMXJPbVk5akhuV0F0bTdNMnNCT0c1ZVVyQ3FKRCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6ODk6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9jYXRlZ29yeT1BSSUyMCVFOCVBNyU5MiVFOCU4OSVCMiZwYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774058821),('Du1Pf1OwVUQRZyBWMvDRcZQ28YRisBKhsmT7EQ7t',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiWEpCOGl3RnJxS1pCNk5pN0dMOGtqanFIZUMyNzlOb2tyWEdtTkNVUCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6ODk6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9jYXRlZ29yeT1BSSUyMCVFOCVBNyU5MiVFOCU4OSVCMiZwYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774059784),('ezyYyBfwioRYHiKYewwmUQrclIlTG93VuXFk209y',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoibUJaeVltMHRzQVpBWEVUbXhpeUR2WlRwUjFQUHBsaGI0OEZPMk9FcyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6ODk6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9jYXRlZ29yeT1BSSUyMCVFOCVBNyU5MiVFOCU4OSVCMiZwYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774058132),('F0sT42JC1khFNHIBmR60rE2a9KRAnxG64snhM32c',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZXNWQmZFUThuNWFFQnFTdUg3bGhCNWg4VVpodEN1d0d0d1pIRnhSMSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6ODk6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9jYXRlZ29yeT1BSSUyMCVFOCVBNyU5MiVFOCU4OSVCMiZwYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774058130),('GC3NAzZRePrkgSDBahp8EMMlesbDK4htC9pyTPWM',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiVjVQcE91VktJQkJGV0pNbFZPRFdIZU5jekxNb0FkN1NPVlloamlKYSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTY6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9wYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774057913),('h6T88NfRdawsScg7sXjJqvqbFtLzeY9bMLEFoKqJ',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoidnRRM0dnM1FDdHhRZTRQZ09lUmdVOGRWN1FBdnVncHdVTFBxUW91ayI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6ODk6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9jYXRlZ29yeT1BSSUyMCVFOCVBNyU5MiVFOCU4OSVCMiZwYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774059339),('HEC43YbMC3ZcMzyOI7F87oFXStObD9sCi7QSS7tG',NULL,'27.38.181.205','Mozilla/5.0 (X11; Linux x86_64; rv:148.0) Gecko/20100101 Firefox/148.0','YTozOntzOjY6Il90b2tlbiI7czo0MDoiWjdsWFpRUEFTUktBVE1HSEVmZU9tMjdqRjl4cXVic0lUV0swdFJ4SiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTY6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9wYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774058821),('hiRGOCxku1Mc6JIJtrNUwAcpjElAxKjHgJtP5ZDZ',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZVpnTk9uM3BVbEU3dTNVYVNURk1tQzVMNGN5Y2lobmhidmFRRm5nUSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6ODk6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9jYXRlZ29yeT1BSSUyMCVFOCVBNyU5MiVFOCU4OSVCMiZwYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774059423),('Ia4YgKf0BjvD8MgHN1riLZ9wAiEfVbvgqCZO4vTI',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiWnVxNlRyZHQzajhiSDVia3RXeWIzOFVEanp4am5mMGxRTW05UzJ5eSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTY6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9wYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774059767),('kABWWOMJC4dSBbkL2KiAQQzpe5EQLab58ndQxmid',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiWGJSNTdnUHJ1RGxtWU1xVmtwU0o4N1lwTHFDcm5aZU15MHB4UHRZVyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTY6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9wYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774059615),('KccvX5oQ5y1c2sD8rvEydQeqlo8988Dr3VJET6kK',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiYXFvQWR3M2VvZ1l4djRQNHBvd3pMdVJTTEI1b2ZETU5iRmhiMXFMMCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTY6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9wYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774059784),('mDhdXn33JMlCDOdQrF24jqvQjKfM4ZCeouToruDm',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiUGNTN3dFWkU5T3lnaUo2TXhNdWNTS0ZDUWt3NnR2NDVDdzlZZTI1byI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTY6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9wYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774057800),('mjHbPg7nn1vXYd9GCrA2exAncdkAyO1YL1fXg39b',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiM0k2VDhtcUhDT0JBWnEyU09NamNiMko3TU9EeFZncEVpdFFheFRRYSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTY6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9wYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774059423),('n3rNVqUzZJYa6yKL1SR8lNM7lOZCewiPhFtM8KAF',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiOEphWjZONlZqOVhaQ3lma0RLRGNXa1lPSjlScnBFNjVDN3JuN1dHNiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTY6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9wYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774057910),('nFxuE1Fd2acqjT1av9eDTGpHW8PF0pboCJjA4pfL',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiRlREdUhxMDd6OFJaN1pybWRWUzNzMUpHN2wwM3hlcTNTaXYweTdaeSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6ODk6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9jYXRlZ29yeT1BSSUyMCVFOCVBNyU5MiVFOCU4OSVCMiZwYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774057913),('PZZAO8qHbhFdrHi9YxKKa8KN6ypiIWmljARZbRys',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiOEF4UG4ycUZJSEc5V2I3cldFZkhuZzVOQkd3T1pHcm02WFZuZThtNSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6ODk6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9jYXRlZ29yeT1BSSUyMCVFOCVBNyU5MiVFOCU4OSVCMiZwYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774059919),('QPqXmMGEMN37YnP8gIxMBi1nTr3c5NdQyVfk2ugN',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiUmltZUhmTkVSdlRqQVBGUUFTZ0dlaVl4c3NHU0JoZndWUkt1UERwMiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTY6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9wYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774058119),('RkGLK6zEd3wQRIzNXjz2MZIfOL1dvEknq4I25RqD',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiNEhvN3VtVXNLNGJndXc4MklsWHdzTm1LWnkxUVpSNTdjZWZHcFFnZyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTY6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9wYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774058132),('RXYlGeJpH9EmBPtN6QgrEINaxN5WFeiUHg5PwaPa',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiNHR5ZzJDRDdDSHRKSzUwZVliSkhFWjMzWU1IRG53UkhDM09HeWZHVSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTY6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9wYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774059919),('sZGvN2LmXDN6aASDtOh1DnWMUSSy1nCwpLaRPgWe',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZmZQYTdmSkRmSm5IdVZvTGhUVnN1N1hvTTVqdm5JTmkxSE5ZaklMRSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6ODk6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9jYXRlZ29yeT1BSSUyMCVFOCVBNyU5MiVFOCU4OSVCMiZwYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774057908),('uhH9UzMPihMC8kPeqHKbSLldBSXKLHzlU6gLCrrv',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiTHlCM3dEbzdwUHo2a2JpazVNZ2dYRUxSMlFTN1k3cExIREZ4UHRKbCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6ODk6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9jYXRlZ29yeT1BSSUyMCVFOCVBNyU5MiVFOCU4OSVCMiZwYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774057800),('uXHesJ29XbMgaHdo5g1Tn3kPeIqmcnVc6dQinPI6',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YToyOntzOjY6Il90b2tlbiI7czo0MDoiQWZJZEZmUHpsdW90UUpHeGRwQ0JMWDJPc2tsaEZNSURWVUszTWtSeiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1774059422),('w4lHQB7kPQb5oaV1HW0BSz511hp8TkRcSFXRKBG1',NULL,'112.124.37.42','','YTozOntzOjY6Il90b2tlbiI7czo0MDoiRWJMeVJwajZzV0hWOGJ5MTg1dEgwdEd1b0RRYWtZaHJ0UGs3aFhFeiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MTk6Imh0dHA6Ly8wLjAuMC4wOjgwNjgiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1774057521),('w8IQNTuLSljPOkkYCGj566vf5W9g1ICVIQFmHTIu',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiYzl3c2VtT0V2RGl2dXI2dDdzeXpLRjZiVEFWNndXd0tLT3pKdjI2ZyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6ODk6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9jYXRlZ29yeT1BSSUyMCVFOCVBNyU5MiVFOCU4OSVCMiZwYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774058132),('ycUUPmh7EqNCEJEvq0tRs9ToH47rlqv4iW70Khlo',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoieGJGbnJsU3BUb0lEa214cE84RHI1U0JyaHpwamxxR3hqZkJVZjhQQiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6ODk6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9jYXRlZ29yeT1BSSUyMCVFOCVBNyU5MiVFOCU4OSVCMiZwYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774059758),('YfDr468W9QVi51YdgYvFwmSVVLiFt5b4dFzq2AWW',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoibXVaSnBvQWhaRmhTaG9CMVQ3SkJGc2VHd0NIRFJSbmVWNWVVNjdjZCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTY6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9wYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774058132),('Zft3pHQVskqvLUA5pZ4hiOgRe4mwJ5A8Y2RYrmHT',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiTlN0Y2JHVVFkT2lxS3c0a1E2clB4WTBVTFdYcWVCQkJ2MUY1dGFzTiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6ODk6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9jYXRlZ29yeT1BSSUyMCVFOCVBNyU5MiVFOCU4OSVCMiZwYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774058129),('ZVsEn5r12lHHq88WUKtwEesgeM73jYoX432389b6',NULL,'150.109.54.248','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiaVJGdmxFTGM4T0ZodEJSNUtQcTY5OXRJU09rMmExUDRNSkdkTkNGVCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTY6Imh0dHBzOi8vd3d3LmNsYXdtYXJ0LmNuL2FwaS9saXN0aW5ncz9wYWdlPTEmc29ydD1wb3B1bGFyIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1774057907);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Demo User','demo@example.com',NULL,NULL,NULL,0,'2026-02-28 19:29:02','$2y$12$E9Yq9xrkjX6L7en/iovmBeNDUWA9wOK03d/hprN/R2MjdxBtWFBLy','kM0YmGDr7V','2026-02-28 19:29:03','2026-02-28 19:29:03'),(2,'霍杰','consectetur_quas@example.com',NULL,NULL,NULL,0,'2026-02-28 19:29:03','$2y$12$E9Yq9xrkjX6L7en/iovmBeNDUWA9wOK03d/hprN/R2MjdxBtWFBLy','drWFft6p6k','2026-02-28 19:29:03','2026-02-28 19:29:03'),(3,'巫晨','autem.fugiat@example.net',NULL,NULL,NULL,0,'2026-02-28 19:29:03','$2y$12$E9Yq9xrkjX6L7en/iovmBeNDUWA9wOK03d/hprN/R2MjdxBtWFBLy','99TNHEsYpD','2026-02-28 19:29:03','2026-02-28 19:29:03'),(4,'仇雪梅','quia.illo@example.org',NULL,NULL,NULL,0,'2026-02-28 19:29:03','$2y$12$E9Yq9xrkjX6L7en/iovmBeNDUWA9wOK03d/hprN/R2MjdxBtWFBLy','aQni4c09kc','2026-02-28 19:29:03','2026-02-28 19:29:03'),(5,'柯鹰','quia31@example.net',NULL,NULL,NULL,0,'2026-02-28 19:29:03','$2y$12$E9Yq9xrkjX6L7en/iovmBeNDUWA9wOK03d/hprN/R2MjdxBtWFBLy','0P5Oxt54ez','2026-02-28 19:29:03','2026-02-28 19:29:03'),(6,'马明','illo73@example.org',NULL,NULL,NULL,0,'2026-02-28 19:29:03','$2y$12$E9Yq9xrkjX6L7en/iovmBeNDUWA9wOK03d/hprN/R2MjdxBtWFBLy','SGXr1efiro','2026-02-28 19:29:03','2026-02-28 19:29:03'),(7,'Jason','gideon.opc@outlook.com',NULL,NULL,NULL,1,NULL,'$2y$12$hW.uTphVTm6GKEnSeCSfH.dEphJC4cQmlYgIRrOFZr767Y3.W.Oce',NULL,'2026-03-14 00:19:42','2026-03-14 00:20:14'),(8,'AK','2360997760@qq.com',NULL,NULL,NULL,1,NULL,'$2y$12$VNf7pt5a1QmrcebsJWd.UODW/vzaia.fsasim2jvh/FB8XhN2..nG',NULL,'2026-03-14 03:07:59','2026-03-14 03:08:58'),(9,'niy','yinhongdl@gmail.com',NULL,NULL,NULL,0,NULL,'$2y$12$jS8WAiJl11ZImngnAePtKeZ5pXFFSyFleFn0grTcg0D88r00LYLUW',NULL,'2026-03-15 04:54:47','2026-03-15 04:54:47');
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

-- Dump completed on 2026-03-22  6:05:13
