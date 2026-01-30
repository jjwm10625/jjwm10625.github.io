import type { CSSProperties } from "react";
import { theme } from "../../styles/theme";

/* =========================
 * Section
 * ========================= */

export const section: CSSProperties = {
  width: "100%",
  padding: "140px 80px",
  backgroundColor: theme.colors.bg,
};

export const title: CSSProperties = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: "32px",
  fontWeight: 800,
  marginBottom: "80px",
  textAlign: "center",
  color: theme.colors.textPrimary,
};

/* =========================
 * Timeline
 * ========================= */

export const timeline: CSSProperties = {
  position: "relative",
  maxWidth: "1040px",
  margin: "0 auto",
};

export const centerLine: CSSProperties = {
  position: "absolute",
  left: "50%",
  top: 0,
  bottom: 0,
  width: "2px",
  backgroundColor: theme.colors.borderWeak,
  transform: "translateX(-50%)",
};

/* =========================
 * Timeline Item
 * ========================= */

export const itemBase: CSSProperties = {
  position: "relative",
  width: "50%",
  padding: "0 32px",
  marginBottom: "64px",
};

export const itemLeft: CSSProperties = {
  ...itemBase,
};

export const itemRight: CSSProperties = {
  ...itemBase,
  marginLeft: "50%",
};

export const dotBase: CSSProperties = {
  position: "absolute",
  top: "10px",
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  backgroundColor: theme.colors.primary,
  boxShadow: `0 0 12px ${theme.colors.glowStrong}`,
};

export const dotLeft: CSSProperties = {
  ...dotBase,
  right: "-7px",
};

export const dotRight: CSSProperties = {
  ...dotBase,
  left: "-7px",
};

/* =========================
 * Card
 * ========================= */

export const card: CSSProperties = {
  padding: "28px",
  borderRadius: "22px",
  background: theme.colors.glass,
  backdropFilter: "blur(16px)",
  border: `1px solid ${theme.colors.borderWeak}`,
  boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
};

/* =========================
 * Header
 * ========================= */

export const header: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  marginBottom: "10px",
};

/* =========================
 * Logo
 * ========================= */

export const logoBox: CSSProperties = {
  width: "44px",
  height: "44px",
  borderRadius: "14px",
  overflow: "hidden",
  backgroundColor: "#ffffff", // 로고 가독성 목적 → 유지
  flexShrink: 0,
};

export const logo: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

/* =========================
 * Text
 * ========================= */

export const activity: CSSProperties = {
  fontWeight: 600,
  fontSize: "16px",
  color: theme.colors.textPrimary,
};

export const period: CSSProperties = {
  fontSize: "13px",
  color: theme.colors.textSecondary,
  marginBottom: "10px",
};

export const description: CSSProperties = {
  fontSize: "14px",
  lineHeight: 1.6,
  color: theme.colors.textSecondary,
};
/* =========================
 * Card Hover Effect
 * ========================= */

export const cardHover: CSSProperties = {
  transform: "translateY(-6px)",
  boxShadow: `0 30px 80px rgba(0,0,0,0.7), 
              0 0 30px ${theme.colors.glowWeak}`,
  border: `1px solid ${theme.colors.borderStrong}`,
};

/* =========================
 * Gradient Overlay
 * ========================= */

export const gradientOverlay: CSSProperties = {
  position: "absolute",
  inset: 0,
  borderRadius: "22px",
  background:
    "linear-gradient(135deg, rgba(102,252,241,0.15), transparent 60%)",
  opacity: 0,
  pointerEvents: "none",
  transition: "opacity 0.3s ease",
};

export const gradientOverlayHover: CSSProperties = {
  opacity: 1,
};
