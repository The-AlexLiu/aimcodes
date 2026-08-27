import { generateCrosshairCode, parseCrosshairCode } from '../utils/crosshairCode.js'
import { haveSameVisibleShape } from '../utils/crosshairSimilarity.js'

const SOURCE_CHECKED_AT = '2026-08-27'

const palette = Object.freeze({
  white: { preset: '0', hex: '#ffffff' },
  green: { preset: '1', hex: '#00ff00' },
  cyan: { preset: '5', hex: '#00ffff' },
  pink: { preset: '6', hex: '#ff00ff' },
  red: { preset: '7', hex: '#ff0000' },
  yellow: { preset: '4', hex: '#ffff00' },
})

const localeNames = Object.freeze({
  en: [
    'Pixel Sun', 'Disco Core', 'Arcade Button', 'Radar Ping', 'Portal Ring', 'Boss Marker', 'Candy Target', 'Neon Orbit',
    'Pixel Goggles', 'Laser Shades', 'Widescreen', 'Candy Bar', 'Signal Bars', 'Horizon Lock', 'Pixel Moustache', 'Stretch Plus',
    'Neon Totem', 'Radio Tower', 'Pixel Totem', 'Antenna', 'Cactus Core', 'Vertical Beam', 'Rocket Core', 'Tall Meme',
    'Crosshairception', 'Four Corners', 'Fortress Frame', 'Warning Frame', 'Chunky Plus', 'Double Cross', 'Shield Lock', 'Final Boss',
    'Pixel Owl', 'Robot Face', 'Crab Claws', 'Frog Eyes', 'Space Bug', 'Tiny Ghost', 'Bat Wings', 'Monster Mask',
    'Coin Slot', 'Power Meter', 'Joystick Gate', 'Pixel Crown', 'Trophy Top', 'Level Up', 'Checkpoint', 'Bonus Target',
    'UFO Beam', 'Satellite Dish', 'Star Gate', 'Planet Core', 'Comet Trail', 'Moon Lander', 'Alien Beacon', 'Warp Tunnel',
    'Hash Mark', 'Exclamation Core', 'Hourglass', 'Compass Point', 'Diamond Gate', 'Equal Sign', 'Bracket Lock', 'Crown Marker',
    'Glitch Box', 'Broken Screen', 'Split Signal', 'Static Burst', 'Error Marker', 'Offset Portal', 'Pixel Storm', 'Corrupted Core',
    'Firework Core', 'Confetti Box', 'Disco Stack', 'Party Crown', 'Sparkler', 'Neon Bow', 'Balloon Knot', 'Celebration Frame',
  ],
  es: [
    'Sol Píxel', 'Núcleo Disco', 'Botón Arcade', 'Pulso Radar', 'Anillo Portal', 'Marca de Jefe', 'Diana Caramelo', 'Órbita Neón',
    'Gafas Píxel', 'Gafas Láser', 'Pantalla Ancha', 'Barra Caramelo', 'Barras de Señal', 'Bloqueo Horizonte', 'Bigote Píxel', 'Plus Estirado',
    'Tótem Neón', 'Torre de Radio', 'Tótem Píxel', 'Antena', 'Núcleo Cactus', 'Haz Vertical', 'Núcleo Cohete', 'Meme Alto',
    'Mira Dentro de Mira', 'Cuatro Esquinas', 'Marco Fortaleza', 'Marco de Alerta', 'Plus Grande', 'Cruz Doble', 'Bloqueo Escudo', 'Jefe Final',
    'Búho Píxel', 'Cara Robot', 'Pinzas de Cangrejo', 'Ojos de Rana', 'Bicho Espacial', 'Fantasma Mini', 'Alas de Murciélago', 'Máscara Monstruo',
    'Ranura de Moneda', 'Medidor de Potencia', 'Puerta Joystick', 'Corona Píxel', 'Copa Píxel', 'Subir de Nivel', 'Punto de Control', 'Diana Bonus',
    'Haz OVNI', 'Antena Satélite', 'Puerta Estelar', 'Núcleo Planeta', 'Rastro de Cometa', 'Módulo Lunar', 'Baliza Alienígena', 'Túnel Warp',
    'Marca Numeral', 'Núcleo Exclamación', 'Reloj de Arena', 'Punta de Brújula', 'Puerta Diamante', 'Signo Igual', 'Cierre de Corchetes', 'Marca Corona',
    'Caja Glitch', 'Pantalla Rota', 'Señal Dividida', 'Ráfaga Estática', 'Marca de Error', 'Portal Desplazado', 'Tormenta Píxel', 'Núcleo Corrupto',
    'Núcleo de Fuegos', 'Caja Confeti', 'Pila Disco', 'Corona de Fiesta', 'Bengala', 'Lazo Neón', 'Nudo de Globo', 'Marco de Fiesta',
  ],
  'pt-BR': [
    'Sol Pixel', 'Núcleo Disco', 'Botão Arcade', 'Pulso de Radar', 'Anel Portal', 'Marca de Chefão', 'Alvo Doce', 'Órbita Neon',
    'Óculos Pixel', 'Óculos Laser', 'Tela Larga', 'Barra Doce', 'Barras de Sinal', 'Trava do Horizonte', 'Bigode Pixel', 'Mais Esticado',
    'Totem Neon', 'Torre de Rádio', 'Totem Pixel', 'Antena', 'Núcleo Cacto', 'Feixe Vertical', 'Núcleo Foguete', 'Meme Alto',
    'Mira Dentro da Mira', 'Quatro Cantos', 'Moldura Fortaleza', 'Moldura de Alerta', 'Mais Robusto', 'Cruz Dupla', 'Trava Escudo', 'Chefão Final',
    'Coruja Pixel', 'Rosto Robô', 'Garras de Caranguejo', 'Olhos de Sapo', 'Inseto Espacial', 'Fantasma Mini', 'Asas de Morcego', 'Máscara Monstro',
    'Entrada de Moeda', 'Medidor de Potência', 'Portal Joystick', 'Coroa Pixel', 'Troféu Pixel', 'Subiu de Nível', 'Checkpoint', 'Alvo Bônus',
    'Feixe OVNI', 'Antena Satélite', 'Portal Estelar', 'Núcleo Planeta', 'Rastro de Cometa', 'Módulo Lunar', 'Farol Alienígena', 'Túnel Warp',
    'Marca de Cerquilha', 'Núcleo Exclamação', 'Ampulheta', 'Ponta da Bússola', 'Portal Diamante', 'Sinal de Igual', 'Trava de Colchetes', 'Marca Coroa',
    'Caixa Glitch', 'Tela Quebrada', 'Sinal Dividido', 'Explosão Estática', 'Marca de Erro', 'Portal Deslocado', 'Tempestade Pixel', 'Núcleo Corrompido',
    'Núcleo de Fogos', 'Caixa de Confete', 'Pilha Disco', 'Coroa de Festa', 'Faísca', 'Laço Neon', 'Nó de Balão', 'Moldura de Festa',
  ],
  'zh-CN': [
    '像素太阳', '迪斯科核心', '街机按钮', '雷达脉冲', '传送门圆环', '首领标记', '糖果靶心', '霓虹轨道',
    '像素护目镜', '激光墨镜', '宽屏准星', '糖果横条', '信号条', '地平线锁定', '像素小胡子', '拉伸加号',
    '霓虹图腾', '无线电塔', '像素图腾', '天线准星', '仙人掌核心', '垂直光束', '火箭核心', '高个表情包',
    '准星套娃', '四角框', '堡垒框架', '警告框', '粗壮加号', '双层十字', '护盾锁定', '最终首领',
    '像素猫头鹰', '机器人脸', '螃蟹钳', '青蛙眼', '太空虫', '迷你幽灵', '蝙蝠翼', '怪兽面具',
    '投币口', '能量槽', '摇杆闸门', '像素王冠', '奖杯顶', '升级标记', '存档点', '奖励靶心',
    '飞碟光束', '卫星天线', '星际之门', '行星核心', '彗星尾迹', '月球着陆器', '外星信标', '跃迁隧道',
    '井号标记', '感叹号核心', '沙漏', '指南针尖', '钻石门', '等号准星', '括号锁', '王冠标记',
    '故障方框', '破损屏幕', '分裂信号', '静电爆发', '报错标记', '偏移传送门', '像素风暴', '损坏核心',
    '烟花核心', '彩纸盒', '迪斯科叠层', '派对王冠', '仙女棒', '霓虹蝴蝶结', '气球结', '庆典框架',
  ],
  ja: [
    'ピクセルサン', 'ディスココア', 'アーケードボタン', 'レーダーパルス', 'ポータルリング', 'ボスマーカー', 'キャンディターゲット', 'ネオンオービット',
    'ピクセルゴーグル', 'レーザーサングラス', 'ワイドスクリーン', 'キャンディバー', 'シグナルバー', 'ホライズンロック', 'ピクセルひげ', 'ストレッチプラス',
    'ネオントーテム', 'ラジオタワー', 'ピクセルトーテム', 'アンテナ', 'サボテンコア', 'バーティカルビーム', 'ロケットコア', 'トールミーム',
    'クロスヘア・イン・クロスヘア', 'フォーコーナー', 'フォートレスフレーム', 'ワーニングフレーム', 'チャンキープラス', 'ダブルクロス', 'シールドロック', 'ファイナルボス',
    'ピクセルフクロウ', 'ロボットフェイス', 'カニのハサミ', 'カエルアイ', 'スペースバグ', 'ミニゴースト', 'コウモリウイング', 'モンスターマスク',
    'コインスロット', 'パワーメーター', 'ジョイスティックゲート', 'ピクセルクラウン', 'トロフィートップ', 'レベルアップ', 'チェックポイント', 'ボーナスターゲット',
    'UFOビーム', 'サテライトディッシュ', 'スターゲート', 'プラネットコア', 'コメットテール', 'ムーンランダー', 'エイリアンビーコン', 'ワープトンネル',
    'ハッシュマーク', 'エクスクラメーションコア', '砂時計', 'コンパスポイント', 'ダイヤモンドゲート', 'イコールサイン', 'ブラケットロック', 'クラウンマーカー',
    'グリッチボックス', 'ブロークンスクリーン', 'スプリットシグナル', 'スタティックバースト', 'エラーマーカー', 'オフセットポータル', 'ピクセルストーム', 'コラプトコア',
    'ファイアワークコア', 'コンフェッティボックス', 'ディスコスタック', 'パーティークラウン', 'スパークラー', 'ネオンリボン', 'バルーンノット', 'セレブレーションフレーム',
  ],
})

