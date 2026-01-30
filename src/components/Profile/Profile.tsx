import { motion } from "framer-motion";
import * as S from "./Profile.styles";
import profileImage from "../../assets/images/profile.png"; // 상반신 스탠딩 이미지

const Profile = () => {
  return (
    <section style={S.section}>
      <motion.div
        style={S.card}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div style={S.grid}>
          {/* Left */}
          <div style={S.content}>
            <h2 style={S.title}>Profile</h2>

            <ul style={S.list}>
              <li style={S.item}>
                <span style={S.label}>Email:</span>
                jjwm10625@sookmyung.ac.kr
              </li>
              <li style={S.item}>
                <span style={S.label}>Phone:</span>
                (+82) 10-4140-1364
              </li>
              <li style={S.item}>
                <span style={S.label}>GitHub:</span>
                <a
                  href="https://github.com/jjwm10625"
                  target="_blank"
                  rel="noreferrer"
                  style={S.link}
                >
                  github.com/jjwm10625
                </a>
              </li>
              <li style={S.item}>
                <span style={S.label}>Blog:</span>
                <a
                  href="https://zzeroarchive.tistory.com/"
                  target="_blank"
                  rel="noreferrer"
                  style={S.link}
                >
                  Tistory
                </a>
                {" · "}
                <a
                  href="https://velog.io/@jjwm10625/posts"
                  target="_blank"
                  rel="noreferrer"
                  style={S.link}
                >
                  Velog
                </a>
              </li>
            </ul>

            <div style={S.divider} />

            <div>
              <div style={S.educationTitle}>Education</div>
              <p style={S.educationText}>
                숙명여자대학교
                <br />
                소프트웨어학부 컴퓨터과학전공
                <br />
                2022 – Present
              </p>
            </div>
          </div>

          {/* Right */}
          <div style={S.imageWrapper}>
            <img src={profileImage} alt="Profile" style={S.image} />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Profile;
