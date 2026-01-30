import { useState } from "react";
import * as S from "./Hilingual.styles";
import { theme } from "../../styles/theme";

const HilingualHero = () => {
  const [hover, setHover] = useState(false);

  return (
    <section style={S.section}>
      <div style={S.content}>
        <h1 style={S.title}>하이링구얼 Hilingual</h1>

        {/* GitHub Link */}
        <a
          href="https://github.com/Hi-lingual/Hilingual-iOS"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "8px",
            marginBottom: "16px",
            padding: "6px 12px",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: 500,
            color: theme.colors.primary,
            textDecoration: "none",
            border: `1px solid ${theme.colors.borderStrong}`,
            backgroundColor: hover ? theme.colors.glassHover : "transparent",
            boxShadow: hover ? theme.glow : "none",
            transform: hover ? "translateY(-1px)" : "none",
            transition: "all 0.22s ease",
          }}
        >
          {/* GitHub Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ opacity: 0.9 }}
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.385.6.113.793-.258.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.527.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.649.243 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.371.823 1.102.823 2.222v3.293c0 .321.192.694.801.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub Repository
        </a>

        <p style={S.text}>
          영어 일기 작성을 통해 꾸준한 영어 루틴 형성을 돕는 iOS
          애플리케이션입니다.
          <br />
          매일 제공되는 주제를 바탕으로 영어로 일기를 쓰고, 기록을 관리하며 작문
          습관을 만들어갈 수 있습니다.
        </p>
      </div>
    </section>
  );
};

export default HilingualHero;
