import type { CSSProperties } from "react";
import { theme } from "../../styles/theme";

export const wrapper: CSSProperties = {
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  background: `
    radial-gradient(
      1200px 600px at 50% 30%,
      rgba(102,252,241,0.08),
      transparent 70%
    ),
    ${theme.colors.bg}
  `,
  overflow: "hidden",
};

export const content: CSSProperties = {
  textAlign: "center",
  zIndex: 1,
};

export const name: CSSProperties = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: "64px",
  fontWeight: 800,
  marginBottom: "14px",
  color: theme.colors.textPrimary,
};

export const role: CSSProperties = {
  fontSize: "24px",
  color: theme.colors.primary,
  marginBottom: "20px",
};

export const intro: CSSProperties = {
  fontSize: "16px",
  color: theme.colors.textSecondary,
  lineHeight: 1.6,
  marginBottom: "44px",
};

export const buttonGroup: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
};

/* =========================
 * Buttons
 * ========================= */

export const primaryButton: CSSProperties = {
  padding: "14px 28px",
  borderRadius: "999px",
  backgroundColor: theme.colors.primary,
  color: theme.colors.bg,
  fontSize: "14px",
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
  boxShadow: theme.glow,
  transition: "all 0.25s ease",
};

export const secondaryButton: CSSProperties = {
  padding: "14px 28px",
  borderRadius: "999px",
  background: "transparent",
  border: `1px solid ${theme.colors.primary}`,
  color: theme.colors.primary,
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.25s ease",
};
