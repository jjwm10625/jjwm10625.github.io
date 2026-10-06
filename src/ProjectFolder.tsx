import { useId, useState } from "react";
import { ProjectDetails } from "./ProjectDetails";

type Project = { title: string; type: string; description: string; icon?: string };

export function ProjectFolder({ project, index }: { project: Project; index: number }) {
  const mask = useId().replaceAll(":", "");
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  return (
    <article className={`project-card folder-card folder-${index % 2} ${open ? "folder-open" : ""}`} style={{ animationDelay: `${index * 100}ms` }}>
      <svg width="0" height="0" aria-hidden="true" className="folder-mask-defs">
        <defs>
          <clipPath id={mask} clipPathUnits="objectBoundingBox">
            <path d="M0,.04 Q0,0 .035,0 H.22 Q.245,0 .26,.03 L.29,.075 Q.3,.09 .325,.09 H.965 Q1,.09 1,.13 V.97 Q1,1 .965,1 H.035 Q0,1 0,.965 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="folder-back" style={{ clipPath: `url(#${mask})` }} aria-hidden="true" />
      <div className={`folder-artwork ${project.icon ? "folder-app-artwork" : ""}`} aria-hidden="true">
        {project.icon ? (
          <div className="project-app-icon">
            <img src={project.icon} alt="" />
            <span className="app-glass-reflection" />
          </div>
        ) : index % 2 === 0 ? (
          <svg viewBox="0 0 180 300" fill="none">
            <defs><linearGradient id={`${mask}-silver`} x1="0" y1="0" x2="180" y2="300" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset=".45" stopColor="#e6e6e9" /><stop offset="1" stopColor="#9b9ba3" /></linearGradient></defs>
            <rect x="20" y="10" width="140" height="278" rx="24" fill={`url(#${mask}-silver)`} stroke="#909098" strokeWidth="2" />
            <rect x="29" y="44" width="122" height="205" rx="2" fill="#fafafa" stroke="#b9b9c0" />
            <path d="M76 27h28" stroke="#8d8d96" strokeWidth="4" strokeLinecap="round" />
            <circle cx="90" cy="268" r="10" stroke="#8d8d96" strokeWidth="2" />
            <path d="m70 117-18 19 18 19m40-38 18 19-18 19m-13-48-14 59" stroke="#1d1d1f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="49" y="194" width="82" height="4" rx="2" fill="#d2d2d7" /><rect x="65" y="205" width="50" height="4" rx="2" fill="#e3e3e7" />
          </svg>
        ) : (
          <svg viewBox="0 0 250 250" fill="none">
            <rect x="41" y="20" width="178" height="178" rx="20" transform="rotate(10 41 20)" fill="#bcbcc5" stroke="#e3e3e8" />
            <rect x="27" y="34" width="178" height="178" rx="20" transform="rotate(-8 27 34)" fill="#dddde3" stroke="#fff" />
            <rect x="35" y="40" width="180" height="180" rx="22" fill="#fafafa" stroke="#b8b8c1" />
            <path d="M35 80h180" stroke="#d2d2d7" /><circle cx="52" cy="60" r="3" fill="#bcbcc3" /><circle cx="64" cy="60" r="3" fill="#bcbcc3" /><circle cx="76" cy="60" r="3" fill="#bcbcc3" />
            <path d="m106 113-22 24 22 24m38-48 22 24-22 24m-14-54-12 61" stroke="#1d1d1f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M78 187h94" stroke="#d2d2d7" strokeWidth="4" strokeLinecap="round" />
          </svg>
        )}
      </div>
      {project.icon ? (
        <button type="button" className="folder-face folder-launch" aria-label={`${project.title} 프로젝트 소개 열기`} aria-haspopup="dialog" onClick={() => setDetailsOpen(true)} />
      ) : <div className="folder-face" aria-hidden="true" />}
      <div className="folder-content">
        <div className="folder-topline">
          <span className="folder-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <button className="folder-toggle" type="button" aria-label={`${project.title} 미리보기 ${open ? "닫기" : "열기"}`} aria-expanded={open} aria-controls={`${mask}-caption`} onClick={() => setOpen(!open)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 15 15 5M5 5h10v10" stroke="currentColor" strokeWidth="1.5" /></svg>
          </button>
        </div>
        <div className="folder-caption" id={`${mask}-caption`}>
          <p className="folder-category">{project.type} {!project.icon && <span>· 준비 중</span>}</p>
          <h3>{project.icon ? <button type="button" className="project-title-button" aria-haspopup="dialog" onClick={() => setDetailsOpen(true)}>{project.title} <span aria-hidden="true">↗</span></button> : project.title}</h3>
          <p className="folder-description">{project.description}</p>
        </div>
      </div>
      {project.icon && <ProjectDetails open={detailsOpen} onClose={() => setDetailsOpen(false)} />}
    </article>
  );
}
