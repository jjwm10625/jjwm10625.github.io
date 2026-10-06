import { useEffect, useRef } from "react";
import { content } from "./content";
import { IntroMessages } from "./IntroMessages";
export function ProfilePanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
      const overflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = overflow;
        if (dialog.open) dialog.close();
      };
    } else if (dialog.open) dialog.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      id="profile-panel"
      className="profile-panel"
      aria-labelledby="profile-title"
      onKeyDown={(e) => {
        if (e.key !== "Tab") return;
        const nodes = e.currentTarget.querySelectorAll<HTMLElement>(
          'button:not([disabled]),a[href],[tabindex="0"]',
        );
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (!first) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClose={onClose}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        const r = e.currentTarget.getBoundingClientRect();
        if (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        )
          onClose();
      }}
    >
      <header>
        <p className="profile-eyebrow">About me</p>
        <button
          className="profile-close"
          aria-label="소개 패널 닫기"
          onClick={onClose}
          autoFocus
        >
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="m4 4 12 12M16 4 4 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </svg>
        </button>
      </header>
      <div className="profile-intro">
        <h2 id="profile-title">{content.name}</h2>
        <p className="profile-role">{content.role}</p>
        <p className="profile-headline">{content.profile.headline}</p>
        {open && <IntroMessages layout="profile" />}
      </div>
      <div className="profile-photo-slot">
        {content.profile.photo ? (
          <img className="profile-photo" src={content.profile.photo} alt="영서의 프로필" />
        ) : (
          <div className="profile-photo-placeholder" role="img" aria-label="프로필 사진 자리">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle cx="16" cy="11" r="5" stroke="currentColor" strokeWidth="1" />
              <path d="M6 28v-3a10 10 0 0 1 20 0v3" stroke="currentColor" strokeWidth="1" />
            </svg>
            <span>PROFILE PHOTO</span>
          </div>
        )}
      </div>
      <section className="profile-details" aria-label="프로필 정보">
        <dl>
          {content.profile.details.filter((item) => item.label !== "이름").map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      {content.profile.experience.length > 0 && (
        <section className="profile-experience" aria-labelledby="profile-experience-title">
          <h3 id="profile-experience-title">Experience</h3>
          <ol>
            {content.profile.experience.map((item) => (
              <li key={`${item.period}-${item.organization}`}>
                <span>{item.period}</span>
                <strong>{item.organization}</strong>
                <span>{item.role}</span>
              </li>
            ))}
          </ol>
        </section>
      )}
      <footer className="profile-links">
        <a className="profile-projects" href="#work" onClick={onClose}>
          프로젝트 보기 <span aria-hidden="true">↗</span>
        </a>
        {content.contact ? (
          <a href={`mailto:${content.contact}`}>Email ↗</a>
        ) : null}
      </footer>
    </dialog>
  );
}
