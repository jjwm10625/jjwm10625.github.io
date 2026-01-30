import { motion } from "framer-motion";
import * as S from "./Hilingual.styles";
import { theme } from "../../styles/theme";

const techStack = [
  { tech: "UIKit", desc: "복잡한 커스텀 UI와 캘린더 구현에 적합" },
  {
    tech: "MVVM + Clean Architecture",
    desc: "계층 분리로 유지보수성과 테스트 용이성 확보",
  },
  { tech: "Moya", desc: "네트워크 추상화 및 요청 관리" },
  { tech: "Combine", desc: "선언적 데이터 흐름 처리" },
  { tech: "VisionKit", desc: "iOS 기본 OCR 기능 활용" },
  { tech: "Lottie", desc: "경량 애니메이션으로 UX 개선" },
  { tech: "Kingfisher", desc: "이미지 캐싱 및 성능 최적화" },
  { tech: "SPM", desc: "멀티모듈 구성 및 의존성 관리" },
];

const HilingualTechStack = () => {
  return (
    <section style={S.section}>
      <div style={S.content}>
        <h2 style={S.title}>Tech Stack</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginTop: "32px",
          }}
        >
          {techStack.map(({ tech, desc }) => (
            <motion.div
              key={tech}
              whileHover={{
                y: -6,
                boxShadow: `0 20px 50px rgba(0,0,0,0.6),
                            0 0 24px ${theme.colors.glowWeak}`,
                borderColor: theme.colors.borderStrong,
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{
                padding: "22px",
                borderRadius: "18px",
                background: theme.colors.glass,
                backdropFilter: "blur(14px)",
                border: `1px solid ${theme.colors.borderWeak}`,
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "8px",
                  color: theme.colors.primary,
                }}
              >
                {tech}
              </div>

              <div
                style={{
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: theme.colors.textSecondary,
                }}
              >
                {desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HilingualTechStack;