const groupCopy = Object.freeze({
  core: {
    description: {
      en: 'A bold center and short rays make this joke crosshair easy to spot.',
      es: 'Un centro marcado y rayos cortos hacen que esta mira de broma sea fácil de ver.',
      'pt-BR': 'Um centro forte e raios curtos deixam esta mira divertida fácil de encontrar.',
      'zh-CN': '醒目的中心配上短线，搞怪但不容易在画面里看丢。',
      ja: '太い中心と短いラインで、ネタ系でも見失いにくいクロスヘアです。',
    },
    bestFor: {
      en: 'casual matches, clips, and players who want a loud center',
      es: 'partidas casuales, clips y jugadores que quieren un centro muy visible',
      'pt-BR': 'partidas casuais, clipes e quem quer um centro bem visível',
      'zh-CN': '娱乐局、短视频素材，以及喜欢醒目中心的玩家',
      ja: 'カジュアル、クリップ撮影、中心をはっきり見たいプレイヤー',
    },
    tradeoff: {
      en: 'The chunky center covers more of distant targets than a tiny competitive sight.',
      es: 'El centro grueso tapa más los objetivos lejanos que una mira competitiva pequeña.',
      'pt-BR': 'O centro grosso cobre mais alvos distantes que uma mira competitiva pequena.',
      'zh-CN': '中心比较粗，远距离会比微型竞技准星多挡一点目标。',
      ja: '中心が太いため、小型の競技向けクロスヘアより遠距離の敵を隠しやすくなります。',
    },
  },
  wide: {
    description: {
      en: 'The horizontal-heavy shape looks like a game HUD sticker while keeping the exact center readable.',
      es: 'La forma horizontal parece una pegatina de HUD sin perder el centro exacto.',
      'pt-BR': 'O formato horizontal lembra um adesivo de HUD sem esconder o centro exato.',
      'zh-CN': '横向造型像游戏 HUD 贴纸，同时保留清楚的中心定位。',
      ja: '横長のHUDステッカー風デザインで、中心位置もしっかり読めます。',
    },
    bestFor: {
      en: 'funny clips and players who like a strong head-line reference',
      es: 'clips divertidos y jugadores que prefieren una referencia horizontal fuerte',
      'pt-BR': 'clipes divertidos e quem gosta de uma referência horizontal forte',
      'zh-CN': '搞笑集锦和喜欢明显头线参照的玩家',
      ja: 'ネタ動画と、ヘッドラインを強く意識したいプレイヤー',
    },
    tradeoff: {
      en: 'Long horizontal bars can cover thin silhouettes during tight angle holds.',
      es: 'Las barras horizontales pueden tapar siluetas finas al aguantar ángulos cerrados.',
      'pt-BR': 'Barras horizontais podem cobrir silhuetas finas em ângulos fechados.',
      'zh-CN': '横线较长，架很窄的角度时可能遮住细小轮廓。',
      ja: '横線が長いため、細い角度では敵のシルエットを隠すことがあります。',
    },
  },
  tall: {
    description: {
      en: 'The vertical-heavy shape turns the center into a playful tower marker.',
      es: 'La forma vertical convierte el centro en una divertida marca de torre.',
      'pt-BR': 'O formato vertical transforma o centro em uma divertida marca de torre.',
      'zh-CN': '纵向拉长的造型像一座小塔，画面辨识度很高。',
      ja: '縦長のシルエットが小さなタワーのように見える、目立つデザインです。',
    },
    bestFor: {
      en: 'custom games, clips, and players who want an unusual vertical reference',
      es: 'partidas personalizadas, clips y una referencia vertical poco común',
      'pt-BR': 'partidas personalizadas, clipes e uma referência vertical diferente',
      'zh-CN': '自定义房、短视频素材和想尝试纵向参照的玩家',
      ja: 'カスタム、クリップ撮影、珍しい縦方向の目印が欲しいプレイヤー',
    },
    tradeoff: {
      en: 'The unusual proportions need a few rounds before they feel natural.',
      es: 'Las proporciones poco comunes necesitan unas rondas de adaptación.',
      'pt-BR': 'A proporção diferente exige algumas rodadas de adaptação.',
      'zh-CN': '比例比较特别，需要几局才能适应手感。',
      ja: '独特な比率なので、慣れるまで数ラウンドかかります。',
    },
  },
  frame: {
    description: {
      en: 'Two spaced layers create an oversized target-within-a-target look.',
      es: 'Dos capas separadas crean una gran diana dentro de otra diana.',
      'pt-BR': 'Duas camadas separadas criam um alvo grande dentro de outro alvo.',
      'zh-CN': '内外两层组合成“靶心套靶心”的夸张效果。',
      ja: '内外2層で、ターゲットの中にもう一つターゲットがあるような見た目です。',
    },
    bestFor: {
      en: 'custom games, funny clips, and players who want maximum personality',
      es: 'partidas personalizadas, clips divertidos y máxima personalidad',
      'pt-BR': 'partidas personalizadas, clipes divertidos e máxima personalidade',
      'zh-CN': '自定义房、搞笑集锦和想把个性拉满的玩家',
      ja: 'カスタム、ネタ動画、とにかく個性を出したいプレイヤー',
    },
    tradeoff: {
      en: 'The extra frame is intentionally busy and can distract in serious ranked games.',
      es: 'El marco extra es intencionalmente cargado y puede distraer en ranked.',
      'pt-BR': 'A moldura extra é carregada de propósito e pode distrair na ranked.',
      'zh-CN': '外框就是故意做得很热闹，认真排位时可能会分散注意力。',
      ja: 'フレームはあえて派手にしているため、真剣なランクでは気が散ることがあります。',
    },
  },
  character: {
    description: {
      en: 'Asymmetric lines and a bright center suggest a tiny game character without hiding the aim point.',
      es: 'Las líneas asimétricas y el centro brillante recuerdan a un personaje sin ocultar el punto de mira.',
      'pt-BR': 'Linhas assimétricas e um centro forte lembram um personagem sem esconder o ponto de mira.',
      'zh-CN': '不对称线条配上醒目中心，像一个小角色，同时不会把瞄准点藏起来。',
      ja: '非対称ラインと明るい中心で、小さなキャラクター感を出しつつ照準点を残しています。',
    },
    bestFor: {
      en: 'clips, custom lobbies, and players who want a crosshair with a face-like silhouette',
      es: 'clips, partidas personalizadas y jugadores que quieren una silueta con cara',
      'pt-BR': 'clipes, partidas personalizadas e quem quer uma silhueta que lembre um rosto',
      'zh-CN': '娱乐集锦、自定义房，以及想要“有表情”准星的玩家',
      ja: 'クリップ、カスタム、顔のようなシルエットが欲しいプレイヤー',
    },
    tradeoff: {
      en: 'The character silhouette is playful, so it is less clean than a standard four-line crosshair.',
      es: 'La silueta es divertida, pero menos limpia que una mira clásica de cuatro líneas.',
      'pt-BR': 'A silhueta é divertida, mas menos limpa que uma mira clássica de quatro linhas.',
      'zh-CN': '角色轮廓更有趣，但没有标准四线准星那么干净利落。',
      ja: 'キャラクター感を優先しているため、標準的な4本線より視界は賑やかです。',
    },
  },
  arcade: {
    description: {
      en: 'Stacked bars and pixel-like spacing give this crosshair the look of an old arcade HUD.',
      es: 'Las barras apiladas y los huecos de píxel le dan un estilo de HUD arcade.',
      'pt-BR': 'Barras empilhadas e espaços em pixel dão à mira um visual de HUD de fliperama.',
      'zh-CN': '叠层线条和像素间距做出老街机 HUD 的感觉。',
      ja: '重なったバーとピクセル風の間隔で、レトロなアーケードHUDを再現しています。',
    },
    bestFor: {
      en: 'retro-themed clips, Deathmatch, and players who enjoy chunky pixel shapes',
      es: 'clips retro, Deathmatch y jugadores a los que les gustan las formas píxel',
      'pt-BR': 'clipes retrô, Mata-Mata e quem curte formas robustas em pixel',
      'zh-CN': '复古主题视频、死斗，以及喜欢像素块造型的玩家',
      ja: 'レトロ系クリップ、デスマッチ、太めのピクセル形状が好きなプレイヤー',
    },
    tradeoff: {
      en: 'Thick pixel bars are highly visible but cover more screen space at long range.',
      es: 'Las barras píxel son muy visibles, pero ocupan más pantalla a larga distancia.',
      'pt-BR': 'As barras em pixel aparecem bem, mas ocupam mais tela a longa distância.',
      'zh-CN': '像素条很醒目，但在远距离会占用更多画面。',
      ja: '太いピクセルバーは見やすい反面、遠距離では画面を多く覆います。',
    },
  },
  space: {
    description: {
      en: 'Wide and vertical layers combine into a small sci-fi marker centered on the first shot.',
      es: 'Capas horizontales y verticales forman una marca de ciencia ficción sobre el primer disparo.',
      'pt-BR': 'Camadas horizontais e verticais formam um pequeno marcador de ficção científica.',
      'zh-CN': '横纵两层组合成小型科幻标记，中心仍对准第一发。',
      ja: '横と縦のレイヤーを組み合わせ、初弾位置を中心にした小さなSFマーカーです。',
    },
    bestFor: {
      en: 'sci-fi edits, custom games, and players who like layered outer-line designs',
      es: 'ediciones de ciencia ficción, partidas personalizadas y diseños con capas exteriores',
      'pt-BR': 'edições de ficção científica, partidas personalizadas e miras com camadas externas',
      'zh-CN': '科幻风剪辑、自定义房和喜欢多层外线的玩家',
      ja: 'SF風の編集、カスタム、外側ラインを重ねたデザインが好きなプレイヤー',
    },
    tradeoff: {
      en: 'The outer layer adds personality but can pull attention away from the center in ranked play.',
      es: 'La capa exterior añade personalidad, pero puede distraer del centro en ranked.',
      'pt-BR': 'A camada externa traz personalidade, mas pode desviar o olhar do centro na ranked.',
      'zh-CN': '外层很有个性，但排位里可能会把注意力从中心带走。',
      ja: '外側レイヤーは個性的ですが、ランクでは中心から視線が外れることがあります。',
    },
  },
  symbol: {
    description: {
      en: 'Clean line ratios turn the crosshair into a recognizable symbol with a precise center gap.',
      es: 'Las proporciones limpias forman un símbolo reconocible con un hueco central preciso.',
      'pt-BR': 'Proporções limpas formam um símbolo reconhecível com um espaço central preciso.',
      'zh-CN': '干净的线条比例组合成易认的小符号，同时保留精确中心间隙。',
      ja: '整ったライン比率で、正確な中央ギャップを持つ分かりやすい記号にしています。',
    },
    bestFor: {
      en: 'players who want a memorable icon that still gives a clear central reference',
      es: 'jugadores que quieren un icono memorable sin perder una referencia central clara',
      'pt-BR': 'quem quer um ícone marcante sem perder uma referência central clara',
      'zh-CN': '想要好记图标，同时保留明确中心参照的玩家',
      ja: '覚えやすいアイコンと明確な中心目印を両立したいプレイヤー',
    },
    tradeoff: {
      en: 'Some symbols favor looks over the compact proportions used by pro-style crosshairs.',
      es: 'Algunos símbolos priorizan el aspecto sobre las proporciones compactas competitivas.',
      'pt-BR': 'Alguns símbolos priorizam o visual em vez das proporções compactas competitivas.',
      'zh-CN': '部分符号更重造型，不像职业风准星那样紧凑。',
      ja: '一部の記号は見た目を優先し、プロ系クロスヘアほどコンパクトではありません。',
    },
  },
  glitch: {
    description: {
      en: 'Mismatched axes and split layers create a deliberate broken-screen effect around the center.',
      es: 'Ejes desiguales y capas separadas crean un efecto intencional de pantalla rota.',
      'pt-BR': 'Eixos diferentes e camadas separadas criam um efeito proposital de tela quebrada.',
      'zh-CN': '错位横纵轴与分层线条，在中心周围做出故障屏效果。',
      ja: 'ずれた縦横比と分割レイヤーで、中心に意図的な故障画面風の見た目を作ります。',
    },
    bestFor: {
      en: 'meme edits, challenge runs, and players who want an intentionally strange sight',
      es: 'ediciones meme, retos y jugadores que quieren una mira deliberadamente extraña',
      'pt-BR': 'edições de meme, desafios e quem quer uma mira estranha de propósito',
      'zh-CN': '整活剪辑、挑战玩法，以及就想要怪准星的玩家',
      ja: 'ネタ編集、チャレンジ企画、あえて変な照準を使いたいプレイヤー',
    },
    tradeoff: {
      en: 'The deliberate imbalance can feel distracting until your eyes learn the true center.',
      es: 'El desequilibrio puede distraer hasta que tus ojos aprendan el centro real.',
      'pt-BR': 'O desequilíbrio pode distrair até seus olhos se acostumarem com o centro real.',
      'zh-CN': '故意做出的不平衡感会分散注意力，需要先适应真正中心。',
      ja: '意図的なアンバランスさがあるため、本当の中心に慣れるまでは気が散りやすいです。',
    },
  },
  party: {
    description: {
      en: 'Bright dots and layered rays make the center look like a tiny celebration effect.',
      es: 'Puntos brillantes y rayos en capas hacen que el centro parezca una pequeña celebración.',
      'pt-BR': 'Pontos brilhantes e raios em camadas fazem o centro parecer uma pequena festa.',
      'zh-CN': '亮色中心点配上分层射线，像一个缩小版庆祝特效。',
      ja: '明るいドットと重なった光線で、中心を小さなお祝いエフェクトのように見せます。',
    },
    bestFor: {
      en: 'victory clips, party queues, and players who want the loudest visual style',
      es: 'clips de victoria, partidas con amigos y jugadores que quieren el estilo más llamativo',
      'pt-BR': 'clipes de vitória, partidas em grupo e quem quer o estilo mais chamativo',
      'zh-CN': '胜利集锦、朋友开黑和喜欢最抢眼造型的玩家',
      ja: '勝利クリップ、パーティーキュー、とにかく派手な見た目が欲しいプレイヤー',
    },
    tradeoff: {
      en: 'This is a showpiece crosshair; save a cleaner profile before serious competitive games.',
      es: 'Es una mira para lucirse; guarda un perfil más limpio antes de jugar competitivo.',
      'pt-BR': 'É uma mira para chamar atenção; salve um perfil mais limpo antes do competitivo.',
      'zh-CN': '这是偏展示效果的准星，认真竞技前建议另存一套干净配置。',
      ja: '見せるためのクロスヘアなので、真剣な対戦前にシンプルな設定も保存しておくのがおすすめです。',
    },
  },
})

