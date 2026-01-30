import { useState } from "react";
import { motion } from "framer-motion";
import { experiences } from "./Career.data";
import * as S from "./Career.styles";

const Career = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section style={S.section}>
      <h2 style={S.title}>Experience</h2>

      <div style={S.timeline}>
        <div style={S.centerLine} />

        {experiences.map((exp, index) => {
          const isLeft = index % 2 === 0;
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={index}
              style={isLeft ? S.itemLeft : S.itemRight}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div style={isLeft ? S.dotLeft : S.dotRight} />

              <div
                style={{
                  ...S.card,
                  ...(isHovered ? S.cardHover : {}),
                  position: "relative",
                  transition: "all 0.35s ease",
                }}
              >
                {/* gradient overlay */}
                <div
                  style={{
                    ...S.gradientOverlay,
                    ...(isHovered ? S.gradientOverlayHover : {}),
                  }}
                />

                <div style={S.header}>
                  {exp.logo && (
                    <div style={S.logoBox}>
                      <img src={exp.logo} style={S.logo} />
                    </div>
                  )}
                  <div style={S.activity}>{exp.activity}</div>
                </div>

                <div style={S.period}>{exp.period}</div>
                <p style={S.description}>{exp.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Career;
