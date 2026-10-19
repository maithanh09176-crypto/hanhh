import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatSceneText,
  encodeGreetingParams,
  decodeGreetingParams,
  DEFAULT_GREETING_SETTINGS,
  GREETING_PRESETS,
  SCENES,
} from './greetingConfig.ts';

test('formatSceneText correctly replaces placeholders', () => {
  const template = 'Hôm nay tớ nhận lệnh từ {sender} để chúc {recipient}!';
  const formatted = formatSceneText(template, 'Ngọc', 'Anh Minh');
  assert.equal(formatted, 'Hôm nay tớ nhận lệnh từ Anh Minh để chúc Ngọc!');
});

test('formatSceneText handles empty strings safely', () => {
  assert.equal(formatSceneText('', 'A', 'B'), '');
  assert.equal(formatSceneText('No placeholders here', 'A', 'B'), 'No placeholders here');
});

test('encodeGreetingParams and decodeGreetingParams round-trip successfully', () => {
  const custom = {
    sender: 'Tuấn',
    recipient: 'Hà',
    customLetter: 'Yêu em nhiều!',
    wishHealthText: 'Khỏe mạnh vui tươi nhé em!',
  };

  const queryString = encodeGreetingParams(custom);
  assert.ok(queryString.includes('from=Tu%E1%BA%A5n') || queryString.includes('from=Tu\u1ea5n') || queryString.includes('from='));
  assert.ok(queryString.includes('to=H%C3%A0') || queryString.includes('to=H\u00e0') || queryString.includes('to='));

  const decoded = decodeGreetingParams(queryString);
  assert.equal(decoded.sender, 'Tuấn');
  assert.equal(decoded.recipient, 'Hà');
  assert.equal(decoded.customLetter, 'Yêu em nhiều!');
  assert.equal(decoded.wishHealthText, 'Khỏe mạnh vui tươi nhé em!');
});

test('decodeGreetingParams handles empty and corrupted strings safely', () => {
  const empty = decodeGreetingParams('');
  assert.deepEqual(empty, {});

  const partial = decodeGreetingParams('?from=Bob');
  assert.equal(partial.sender, 'Bob');
  assert.equal(partial.recipient, undefined);
});

test('GREETING_PRESETS contains all expected templates with valid configurations', () => {
  assert.ok(GREETING_PRESETS.length >= 5);
  const lover = GREETING_PRESETS.find(p => p.id === 'lover');
  assert.ok(lover);
  assert.equal(lover?.settings.sender, 'Anh');
  assert.equal(lover?.settings.recipient, 'Em');

  const mom = GREETING_PRESETS.find(p => p.id === 'mom');
  assert.ok(mom);
  assert.equal(mom?.settings.sender, 'Con');
  assert.equal(mom?.settings.recipient, 'Mẹ');
});

test('SCENES defines 14 interactive steps covering all original storyline phases', () => {
  assert.equal(SCENES.length, 14);
  assert.equal(SCENES[0].id, 'wake');
  assert.equal(SCENES[9].id, 'clover');
  assert.equal(SCENES[13].id, 'flight');
});
