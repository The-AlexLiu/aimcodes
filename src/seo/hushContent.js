import { HUSH_ABILITY_MEDIA, HUSH_GALLERY } from './hushMedia.js'
// Editorial snapshot: official reveal + VALORANT Korea gameplay, 2026-10-19.
// Keep regional dates and pre-release mechanics distinct from final patch data.
export const HUSH_UPDATED_AT = '2026-10-19'
export const HUSH_IMAGE = '/images/agents/hush/reveal.webp'
export const HUSH_OG_IMAGE = '/images/agents/hush/og.jpg'
export const HUSH_VIDEOS = Object.freeze([
  { id: 'AfcCyTsh4ag', channel: 'VALORANT', url: 'https://www.youtube.com/watch?v=AfcCyTsh4ag' },
  { id: 'XN_HF9KVT0M', channel: 'VALORANT', url: 'https://www.youtube.com/watch?v=XN_HF9KVT0M' },
])

const copy = {
  "en": {
    "title": "Hush in VALORANT: abilities & release date",
    "eyebrow": "NEW DUELIST · CHINA",
    "intro": "A telekinetic Duelist from Guangdong, China. See her guided flash, anchor dash, pull and levitating ultimate in action.",
    "summaryTitle": "Hush at a glance",
    "summary": "Hush is a Duelist from Guangdong, China. Her preview pairs remote object interaction with a flash, an anchor-based dash, a pull and a levitating ultimate. Riot lists her for Season 26 // Act VI.",
    "metaDescription": "Meet VALORANT agent Hush: the RISE AND FALL story trailer, five ability videos and PC controls.",
    "ui": {
      "imageAlt": "Hush in Riot Games’ official VALORANT reveal artwork",
      "credit": "Artwork & gameplay © Riot Games",
      "release": "When does Hush come out?",
      "international": "International servers",
      "china": "Mainland China servers",
      "internationalDate": "October 27, 2026 · reported",
      "chinaDate": "October 29, 2026 · Chinese trailer",
      "kit": "Hush’s abilities",
      "kitNote": "Preview footage · default PC controls. Details may change at launch.",
      "passive": "PASSIVE",
      "video": "Watch Hush in action",
      "videoNames": [
        "Official reveal",
        "Official ability preview"
      ],
      "play": "Play video",
      "watch": "Watch on YouTube",
      "chineseVideo": "Watch the Chinese reveal on Bilibili",
      "navigation": "On this page",
      "next": "Want to adjust your crosshair?",
      "catalog": "Browse crosshair codes",
      "generator": "Adjust a crosshair",
      "homeLink": "New agent: Hush — abilities & release date",
      "action": "Controls",
      "effect": "Effect",
      "showDemo": "Open the official ability preview",
      "closeDemo": "Close video",
      "chinaUnlock": "Mainland China unlock rules are awaiting confirmation in the local launch announcement.",
      "unlockLabel": "How to unlock",
      "heroTitle": "Hush",
      "storyTitle": "Meet Hush",
      "galleryTitle": "Hush in pictures",
      "releaseLabel": "Release & unlock",
      "meet": "Watch her story",
      "galleryHint": "Select an image to enlarge",
      "closeImage": "Close image",
      "expandImage": "Enlarge image"
    },
    "abilities": [
      [
        "Telekinesis",
        "Interact with dropped weapons, the Spike and switches from a distance."
      ],
      [
        "Flow",
        "Dash toward an anchor after a short delay. In the air, Hush briefly hovers first."
      ],
      [
        "Flashbulb",
        "Guide a flash that bursts on a surface or after a delay, blinding players looking at it."
      ],
      [
        "Displacement",
        "Pull players toward the center. Collisions with surfaces or each other cause concuss."
      ],
      [
        "Suspension",
        "Lift players in the affected area, including teammates."
      ]
    ],
    "sections": [],
    "faq": [],
    "internationalUnlock": "On international servers, Riot’s standard system gives new agents a recruitment event: playing earns XP toward the unlock. VP and eligible linked Game Pass access are other routes. Kingdom Credits normally become an option after the recruitment event ends.",
    "abilityLabels": [
      "Remote interaction",
      "Anchor dash",
      "Guided flash",
      "Pull & concuss",
      "Area levitation"
    ],
    "abilityActions": [
      "Aim at a dropped weapon, the Spike or a switch and use the interaction.",
      "Press C to create the anchor; movement follows after a delay.",
      "Fire to throw, or alt-fire to prepare. Press Q again to guide it toward your crosshair.",
      "Fire to throw, or alt-fire to prepare. Press E again to guide it toward your crosshair.",
      "Press X to prepare, fire to launch and guide with your aim. Reactivate X or fire again to detonate."
    ],
    "story": [
      "In RISE AND FALL, Hush handles a fight while taking a call from her mother. Between shots, she reassures her that she has eaten.",
      "The mission ends with a meal and a conversation with Brimstone. Watch the trailer for her telekinetic combat and her dry sense of humor."
    ],
    "galleryLabels": [
      "Cinematic: in combat",
      "Cinematic: dinner after the mission",
      "Cinematic: Hush makes her entrance"
    ]
  },
  "zh-CN": {
    "title": "无畏契约遐思：技能、上线时间与英雄预告",
    "eyebrow": "新决斗者 · 中国",
    "intro": "来自广东的念力决斗者。看引导闪光、锚点位移、牵引与浮空大招怎么用。",
    "summaryTitle": "遐思是什么定位？",
    "summary": "遐思是来自中国广东的决斗者。已公开的演示包含远程拾取、闪光、锚点位移、牵引和浮空大招，Riot 已确认她将在 2026 赛季第六幕登场。",
    "metaDescription": "认识无畏契约新英雄遐思：查看预告剧照，观看 RISE AND FALL 故事预告、五项技能视频和端游操作说明。",
    "ui": {
      "imageAlt": "Riot 官方无畏契约遐思英雄预告封面",
      "credit": "图片与实机演示 © Riot Games",
      "release": "遐思什么时候上线？",
      "international": "国际服",
      "china": "中国大陆国服",
      "internationalDate": "2026 年 10 月 27 日 · 媒体报道",
      "chinaDate": "2026 年 10 月 29 日 · 中文预告",
      "kit": "遐思技能介绍",
      "kitNote": "按端游默认键位说明，效果以上线版本为准。",
      "passive": "被动",
      "video": "先看遐思怎么打",
      "videoNames": [
        "官方英雄预告",
        "官方技能演示"
      ],
      "play": "播放视频",
      "watch": "在 YouTube 观看",
      "chineseVideo": "在哔哩哔哩看中文预告",
      "navigation": "本页内容",
      "next": "想调整准星？",
      "catalog": "查看准星代码",
      "generator": "调整准星",
      "homeLink": "新英雄遐思：技能与上线时间",
      "action": "怎么按",
      "effect": "效果",
      "showDemo": "打开官方技能演示",
      "closeDemo": "收起视频",
      "chinaUnlock": "国服解锁方式待国服上线活动公告确认。",
      "unlockLabel": "怎么解锁",
      "heroTitle": "遐思",
      "storyTitle": "认识遐思",
      "galleryTitle": "角色图集",
      "releaseLabel": "上线与解锁",
      "meet": "看角色故事",
      "galleryHint": "点击图片放大",
      "closeImage": "关闭图片",
      "expandImage": "放大图片"
    },
    "abilities": [
      [
        "远程互动",
        "远距离拾取掉落武器、爆能器，或操作开关。"
      ],
      [
        "锚点位移",
        "短暂延迟后向锚点位移；在空中使用会先悬停。"
      ],
      [
        "引导闪光",
        "引导闪光弹，碰到表面或延迟后爆开，致盲看向爆点的玩家。"
      ],
      [
        "牵引与震荡",
        "将玩家拉向中心；撞到表面或彼此碰撞时造成震荡。"
      ],
      [
        "范围浮空",
        "引爆后让范围内的玩家浮空，也会影响队友。"
      ]
    ],
    "sections": [],
    "faq": [],
    "internationalUnlock": "按国际服现行规则，新英雄上线时会开启招募活动，对局获得的经验会推进解锁；也可使用 VP，或通过符合条件且已关联的 Game Pass 使用英雄。招募活动结束后，通常才开放王国币解锁。",
    "abilityLabels": [
      "远程互动",
      "锚点位移",
      "引导闪光",
      "牵引与震荡",
      "范围浮空"
    ],
    "abilityActions": [
      "准星对准掉落武器、爆能器或开关，使用互动。",
      "按 C 设置锚点，短暂延迟后移动。",
      "左键投出，或右键提前准备；再次按 Q 向准星方向引导。",
      "左键投出，或右键提前准备；再次按 E 向准星方向引导。",
      "按 X 准备，开火发射后用准星引导；再次按 X 或开火引爆。"
    ],
    "story": [
      "在角色预告 RISE AND FALL 里，遐思一边应付眼前的敌人，一边接妈妈的电话，还不忘告诉她自己吃过饭了。",
      "任务结束，她又留下来吃了顿饭，和炼狱聊起刚才的行动。念力战斗之外，预告也拍出了她从容又有点冷幽默的一面。"
    ],
    "galleryLabels": [
      "预告剧照：战斗中",
      "预告剧照：任务后的晚餐",
      "预告剧照：遐思登场"
    ]
  },
  "ja": {
    "title": "VALORANT ハッシュ：スキル・実装日・公式映像",
    "eyebrow": "新デュエリスト · 中国",
    "intro": "中国・広東出身の念動力を操るデュエリスト。誘導フラッシュ、アンカー移動、引き寄せ、浮遊アルティメットを映像でチェック。",
    "summaryTitle": "ハッシュはどんなエージェント？",
    "summary": "中国・広東出身のデュエリストです。遠隔でのアイテム操作、フラッシュ、アンカーへの移動、引き寄せ、浮遊させるアルティメットが紹介されています。Riotの案内はSeason 26 // Act VIです。",
    "metaDescription": "VALORANTの新エージェント、ハッシュを紹介。RISE AND FALLのストーリー映像、5つのスキル動画とPC操作方法をチェック。",
    "ui": {
      "imageAlt": "Riot GamesのVALORANT公式映像に登場するハッシュ",
      "credit": "画像・プレイ映像 © Riot Games",
      "release": "ハッシュの実装日は？",
      "international": "国際サーバー",
      "china": "中国本土サーバー",
      "internationalDate": "2026年10月27日 · 海外報道",
      "chinaDate": "2026年10月29日 · 中国版映像",
      "kit": "ハッシュのスキル",
      "kitNote": "先行公開映像・PCの初期キー設定。実装時に変更される場合があります。",
      "passive": "パッシブ",
      "video": "公式映像で動きを見る",
      "videoNames": [
        "公式トレーラー",
        "公式スキル紹介"
      ],
      "play": "動画を再生",
      "watch": "YouTubeで見る",
      "chineseVideo": "中国版トレーラーをBilibiliで見る",
      "navigation": "目次",
      "next": "クロスヘアを調整したい？",
      "catalog": "クロスヘアコード一覧",
      "generator": "クロスヘアを調整",
      "homeLink": "新エージェント・ハッシュのスキルと実装情報",
      "action": "操作",
      "effect": "効果",
      "showDemo": "公式スキル映像を開く",
      "closeDemo": "動画を閉じる",
      "chinaUnlock": "中国本土の解放条件は、現地の実装イベント告知で確認が必要です。",
      "unlockLabel": "アンロック方法",
      "heroTitle": "ハッシュ Hush",
      "storyTitle": "ハッシュを知る",
      "galleryTitle": "キャラクターギャラリー",
      "releaseLabel": "実装・解除について",
      "meet": "ストーリーを見る",
      "galleryHint": "画像を選択して拡大",
      "closeImage": "画像を閉じる",
      "expandImage": "画像を拡大"
    },
    "abilities": [
      [
        "Telekinesis",
        "離れた位置から落ちた武器やスパイクを回収し、スイッチを操作。"
      ],
      [
        "Flow",
        "短い待機後にアンカーへ移動。空中では一瞬静止してから移動。"
      ],
      [
        "Flashbulb",
        "フラッシュを誘導。地形への接触か一定時間後に炸裂し、見たプレイヤーの視界を奪う。"
      ],
      [
        "Displacement",
        "プレイヤーを中心へ引き寄せる。地形やプレイヤー同士の衝突でスタン。"
      ],
      [
        "Suspension",
        "範囲内のプレイヤーを浮かせる。味方も対象。"
      ]
    ],
    "sections": [],
    "faq": [],
    "internationalUnlock": "国際サーバーの現行システムでは、新エージェントの採用イベント中にプレイしてXPを集めると解放できます。VPや、条件を満たして連携済みのGame Passも選択肢です。キングダムクレジットは通常、採用イベント終了後に使えます。",
    "abilityLabels": [
      "遠隔操作",
      "アンカー移動",
      "誘導フラッシュ",
      "引き寄せとスタン",
      "範囲内を浮遊"
    ],
    "abilityActions": [
      "落ちた武器やスパイク、スイッチに照準を合わせてインタラクトします。",
      "Cでアンカーを作成し、少し間を置いて移動します。",
      "射撃で投げるか、オルト射撃で構えます。Qを再使用して照準方向へ誘導します。",
      "射撃で投げるか、オルト射撃で構えます。Eを再使用して照準方向へ誘導します。",
      "Xで準備し、射撃で発射して照準で誘導します。Xの再使用または射撃で起爆します。"
    ],
    "story": [
      "RISE AND FALLでは、敵との戦闘中に母親からの電話に出るハッシュ。撃ち合いの合間にも、食事は済ませたと伝える。",
      "任務の後は食事に残り、ブリムストーンと会話する。念動力を使った戦いと、彼女の落ち着いたユーモアを映像で楽しもう。"
    ],
    "galleryLabels": [
      "シネマティック：戦闘中",
      "シネマティック：任務後の食事",
      "シネマティック：ハッシュ登場"
    ]
  },
  "es": {
    "title": "Hush en VALORANT: habilidades y fecha de lanzamiento",
    "eyebrow": "NUEVA DUELISTA · CHINA",
    "intro": "Una duelista telequinética de Guangdong, China. Mira su flash guiada, desplazamiento al ancla, atracción y definitiva de levitación.",
    "summaryTitle": "Hush de un vistazo",
    "summary": "Hush es una duelista de Guangdong, China. Su avance combina interacción a distancia, una cegadora, movimiento hacia un ancla, atracción y una definitiva que hace levitar. Riot la anuncia para la temporada 26, acto VI.",
    "metaDescription": "Conoce a Hush de VALORANT: el tráiler RISE AND FALL, cinco vídeos de habilidades y controles de PC.",
    "ui": {
      "imageAlt": "Hush en la imagen oficial de presentación de VALORANT de Riot Games",
      "credit": "Imágenes y jugabilidad © Riot Games",
      "release": "¿Cuándo sale Hush?",
      "international": "Servidores internacionales",
      "china": "Servidores de China continental",
      "internationalDate": "27 de octubre de 2026 · según prensa",
      "chinaDate": "29 de octubre de 2026 · tráiler chino",
      "kit": "Habilidades de Hush",
      "kitNote": "Vista previa y controles predeterminados de PC. Puede cambiar al lanzamiento.",
      "passive": "PASIVA",
      "video": "Mira a Hush en acción",
      "videoNames": [
        "Tráiler oficial",
        "Avance oficial de habilidades"
      ],
      "play": "Reproducir vídeo",
      "watch": "Ver en YouTube",
      "chineseVideo": "Ver el tráiler chino en Bilibili",
      "navigation": "En esta página",
      "next": "¿Quieres ajustar tu mira?",
      "catalog": "Ver códigos de mira",
      "generator": "Ajustar una mira",
      "homeLink": "Nueva agente: Hush — habilidades y lanzamiento",
      "action": "Controles",
      "effect": "Efecto",
      "showDemo": "Abrir el avance oficial de habilidades",
      "closeDemo": "Cerrar vídeo",
      "chinaUnlock": "Las condiciones de desbloqueo en China continental están pendientes del anuncio local de lanzamiento.",
      "unlockLabel": "Cómo desbloquearla",
      "heroTitle": "Hush",
      "storyTitle": "Conoce a Hush",
      "galleryTitle": "Hush en imágenes",
      "releaseLabel": "Lanzamiento y desbloqueo",
      "meet": "Ver su historia",
      "galleryHint": "Selecciona una imagen para ampliarla",
      "closeImage": "Cerrar imagen",
      "expandImage": "Ampliar imagen"
    },
    "abilities": [
      [
        "Telekinesis",
        "Interactúa a distancia con armas caídas, la Spike e interruptores."
      ],
      [
        "Flow",
        "Se desplaza hacia un ancla tras una breve espera. En el aire, flota un instante antes."
      ],
      [
        "Flashbulb",
        "Guía una flash que estalla al tocar una superficie o tras una demora y ciega a quienes la miren."
      ],
      [
        "Displacement",
        "Atrae jugadores al centro. Los choques con superficies o entre jugadores causan conmoción."
      ],
      [
        "Suspension",
        "Eleva a los jugadores de la zona, incluidos los aliados."
      ]
    ],
    "sections": [],
    "faq": [],
    "internationalUnlock": "En los servidores internacionales, el sistema actual permite reclutar agentes nuevos ganando XP durante su evento. También existen opciones con VP o con Game Pass vinculado y elegible. Los créditos del reino suelen estar disponibles al terminar el evento.",
    "abilityLabels": [
      "Interacción a distancia",
      "Movimiento al ancla",
      "Cegadora guiada",
      "Atracción y conmoción",
      "Levitación en área"
    ],
    "abilityActions": [
      "Apunta a un arma caída, la Spike o un interruptor e interactúa.",
      "Pulsa C para crear el ancla; el movimiento llega tras una pausa.",
      "Dispara para lanzar o usa el disparo alternativo para preparar. Pulsa Q de nuevo para guiar hacia la mira.",
      "Dispara para lanzar o usa el disparo alternativo para preparar. Pulsa E de nuevo para guiar hacia la mira.",
      "Pulsa X para preparar, dispara para lanzar y guía con la mira. Reactiva X o dispara de nuevo para detonar."
    ],
    "story": [
      "En RISE AND FALL, Hush se enfrenta a sus enemigos mientras atiende una llamada de su madre. Entre disparos, le asegura que ya ha comido.",
      "Tras la misión se queda a comer y conversa con Brimstone. El tráiler muestra su combate telequinético y su humor seco."
    ],
    "galleryLabels": [
      "Cinemática: en combate",
      "Cinemática: cena tras la misión",
      "Cinemática: la entrada de Hush"
    ]
  },
  "pt-BR": {
    "title": "Hush no VALORANT: habilidades e data de lançamento",
    "eyebrow": "NOVA DUELISTA · CHINA",
    "intro": "Uma duelista telecinética de Guangdong, China. Veja a flash guiada, o avanço até a âncora, a atração e a ultimate de levitação.",
    "summaryTitle": "Hush em poucas palavras",
    "summary": "Hush é uma duelista de Guangdong, na China. A prévia combina interação à distância, flash, avanço até uma âncora, atração e uma ultimate que faz jogadores levitarem. A Riot anuncia sua chegada na temporada 26, ato VI.",
    "metaDescription": "Conheça a Hush de VALORANT: trailer RISE AND FALL, cinco vídeos de habilidades e comandos de PC.",
    "ui": {
      "imageAlt": "Hush na arte oficial de revelação do VALORANT pela Riot Games",
      "credit": "Imagens e gameplay © Riot Games",
      "release": "Quando a Hush chega?",
      "international": "Servidores internacionais",
      "china": "Servidores da China continental",
      "internationalDate": "27 de outubro de 2026 · segundo a imprensa",
      "chinaDate": "29 de outubro de 2026 · trailer chinês",
      "kit": "Habilidades da Hush",
      "kitNote": "Prévia com comandos padrão de PC. Pode mudar no lançamento.",
      "passive": "PASSIVA",
      "video": "Veja a Hush em ação",
      "videoNames": [
        "Trailer oficial",
        "Prévia oficial das habilidades"
      ],
      "play": "Reproduzir vídeo",
      "watch": "Ver no YouTube",
      "chineseVideo": "Ver o trailer chinês no Bilibili",
      "navigation": "Nesta página",
      "next": "Quer ajustar sua mira?",
      "catalog": "Ver códigos de mira",
      "generator": "Ajustar uma mira",
      "homeLink": "Nova agente: Hush — habilidades e lançamento",
      "action": "Controles",
      "effect": "Efeito",
      "showDemo": "Abrir a prévia oficial das habilidades",
      "closeDemo": "Fechar vídeo",
      "chinaUnlock": "As condições de desbloqueio na China continental dependem do anúncio local de lançamento.",
      "unlockLabel": "Como desbloquear",
      "heroTitle": "Hush",
      "storyTitle": "Conheça a Hush",
      "galleryTitle": "Hush em imagens",
      "releaseLabel": "Lançamento e desbloqueio",
      "meet": "Ver a história",
      "galleryHint": "Selecione uma imagem para ampliar",
      "closeImage": "Fechar imagem",
      "expandImage": "Ampliar imagem"
    },
    "abilities": [
      [
        "Telekinesis",
        "Interage à distância com armas no chão, a Spike e interruptores."
      ],
      [
        "Flow",
        "Avança até uma âncora após um breve intervalo. No ar, flutua por um instante antes."
      ],
      [
        "Flashbulb",
        "Guia uma flash que explode ao tocar uma superfície ou após um intervalo, cegando quem olhar."
      ],
      [
        "Displacement",
        "Puxa jogadores para o centro. Colisões com superfícies ou entre jogadores causam concussão."
      ],
      [
        "Suspension",
        "Levanta os jogadores na área, incluindo aliados."
      ]
    ],
    "sections": [],
    "faq": [],
    "internationalUnlock": "Nos servidores internacionais, o sistema atual permite liberar agentes novos ganhando XP no evento de recrutamento. VP e Game Pass vinculado, quando elegível, são outras opções. Créditos Kingdom normalmente ficam disponíveis após o evento.",
    "abilityLabels": [
      "Interação à distância",
      "Avanço até a âncora",
      "Flash guiado",
      "Atração e concussão",
      "Levitação em área"
    ],
    "abilityActions": [
      "Mire em uma arma no chão, na Spike ou em um interruptor e interaja.",
      "Pressione C para criar a âncora; o movimento acontece após um intervalo.",
      "Atire para lançar ou use o disparo alternativo para preparar. Pressione Q novamente para guiar até a mira.",
      "Atire para lançar ou use o disparo alternativo para preparar. Pressione E novamente para guiar até a mira.",
      "Pressione X para preparar, atire para lançar e guie com a mira. Use X novamente ou atire outra vez para detonar."
    ],
    "story": [
      "Em RISE AND FALL, Hush enfrenta inimigos enquanto atende uma ligação da mãe. Entre os tiros, garante que já comeu.",
      "Depois da missão, fica para comer e conversa com Brimstone. O trailer mostra seu combate telecinético e seu humor seco."
    ],
    "galleryLabels": [
      "Cinemática: em combate",
      "Cinemática: jantar após a missão",
      "Cinemática: a chegada da Hush"
    ]
  }
}

