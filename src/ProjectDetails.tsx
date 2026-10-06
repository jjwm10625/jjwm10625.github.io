import { useEffect, useRef } from "react";
import { hilingualCaseStudy } from "./hilingualCaseStudy";

const links = [
  { label: "Website", href: "https://hilingual.framer.website/" },
  { label: "App Store", href: "https://apps.apple.com/nz/app/%ED%95%98%EC%9D%B4%EB%A7%81%EA%B5%AC%EC%96%BC-%EC%98%81%EC%96%B4-%EC%9D%BC%EA%B8%B0-ai-%ED%94%BC%EB%93%9C%EB%B0%B1/id6752608763" },
  { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.hilingual&hl=ko" },
  { label: "GitHub", href: "https://github.com/Hi-lingual/Hilingual-iOS" },
];
const features = [
  ["01", "영어 일기", "추천 주제로 가볍게 시작하고, 일상의 생각을 영어로 기록합니다."],
  ["02", "AI 피드백", "작성한 일기의 피드백을 확인하며 표현을 다듬고 영어를 익힙니다."],
  ["03", "기록과 복습", "달력에서 일기를 모아 보고, 추천받은 표현을 단어장에 저장합니다."],
];

export function ProjectDetails({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open) return;
    const previous = document.body.style.overflow;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      dialog.close();
    };
  }, [open]);
  return (
    <dialog ref={ref} className="project-details" aria-labelledby="project-details-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
      }}>
      <header className="project-window-bar">
        <div className="window-controls">
          <button type="button" className="project-window-close" aria-label="프로젝트 소개 닫기" onClick={onClose} autoFocus><span aria-hidden="true">×</span></button>
          <i aria-hidden="true" /><i aria-hidden="true" />
        </div>
        <span>Hilingual</span>
      </header>
      <div className="project-details-body">
        <div className="project-details-heading">
          <div className="project-heading-copy">
          <p className="project-details-eyebrow">01 / iOS APPLICATION</p>
          <h2 id="project-details-title">하이링구얼</h2>
          <p className="project-details-subtitle">영어 일기, 기록, AI 피드백</p>
          </div>
        </div>
        <img className="project-details-cover" src="/hilingual-intro.png" alt="하이링구얼 서비스 소개 메인 이미지" width="2000" />
        <section className="project-overview" aria-labelledby="project-overview-title">
          <h3 id="project-overview-title">Overview</h3>
          <div className="project-overview-copy">
          <p>하루를 영어로 기록하고 AI 피드백을 통해 표현을 익히는 영어 일기 서비스입니다. 일기 작성부터 기록 확인, 표현 복습까지 일상 속 영어 습관을 돕습니다.</p>
          </div>
        </section>
        <div className="project-participation">
          <span>iOS Development</span>
          <p className="project-contribution-line">{hilingualCaseStudy.contribution}</p>
        </div>
        <div className="project-features">
          {features.map(([number, title, description]) => (
            <section key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></section>
          ))}
        </div>
        <section className="project-architecture" aria-labelledby="project-architecture-title">
          <div className="case-section-heading"><span>01 / ARCHITECTURE</span><h3 id="project-architecture-title">역할을 나눈 모듈 구조</h3></div>
          <p className="case-section-description">SPM으로 화면·도메인·데이터·네트워크를 분리했습니다. Domain은 외부 패키지 의존성 없이 구성하고, AppDIContainer에서 구현체를 조립해 화면에 주입합니다.</p>
          <ol className="architecture-modules">{hilingualCaseStudy.architecture.map((item) => <li key={item.name}><h4>{item.name}</h4><p>{item.description}</p></li>)}</ol>
        </section>
        <section className="project-tech" aria-labelledby="project-tech-title">
          <h3 id="project-tech-title">iOS Stack</h3>
          <p>Swift · UIKit · SnapKit · Combine · Moya · SPM</p>
          <p>SwiftUI · WidgetKit · App Groups</p>
        </section>
        <nav className="project-resource-links" aria-label="하이링구얼 관련 링크">
          {links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<span aria-hidden="true">↗</span></a>)}
        </nav>
      </div>
    </dialog>
  );
}
