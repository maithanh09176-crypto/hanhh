/**
 * Romantic content, photo collections and romantic wishes for 20/10 gift from Anh to Em
 */

export const BOUQUET_IMAGE = '/images/create/hoa.jpg';

// 18 real photos of Em (strictly omitting anh15.jpg as instructed)
export const EM_PHOTOS = [
  '/images/create/anh1.jpg',
  '/images/create/anh2.jpg',
  '/images/create/anh3.jpg',
  '/images/create/anh4.jpg',
  '/images/create/anh5.jpg',
  '/images/create/anh6.jpg',
  '/images/create/anh7.jpg',
  '/images/create/anh8.jpg',
  '/images/create/anh9.jpg',
  '/images/create/anh10.jpg',
  '/images/create/anh11.jpg',
  '/images/create/anh12.jpg',
  '/images/create/anh13.jpg',
  '/images/create/anh14.jpg',
  '/images/create/anh16.jpg',
  '/images/create/anh17.jpg',
  '/images/create/anh18.jpg',
  '/images/create/anh19.jpg',
];

export const TINY_TRANSITION_MESSAGES = [
  'Ơ khoan! Tớ vừa nhớ ra một chuyện!',
  'Còn có người có quà cho cậu đấy!',
  ' Tớ rời đi đây đã💗',
];

export const BOUQUET_INTRO_MESSAGES = [
  'À mà… Anh có bó hoa muốn tặng Em nữa.',
  'Tuy không được như bao người nhưng em mở ra thử xem🌹',
];

export const DLOVE_SHORT_WISHES = [
  'Luôn vui vẻ và hạnh phúc',
  'Chúc em luôn bình an',
  'Mãi xinh đẹp',
  'Thêm yêu đời',
  'Ngày thêm đáng yêu',
  'Rạng rỡ nhé',
  'Thương em',
  'Chúc em thật nhiều may mắn',
  'Ngập tràn yêu thương',
  'Mong mọi điều dịu dàng sẽ đến với em',
  'Ngày càng xinh xắn',
  'Rực rỡ như hoa',
  'Luôn được nâng niu',
];

export const DLOVE_LETTER_CONTENT = {
  title: 'Gửi cô gái xinh xắn <3',
  paragraphs: [
    'Anh chúc em ngày 20/10 và những ngày khác lúc nào cũng xinh đẹp, nhiều may mắn và bình an, được yêu thương như cách mình mong muốn.',
    'Gặp được em là điều rất may mắn với anh, nên anh chỉ mong những ngày tới em sẽ luôn vui vẻ như vậy.',
    'Hi vọng sẽ thấy em cười thật nhiều hơn',
  ],
  featuredPhoto: '/images/create/anh18.jpg',
};

export interface AlbumWishParagraph {
  id: number;
  title: string;
  lines: string[];
  featuredPhoto: string;
}

export const ALBUM_WISHES: AlbumWishParagraph[] = [
  {
    id: 1,
    title: 'Trọn gói phú quý',
    featuredPhoto: '/images/create/anh1.jpg',
    lines: [
      'Chúc em tiền bạc đủ đầy,',
      'Tự tin tự lập, tháng ngày vươn xa.',
      'Tương lai rộng mở bao la,',
      'Bản lĩnh vững bước, vượt qua phong ba.',
      'Sự nghiệp ngày một thăng hoa,',
      'Bao nhiêu vất vả rồi qua nhẹ nhàng.',
      'Tình duyên hạnh phúc ngập tràn.'
    ],
  },
  {
    id: 2,
    title: 'Nụ cười của Em',
    featuredPhoto: '/images/create/anh2.jpg',
    lines: [
      'Có những bông hoa đẹp vì sắc hương, có những ngày đẹp vì nắng, còn có những khoảnh khắc tự nhiên trở nên đáng nhớ chỉ vì nụ cười của một người.',
      'Với Anh, đôi khi chỉ cần nhìn thấy Em vui, một ngày bình thường cũng trở nên dễ chịu và đáng yêu hơn rất nhiều.',
    ],
  },
  {
    id: 3,
    title: 'Ánh sáng riêng của Em',
    featuredPhoto: '/images/create/anh12.jpg',
    lines: [
      'Anh chúc Em luôn giữ được ánh sáng của riêng mình, luôn gặp những người tử tế, luôn đủ dũng khí để theo đuổi điều Em yêu thích và luôn có bình yên để tận hưởng những điều giản dị.',
      'Mong những ngày phía trước sẽ mang đến cho Em thật nhiều niềm vui, những bất ngờ dễ thương và những lý do để mỉm cười mỗi sáng.',
    ],
  },
  {
    id: 4,
    title: 'Mong Em luôn được dịu dàng',
    featuredPhoto: '/images/create/anh14.jpg',
    lines: [
      'Anh mong những ngày của Em sẽ có thật nhiều niềm vui, và cả những ngày không vui cũng sẽ trôi qua thật nhẹ nhàng.',
     'Mong Em luôn gặp được những người chân thành, có người lắng nghe những điều Em muốn kể và có những khoảnh khắc khiến Em cảm thấy cuộc sống thật đáng yêu.',
     'Và dù bận rộn đến đâu, Anh mong Em vẫn luôn dành cho mình một chút thời gian để nghỉ ngơi, mỉm cười và tận hưởng những điều nhỏ bé quanh mình.'
    ],
  },
  {
    id: 5,
    title: 'Chút niềm vui dành cho Em',
    featuredPhoto: '/images/create/anh3.jpg',
    lines: [
      'Bó hoa này tuy giả, nhưng Anh hy vọng những thứ mà Anh muốn gửi đến Em sẽ là thật.',
     ' Anh mong khi mở nó ra, Em sẽ cảm nhận được một chút niềm vui và chút gì đó mà Anh muốn gửi đến Em.',
     
    ],
  },
];

export const FINAL_CLIMAX_MESSAGES = {
  part1: 'Anh mong Em luôn hạnh phúc, luôn được yêu thương và luôn có những ngày thật dịu dàng.',
  part2: 'Còn nếu một ngày Em cần thêm một lý do để mỉm cười… Anh mong mình có thể kiếm được những lý do nhỏ bé để khiến em vui. ❤️',
  featuredPhoto: '/images/create/anh7.jpg',
};
