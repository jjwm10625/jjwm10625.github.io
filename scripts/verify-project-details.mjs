import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', args: ['--enable-unsafe-swiftshader'] });
const errors = [];
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, isMobile: width === 390, hasTouch: width === 390 });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://localhost:5173');
    const trigger = page.locator('.project-title-button');
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: '하이링구얼' });
    await dialog.waitFor({state:'visible'});
    assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
    const cover = dialog.locator('img');
    await cover.evaluate(img => img.decode());
    assert.equal(await cover.evaluate(img => img.naturalWidth), 2000);
    assert.equal(await dialog.locator('.project-resource-links a').count(), 4);
    assert.equal(await dialog.locator('a').last().getAttribute('href'), 'https://github.com/Hi-lingual/Hilingual-iOS');
    assert.equal(await dialog.evaluate(el => el.scrollWidth > el.clientWidth), false);
    assert.equal(await dialog.locator('.project-contribution-line').textContent(), '홈 · 피드 · 위젯 개발을 담당했습니다.');
    assert.equal(await dialog.locator('.architecture-modules li').count(), 4);
    assert.equal(await dialog.locator('.project-engineering').count(), 0);
    await page.screenshot({path:`artifacts/project-case-study-${width}.png`});
    await dialog.getByRole('button', {name:'프로젝트 소개 닫기'}).click();
    assert.equal(await dialog.isVisible(), false);
    assert.equal(await trigger.evaluate(el => document.activeElement === el), true);
    assert.notEqual(await page.evaluate(() => document.body.style.overflow), 'hidden');
    await page.locator('.folder-launch').click();
    await dialog.waitFor({state:'visible'});
    await page.keyboard.press('Escape');
    assert.equal(await dialog.isVisible(), false);
    await page.close();
  }
  assert.deepEqual(errors, []);
  console.log('PASS: project title/folder launch, PDF image, resource links, desktop/mobile bounds, close/ESC, focus restoration and scroll unlock.');
} finally { await browser.close(); }
