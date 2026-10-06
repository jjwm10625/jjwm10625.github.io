import { phoneScreen } from "./phoneConfig";
const escape = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
// Original vector artwork inspired by the orange flower wallpaper shipped with SE-era iOS.
// No Apple wallpaper image is copied or downloaded.
export function lockScreenSvg() {
  const petals = Array.from({ length: 5 }, (_, ring) =>
    Array.from({ length: 26 }, (_, i) => {
      const angle = (i * 360) / 26 + ring * 8;
      const length = 290 - ring * 43;
      const width = 44 - ring * 5;
      return `<path d="M0 12 C${-width} ${-length * 0.34},${-width * 0.64} ${-length * 0.89},0 ${-length} C${width * 0.68} ${-length * 0.9},${width} ${-length * 0.34},0 12Z" fill="url(#petal${ring})" stroke="#e5814933" stroke-width="1" transform="rotate(${angle})"/>`;
    }).join(""),
  ).join("");
  const gradients = Array.from(
    { length: 5 },
    (_, i) =>
      `<linearGradient id="petal${i}" x1="0" y1="0" x2=".35" y2="1"><stop stop-color="${["#fff4e2", "#ffe8cb", "#ffdcaa", "#f8ca8c", "#f3b979"][i]}"/><stop offset=".55" stop-color="${["#fab882", "#f5a774", "#f59868", "#ed895b", "#e77f4a"][i]}"/><stop offset="1" stop-color="#d66b43"/></linearGradient>`,
  ).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="750" height="1334" viewBox="0 0 750 1334"><defs>${gradients}<radialGradient id="background"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#e5e5e5"/></radialGradient><filter id="shadow"><feGaussianBlur stdDeviation="24"/></filter></defs><rect width="750" height="1334" fill="url(#background)"/><ellipse cx="380" cy="1060" rx="235" ry="45" fill="#333333" opacity=".12" filter="url(#shadow)"/><g transform="translate(380 882) rotate(-11)">${petals}<circle r="31" fill="#e59960"/><circle r="17" fill="#e7ad73"/></g><g fill="#1D1D1F" font-family="-apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif"><text x="35" y="42" font-size="22">•••••</text><text x="116" y="42" font-size="21">LTE</text><text x="635" y="42" font-size="21">100%</text><rect x="695" y="22" width="29" height="15" rx="3" fill="none" stroke="#1D1D1F" stroke-width="2"/><rect x="699" y="25" width="22" height="9" rx="1"/><rect x="726" y="27" width="3" height="6"/><g transform="translate(375 129)" stroke="#1D1D1F" stroke-width="4" fill="none"><path d="M-11 0V-13a11 11 0 0 1 22 0V0"/><rect x="-17" y="0" width="34" height="28" rx="5" fill="#1D1D1F"/><circle cx="0" cy="12" r="3" fill="#eeeeee" stroke="none"/></g><text x="375" y="300" text-anchor="middle" font-size="157" font-weight="300" letter-spacing="-7">${escape(phoneScreen.time)}</text><text x="375" y="365" text-anchor="middle" font-size="36">${escape(phoneScreen.date)}</text></g><g><rect x="27" y="461" width="696" height="206" rx="33" fill="#FAFAFA" fill-opacity=".86" stroke="#fff" stroke-opacity=".7"/><rect x="56" y="487" width="51" height="51" rx="12" fill="#34C759"/><path d="M68 511c0-10 27-10 27 0 0 8-11 12-18 8l-8 4 2-8c-2-1-3-3-3-4" fill="white"/><g font-family="-apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif"><text x="123" y="523" font-size="25" fill="#666666">${escape(phoneScreen.notification.app)}</text><text x="682" y="523" font-size="23" fill="#666666" text-anchor="end">${escape(phoneScreen.notification.received)}</text><text x="57" y="606" font-size="40" fill="#1D1D1F">${escape(phoneScreen.notification.message)}</text></g></g></svg>`;
}
export const lockScreenUrl = () =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(lockScreenSvg())}`;