const shapeDefinitions = Object.freeze([
  ['pixel-sun', 'yellow', 'core', { dot: [true, 4], inner: [2, 2, 3] }],
  ['disco-core', 'pink', 'core', { outline: true, dot: [true, 6], inner: [1, 4, 1], outer: [1, 2, 6] }],
  ['arcade-button', 'red', 'core', { outline: true, dot: [true, 6], outer: [2, 3, 5] }],
  ['radar-ping', 'green', 'core', { dot: [true, 2], inner: [1, 1, 5], outer: [3, 1, 9] }],
  ['portal-ring', 'cyan', 'core', { inner: [2, 4, 2], outer: [2, 2, 6] }],
  ['boss-marker', 'red', 'core', { outline: true, dot: [true, 3], inner: [3, 5, 1], outer: [1, 4, 7] }],
  ['candy-target', 'pink', 'core', { dot: [true, 4], inner: [6, 2, 2, 4], outer: [2, 6, 1, 8] }],
  ['neon-orbit', 'cyan', 'core', { dot: [true, 1], inner: [1, 4, 2, 2], outer: [4, 1, 2, 7] }],
  ['pixel-goggles', 'white', 'wide', { outline: true, dot: [true, 1], inner: [8, 1, 3, 2], outer: [3, 1, 2, 7] }],
  ['laser-shades', 'red', 'wide', { inner: [10, 1, 2, 1], outer: [2, 1, 4, 6] }],
  ['widescreen', 'green', 'wide', { dot: [true, 2], inner: [9, 2, 3, 3] }],
  ['candy-bar', 'pink', 'wide', { inner: [12, 1, 4, 1], outer: [2, 2, 1, 8] }],
  ['signal-bars', 'yellow', 'wide', { dot: [true, 1], inner: [7, 2, 1, 3], outer: [1, 5, 3, 8] }],
  ['horizon-lock', 'cyan', 'wide', { dot: [true, 3], inner: [10, 1, 1, 4], outer: [3, 1, 1, 9] }],
  ['pixel-moustache', 'white', 'wide', { dot: [true, 2], inner: [8, 1, 4, 1], outer: [1, 3, 1, 8] }],
  ['stretch-plus', 'green', 'wide', { inner: [9, 2, 2, 0], outer: [2, 6, 1, 7] }],
  ['neon-totem', 'pink', 'tall', { dot: [true, 1], inner: [2, 9, 2, 2], outer: [1, 3, 2, 8] }],
  ['radio-tower', 'red', 'tall', { dot: [true, 3], inner: [1, 10, 2, 3], outer: [4, 2, 1, 8] }],
  ['pixel-totem', 'yellow', 'tall', { outline: true, dot: [true, 4], inner: [2, 8, 3, 1], outer: [1, 4, 1, 7] }],
  ['antenna', 'cyan', 'tall', { dot: [true, 1], inner: [1, 8, 1, 4], outer: [3, 1, 2, 9] }],
  ['cactus-core', 'green', 'tall', { dot: [true, 2], inner: [3, 9, 2, 2], outer: [1, 2, 3, 7] }],
  ['vertical-beam', 'white', 'tall', { inner: [1, 10, 3, 1], outer: [4, 1, 1, 8] }],
  ['rocket-core', 'red', 'tall', { dot: [true, 5], inner: [1, 7, 2, 3], outer: [3, 1, 3, 9] }],
  ['tall-meme', 'pink', 'tall', { dot: [true, 3], inner: [2, 12, 1, 2], outer: [5, 1, 1, 8] }],
  ['crosshairception', 'cyan', 'frame', { outline: true, dot: [true, 1], inner: [3, 2, 2], outer: [4, 2, 8] }],
  ['four-corners', 'white', 'frame', { inner: [2, 2, 5], outer: [2, 4, 10] }],
  ['fortress-frame', 'yellow', 'frame', { outline: true, dot: [true, 3], inner: [4, 4, 2], outer: [6, 3, 9] }],
  ['warning-frame', 'red', 'frame', { outline: true, dot: [true, 2], inner: [1, 4, 4], outer: [7, 2, 10] }],
  ['chunky-plus', 'green', 'frame', { outline: true, inner: [5, 6, 0] }],
  ['double-cross', 'pink', 'frame', { inner: [3, 2, 1], outer: [5, 1, 7] }],
  ['shield-lock', 'cyan', 'frame', { dot: [true, 4], inner: [2, 3, 3], outer: [5, 4, 9] }],
  ['final-boss', 'red', 'frame', { outline: true, dot: [true, 6], inner: [4, 6, 2], outer: [7, 3, 10] }],
  ['pixel-owl', 'yellow', 'character', { dot: [true, 2], inner: [6, 2, 2, 2], outer: [2, 6, 2, 7] }],
  ['robot-face', 'cyan', 'character', { outline: true, dot: [true, 4], inner: [5, 2, 3, 1], outer: [5, 1, 2, 8] }],
  ['crab-claws', 'red', 'character', { inner: [8, 2, 3, 4], outer: [3, 6, 2, 10] }],
  ['frog-eyes', 'green', 'character', { dot: [true, 5], inner: [7, 1, 2, 5], outer: [2, 2, 3, 11] }],
  ['space-bug', 'pink', 'character', { outline: true, dot: [true, 2], inner: [4, 7, 2, 3], outer: [8, 2, 1, 10] }],
  ['tiny-ghost', 'white', 'character', { dot: [true, 5], inner: [3, 6, 4, 2], outer: [1, 3, 2, 9] }],
  ['bat-wings', 'red', 'character', { dot: [true, 1], inner: [11, 2, 2, 3], outer: [5, 1, 3, 9] }],
  ['monster-mask', 'green', 'character', { outline: true, dot: [true, 6], inner: [6, 3, 5, 2], outer: [2, 7, 2, 10] }],
  ['coin-slot', 'yellow', 'arcade', { outline: true, dot: [true, 3], inner: [2, 6, 5, 1], outer: [7, 2, 1, 8] }],
  ['power-meter', 'green', 'arcade', { dot: [true, 2], inner: [10, 3, 3, 2], outer: [3, 8, 2, 9] }],
  ['joystick-gate', 'cyan', 'arcade', { dot: [true, 6], inner: [2, 9, 4, 3], outer: [8, 2, 2, 11] }],
  ['pixel-crown', 'yellow', 'arcade', { outline: true, dot: [true, 1], inner: [7, 4, 3, 2], outer: [3, 9, 1, 10] }],
  ['trophy-top', 'white', 'arcade', { dot: [true, 4], inner: [9, 2, 5, 1], outer: [2, 8, 3, 9] }],
  ['level-up', 'green', 'arcade', { inner: [4, 11, 2, 4], outer: [9, 3, 2, 12] }],
  ['checkpoint', 'red', 'arcade', { outline: true, dot: [true, 3], inner: [5, 5, 4, 3], outer: [9, 2, 1, 11] }],
  ['bonus-target', 'pink', 'arcade', { dot: [true, 6], inner: [8, 3, 2, 1], outer: [4, 9, 3, 10] }],
  ['ufo-beam', 'cyan', 'space', { dot: [true, 2], inner: [12, 2, 2, 2], outer: [3, 10, 2, 9] }],
  ['satellite-dish', 'white', 'space', { outline: true, dot: [true, 1], inner: [9, 4, 2, 3], outer: [2, 11, 3, 10] }],
  ['star-gate', 'yellow', 'space', { dot: [true, 5], inner: [4, 4, 3, 4], outer: [10, 6, 2, 11] }],
  ['planet-core', 'pink', 'space', { outline: true, dot: [true, 6], inner: [11, 2, 4, 1], outer: [3, 8, 1, 12] }],
  ['comet-trail', 'red', 'space', { dot: [true, 3], inner: [13, 1, 2, 4], outer: [4, 7, 3, 10] }],
  ['moon-lander', 'white', 'space', { outline: true, inner: [3, 10, 4, 2], outer: [11, 3, 2, 12] }],
  ['alien-beacon', 'green', 'space', { dot: [true, 4], inner: [2, 13, 2, 3], outer: [7, 4, 4, 11] }],
  ['warp-tunnel', 'cyan', 'space', { outline: true, dot: [true, 2], inner: [6, 6, 5, 4], outer: [12, 4, 2, 13] }],
  ['hash-mark', 'white', 'symbol', { inner: [6, 6, 2, 5], outer: [8, 8, 2, 11] }],
  ['exclamation-core', 'red', 'symbol', { dot: [true, 5], inner: [1, 12, 3, 3], outer: [6, 2, 2, 10] }],
  ['hourglass', 'yellow', 'symbol', { outline: true, dot: [true, 1], inner: [4, 9, 3, 4], outer: [9, 4, 3, 12] }],
  ['compass-point', 'cyan', 'symbol', { dot: [true, 2], inner: [3, 13, 1, 2], outer: [13, 3, 1, 11] }],
  ['diamond-gate', 'pink', 'symbol', { outline: true, dot: [true, 4], inner: [5, 7, 2, 5], outer: [10, 5, 2, 13] }],
  ['equal-sign', 'green', 'symbol', { inner: [13, 1, 3, 2], outer: [9, 1, 2, 8] }],
  ['bracket-lock', 'white', 'symbol', { dot: [true, 3], inner: [8, 4, 4, 4], outer: [12, 2, 2, 12] }],
  ['crown-marker', 'yellow', 'symbol', { outline: true, dot: [true, 6], inner: [7, 5, 2, 3], outer: [4, 12, 3, 11] }],
  ['glitch-box', 'cyan', 'glitch', { outline: true, dot: [true, 2], inner: [10, 3, 1, 5], outer: [5, 12, 4, 10] }],
  ['broken-screen', 'red', 'glitch', { inner: [14, 2, 2, 4], outer: [4, 11, 1, 13] }],
  ['split-signal', 'green', 'glitch', { dot: [true, 1], inner: [12, 4, 4, 2], outer: [2, 14, 2, 12] }],
  ['static-burst', 'white', 'glitch', { outline: true, dot: [true, 5], inner: [5, 10, 1, 3], outer: [13, 3, 3, 11] }],
  ['error-marker', 'red', 'glitch', { dot: [true, 6], inner: [2, 14, 4, 1], outer: [11, 4, 2, 10] }],
  ['offset-portal', 'pink', 'glitch', { outline: true, dot: [true, 3], inner: [9, 5, 2, 5], outer: [3, 13, 4, 13] }],
  ['pixel-storm', 'yellow', 'glitch', { dot: [true, 4], inner: [14, 3, 3, 3], outer: [6, 10, 1, 12] }],
  ['corrupted-core', 'cyan', 'glitch', { outline: true, dot: [true, 1], inner: [7, 11, 4, 4], outer: [12, 5, 3, 14] }],
  ['firework-core', 'red', 'party', { dot: [true, 6], inner: [5, 5, 2, 6], outer: [13, 13, 1, 12] }],
  ['confetti-box', 'yellow', 'party', { outline: true, dot: [true, 2], inner: [8, 6, 3, 5], outer: [14, 4, 2, 13] }],
  ['disco-stack', 'pink', 'party', { dot: [true, 5], inner: [3, 11, 5, 2], outer: [10, 3, 2, 14] }],
  ['party-crown', 'yellow', 'party', { outline: true, dot: [true, 4], inner: [11, 5, 3, 4], outer: [5, 14, 1, 12] }],
  ['sparkler', 'white', 'party', { dot: [true, 1], inner: [4, 14, 2, 5], outer: [14, 5, 3, 11] }],
  ['neon-bow', 'cyan', 'party', { outline: true, dot: [true, 3], inner: [13, 4, 4, 3], outer: [4, 12, 2, 14] }],
  ['balloon-knot', 'green', 'party', { dot: [true, 4], inner: [6, 12, 1, 4], outer: [11, 6, 4, 13] }],
  ['celebration-frame', 'pink', 'party', { outline: true, dot: [true, 6], inner: [9, 7, 5, 5], outer: [15, 5, 2, 15] }],
])

