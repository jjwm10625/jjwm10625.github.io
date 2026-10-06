import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  args: ["--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } }),
  errors = [];
page.on("pageerror", (e) => errors.push(e.message));
const state = (p) =>
  p.locator("canvas").evaluate((c) => JSON.parse(c.dataset.physics));
const ears = (p) =>
  p.locator("canvas").evaluate((c) => JSON.parse(c.dataset.earpods));
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
function connection(s) {
  for (const chain of s.chains) {
    for (let i = 0; i < chain.length; i++) {
      assert(
        Math.abs(distance(chain[i].start, chain[i].end) - chain[i].length) <
          0.0001,
        "wire stretched",
      );
      if (i)
        assert(
          distance(chain[i - 1].end, chain[i].start) < 0.045,
          "wire disconnected",
        );
    }
  }
  assert(
    distance(s.connector, s.chains[0][0].start) < 0.045,
    "plug disconnected",
  );
  for (const branch of s.chains.slice(1))
    assert(
      distance(s.chains[0].at(-1).end, branch[0].start) < 0.045,
      "Y disconnected",
    );
  assert(distance(s.chains[1].at(-1).end, s.leftStem) < 0.045);
  assert(distance(s.chains[2].at(-1).end, s.rightStem) < 0.045);
}
async function grip(p) {
  const s = await state(p),
    r = await p.locator("canvas").boundingBox();
  return {
    x: r.x + ((s.grip.x + 1) * r.width) / 2,
    y: r.y + ((1 - s.grip.y) * r.height) / 2,
  };
}
function bounds(s) {
  for (const p of s.corners)
    assert(Math.abs(p.x) < 0.98 && Math.abs(p.y) < 0.98, "phone clipped");
}
async function closed(p) {
  await p.waitForFunction(() => !document.querySelector("dialog").open);
  await p.waitForTimeout(400);
  assert.equal(await p.evaluate(() => document.body.style.overflow), "");
}
try {
  await page.goto("http://localhost:5173/");
  assert.equal(await page.locator(".intro-overlay").count(), 0);
  await page.waitForFunction(
    () => document.querySelector("canvas")?.dataset.earpods,
  );
  await page.waitForTimeout(3500);
  assert.equal(
    await page
      .locator(".phone-tools,.selected-project,.project-switcher")
      .count(),
    0,
  );
  assert.equal(await page.locator(".hero button").count(), 1);
  await page.screenshot({ path: "artifacts/minimal-desktop.png" });
  let s = await state(page);
  bounds(s);
  connection(await ears(page));
  const initial = s,
    ei = await ears(page);
  let p = await grip(page);
  await page.mouse.move(p.x, p.y);
  await page.mouse.down();
  await page.mouse.move(p.x + 200, p.y - 90, { steps: 25 });
  await page.waitForTimeout(1000);
  s = await state(page);
  assert(s.dragging && distance(s.phone, initial.phone) > 0.5, "drag failed");
  assert(
    Math.hypot(...s.rotation.map((n, i) => n - initial.rotation[i])) > 0.04,
    "off-center drag did not rotate",
  );
  bounds(s);
  connection(await ears(page));
  assert(
    distance((await ears(page)).right, ei.right) > 0.04,
    "earbud not responding",
  );
  await page.mouse.move(1420, 50, { steps: 25 });
  await page.waitForTimeout(450);
  assert((await state(page)).dragging, "capture lost");
  bounds(await state(page));
  connection(await ears(page));
  await page.mouse.up();
  await page.waitForTimeout(4800);
  s = await state(page);
  assert(!s.dragging && distance(s.phone, s.rest) < 0.3, "return failed");
  await page.waitForTimeout(2000);
  const settled = await state(page);
  for (let i = 0; i < 20; i++) {
    await page.waitForTimeout(50);
    const frame = await state(page);
    assert(distance(frame.phone, settled.phone) < 0.00001, "idle phone position jitter");
    assert(Math.hypot(...frame.rotation.map((n, j) => n - settled.rotation[j])) < 0.00001, "idle phone rotation jitter");
    assert.equal(frame.cameraZ, settled.cameraZ, "idle camera jitter");
  }
  p = await grip(page);
  await page.mouse.move(p.x, p.y);
  await page.mouse.down();
  await page.mouse.move(p.x + 60, p.y - 45, { steps: 10 });
  await page.evaluate(() =>
    window.dispatchEvent(new PointerEvent("pointercancel", { pointerId: 1 })),
  );
  await page.mouse.up();
  await page.waitForTimeout(150);
  assert(!(await state(page)).dragging, "cancel failed");
  const more = page.getByRole("button", { name: "About me", exact: true });
  await more.click();
  await page.waitForTimeout(500);
  const dialog = page.getByRole("dialog");
  assert.equal((await dialog.boundingBox()).x, 0);
  assert.equal((await dialog.boundingBox()).width, 520);
  assert.equal(
    await page.evaluate(() => document.body.style.overflow),
    "hidden",
  );
  await page.screenshot({ path: "artifacts/about-desktop.png" });
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("Tab");
    assert(
      await page.evaluate(() =>
        document.querySelector("dialog").contains(document.activeElement),
      ),
      "focus escaped modal",
    );
  }
  await page.keyboard.press("Escape");
  await closed(page);
  assert(
    await more.evaluate((e) => e === document.activeElement),
    "opener focus not restored",
  );
  await more.click();
  await page.waitForTimeout(500);
  await page.mouse.click(950, 180);
  await closed(page);
  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  mobile.on("pageerror", (e) => errors.push(e.message));
  await mobile.goto("http://localhost:5173/");
  await mobile.waitForFunction(
    () => document.querySelector("canvas")?.dataset.earpods,
  );
  await mobile.waitForTimeout(3500);
  s = await state(mobile);
  bounds(s);
  connection(await ears(mobile));
  await mobile.screenshot({
    path: "artifacts/minimal-mobile.png",
    fullPage: true,
  });
  p = await grip(mobile);
  const mi = s.phone,
    cdp = await mobile.context().newCDPSession(mobile);
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [p],
  });
  for (let i = 1; i <= 12; i++) {
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: p.x + i * 4, y: p.y - i * 4 }],
    });
    await mobile.waitForTimeout(40);
  }
  await mobile.waitForTimeout(700);
  s = await state(mobile);
  assert(s.dragging && distance(s.phone, mi) > 0.2, "mobile drag failed");
  assert.equal(await mobile.evaluate(() => window.scrollY), 0);
  bounds(s);
  connection(await ears(mobile));
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await mobile.waitForTimeout(4200);
  assert(!(await state(mobile)).dragging);
  await mobile.getByRole("button", { name: "About me", exact: true }).tap();
  await mobile.waitForTimeout(500);
  assert.equal((await mobile.getByRole("dialog").boundingBox()).width, 390);
  assert.equal(
    await mobile.evaluate(() => document.documentElement.scrollWidth),
    390,
    "horizontal overflow",
  );
  await mobile.screenshot({ path: "artifacts/about-mobile.png" });
  await mobile.getByRole("button", { name: "소개 패널 닫기" }).tap();
  await closed(mobile);
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: 20, y: 700 }],
  });
  for (let y = 680; y >= 350; y -= 30) {
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: 20, y }],
    });
    await mobile.waitForTimeout(20);
  }
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await mobile.waitForTimeout(400);
  assert(
    (await mobile.evaluate(() => window.scrollY)) > 100,
    "empty area scroll blocked",
  );
  const fallback = await browser.newPage({
    viewport: { width: 390, height: 844 },
  });
  await fallback.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type.startsWith("webgl")) return null;
      return original.call(this, type, ...args);
    };
  });
  await fallback.goto("http://localhost:5173/");
  await fallback.locator(".static-iphone").waitFor();
  assert.equal(await fallback.locator(".static-screen button").count(), 0);
  await fallback.getByRole("button", { name: "About me", exact: true }).click();
  await fallback.getByRole("dialog").waitFor();
  await fallback.getByRole("button", { name: "소개 패널 닫기" }).click();
  await closed(fallback);
  assert.deepEqual(errors, []);
  console.log(
    "PASS: minimal hero, physics drag/rotation/capture/cancel/return, EarPods connections/inertia, desktop/mobile About panel/focus/Escape/backdrop/scroll, mobile touch, WebGL fallback.",
  );
} finally {
  await browser.close();
}
