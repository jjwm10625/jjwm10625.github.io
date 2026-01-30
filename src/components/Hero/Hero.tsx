import { motion } from "framer-motion";
import * as S from "./Hero.styles";

const Hero = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section style={S.wrapper}>
      <motion.div
        style={S.content}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 style={S.name}>Youngseo Cho</h1>
        <h2 style={S.role}>iOS Developer</h2>
        <p style={S.intro}>Zero에서 시작해, 결과까지 완성합니다 </p>

        <div style={S.buttonGroup}>
          {/* 프로젝트 보기 */}
          <button style={S.primaryButton} onClick={() => scrollTo("projects")}>
            프로젝트 보기
          </button>

          {/* 연락하기 */}
          <button style={S.secondaryButton} onClick={() => scrollTo("contact")}>
            연락하기
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
