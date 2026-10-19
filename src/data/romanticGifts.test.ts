import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BOUQUET_IMAGE,
  EM_PHOTOS,
  ALBUM_WISHES,
  FINAL_CLIMAX_MESSAGES,
  TINY_TRANSITION_MESSAGES,
  BOUQUET_INTRO_MESSAGES,
} from './romanticGifts.ts';

test('BOUQUET_IMAGE is defined correctly', () => {
  assert.equal(BOUQUET_IMAGE, '/images/create/hoa.jpg');
});

test('EM_PHOTOS contains exactly 18 real photos and STRICTLY excludes anh15.jpg', () => {
  assert.equal(EM_PHOTOS.length, 18);
  assert.equal(EM_PHOTOS.includes('/images/create/anh15.jpg'), false);
  assert.ok(EM_PHOTOS.includes('/images/create/anh1.jpg'));
  assert.ok(EM_PHOTOS.includes('/images/create/anh14.jpg'));
  assert.ok(EM_PHOTOS.includes('/images/create/anh16.jpg'));
  assert.ok(EM_PHOTOS.includes('/images/create/anh19.jpg'));
});

test('TINY_TRANSITION_MESSAGES retains Tiny tone (tớ - cậu)', () => {
  assert.equal(TINY_TRANSITION_MESSAGES.length, 3);
  assert.ok(TINY_TRANSITION_MESSAGES[0].includes('Tớ vừa nhớ ra'));
  assert.ok(TINY_TRANSITION_MESSAGES[1].includes('Hình như còn có người đang giấu cậu'));
  assert.ok(TINY_TRANSITION_MESSAGES[2].includes('Tớ rời đi đây đã'));
});

test('BOUQUET_INTRO_MESSAGES starts direct dialogue from Anh to Em', () => {
  assert.equal(BOUQUET_INTRO_MESSAGES.length, 2);
  assert.ok(BOUQUET_INTRO_MESSAGES[0].includes('Anh còn thiếu một bó hoa tặng Em'));
});

test('DLOVE_SHORT_WISHES contains exactly 11 short wishes', async () => {
  const { DLOVE_SHORT_WISHES, DLOVE_LETTER_CONTENT } = await import('./romanticGifts.ts');
  assert.equal(DLOVE_SHORT_WISHES.length, 11);
  assert.ok(DLOVE_SHORT_WISHES.includes('20/10'));
  assert.ok(DLOVE_SHORT_WISHES.includes('Thương em'));
  assert.equal(DLOVE_LETTER_CONTENT.title, 'Gửi cô gái bé nhỏ <3');
  assert.equal(DLOVE_LETTER_CONTENT.paragraphs.length, 3);
});

test('ALBUM_WISHES contains all 5 required heartfelt wish sections', () => {
  assert.equal(ALBUM_WISHES.length, 5);
  ALBUM_WISHES.forEach((wish) => {
    assert.ok(wish.title.length > 0);
    assert.ok(wish.lines.length > 0);
    assert.ok(wish.featuredPhoto.length > 0);
  });
});

test('FINAL_CLIMAX_MESSAGES contains emotional closing messages', () => {
  assert.ok(FINAL_CLIMAX_MESSAGES.part1.includes('thật dịu dàng'));
  assert.ok(FINAL_CLIMAX_MESSAGES.part2.includes('lý do nhỏ bé'));
});
