import type { CSSProperties } from "react";
import { theme } from "../../styles/theme";

/* =========================
 * Layout
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
  marginBottom: "64px",
  textAlign: "center",
  color: theme.colors.textPrimary,
};

export const cardWrapper: CSSProperties = {
  display: "flex",
  justifyContent: "center",
};

export const card: CSSProperties = {
  maxWidth: "1040px",
  width: "100%",
  padding: "60px",
  borderRadius: "32px",
  background: theme.colors.glass,
  backdropFilter: "blur(18px)",
  border: `1px solid ${theme.colors.borderWeak}`,
  boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
};

/* =========================
 * Content Grid
 * ========================= */

export const content: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "260px 1fr",
  gap: "48px",
  alignItems: "center",
};

/* =========================
 * Logo
 * ========================= */

export const logoArea: CSSProperties = {
  display: "flex",
  justifyContent: "center",
};

export const appLogo: CSSProperties = {
  width: "200px",
  height: "200px",
  borderRadius: "36px",
  boxShadow: `0 0 24px ${theme.colors.glowStrong}`,
};

/* =========================
 * Text Area
 * ========================= */

export const textArea: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

/* =========================
 * Main Content
 * ========================= */

export const mainContent: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

/* =========================
 * Title / Period
 * ========================= */

export const projectTitle: CSSProperties = {
  fontSize: "26px",
  fontWeight: 700,
  marginBottom: "8px",
  color: theme.colors.textPrimary,
};

export const period: CSSProperties = {
  fontSize: "13px",
  color: theme.colors.textSecondary,
};

/* =========================
 * Description
 * ========================= */

export const description: CSSProperties = {
  fontSize: "15px",
  lineHeight: 1.65,
  color: theme.colors.textSecondary,
  whiteSpace: "pre-line",
};

/* =========================
 * Features
 * ========================= */

export const featureList: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
};

export const featureChip: CSSProperties = {
  padding: "7px 12px",
  fontSize: "13px",
  borderRadius: "999px",
  background: theme.colors.glassHover,
  border: `1px solid ${theme.colors.borderWeak}`,
  color: theme.colors.textPrimary,
};

/* =========================
 * Bottom Actions
 * ========================= */

export const bottomRow: CSSProperties = {
  marginTop: "28px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const detailLink: CSSProperties = {
  fontSize: "14px",
  fontWeight: 500,
  color: theme.colors.primary,
  cursor: "pointer",
  opacity: 0.85,
};