function lineOptions(value) {
  if (!value) return { enabled: false, opacity: 1, length: 0, thickness: 1, offset: 0 }
  const [horizontalLength, verticalOrThickness, thicknessOrOffset, maybeOffset] = value
  const asymmetric = value.length === 4
  return {
    enabled: true,
    opacity: 1,
    horizontalLength,
    verticalLength: asymmetric ? verticalOrThickness : horizontalLength,
    thickness: asymmetric ? thicknessOrOffset : verticalOrThickness,
    offset: asymmetric ? maybeOffset : thicknessOrOffset,
  }
}

function buildOptions(definition) {
  const [, colorKey, , shape] = definition
  const color = palette[colorKey]
  return {
    colorPreset: color.preset,
    outline: { enabled: Boolean(shape.outline), opacity: 1, thickness: 1 },
    dot: { enabled: Boolean(shape.dot?.[0]), opacity: 1, size: shape.dot?.[1] || 2 },
    inner: lineOptions(shape.inner),
    outer: lineOptions(shape.outer),
    movementError: false,
    firingError: false,
  }
}

function setupSummary(locale, parsed) {
  const { dot, inner, outer, outline } = parsed.settings
  const innerSize = inner.enabled ? `${inner.horizontalLength}×${inner.verticalLength}` : '—'
  const outerSize = outer.enabled ? `${outer.horizontalLength}×${outer.verticalLength}` : '—'
  const dotSize = dot.enabled ? dot.size : '—'
  const summaries = {
    en: `Setup: inner ${innerSize}, outer ${outerSize}, dot ${dotSize}, outline ${outline.enabled ? 'on' : 'off'}.`,
    es: `Ajuste: interior ${innerSize}, exterior ${outerSize}, punto ${dotSize}, contorno ${outline.enabled ? 'sí' : 'no'}.`,
    'pt-BR': `Ajuste: interna ${innerSize}, externa ${outerSize}, ponto ${dotSize}, contorno ${outline.enabled ? 'sim' : 'não'}.`,
    'zh-CN': `参数：内线 ${innerSize}，外线 ${outerSize}，中心点 ${dotSize}，描边${outline.enabled ? '开启' : '关闭'}。`,
    ja: `設定：内側 ${innerSize}、外側 ${outerSize}、ドット ${dotSize}、アウトライン ${outline.enabled ? 'オン' : 'オフ'}。`,
  }
  return summaries[locale]
}

