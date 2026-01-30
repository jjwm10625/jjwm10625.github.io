import type { CSSProperties } from "react";
import { theme } from "../../styles/theme";

/* =========================
 * Section
 * ========================= */

export const section: CSSProperties = {
  width: "100%",
  padding: "120px 80px",
  backgroundColor: theme.colors.bg,
  display: "flex",
  justifyContent: "center",
};

/* =========================
 * Card
 * ========================= */

export const card: CSSProperties = {
  maxWidth: "1040px",
  width: "100%",
  borderRadius: "28px",
  background: theme.colors.glass,
  backdropFilter: "blur(16px)",
  border: `1px solid ${theme.colors.borderWeak}`,
  boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
  overflow: "hidden",
};

/* =========================
 * Grid Layout
 * ========================= */

export const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 360px",
  minHeight: "420px",
};

/* =========================
 * Left – Content
 * ========================= */

export const content: CSSProperties = {
  padding: "48px",
};

/* =========================
 * Title
 * ========================= */

export const title: CSSProperties = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: "28px",
  fontWeight: 800,
  marginBottom: "32px",
  color: theme.colors.textPrimary,
};

/* =========================
 * List
 * ========================= */

export const list: CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
};

export const item: CSSProperties = {
  fontSize: "15px",
  marginBottom: "14px",
  lineHeight: 1.6,
  color: theme.colors.textSecondary,
};

export const label: CSSProperties = {
  fontWeight: 600,
  marginRight: "8px",
  color: theme.colors.textPrimary,
};

export const link: CSSProperties = {
  color: theme.colors.primary,
  textDecoration: "none",
};

/* =========================
 * Divider
 * ========================= */

export const divider: CSSProperties = {
  height: "1px",
  backgroundColor: theme.colors.borderWeak,
  margin: "32px 0",
};

/* =========================
 * Education
 * ========================= */

export const educationTitle: CSSProperties = {
  fontSize: "18px",
  fontWeight: 600,
  marginBottom: "12px",
  color: theme.colors.textPrimary,
};

export const educationText: CSSProperties = {
  fontSize: "14px",
  lineHeight: 1.6,
  color: theme.colors.textSecondary,
};

/* =========================
 * Right – Image
 * ========================= */

export const imageWrapper: CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
};

export const image: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "top",
};
