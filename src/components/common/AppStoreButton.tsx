import { motion } from "framer-motion";
import appleLogo from "../../assets/logos/appstore.png";
import { theme } from "../../styles/theme";

type Props = {
  href: string;
};

const AppStoreButton = ({ href }: Props) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        color: theme.colors.textPrimary,
        fontSize: "14px",
        fontWeight: 500,
        textDecoration: "none",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <img
        src={appleLogo}
        alt="App Store"
        style={{
          width: "18px",
          height: "18px",
          objectFit: "contain",
          opacity: 0.85,
        }}
      />

      <span>App Store에서 다운로드</span>

      {/* underline */}
      <motion.span
        variants={{
          rest: { width: 0 },
          hover: { width: "100%" },
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          position: "absolute",
          bottom: "-4px",
          left: 0,
          height: "1px",
          backgroundColor: theme.colors.textPrimary,
          opacity: 0.7,
        }}
      />
    </motion.a>
  );
};

export default AppStoreButton;
