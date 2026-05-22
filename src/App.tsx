import {
  ArrowDownToLine,
  CheckCircle2,
  ChevronRight,
  GitBranch,
  LockKeyhole,
  MonitorCheck,
  Shield,
  Sparkles,
} from 'lucide-react';
import {
  downloadOptions,
  featureBlocks,
  navItems,
  posterAssets,
  roadmap,
  trustPoints,
} from './content';

const releaseUrl = 'https://github.com/veil-browser/veil-browser/releases';
const repoUrl = 'https://github.com/veil-browser/veil-browser';

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Veil 官网首页">
        <img src="/brand/veil-mark.svg" alt="" />
        <span>Veil</span>
      </a>
      <nav className="desktop-nav" aria-label="主导航">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="header-action" href={releaseUrl} target="_blank" rel="noreferrer">
        <ArrowDownToLine size={18} />
        下载
      </a>
    </header>
  );
}

function HeroMockup() {
  return (
    <div className="hero-mockup" aria-label="Veil 桌面应用界面示意图">
      <div className="window-bar">
        <span />
        <span />
        <span />
      </div>
      <div className="mockup-body">
        <aside className="mockup-sidebar">
          <img src="/brand/veil-mark.svg" alt="" />
          <div className="side-line active" />
          <div className="side-line" />
          <div className="side-line short" />
          <div className="side-gap" />
          <div className="side-line" />
          <div className="side-line short" />
        </aside>
        <section className="mockup-main">
          <div className="mockup-toolbar">
            <div>
              <p>Profiles</p>
              <strong>隔离身份工作台</strong>
            </div>
            <button type="button">新建 Profile</button>
          </div>
          <div className="profile-grid">
            {['Vault', 'Proxy', 'Canvas', 'CDP'].map((item, index) => (
              <div className="profile-card" key={item}>
                <div className="profile-card-top">
                  <span className={`status-dot status-${index}`} />
                  <span>{item}</span>
                </div>
                <strong>{['已加密', '健康', '一致', '可连接'][index]}</strong>
                <p>{['本地密钥', '泄漏防护', '稳定种子', '自动化端点'][index]}</p>
              </div>
            ))}
          </div>
          <div className="network-panel">
            <div>
              <p>Network audit</p>
              <strong>所有出站连接可追踪</strong>
            </div>
            <div className="pulse-track">
              <span />
              <span />
              <span />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <img className="hero-lockup" src="/brand/veil-lockup-horizontal.svg" alt="Veil" />
        <h1>开源、自托管、零知识加密的指纹浏览器</h1>
        <p>
          Veil 为高价值多账号、Web3、电商运营和自动化团队提供可审计的隔离身份工作台。
          数据在本机加密，网络行为可见，指纹画像由受控 Profile 生成。
        </p>
        <div className="hero-actions">
          <a className="primary-action" href={releaseUrl} target="_blank" rel="noreferrer">
            <ArrowDownToLine size={20} />
            下载 v0.1 RC
          </a>
          <a className="secondary-action" href={repoUrl} target="_blank" rel="noreferrer">
            <GitBranch size={20} />
            查看源码
          </a>
        </div>
        <div className="hero-proof">
          <span>
            <Shield size={17} /> AGPL-3.0
          </span>
          <span>
            <LockKeyhole size={17} /> SQLCipher
          </span>
          <span>
            <MonitorCheck size={17} /> macOS / Windows / Linux
          </span>
        </div>
      </div>
      <HeroMockup />
    </section>
  );
}

function FeatureSection() {
  return (
    <section className="section features" id="features">
      <div className="section-heading">
        <p>为什么选择 Veil</p>
        <h2>把“相信平台”换成“验证系统”</h2>
      </div>
      <div className="feature-grid">
        {featureBlocks.map((feature) => {
          const Icon = feature.icon;
          return (
            <article className="feature-card" key={feature.title}>
              <Icon size={24} />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function SecuritySection() {
  return (
    <section className="security-band" id="security">
      <div className="security-copy">
        <p>Security model</p>
        <h2>服务端即使被攻破，也不应该看见你的明文数据。</h2>
        <p>
          Veil 的设计从主密码、恢复短语、数据库加密、审计日志到同步架构都围绕一个约束：
          用户持有密钥，系统只处理必要的密文和本地运行状态。
        </p>
      </div>
      <div className="trust-list">
        {trustPoints.map((item) => (
          <div className="trust-row" key={item}>
            <CheckCircle2 size={19} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="section gallery" id="gallery">
      <div className="section-heading">
        <p>Posters & examples</p>
        <h2>为官网生成的海报和产品示例图</h2>
      </div>
      <div className="poster-grid">
        {posterAssets.map((poster) => (
          <figure className="poster-frame" key={poster.src}>
            <img src={poster.src} alt={poster.alt} />
          </figure>
        ))}
      </div>
    </section>
  );
}

function DownloadSection() {
  return (
    <section className="download-section" id="download">
      <div className="section-heading">
        <p>Download</p>
        <h2>下载、审计、接入自动化</h2>
      </div>
      <div className="download-grid">
        {downloadOptions.map((option) => {
          const Icon = option.icon;
          return (
            <article className="download-card" key={option.title}>
              <Icon size={25} />
              <h3>{option.title}</h3>
              <p>{option.body}</p>
              <a href={option.href} target="_blank" rel="noreferrer">
                {option.action}
                <ChevronRight size={17} />
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function RoadmapSection() {
  return (
    <section className="section roadmap">
      <div className="section-heading">
        <p>Roadmap</p>
        <h2>从本地安全，到零知识协作</h2>
      </div>
      <div className="roadmap-list">
        {roadmap.map((item) => (
          <article className="roadmap-item" key={item.phase}>
            <div>
              <span>{item.phase}</span>
              <strong>{item.title}</strong>
            </div>
            <p>{item.body}</p>
            <em>{item.status}</em>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <img src="/brand/veil-mark.svg" alt="" />
        <strong>Veil</strong>
      </div>
      <p>开源、自托管、零知识加密的指纹浏览器。</p>
      <a href={repoUrl} target="_blank" rel="noreferrer">
        GitHub
      </a>
    </footer>
  );
}

export function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeatureSection />
        <SecuritySection />
        <GallerySection />
        <DownloadSection />
        <RoadmapSection />
        <section className="closing">
          <Sparkles size={24} />
          <h2>让安全承诺能被看见、被审计、被重新构建。</h2>
          <a href={releaseUrl} target="_blank" rel="noreferrer">
            前往下载
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
