/**
 * Configuration and pure logic for Vietnamese Women's Day (20/10) greeting web app
 */

export interface GreetingSettings {
  sender: string;
  recipient: string;
  pronoun: string; // 'cậu', 'em', 'mẹ', 'cô', 'chị', etc.
  openingText: string;
  introBotText: string;
  orderText: string;
  complimentText: string;
  occasionText: string;
  leadText: string;
  wishHealthText: string;
  wishBeautyText: string;
  wishSmileText: string;
  cloverText: string;
  handoverText: string;
  wishLuckText: string;
  questionText: string;
  customLetter: string;
  soundtrackUrl: string;
  musicVolume: number; // 0.0 to 1.0
  autoPlayInterval: number; // in seconds, 0 = manual only
}

export const DEFAULT_GREETING_SETTINGS: GreetingSettings = {
  sender: 'Thành',
  recipient: 'cậu',
  pronoun: 'cậu',
  openingText: 'này {recipient} gì ơi',
  introBotText: 'tớ là Tiny',
  orderText: 'Hôm nay tớ nhận lệnh từ {sender} là để...',
  complimentText: 'ui {recipient} đẹp quá',
  occasionText: 'à thì cũng sắp 20/10 rồi',
  leadText: 'nên là tớ muốn',
  wishHealthText: 'chúc {recipient} thật nhiều sức khỏe',
  wishBeautyText: 'chúc {recipient} thật xinh đẹp',
  wishSmileText: 'và chúc {recipient} luôn giữ nụ cười trên môi',
  cloverText: 'tớ tặng {recipient} ngọn cỏ 4 lá này',
  handoverText: 'nè cầm lấy đi',
  wishLuckText: 'chúc {recipient} gặp được thật nhiều điều may mắn',
  questionText: 'liệu {recipient} có thể?',
  customLetter: 'Chúc {recipient} một ngày 20/10 thật ngập tràn niềm vui, luôn luôn hạnh phúc, rạng rỡ và nhận được thật nhiều yêu thương! Mong mọi điều ước của {recipient} đều trở thành hiện thực ✨',
  soundtrackUrl: '/soundtrack.mp3',
  musicVolume: 0.85,
  autoPlayInterval: 0, // 0 = click to step
};

export interface Preset {
  id: string;
  name: string;
  emoji: string;
  description: string;
  settings: Partial<GreetingSettings>;
}

