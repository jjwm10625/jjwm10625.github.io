import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { theme } from "../../styles/theme";

const HilingualBack = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        padding: "16px 80px",
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <motion.button
        onClick={() => navigate("/")}
        style={{
          pointerEvents: "auto",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 500,
          color: theme.colors.primary,
        }}
        whileHover={{
          scale: 1.05,
          textShadow: `0 0 12px ${theme.colors.primary}`,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        ← Back to Projects
      </motion.button>
    </div>
  );
};

export default HilingualBack;