function localizedCopy(index, groupKey, parsed) {
  return Object.fromEntries(Object.keys(localeNames).map((locale) => {
    const name = localeNames[locale][index]
    return [locale, [name, name, `${groupCopy[groupKey].description[locale]} ${setupSummary(locale, parsed)}`]]
  }))
}

function localizedSeoDetails(index, groupKey, parsed) {
  return Object.fromEntries(Object.keys(localeNames).map((locale) => {
    const name = localeNames[locale][index]
    const bestLead = {
      en: `${name} works best for`,
      es: `${name} va mejor para`,
      'pt-BR': `${name} funciona melhor para`,
      'zh-CN': `${name} 更适合`,
      ja: `${name}は`,
    }[locale]
    const bestEnd = locale === 'ja' ? 'に向いています。' : locale === 'zh-CN' ? '。' : '.'
    return [locale, {
      bestFor: `${bestLead} ${groupCopy[groupKey].bestFor[locale]}${bestEnd} ${setupSummary(locale, parsed)}`,
      tradeoff: groupCopy[groupKey].tradeoff[locale],
    }]
  }))
}

export function buildFunnyCrosshairs(existingCrosshairs = []) {
  const accepted = []

  shapeDefinitions.forEach((definition, index) => {
    const [id, colorKey, groupKey] = definition
    const color = palette[colorKey]
    const code = generateCrosshairCode(buildOptions(definition))
    const candidate = { code, color: color.hex }
    const duplicate = [...existingCrosshairs, ...accepted].find((item) => haveSameVisibleShape(item, candidate))
    if (duplicate) throw new Error(`Funny crosshair ${id} duplicates the visible shape of ${duplicate.id}`)

    const parsed = parseCrosshairCode(code, { fallbackColor: color.hex })
    const copy = localizedCopy(index, groupKey, parsed)
    accepted.push({
      id,
      name: copy.en[0],
      shortName: copy.en[1],
      description: copy.en[2],
      player: '',
      category: 'fun',
      colorName: colorKey,
      colorKey,
      color: color.hex,
      isPro: false,
      isCute: false,
      code,
      sourceName: 'AimCodes · Original',
      sourceUrl: 'https://aimcodes.com/en/about/',
      sourceCheckedAt: SOURCE_CHECKED_AT,
      designFamily: `funny-${groupKey}`,
      useCases: ['funny', 'clips', 'custom-games'],
      tags: ['funny', 'meme', groupKey, colorKey],
      localizedCopy: copy,
      seoDetails: localizedSeoDetails(index, groupKey, parsed),
    })
  })

  return accepted
}

export const FUNNY_CROSSHAIR_IDS = Object.freeze(shapeDefinitions.map(([id]) => id))