export const GREETING_PRESETS: Preset[] = [
  {
    id: 'original',
    name: 'Bản gốc (Dr D)',
    emoji: '🤖',
    description: 'Phong cách nguyên bản từ Dr D gửi đến cậu',
    settings: {
      sender: 'Dr D',
      recipient: 'cậu',
      pronoun: 'cậu',
      openingText: 'này cậu gì ơi',
      orderText: 'Hôm nay tớ nhận lệnh từ Dr D là để...',
      complimentText: 'ui cậu đẹp quá',
      wishHealthText: 'chúc cậu thật nhiều sức khỏe',
      wishBeautyText: 'chúc cậu thật xinh đẹp',
      wishSmileText: 'và chúc cậu luôn giữ nụ cười trên môi',
      cloverText: 'tớ tặng cậu ngọn cỏ 4 lá này',
      wishLuckText: 'chúc cậu gặp được thật nhiều điều may mắn',
      questionText: 'liệu cậu có thể?',
    },
  },
  {
    id: 'lover',
    name: 'Tặng Người yêu / Crush',
    emoji: '💖',
    description: 'Ngọt ngào, tình cảm, xưng hô Anh - Em',
    settings: {
      sender: 'Anh',
      recipient: 'Em',
      pronoun: 'em',
      openingText: 'này cô bé đáng yêu ơi',
      orderText: 'Hôm nay tớ nhận lệnh từ Anh là để...',
      complimentText: 'ui hôm nay em xinh đẹp rạng ngời luôn á',
      wishHealthText: 'chúc em luôn luôn mạnh khỏe và bình an',
      wishBeautyText: 'chúc em lúc nào cũng thật xinh đẹp và đáng yêu',
      wishSmileText: 'và chúc em luôn giữ nụ cười hạnh phúc trên môi',
      cloverText: 'tớ thay anh tặng em ngọn cỏ 4 lá may mắn này',
      handoverText: 'nè em cầm lấy đi nha',
      wishLuckText: 'chúc em gặp được muôn vàn điều may mắn và niềm vui',
      questionText: 'liệu em có thể mở lòng nhận tình cảm này chứ?',
      customLetter: 'Gửi người anh thương! Chúc em ngày 20/10 thật hạnh phúc. Cảm ơn em đã xuất hiện và mang đến cho cuộc đời anh biết bao điều dịu dàng. Mong em luôn mỉm cười và mãi ở bên anh nhé! Yêu em rất nhiều ❤️',
    },
  },
  {
    id: 'mom',
    name: 'Tặng Mẹ kính yêu',
    emoji: '💐',
    description: 'Lòng biết ơn sâu sắc, ấm áp gửi Mẹ',
    settings: {
      sender: 'Con',
      recipient: 'Mẹ',
      pronoun: 'mẹ',
      openingText: 'Mẹ yêu ơi...',
      orderText: 'Hôm nay tớ nhận lệnh từ Con của Mẹ là để...',
      complimentText: 'Mẹ là người phụ nữ tuyệt vời nhất trần đời',
      wishHealthText: 'kính chúc Mẹ thật nhiều sức khỏe và dồi dào an vui',
      wishBeautyText: 'chúc Mẹ luôn trẻ trung, yêu đời và bình an',
      wishSmileText: 'và chúc Mẹ luôn luôn giữ nụ cười rạng rỡ trên môi',
      cloverText: 'tớ xin gửi tặng Mẹ ngọn cỏ 4 lá bình an này',
      handoverText: 'Mẹ hãy đón nhận món quà nhỏ này nha',
      wishLuckText: 'chúc Mẹ mỗi ngày trôi qua đều ngập tràn may mắn và phúc lành',
      questionText: 'liệu Mẹ có đang mỉm cười tự hào không ạ?',
      customLetter: 'Mẹ kính yêu! Nhân ngày Phụ nữ Việt Nam 20/10, con chúc Mẹ luôn dồi dào sức khỏe, luôn bình an và vui vẻ mỗi ngày. Cảm ơn Mẹ đã luôn hy sinh và dành trọn tình thương cho chúng con. Con yêu Mẹ rất nhiều! 🌸',
    },
  },
  {
    id: 'teacher',
    name: 'Tặng Cô giáo',
    emoji: '👩‍🏫',
    description: 'Tri ân, kính trọng người lái đò thầm lặng',
    settings: {
      sender: 'Học trò của Cô',
      recipient: 'Cô',
      pronoun: 'cô',
      openingText: 'Kính gửi Cô giáo kính mến...',
      orderText: 'Hôm nay tớ nhận lệnh từ các học trò là để...',
      complimentText: 'Cô luôn là tấm gương tận tụy và ấm áp nhất',
      wishHealthText: 'kính chúc Cô luôn dồi dào sức khỏe và nhiệt huyết',
      wishBeautyText: 'chúc Cô mãi trẻ trung, rạng ngời và thành công',
      wishSmileText: 'và chúc Cô luôn giữ nụ cười hạnh phúc trên bục giảng',
      cloverText: 'chúng em xin tặng Cô đóa cỏ 4 lá tri ân này',
      handoverText: 'Cô nhận lấy tấm lòng của chúng em nhé',
      wishLuckText: 'chúc Cô luôn gặp nhiều may mắn và gặt hái thêm nhiều thành công',
      questionText: 'Cô có cảm nhận được sự kính yêu từ chúng em không ạ?',
      customLetter: 'Nhân ngày 20/10, chúng em xin kính chúc Cô luôn mạnh khỏe, bình an, hạnh phúc và luôn giữ mãi ngọn lửa nhiệt huyết để tiếp tục dìu dắt bao thế hệ học trò cập bến bờ tri thức! 🌹',
    },
  },
  {
    id: 'bestie',
    name: 'Tặng Bạn thân / Đồng nghiệp',
    emoji: '✨',
    description: 'Vui vẻ, gắn kết, năng lượng tích cực',
    settings: {
      sender: 'Tớ',
      recipient: 'Cậu',
      pronoun: 'cậu',
      openingText: 'này bạn thân ơi',
      orderText: 'Hôm nay tớ nhận lệnh bí mật để...',
      complimentText: 'công nhận dạo này nhìn phong cách xịn xò ghê',
      wishHealthText: 'chúc cậu luôn tràn đầy năng lượng và sức khỏe',
      wishBeautyText: 'chúc cậu luôn xinh đẹp, sang chảnh và hút tài lộc',
      wishSmileText: 'và chúc cậu mỗi ngày đều cười thả ga không lo âu',
      cloverText: 'tặng cậu ngọn cỏ 4 lá siêu may mắn này',
      handoverText: 'cầm lấy rồi chia vía giàu sang cho tớ với',
      wishLuckText: 'chúc cậu công việc thuận lợi, KPI vượt mốc vèo vèo',
      questionText: 'tối nay có hẹn đi ăn mừng 20/10 không nào?',
      customLetter: 'Chúc bạn thân 20/10 thật rực rỡ, ngày càng xinh đẹp, công việc thăng tiến, tiền về đầy ví và luôn vui vẻ ngập tràn nha! 🥂',
    },
  },
];

/**
 * Replace placeholders like {recipient} and {sender} in a string
 */
