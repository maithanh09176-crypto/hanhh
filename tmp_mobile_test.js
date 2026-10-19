async (page) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);

  // 1. Jump to scene 11
  await page.evaluate(() => {
    if (window.TINY_API) window.TINY_API.jumpTo(11);
  });
  await page.waitForTimeout(1000);

  // 2. Trigger Tiny farewell
  await page.locator('button[title="Cảnh tiếp theo"]').click();
  await page.waitForTimeout(1000);

  // 3. Step through Tiny farewell lines
  await page.locator('[data-testid="tiny-farewell-container"]').click();
  await page.waitForTimeout(600);
  await page.locator('[data-testid="tiny-farewell-container"]').click();
  await page.waitForTimeout(600);
  await page.locator('[data-testid="tiny-farewell-container"]').click();
  await page.waitForTimeout(2500);
  await page.screenshot({ path: '.playwright-cli/mobile-1-bouquet-intro.png' });

  // 4. Step through Bouquet intro
  await page.locator('[data-testid="bouquet-step-0"]').click();
  await page.waitForTimeout(600);
  await page.locator('[data-testid="bouquet-step-1"]').click();
  await page.waitForTimeout(600);

  // 5. Touch bouquet
  await page.locator('#bouquet-touch-container').click();
  await page.waitForTimeout(1800);
  await page.screenshot({ path: '.playwright-cli/mobile-2-photos-on-bouquet.png' });

  // 6. Touch ribbon bow
  await page.locator('[data-testid="ribbon-bow-button"]').click();
  await page.waitForTimeout(2200);
  await page.screenshot({ path: '.playwright-cli/mobile-3-3d-floating-space.png' });

  // 7. Open letter
  await page.locator('#open-letter-center-btn').click({ force: true });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '.playwright-cli/mobile-4-letter-card.png' });
  console.log('Mobile test completed successfully!');
}
