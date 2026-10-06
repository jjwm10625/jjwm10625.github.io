import { content } from "./content";

function BubbleTail() {
  return (
    <svg className="bubble-tail" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M20 0C20 10 14 18 0 20C9 20 16 18 20 13Z" />
    </svg>
  );
}

function Typing({ className }: { className: string }) {
  return (
    <div className={`message-typing ${className}`} aria-hidden="true">
      <i /><i /><i />
    </div>
  );
}

export function IntroMessages({ layout = "hero" }: { layout?: "hero" | "profile" }) {
  const profile = layout === "profile";
  return (
    <aside className={`intro-messages ${profile ? "profile-intro-messages" : ""}`} aria-label="문자로 보는 자기소개">
      <div className="message-thread message-thread-left">
        <Typing className="typing-question" />
        <p className="intro-bubble incoming message-question">{profile ? "간단히 소개해 주세요." : "어떤 개발자인가요?"}<BubbleTail /></p>
      </div>
      <div className="message-thread message-thread-right">
        <Typing className="typing-reply" />
        {profile ? content.profile.paragraphs.map((paragraph, i) => (
          <p key={paragraph} className="intro-bubble outgoing" style={{ animationDelay: `${1.5 + i * 0.6}s` }}>
            {paragraph}<BubbleTail />
          </p>
        )) : (
          <>
            <p className="intro-bubble outgoing message-reply">안녕하세요.<br />iOS 개발자 영서입니다.<BubbleTail /></p>
            <p className="intro-bubble outgoing message-detail">사용자 경험을 고민하며<br />앱을 만들어요.<BubbleTail /></p>
          </>
        )}
        <span className="message-delivered" aria-hidden="true">Delivered</span>
      </div>
    </aside>
  );
}
