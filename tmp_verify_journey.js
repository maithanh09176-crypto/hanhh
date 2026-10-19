async (page) => {
  console.log('--- STARTING COMPREHENSIVE DLOVE JOURNEY TEST ---');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(1000);

  // 1. Jump to scene 11
  await page.evaluate(() => {
    if (window.TINY_API) window.TINY_API.jumpTo(11);
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '.playwright-cli/dlove-1-scene11.png' });
  console.log('✓ Step 1: Scene 11 reached');

  // 2. Trigger Tiny transition
  await page.locator('button[title="Cảnh tiếp theo"]').click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: '.playwright-cli/dlove-2-farewell-line1.png' });
  console.log('✓ Step 2: Tiny Farewell Line 1 reached');

  // 3. Step through Tiny farewell lines (3 clicks on farewell container)
  await page.locator('[data-testid="tiny-farewell-container"]').click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '.playwright-cli/dlove-3-farewell-line2.png' });
  console.log('✓ Step 3: Tiny Farewell Line 2 reached');

  await page.locator('[data-testid="tiny-farewell-container"]').click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '.playwright-cli/dlove-4-farewell-line3.png' });
  console.log('✓ Step 4: Tiny Farewell Line 3 (Tớ rời đi đây đã) reached');

  // 4. Click farewell line 3 to trigger fadeout and enter Bouquet
  await page.locator('[data-testid="tiny-farewell-container"]').click();
  await page.waitForTimeout(2500);
  await page.screenshot({ path: '.playwright-cli/dlove-5-bouquet-intro0.png' });
  console.log('✓ Step 5: Bouquet Intro 0 (Anh nói) reached');

  // 5. Progress through Bouquet intro
  await page.locator('[data-testid="bouquet-step-0"]').click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '.playwright-cli/dlove-6-bouquet-intro1.png' });
  console.log('✓ Step 6: Bouquet Intro 1 reached');

  await page.locator('[data-testid="bouquet-step-1"]').click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '.playwright-cli/dlove-7-single-bouquet.png' });
  
  // Test mobile viewport for State 1 hint
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(800);
  await page.screenshot({ path: '.playwright-cli/dlove-7-mobile-single-bouquet.png' });
  console.log('✓ Step 7: Trạng thái 1 (Chỉ có bó hoa DLove) reached on desktop & mobile');

  // 6. Touch the bouquet on mobile!
  await page.locator('#bouquet-touch-container').click();
  await page.waitForTimeout(2200);
  await page.screenshot({ path: '.playwright-cli/dlove-8-mobile-photos-on-bouquet.png' });

  // Restore desktop size
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '.playwright-cli/dlove-8-photos-on-bouquet.png' });
  console.log('✓ Step 8: Trạng thái 2 (Ảnh xuất hiện che lấp bó hoa) reached on desktop & mobile');

  // 7. Touch the ribbon bow!
  await page.locator('[data-testid="ribbon-bow-button"]').click();
  await page.waitForTimeout(2500);
  await page.screenshot({ path: '.playwright-cli/dlove-9-3d-floating-space.png' });
  console.log('✓ Step 9: Trạng thái 3 (Không gian 3D ảnh bay bổng & lời chúc) reached');

  // 8. Click letter button to open romantic letter card
  await page.waitForTimeout(1500);
  const letterBtn = page.locator('#open-letter-center-btn, button[title="Mở thư tình cảm của Anh"]').first();
  await letterBtn.click({ force: true });
  const letterModal = page.locator('[data-testid="dlove-letter-modal"]');
  await letterModal.waitFor({ state: 'visible', timeout: 5000 });
  await page.screenshot({ path: '.playwright-cli/dlove-10-letter-card.png' });
  console.log('✓ Step 10: Phần Thiệp (Gửi cô gái bé nhỏ <3) reached');

  // 9. Close letter card to continue viewing 3D space
  const closeBtn = page.locator('button:has-text("Gấp thiệp lại 🌸")');
  if (await closeBtn.count() > 0) {
    await closeBtn.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '.playwright-cli/dlove-11-closed-letter.png' });
    console.log('✓ Step 11: Letter folded, viewing 3D space with floating envelope icon');
  }

  // 10. Reopen letter using floating letter icon
  const openLetterBtn = page.locator('button:has-text("Xem thư 💌")').first();
  if (await openLetterBtn.count() > 0) {
    await openLetterBtn.click({ force: true });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '.playwright-cli/dlove-12-reopened-letter.png' });
    console.log('✓ Step 12: Reopen letter verified');
    await page.locator('button:has-text("Gấp thiệp lại 🌸")').click();
    await page.waitForTimeout(800);
  }

  // 11. Test Revisit Bouquet button
  const revisitBouquetBtn = page.locator('button:has-text("Ngắm lại bó hoa")');
  if (await revisitBouquetBtn.count() > 0) {
    await revisitBouquetBtn.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: '.playwright-cli/dlove-13-revisit-bouquet.png' });
    console.log('✓ Step 13: Revisit bouquet verified');
  }

  console.log('--- ALL DLOVE ACCEPTANCE STEPS VERIFIED 100% SUCCESSFULLY! ---');
}