const sourceUrls = [
  'https://playvalorant.com/en-us/news/',
  HUSH_VIDEOS[0].url,
  'https://www.youtube.com/watch?v=wt4ME15NxDg',
  'https://www.bilibili.com/video/BV1M4J661Exa/',
  'https://dotesports.com/valorant/news/valorant-hush-reveal',
  'https://www.youtube.com/watch?v=3jFK9A8yf1s',
  'https://playvalorant.com/en-gb/news/game-updates/progression-update-explainer-faq/',
]
const sourceLabels = {
  en: ['Riot Games — Hush announcement', 'VALORANT — official reveal', 'VALORANT Korea — official gameplay', 'Chinese reveal — October 29', 'Dot Esports — reported release date', 'Kanga — English ability names and explanation', 'Riot Games — recruitment system'],
  'zh-CN': ['Riot Games：遐思官宣', 'VALORANT：官方英雄预告', 'VALORANT 韩国官方：技能实机演示', '中文预告：10 月 29 日上线', 'Dot Esports：国际服日期报道', 'Kanga：英文技能名与解说', 'Riot Games：英雄招募规则'],
  ja: ['Riot Games：Hushの発表', 'VALORANT：公式トレーラー', 'VALORANT韓国公式：スキル映像', '中国版映像：10月29日の案内', 'Dot Esports：実装日の報道', 'Kanga：英語名とスキル解説', 'Riot Games：エージェント採用システム'],
  es: ['Riot Games — anuncio de Hush', 'VALORANT — tráiler oficial', 'VALORANT Corea — habilidades oficiales', 'Tráiler chino — 29 de octubre', 'Dot Esports — fecha según prensa', 'Kanga — nombres y explicación en inglés', 'Riot Games — sistema de reclutamiento'],
  'pt-BR': ['Riot Games — anúncio da Hush', 'VALORANT — trailer oficial', 'VALORANT Coreia — habilidades oficiais', 'Trailer chinês — 29 de outubro', 'Dot Esports — data segundo a imprensa', 'Kanga — nomes e explicação em inglês', 'Riot Games — sistema de recrutamento'],
}

