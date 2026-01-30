import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as S from "./Hilingual.styles";
import architectureImage from "../../assets/images/hilingual_project_architecture.png";

const HilingualArchitecture = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section style={S.section}>
        <div style={S.content}>
          <h2 style={S.title}>Architecture</h2>

          <p style={S.text}>
            MVVM + Clean Architecture를 기반으로 Presentation, Domain, Data,
            Network 레이어를 명확히 분리했습니다.
            <br />각 레이어는 단방향 의존성을 유지하며, 테스트와 확장성을 고려해
            설계했습니다.
          </p>

          {/* 아키텍처 다이어그램 */}
          <img
            src={architectureImage}
            alt="Hilingual Architecture"
            onClick={() => setOpen(true)}
            style={{
              ...S.image,
              maxWidth: "100%",
              marginTop: "32px",
              cursor: "zoom-in",
            }}
          />
        </div>
      </section>

      {/* 확대 오버레이 */}
      <AnimatePresence>
        {open && (
          <motion.div
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999,
              background: "rgba(0,0,0,0.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "zoom-out",
            }}
          >
            <motion.img
              src={architectureImage}
              alt="Hilingual Architecture Expanded"
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                objectFit: "contain",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HilingualArchitecture;
