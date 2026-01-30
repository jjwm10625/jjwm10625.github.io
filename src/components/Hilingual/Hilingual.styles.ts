import type { CSSProperties } from "react";
import { theme } from "../../styles/theme";

/* =========================
 * Section
 * ========================= */

export const section: CSSProperties = {
  width: "100%",
  backgroundColor: theme.colors.bg,
};

/* =========================
 * Content Container
 * ========================= */

export const content: CSSProperties = {
  maxWidth: "1040px",
  margin: "0 auto",
  padding: "0 80px",
};

/* =========================
 * Text
 * ========================= */

export const title: CSSProperties = {
  fontSize: "32px",
  fontWeight: 800,
  marginBottom: "24px",
  color: theme.colors.textPrimary,
};

export const text: CSSProperties = {
  fontSize: "15px",
  lineHeight: 1.7,
  color: theme.colors.textSecondary,
};

/* =========================
 * Image
 * ========================= */

export const image: CSSProperties = {
  width: "100%",
  maxWidth: "900px",
  display: "block",
  margin: "24px auto 0",
};

/* =========================
 * Trouble Shooting Link
 * ========================= */

export const troubleLink: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  marginTop: "16px",
  padding: "12px 18px",
  borderRadius: "12px",
  border: `1px solid ${theme.colors.borderWeak}`,
  color: theme.colors.primary,
  fontSize: "14px",
  fontWeight: 500,
  textDecoration: "none",
  backgroundColor: "transparent",
  transition: "all 0.25s ease",
};

export const troubleLinkHover: CSSProperties = {
  backgroundColor: theme.colors.glassHover,
  boxShadow: theme.glow,
};
