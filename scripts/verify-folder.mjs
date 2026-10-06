import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser = await chromium.launch({executablePath:process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--enable-unsafe-swiftshader']});
const errors=[];
async function load(page) {
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:5173/');
 assert.equal(await page.locator('.intro-overlay').count(),0);
 await page.locator('.folder-card').first().scrollIntoViewIfNeeded();
 await page.waitForTimeout(900);
}
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 await load(page);
 const card=page.locator('.folder-card').first();
 const face=card.locator('.folder-face');
 const initial=await face.evaluate(e=>getComputedStyle(e).transform);
 await card.hover();
 await page.waitForTimeout(800);
 assert.notEqual(await face.evaluate(e=>getComputedStyle(e).transform),initial,'hover did not open folder');
 await page.locator('#work').screenshot({path:'artifacts/folders-desktop.png'});
 await page.mouse.move(0,0);
 const button=card.locator('.folder-toggle');
 await button.focus();
 await page.keyboard.press('Enter');
 assert.equal(await button.getAttribute('aria-expanded'),'true');
 await page.keyboard.press('Enter');
 assert.equal(await button.getAttribute('aria-expanded'),'false');
 await page.waitForTimeout(800);
 assert.equal(await face.evaluate(e=>getComputedStyle(e).transform),initial,'keyboard close failed');
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 await load(mobile);
 const mobileCard=mobile.locator('.folder-card').first();
 await mobileCard.locator('.folder-toggle').tap();
 await mobile.waitForTimeout(800);
 assert.equal(await mobileCard.locator('.folder-toggle').getAttribute('aria-expanded'),'true');
 const caption=await mobileCard.locator('.folder-caption').boundingBox();
 const bounds=await mobileCard.boundingBox();
 assert(caption.y+caption.height <= bounds.y+bounds.height,'caption clipped');
 assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth),390);
 await mobile.locator('#work').screenshot({path:'artifacts/folders-mobile.png'});
 await mobileCard.locator('.folder-toggle').tap();
 assert.equal(await mobileCard.locator('.folder-toggle').getAttribute('aria-expanded'),'false');
 await mobile.emulateMedia({reducedMotion:'reduce'});
 assert.equal(await mobileCard.locator('.folder-face').evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
 assert.deepEqual(errors,[]);
 console.log('PASS: folder hover, keyboard and touch toggle, caption bounds, responsive layout, reduced motion, no browser errors.');
} finally {await browser.close();}