export function formatSceneText(template: string, recipient: string, sender: string): string {
  if (!template) return '';
  return template
    .replace(/\{recipient\}/gi, recipient)
    .replace(/\{sender\}/gi, sender);
}

/**
 * Encodes customized settings into a URL query string
 */
export function encodeGreetingParams(settings: Partial<GreetingSettings>): string {
  const params = new URLSearchParams();
  if (settings.sender && settings.sender !== DEFAULT_GREETING_SETTINGS.sender) {
    params.set('from', settings.sender);
  }
  if (settings.recipient && settings.recipient !== DEFAULT_GREETING_SETTINGS.recipient) {
    params.set('to', settings.recipient);
  }
  if (settings.customLetter && settings.customLetter !== DEFAULT_GREETING_SETTINGS.customLetter) {
    params.set('letter', settings.customLetter);
  }
  if (settings.wishHealthText && settings.wishHealthText !== DEFAULT_GREETING_SETTINGS.wishHealthText) {
    params.set('wh', settings.wishHealthText);
  }
  if (settings.wishBeautyText && settings.wishBeautyText !== DEFAULT_GREETING_SETTINGS.wishBeautyText) {
    params.set('wb', settings.wishBeautyText);
  }
  if (settings.wishSmileText && settings.wishSmileText !== DEFAULT_GREETING_SETTINGS.wishSmileText) {
    params.set('ws', settings.wishSmileText);
  }
  if (settings.wishLuckText && settings.wishLuckText !== DEFAULT_GREETING_SETTINGS.wishLuckText) {
    params.set('wl', settings.wishLuckText);
  }
  return params.toString();
}

/**
 * Decodes URL search parameters into Partial<GreetingSettings>
 */
export function decodeGreetingParams(search: string): Partial<GreetingSettings> {
  if (!search) return {};
  const cleaned = search.startsWith('?') ? search.slice(1) : search;
  const params = new URLSearchParams(cleaned);
  const result: Partial<GreetingSettings> = {};

  const from = params.get('from');
  if (from) result.sender = from;

  const to = params.get('to');
  if (to) {
    result.recipient = to;
    result.pronoun = to;
  }

  const letter = params.get('letter');
  if (letter) result.customLetter = letter;

  const wh = params.get('wh');
  if (wh) result.wishHealthText = wh;

  const wb = params.get('wb');
  if (wb) result.wishBeautyText = wb;

  const ws = params.get('ws');
  if (ws) result.wishSmileText = ws;

  const wl = params.get('wl');
  if (wl) result.wishLuckText = wl;

  return result;
}

/**
 * Scene list with readable titles and descriptions for navigation
 */
export interface SceneInfo {
  index: number;
  id: string;
  title: string;
  subText: string;
  emoji: string;
}

export const SCENES: SceneInfo[] = [
  { index: 0, id: 'wake', title: 'Lời chào', subText: 'này cậu gì ơi', emoji: '👋' },
  { index: 1, id: 'intro', title: 'Tiny thức giấc', subText: 'tớ là Tiny', emoji: '🤖' },
  { index: 2, id: 'order', title: 'Lệnh đặc biệt', subText: 'nhận lệnh từ người gửi', emoji: '📜' },
  { index: 3, id: 'compliment', title: 'Khen ngợi', subText: 'ui cậu đẹp quá (cánh hoa rơi)', emoji: '🌸' },
  { index: 4, id: 'occasion', title: 'Dịp 20/10', subText: 'sắp 20/10 rồi (trời sao & lá vàng)', emoji: '🍂' },
  { index: 5, id: 'lead', title: 'Khởi đầu', subText: 'nên là tớ muốn...', emoji: '✨' },
  { index: 6, id: 'health', title: 'Sức khỏe', subText: 'chúc thật nhiều sức khỏe', emoji: '💪' },
  { index: 7, id: 'beauty', title: 'Xinh đẹp', subText: 'chúc thật xinh đẹp (vườn hoa)', emoji: '🌺' },
  { index: 8, id: 'smile', title: 'Nụ cười', subText: 'luôn giữ nụ cười trên môi', emoji: '😊' },
  { index: 9, id: 'clover', title: 'Cỏ 4 lá', subText: 'tặng ngọn cỏ 4 lá', emoji: '🍀' },
  { index: 10, id: 'handover', title: 'Cầm lấy đi', subText: 'nè cầm lấy đi', emoji: '🎁' },
  { index: 11, id: 'luck', title: 'May mắn', subText: 'thật nhiều điều may mắn', emoji: '🌟' },
  { index: 12, id: 'question', title: 'Lời ngỏ', subText: 'liệu cậu có thể?', emoji: '❓' },
  { index: 13, id: 'flight', title: 'Máy bay & Lời kết', subText: 'máy bay giấy bay qua trời đêm', emoji: '✈️' },
];
