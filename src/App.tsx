import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useState,
  useRef,
  type ReactNode,
} from "react";
import { content } from "./content";
import { ProjectFolder } from "./ProjectFolder";
import "./App.css";
import { loadPortfolioFont } from "./portfolioFont";
import { ProfilePanel } from "./ProfilePanel";
import { lockScreenUrl } from "./lockScreen";
const PhoneScene = lazy(() => import("./PhoneScene"));

function StaticPhone() {
  return (
    <div
      className="static-phone-scene"
      aria-label="iPhone SE와 EarPods 정적 대체 화면"
    >
      <div className="static-iphone">
        <div className="static-earpiece" />
        <img
          className="static-screen static-lock-screen"
          src={lockScreenUrl()}
          alt="잠금화면, 메시지 알림: Hello World!"
        />
        <div className="static-home" />
        <div className="static-jack" />
      </div>
      <svg className="static-earpods" viewBox="0 0 600 600" aria-hidden="true">
        <path d="M238 428 C170 550 285 580 327 458 M327 458 C250 410 95 465 115 270 M327 458 C445 510 485 340 470 300" />
        <g transform="translate(110 240)">
          <ellipse rx="13" ry="19" />
          <rect x="-4" y="10" width="8" height="39" rx="4" />
          <ellipse className="ear-vent" cx="6" cy="-2" rx="4" ry="10" />
        </g>
        <g transform="translate(470 272)">
          <ellipse rx="13" ry="19" />
          <rect x="-4" y="10" width="8" height="39" rx="4" />
          <ellipse className="ear-vent" cx="6" cy="-2" rx="4" ry="10" />
        </g>
      </svg>
    </div>
  );
}
class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}
export default function App() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const [webgl] = useState(supportsWebGL);
  const [dragging, setDragging] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.nameFont = "fallback";
    loadPortfolioFont().catch(() => {
      document.documentElement.dataset.nameFont = "fallback";
    });
  }, []);
  useEffect(() => {
    if (!projectsRef.current || !('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12 });
    projectsRef.current.querySelectorAll('article').forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);
  const fallback = <StaticPhone />;
  return (
    <main tabIndex={-1}>
      <ProfilePanel open={profileOpen} onClose={() => setProfileOpen(false)} />
      <a className="skip" href="#work">
        프로젝트로 바로가기
      </a>
      <section className="hero" aria-label="소개">
        <header className="topline">
          <button
            className="about-trigger"
            aria-controls="profile-panel"
            aria-expanded={profileOpen}
            aria-haspopup="dialog"
            onClick={() => setProfileOpen(true)}
          >
            About me <span aria-hidden="true">↗</span>
          </button>
        </header>
        <h1>{content.name}</h1>
        <div
          className={`phone-stage ${dragging ? "dragging" : ""}`}
          aria-label="드래그할 수 있는 3D 아이폰"
        >
          <SceneBoundary fallback={fallback}>
            {webgl ? (
              <Suspense fallback={fallback}>
                <PhoneScene onDrag={setDragging} />
              </Suspense>
            ) : (
              fallback
            )}
          </SceneBoundary>
        </div>
      </section>
      <section id="work" className="work">
        <div className="section-label">
          <span>01 / SELECTED WORK</span>
        </div>
        <div className="work-heading">
          <h2>Projects</h2>
        </div>
        <div className="projects" ref={projectsRef}>
          {content.projects.map((project, i) => (
            <ProjectFolder key={project.title} project={project} index={i} />
          ))}
        </div>
      </section>
      <footer className="footer">
        <span className="section-label">02 / GET IN TOUCH</span>
        <div className="work-heading">
          <h2>Contact</h2>
        </div>
        <div className="contact-window">
          <div className="contact-window-bar">
            <div className="window-controls" aria-hidden="true"><i /><i /><i /></div>
          </div>
          <div className="contact-window-body">
        {content.contact ? (
          <div className="contact-line">
            <span>Email</span>
            <a href={`mailto:${content.contact}`}>{content.contact} <span aria-hidden="true">↗</span></a>
          </div>
        ) : (
          <div className="contact-preview">
            {content.contactPreview.map((item) => (
              <div className="contact-line" key={item.label}>
                <span>{item.label}</span>
                {item.href ? (
                  <a className="contact-value" href={item.href} target="_blank" rel="noopener noreferrer">{item.value} <span aria-hidden="true">↗</span></a>
                ) : (
                  <p className="contact-value">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        )}
          </div>
        </div>
        <div className="footer-bottom">
          <a href="#">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}
