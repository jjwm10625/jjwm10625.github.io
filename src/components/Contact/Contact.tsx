import { motion } from "framer-motion";
import * as S from "./Contact.styles";

const Contact = () => {
  const items = [
    { label: "Email", href: "mailto:youngseozero@gmail.com" },
    { label: "GitHub", href: "https://github.com/jjwm10625" },
    { label: "Velog", href: "https://velog.io/@jjwm10625/posts" },
    { label: "Tistory", href: "https://zzeroarchive.tistory.com/" },
  ];

  return (
    <section style={S.section}>
      <div style={S.content}>
        <h2 style={S.title}>Contact</h2>
        <p style={S.subtitle}>함께 이야기해보고 싶다면 언제든지 연락 주세요.</p>

        <div style={S.links}>
          {items.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              style={S.link}
              whileHover={{
                scale: 1.06,
                color: S.hoverColor,
                textShadow: S.hoverGlow,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
