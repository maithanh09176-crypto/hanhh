import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);

  // Jump to scene 11 (May mắn)
  await page.evaluate(() => {
    if (window.TINY_API) window.TINY_API.jumpTo(11);
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '.playwright-cli/p2-scene11-mayman.png' });

  // Advance from scene 11 to trigger Tiny transition
  await page.click('button[title="Cảnh tiếp theo"]');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '.playwright-cli/p3-tiny-transition.png' });

  // Step through Tiny transition
  await page.click('div:has-text("Ơ khoan!")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '.playwright-cli/p4-tiny-transition-line2.png' });

  await page.click('div:has-text("Hình như còn có một người")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '.playwright-cli/p5-tiny-transition-line3.png' });

  // Tiny farewell and transition to bouquet
  await page.click('div:has-text("Tớ bật mí đến đây thôi nha")');
  await page.waitForTimeout(2200);
  await page.screenshot({ path: '.playwright-cli/p6-bouquet-intro.png' });

  // Step into bouquet scene (Anh nói với Em)
  await page.click('text="À mà… Anh còn thiếu một bó hoa tặng Em nữa."');
  await page.waitForTimeout(1000);
  await page.click('text="Cũng có tí 20/10 cho em, em mở ra thử xem🌹"');
  await page.waitForTimeout(1200);
  await page.screenshot({ path: '.playwright-cli/p7-bouquet-ready-touch.png' });

  // Touch the bouquet!
  await page.click('img[alt="Bó hoa tặng Em 20/10"]');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '.playwright-cli/p8-bouquet-bloomed-photos.png' });

  // Advance messages on bouquet
  await page.click('text="Anh vốn định chuẩn bị một bó hoa thật lộng lẫy…"');
  await page.waitForTimeout(800);
  await page.click('text="Nhưng ngắm kỹ lại, anh thấy hình như hơi thừa."');
  await page.waitForTimeout(800);
  await page.click('text="Vì hoa dẫu đẹp đến mấy, đặt cạnh em lúc này cũng chỉ làm nền thôi❤️"');
  await page.waitForTimeout(800);
  await page.click('text="Em biết không, đôi khi chỉ cần nhìn thấy Em vui, một ngày bình thường cũng trở nên đáng yêu hơn rất nhiều."');
  await page.waitForTimeout(1200);
  await page.screenshot({ path: '.playwright-cli/p9-bouquet-bow-indicator.png' });

  // Touch the ribbon bow!
  await page.click('text="Mở chiếc nơ bí mật 🎀"');
  await page.waitForTimeout(2500);
  await page.screenshot({ path: '.playwright-cli/p10-album-scene.png' });

  // Read through album sections
  await page.click('text="Đọc tiếp"');
  await page.waitForTimeout(1000);
  await page.click('text="Đọc tiếp"');
  await page.waitForTimeout(1000);
  await page.click('text="Đọc tiếp"');
  await page.waitForTimeout(1000);
  await page.click('text="Đọc tiếp"');
  await page.waitForTimeout(1000);
  await page.click('text="Đọc tiếp"');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '.playwright-cli/p11-album-final-climax.png' });

  await browser.close();
  console.log('ALL JOURNEY STEPS COMPLETED SUCCESSFULLY!');
})();
