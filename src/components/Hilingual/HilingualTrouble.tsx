import { motion } from "framer-motion";
import * as S from "./Hilingual.styles";
import { theme } from "../../styles/theme";

const HilingualTrouble = () => {
  return (
    <section style={S.section}>
      <div style={S.content}>
        <h2 style={S.title}>Trouble Shooting</h2>

        <p
          style={{
            ...S.text,
            marginBottom: "12px",
          }}
        >
          개발 과정에서 겪은 문제와 해결 과정을 Notion에 정리했습니다.
        </p>

        <motion.a
          href="https://hilingual.notion.site/Trouble-Shooting-230829677ebf81028a15c2970ecba082"
          target="_blank"
          rel="noreferrer"
          initial="rest"
          whileHover="hover"
          style={{
            display: "inline-block",
            color: theme.colors.primary,
            fontSize: "14px",
            fontWeight: 500,
            textDecoration: "none",
            position: "relative",
            cursor: "pointer",
          }}
        >
          <span>→ 문제 해결 과정 보러가기</span>

          {/* underline */}
          <motion.span
            variants={{
              rest: { width: 0 },
              hover: { width: "100%" },
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: 0,
              bottom: "-4px",
              height: "1px",
              backgroundColor: theme.colors.primary,
            }}
          />
        </motion.a>
      </div>
    </section>
  );
};

export default HilingualTrouble;