export function hushArticleCopy(locale) {
  const item = copy[locale] || copy.en
  const bindings = [item.ui.passive, 'C', 'Q', 'E', 'X']
  const abilities = item.abilities.map(([name, body], index) => ({ name, body, binding: bindings[index], label: item.abilityLabels[index], action: item.abilityActions[index], media: HUSH_ABILITY_MEDIA[index] }))
  return {
    ...item, abilities,
    gallery: HUSH_GALLERY.map((image, index) => ({ ...image, label: item.galleryLabels[index] })),
    metaTitle: `${item.title} | AimCodes`,
    internationalUnlock: item.internationalUnlock,
    sections: abilities.map((ability, index) => ({ id: `ability-${index}`, title: `${ability.binding} · ${ability.label}${ability.label === ability.name ? '' : ` (${ability.name})`}`, paragraphs: [`${item.ui.effect}: ${ability.body}`, `${item.ui.action}: ${ability.action}`], bullets: [] })),
    sources: sourceUrls.map((url, index) => ({ url, label: sourceLabels[locale]?.[index] || sourceLabels.en[index] })),
    recommendedCrosshairIds: [],
    relatedArticleKeys: ['placement', 'colors'], relatedCollectionKeys: [], relatedToolKeys: [],
    cta: item.ui.catalog,
  }
}
