'use client';

import { ClawNav, ClawFooter, clawStyles } from "@/components/claw-layout";

export default function PrivacyPage() {
  return (
    <>
      <style>{clawStyles + `
        .privacy-content h2 {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #2A1F19;
          margin: 36px 0 10px;
          letter-spacing: -0.01em;
        }
        .privacy-content p {
          font-size: 15px;
          color: #6B5549;
          line-height: 1.75;
          margin: 0 0 14px;
        }
        .privacy-content ul {
          margin: 0 0 14px;
          padding-left: 20px;
        }
        .privacy-content ul li {
          font-size: 15px;
          color: #6B5549;
          line-height: 1.75;
          margin-bottom: 6px;
        }
        .privacy-content strong { color: #2A1F19; font-weight: 600; }
      `}</style>
      <div className="claw-page">
        <ClawNav />

        <main>
          {/* Hero */}
          <section style={{ padding: '72px 24px 56px', maxWidth: 1200, margin: '0 auto' }}>
            <div className="claw-label">法律文件</div>
            <h1 className="claw-h1">隐私政策</h1>
            <p className="claw-lead" style={{ marginBottom: 0 }}>
              本隐私政策说明 <strong>HONGKONG MACRODATA TECHNOLOGY LIMITED</strong>（以下简称"我们"）如何通过 Claw Mart 平台收集、使用、存储和保护您的个人信息。
            </p>
            <p style={{ fontSize: 13, color: '#9e8074', marginTop: 16 }}>最后更新：2026年2月21日</p>
          </section>

          <hr className="claw-divider" />

          <section style={{ padding: '48px 24px 96px', maxWidth: 1200, margin: '0 auto' }}>
          <div className="privacy-content">

            <h2>1. 我们收集的信息</h2>
            <p><strong>您主动提供的信息：</strong></p>
            <ul>
              <li>注册账户时提供的姓名、电子邮件地址；</li>
              <li>个人资料中填写的昵称、头像链接、个人网站、简介；</li>
              <li>购买或销售商品时产生的交易信息；</li>
              <li>通过邮件与我们联系时提供的内容。</li>
            </ul>
            <p><strong>自动收集的信息：</strong></p>
            <ul>
              <li>访问日志，包括 IP 地址、浏览器类型、操作系统、访问时间及页面路径；</li>
              <li>设备信息，包括设备类型及屏幕分辨率；</li>
              <li>Cookie 及类似技术收集的会话数据（详见第 7 条）。</li>
            </ul>
            <p><strong>第三方支付信息：</strong></p>
            <p>
              支付由 Stripe 处理。我们不存储您的银行卡号、支付宝账号或微信支付账号等完整支付凭证。我们仅保留支付状态、金额及交易 ID 等必要记录。
            </p>

            <h2>2. 我们如何使用您的信息</h2>
            <p>我们将收集的信息用于以下目的：</p>
            <ul>
              <li>创建和管理您的账户；</li>
              <li>处理购买及向卖家结算；</li>
              <li>向您发送与订单、账户相关的通知；</li>
              <li>响应您的支持请求；</li>
              <li>维护平台安全，检测和防止欺诈或滥用行为；</li>
              <li>分析平台使用情况以改善产品体验；</li>
              <li>遵守适用的法律法规。</li>
            </ul>
            <p>我们不会将您的个人信息用于发送与平台无关的商业推广（除非您明确同意）。</p>

            <h2>3. 信息共享与披露</h2>
            <p>我们不会出售您的个人信息。仅在以下情形下，我们可能与第三方共享您的信息：</p>
            <ul>
              <li><strong>支付处理商（Stripe）：</strong>用于完成支付及退款处理；</li>
              <li><strong>云服务提供商：</strong>用于托管平台数据库及文件存储；</li>
              <li><strong>卖家：</strong>当您购买商品时，卖家可能获知交易已完成，但不会获得您的完整个人信息；</li>
              <li><strong>法律要求：</strong>当法律、法规或政府机构要求时，我们可能依法披露相关信息；</li>
              <li><strong>业务转让：</strong>如发生合并、收购或资产出售，用户信息可能作为资产转移，届时我们将提前告知。</li>
            </ul>

            <h2>4. 数据存储与安全</h2>
            <p>
              您的数据存储在安全的云服务器上。我们采取合理的技术和管理措施保护您的个人信息，包括数据传输加密（HTTPS/TLS）、访问权限控制及定期安全审查。
            </p>
            <p>
              尽管我们努力保护您的数据，但任何通过互联网传输或电子存储的数据都无法保证 100% 安全。如发生数据安全事件，我们将按照适用法律的要求及时通知受影响的用户。
            </p>

            <h2>5. 数据保留</h2>
            <p>
              我们将在您的账户存续期间保留您的个人信息。账户注销后，我们将在合理期限内删除您的个人数据，但以下情形除外：
            </p>
            <ul>
              <li>法律、税务或监管要求需要保留特定记录；</li>
              <li>用于解决未结纠纷或执行现有协议。</li>
            </ul>

            <h2>6. 您的权利</h2>
            <p>根据适用法律，您可能享有以下权利：</p>
            <ul>
              <li><strong>访问权：</strong>请求获取我们持有的您的个人信息；</li>
              <li><strong>更正权：</strong>请求更正不准确或不完整的信息；</li>
              <li><strong>删除权：</strong>请求删除您的个人数据（法律另有规定的除外）；</li>
              <li><strong>可携带权：</strong>请求以结构化、通用格式获取您的数据；</li>
              <li><strong>反对权：</strong>反对某些数据处理活动。</li>
            </ul>
            <p>
              如需行使上述权利，请发送邮件至 <strong>xiaomi@xingke888.com</strong>，我们将在合理期限内（通常为 30 天内）予以回复。
            </p>

            <h2>7. Cookie 政策</h2>
            <p>本平台使用以下类型的 Cookie：</p>
            <ul>
              <li><strong>必要 Cookie：</strong>用于维持登录状态和基本功能，无法关闭；</li>
              <li><strong>分析 Cookie：</strong>用于了解用户如何使用平台，帮助我们改善体验（如访问量统计）；</li>
              <li><strong>功能 Cookie：</strong>用于记住您的偏好设置（如语言、排序方式）。</li>
            </ul>
            <p>您可以通过浏览器设置管理或禁用 Cookie，但这可能影响部分功能的正常使用。</p>

            <h2>8. 未成年人</h2>
            <p>
              本平台不面向 18 岁以下的未成年人。我们不会故意收集未成年人的个人信息。如果我们得知已收集了未成年人的信息，将立即予以删除。
            </p>

            <h2>9. 第三方链接</h2>
            <p>
              本平台可能包含指向第三方网站的链接。我们对这些第三方网站的隐私实践不负责任，建议您在访问前阅读其隐私政策。
            </p>

            <h2>10. 政策变更</h2>
            <p>
              我们可能不时更新本隐私政策。重大变更将通过平台公告或电子邮件告知注册用户。继续使用本平台即表示您接受更新后的政策。我们建议您定期查阅本页面。
            </p>

            <h2>11. 联系我们</h2>
            <p>
              如对本隐私政策有任何疑问或请求，请通过以下方式联系我们：
            </p>
            <p>
              <strong>公司名称：</strong>HONGKONG MACRODATA TECHNOLOGY LIMITED<br />
              <strong>电子邮件：</strong><a href="mailto:xiaomi@xingke888.com" style={{ color: '#E65C46', fontWeight: 600, textDecoration: 'none' }}>xiaomi@xingke888.com</a>
            </p>

          </div>
          </section>
        </main>

        <ClawFooter />
      </div>
    </>
  );
}
