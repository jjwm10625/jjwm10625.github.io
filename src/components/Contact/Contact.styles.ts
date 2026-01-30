import type { CSSProperties } from "react";
import { theme } from "../../styles/theme";

/* =========================
 * Section
 * ========================= */

export const section: CSSProperties = {
  width: "100%",
  padding: "160px 0 200px",
  backgroundColor: theme.colors.bg,
};

/* =========================
 * Content
 * ========================= */

export const content: CSSProperties = {
  maxWidth: "960px",
  margin: "0 auto",
  padding: "0 80px",
  textAlign: "center",
};

/* =========================
 * Text
 * ========================= */

export const title: CSSProperties = {
  fontSize: "28px",
  fontWeight: 800,
  marginBottom: "12px",
};

export const subtitle: CSSProperties = {
  fontSize: "15px",
  color: theme.colors.textSecondary,
  marginBottom: "48px",
};

/* =========================
 * Links
 * ========================= */

export const links: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "32px",
  flexWrap: "wrap",
};

/* =========================
 * Link
 * ========================= */

export const link: CSSProperties = {
  fontSize: "15px",
  fontWeight: 500,
  color: theme.colors.textPrimary,
  textDecoration: "none",
  cursor: "pointer",
  transition: "color 0.2s ease, text-shadow 0.2s ease, transform 0.2s ease",
};

/* =========================
 * Hover Tokens (THEME 기반)
 * ========================= */

export const hoverColor = theme.colors.primary;

export const hoverGlow = theme.glow;
