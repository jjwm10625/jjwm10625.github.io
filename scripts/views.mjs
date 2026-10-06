import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  args: ["--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (e) => console.log("ERROR", e.message));
await page.goto("http://localhost:5173/");
await page.waitForTimeout(6000);
await page.screenshot({ path: "artifacts/se-desk.png" });
console.log(await page.locator("canvas").evaluate((c) => c.dataset.physics));
for (const view of ["front", "back", "left", "right", "top", "bottom"]) {
  await page.goto(`http://localhost:5173/?view=${view}`);
  await page.waitForTimeout(1800);
  await page.addStyleTag({
    content:
      ".topline,.hero-caption,h1,.selected-project,.phone-tools,.hero-bottom{visibility:hidden}",
  });
  await page.screenshot({ path: `artifacts/se-${view}.png` });
}
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://localhost:5173/");
await page.waitForTimeout(3500);
await page.screenshot({ path: "artifacts/se-mobile.png", fullPage: true });
await browser.close();
