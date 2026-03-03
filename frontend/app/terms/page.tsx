'use client';

import { ClawNav, ClawFooter, clawStyles } from "@/components/claw-layout";

export default function TermsPage() {
  return (
    <>
      <style>{clawStyles + `
        .terms-content h2 {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #2A1F19;
          margin: 36px 0 10px;
          letter-spacing: -0.01em;
        }
        .terms-content p {
          font-size: 15px;
          color: #6B5549;
          line-height: 1.75;
          margin: 0 0 14px;
        }
        .terms-content ul {
          margin: 0 0 14px;
          padding-left: 20px;
        }
        .terms-content ul li {
          font-size: 15px;
          color: #6B5549;
          line-height: 1.75;
          margin-bottom: 6px;
        }
        .terms-content strong { color: #2A1F19; font-weight: 600; }
        .terms-upper { text-transform: uppercase; font-size: 14px; }
      `}</style>
      <div className="claw-page">
        <ClawNav />
        <main>
          {/* Hero */}
          <section style={{ padding: '72px 24px 56px', maxWidth: 1200, margin: '0 auto' }}>
            <div className="claw-label">法律文件</div>
            <h1 className="claw-h1">使用条款</h1>
            <p className="claw-lead" style={{ marginBottom: 0 }}>
              本使用条款规范您对 Claw Mart 平台的使用，该平台由 <strong>HONGKONG MACRODATA TECHNOLOGY LIMITED</strong> 运营。请在使用本平台前仔细阅读本条款。
            </p>
            <p style={{ fontSize: 13, color: '#9e8074', marginTop: 16 }}>最后更新：2026年2月21日</p>
          </section>

          <hr className="claw-divider" />

          <section style={{ padding: '48px 24px 96px', maxWidth: 1200, margin: '0 auto' }}>
          <div className="terms-content">

            <h2>1. 接受条款</h2>
            <p>
              通过访问或使用 Claw Mart，您即表示同意受本使用条款的约束。如您不同意本条款，请勿使用本平台。
            </p>

            <h2>2. 平台介绍</h2>
            <p>
              Claw Mart 是一个将买家与独立创作者连接的交易市场，创作者在此发布 AI 员工角色、技能包及相关数字商品（统称"商品"）。本公司不是任何商品的创作者、著作权人或发布者——我们提供基础设施，创作者提供内容。
            </p>

            <h2>3. 购买与付款</h2>
            <ul>
              <li>所有商品均为以电子形式交付的数字商品。除适用法律另有规定外，所有购买均为最终交易，不予退款。</li>
              <li>购买行为仅授予买家个人使用许可。不得对所购文件进行转发、转售、再授权或公开再发布。</li>
              <li>商品价格由创作者自行设定。本公司代创作者收取付款，并在扣除平台佣金及支付处理费后向创作者结算其应得份额。</li>
            </ul>

            <h2>4. 账户责任</h2>
            <ul>
              <li>您须对自己账户凭证的安全保管负责。</li>
              <li>您须提供真实准确的账户信息。</li>
              <li>涉及滥用、欺诈或违反平台政策的账户可能在不事先通知的情况下被暂停或终止。</li>
              <li>您不得创建多个账户以规避限制或操控平台。</li>
            </ul>

            <h2>5. 第三方内容免责声明</h2>
            <p>
              平台上所有商品（包括 AI 员工角色、技能包等）均由独立第三方创作者创作并发布。本公司不对任何商品进行审核、背书、核实或保证。本公司对以下情形不承担任何责任：
            </p>
            <ul>
              <li>任何商品的准确性、质量、安全性、合法性或功能性；</li>
              <li>因使用任何商品而导致的任何损害、损失或伤害；</li>
              <li>创作者的任何知识产权侵权行为；</li>
              <li>买家与创作者之间的任何互动、协议或纠纷。</li>
            </ul>
            <p>
              如您认为某商品违反了我们的政策或您的权利，请通过 <strong>xiaomi@xingke888.com</strong> 与我们联系。
            </p>

            <h2>6. 禁止行为</h2>
            <p>使用本平台时，您不得：</p>
            <ul>
              <li>上传恶意代码、有害载荷或任何旨在破坏系统或数据的内容；</li>
              <li>在未获授权的情况下冒充真实个人、品牌或组织；</li>
              <li>发布被盗、剽窃或未经授权的内容；</li>
              <li>尝试规避平台安全机制、支付系统或访问控制；</li>
              <li>将平台用于任何违法目的；</li>
              <li>操纵评价、评分或商品提交。</li>
            </ul>

            <h2>7. 免责声明</h2>
            <p className="terms-upper">
              本平台及所有商品均按"现状"及"可用状态"提供，不附带任何形式的明示、默示、法定或其他保证。本公司明确否认所有关于适销性、特定用途适用性、所有权及不侵权的默示保证。本公司不保证平台将不间断运行、无错误或安全，亦不保证任何商品将满足您的期望或要求。
            </p>

            <h2>8. 责任限制</h2>
            <p className="terms-upper">
              在法律允许的最大范围内，HONGKONG MACRODATA TECHNOLOGY LIMITED 及其高管、董事、员工和代理人不对任何间接、附带、特殊、后果性或惩罚性损害，或因使用本平台或任何商品而产生的任何利润、收入、数据或商誉损失承担责任。
            </p>
            <p className="terms-upper">
              本公司就本条款或平台相关的任何索赔所承担的全部累计责任，不超过以下较高者：（a）您在索赔发生前12个月内向我们支付的金额；或（b）人民币700元。
            </p>

            <h2>9. 赔偿</h2>
            <p>
              您同意就以下事项产生的任何索赔、损害、损失、责任及费用（包括合理的律师费），向 HONGKONG MACRODATA TECHNOLOGY LIMITED 及其高管、董事、员工和代理人提供赔偿并使其免受损害：（a）您对本平台的使用；（b）您违反本条款；（c）您创作或发布的任何商品；或（d）您侵犯任何第三方权利。
            </p>

            <h2>10. 账户终止</h2>
            <p>
              本公司可随时以有因或无因的方式，在有或无通知的情况下暂停或终止您的账户。账户终止后，您使用本平台的权利立即终止。第5条至第9条在终止后继续有效。
            </p>

            <h2>11. 适用法律</h2>
            <p>
              本条款受香港特别行政区法律管辖并依其解释，不考虑法律冲突原则。因本条款引起的任何争议应提交香港有管辖权的法院解决。
            </p>

            <h2>12. 条款变更</h2>
            <p>
              本公司可随时更新本条款。重大变更将通过平台通知或电子邮件告知用户。变更后继续使用平台即表示您接受修改后的条款。
            </p>

            <h2>13. 联系我们</h2>
            <p>
              如对本条款有任何疑问，请发送电子邮件至：<strong>xiaomi@xingke888.com</strong>
            </p>
            <p>
              公司名称：<strong>HONGKONG MACRODATA TECHNOLOGY LIMITED</strong>
            </p>
          </div>
          </section>
        </main>
        <ClawFooter />
      </div>
    </>
  );
}
