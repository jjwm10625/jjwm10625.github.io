import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { mainProject } from "./Projects.data";
import * as S from "./Projects.styles";

import hilingualLogo from "../../assets/logos/hilingual.png";
import AppStoreButton from "../../components/common/AppStoreButton";

const Projects = () => {
  const navigate = useNavigate();

  return (
    <section style={S.section}>
      <h2 style={S.title}>Projects</h2>

      <div style={S.cardWrapper}>
        <motion.div
          style={S.card}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div style={S.content}>
            {/* Left : Logo */}
            <div style={S.logoArea}>
              <img src={hilingualLogo} alt="Hilingual Logo" style={S.appLogo} />
            </div>

            {/* Right : Text + CTA (하나의 컨테이너) */}
            <div style={S.textArea}>
              {/* Main Content */}
              <div style={S.mainContent}>
                <div>
                  <h3 style={S.projectTitle}>{mainProject.title}</h3>
                  <div style={S.period}>{mainProject.period}</div>
                </div>

                <p style={S.description}>{mainProject.description}</p>

                <div style={S.featureList}>
                  {mainProject.features.map((feature, index) => (
                    <span key={index} style={S.featureChip}>
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div style={S.bottomRow}>
                <AppStoreButton href="https://apps.apple.com/kr/app/%ED%95%98%EC%9D%B4%EB%A7%81%EA%B5%AC%EC%96%BC-%EC%98%81%EC%96%B4-%EC%9D%BC%EA%B8%B0-ai-%ED%94%BC%EB%93%9C%EB%B0%B1/id6752608763" />

                <motion.span
                  style={S.detailLink}
                  whileHover={{ opacity: 1, x: 6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={() => navigate("/projects/hilingual")}
                >
                  자세히보기 &gt;
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
