import { chromium } from "@playwright/test";
const browser = await chromium.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
for (const [name, url] of [
  ["se1-official", "https://support.apple.com/en-us/112005"],
  [
    "se1-news",
    "https://www.apple.com/newsroom/2016/03/21Apple-Introduces-iPhone-SE-The-Most-Powerful-Phone-with-a-Four-inch-Display/",
  ],
  [
    "earpods-official",
    "https://www.apple.com/shop/product/mwu53am/a/earpods-35mm-headphone-plug",
  ],
]) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });
    await page.waitForTimeout(1000);
    console.log(
      name,
      await page.locator("img").evaluateAll((es) =>
        es
          .filter((e) => e.naturalWidth > 100)
          .map((e) => ({ src: e.src, alt: e.alt }))
          .slice(0, 12),
      ),
    );
    await page.screenshot({ path: `/tmp/${name}.png` });
  } catch (e) {
    console.log(e.message);
  }
}
await browser.close();
