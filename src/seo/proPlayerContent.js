const content = Object.freeze({
  en: Object.freeze({
    navLabel: 'Pro player profiles',
    eyebrow: 'PRO PLAYER DESK',
    title: 'VALORANT pro player crosshairs',
    intro: 'Open a player profile, test the crosshair on a real map scene, and copy the code without digging through clips or chat commands.',
    metaTitle: 'VALORANT Pro Player Crosshairs & Profiles | AimCodes',
    metaDescription: 'Browse VALORANT pro player profiles with usable crosshair codes, map previews, player information and settings.',
    spotlightTitle: 'Start with a pro player',
    spotlightIntro: 'Pick a player, see the crosshair in action, then copy the code if it feels right.',
    browseAll: 'See all pro players',
    viewProfile: 'Open player profile',
    crosshairLabel: 'Crosshair to try',
    breadcrumb: 'Pro players',
  }),
  es: Object.freeze({
    navLabel: 'Perfiles de pros', eyebrow: 'MESA DE PROS', title: 'Miras de jugadores profesionales de VALORANT',
    intro: 'Abre el perfil de un jugador, prueba su mira en un mapa real y copia el código sin buscar entre clips o comandos del chat.',
    metaTitle: 'Miras y perfiles de jugadores profesionales de VALORANT | AimCodes',
    metaDescription: 'Consulta perfiles de profesionales de VALORANT con códigos de mira utilizables, vista previa, información del jugador y ajustes.',
    spotlightTitle: 'Empieza por un profesional', spotlightIntro: 'Elige un jugador, prueba su mira y copia el código si encaja contigo.',
    browseAll: 'Ver todos los profesionales', viewProfile: 'Abrir perfil', crosshairLabel: 'Mira para probar',
    breadcrumb: 'Profesionales',
  }),
  'pt-BR': Object.freeze({
    navLabel: 'Perfis de pro players', eyebrow: 'CENTRAL DOS PROS', title: 'Miras de pro players de VALORANT',
    intro: 'Abra o perfil, teste a mira em um mapa real e copie o código sem caçar clipe ou comando no chat.',
    metaTitle: 'Miras e perfis de pro players de VALORANT | AimCodes',
    metaDescription: 'Veja perfis de pro players de VALORANT com códigos de mira utilizáveis, prévia, informações do jogador e ajustes.',
    spotlightTitle: 'Comece por um pro player', spotlightIntro: 'Escolha um jogador, teste a mira e copie o código se ela encaixar no seu jogo.',
    browseAll: 'Ver todos os pro players', viewProfile: 'Abrir perfil', crosshairLabel: 'Mira para testar',
    breadcrumb: 'Pro players',
  }),
  'zh-CN': Object.freeze({
    navLabel: '职业选手档案', eyebrow: '职业选手资料库', title: '无畏契约职业选手准星',
    intro: '选一名职业选手，直接在真实地图里试准星，顺手复制代码，不用再翻直播切片和聊天指令。',
    metaTitle: '无畏契约职业选手准星与选手档案 | AimCodes',
    metaDescription: '查看无畏契约职业选手档案、可用准星代码、地图预览、选手资料与设置。',
    spotlightTitle: '先从职业选手里挑', spotlightIntro: '点进选手档案，先看上手效果；顺眼就直接复制代码。',
    browseAll: '查看全部职业选手', viewProfile: '查看选手档案', crosshairLabel: '试试他的准星',
    breadcrumb: '职业选手',
  }),
  ja: Object.freeze({
    navLabel: 'プロ選手プロフィール', eyebrow: 'プロ選手デスク', title: 'VALORANTプロ選手のクロスヘア',
    intro: '選手を選び、実際のマップでクロスヘアを試して、そのままコードをコピー。配信クリップやチャットコマンドを探す必要はありません。',
    metaTitle: 'VALORANTプロ選手のクロスヘアとプロフィール | AimCodes',
    metaDescription: 'VALORANTプロ選手のプロフィール、使えるクロスヘアコード、プレビュー、選手情報と設定を掲載。',
    spotlightTitle: 'プロ選手から選ぶ', spotlightIntro: '気になる選手を選び、マップで試して、合えばコードをコピー。',
    browseAll: 'プロ選手をすべて見る', viewProfile: '選手プロフィールを見る', crosshairLabel: 'このクロスヘアを試す',
    breadcrumb: 'プロ選手',
  }),
})

export function proPlayerHubCopy(locale) {
  return content[locale] || content.en
}
