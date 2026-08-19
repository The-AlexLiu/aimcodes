const base = Object.freeze({
  en: Object.freeze({
    labels: Object.freeze({ realName: 'Real name', country: 'Country', team: 'Team', role: 'Role', status: 'Status', highlight: 'Known for', crosshair: 'Crosshair to try', active: 'Active player', creator: 'Creator / former pro' }),
    countries: Object.freeze({ BR: 'Brazil', AR: 'Argentina' }),
    roles: Object.freeze({ duelist: 'Duelist', initiator: 'Initiator', iglFlex: 'IGL / flex', flex: 'Flex', sentinelController: 'Sentinel / controller', creator: 'Streamer / creator' }),
    highlights: Object.freeze({ champions2022: 'VALORANT Champions 2022 winner', champions2022Madrid2024: 'Champions 2022 and Masters Madrid 2024 winner', champions2022Igl: 'Champions 2022-winning in-game leader', firstStrikeBrazil: 'First Strike Brazil 2020 champion and MVP', internationalRookie: 'Reached Masters Toronto and Champions in his first VCT season', mastersLondon2026: 'Masters London 2026 winner', brazilCreator: 'Brazilian VALORANT streamer and content creator' }),
    bios: Object.freeze({
      'aspas-dot': 'One of Brazil’s best-known duelists, aspas built his reputation on explosive opening duels and calm late-round finishes.',
      sacy: 'World champion initiator and longtime shot-caller, Sacy now brings his tournament experience to streams and co-streams.',
      saadhak: 'An Argentine in-game leader closely tied to Brazil’s VALORANT scene, known for building teams and adapting mid-series.',
      mwzera: 'A veteran Brazilian rifler with a fast, aggressive style and a long track record in the country’s top competitive lineups.',
      cortezia: 'A Brazilian sentinel and controller who broke into international VCT play after developing in Challengers Brazil.',
      sato: 'A Brazilian duelist from LEVIATÁN’s new generation, known for confident entries and flexible agent picks.',
      tteuw: 'A Brazilian streamer and creator whose energetic VALORANT content keeps him close to the competitive community.',
    }),
  }),
  es: Object.freeze({
    labels: Object.freeze({ realName: 'Nombre real', country: 'País', team: 'Equipo', role: 'Rol', status: 'Estado', highlight: 'Por qué destaca', crosshair: 'Mira para probar', active: 'Jugador activo', creator: 'Creador / exprofesional' }),
    countries: Object.freeze({ BR: 'Brasil', AR: 'Argentina' }), roles: Object.freeze({ duelist: 'Duelista', initiator: 'Iniciador', iglFlex: 'IGL / flexible', flex: 'Flexible', sentinelController: 'Centinela / controlador', creator: 'Streamer / creador' }),
    highlights: Object.freeze({ champions2022: 'Campeón de VALORANT Champions 2022', champions2022Madrid2024: 'Campeón de Champions 2022 y Masters Madrid 2024', champions2022Igl: 'IGL campeón de Champions 2022', firstStrikeBrazil: 'Campeón y MVP de First Strike Brasil 2020', internationalRookie: 'Llegó a Masters Toronto y Champions en su primera temporada VCT', mastersLondon2026: 'Campeón de Masters London 2026', brazilCreator: 'Streamer y creador brasileño de VALORANT' }),
    bios: Object.freeze({ 'aspas-dot': 'Uno de los duelistas brasileños más conocidos, con aperturas explosivas y mucha calma para cerrar rondas.', sacy: 'Iniciador campeón del mundo y voz veterana; ahora comparte su experiencia en directos y retransmisiones.', saadhak: 'IGL argentino muy ligado a la escena brasileña, conocido por construir equipos y adaptar el plan en plena serie.', mwzera: 'Rifler brasileño veterano, agresivo y con una larga trayectoria en la élite competitiva del país.', cortezia: 'Centinela y controlador brasileño que llegó al VCT internacional tras crecer en Challengers Brasil.', sato: 'Duelista brasileño de la nueva generación de LEVIATÁN, con entradas valientes y varios agentes en su repertorio.', tteuw: 'Streamer y creador brasileño con un estilo enérgico y muy conectado con la comunidad competitiva.' }),
  }),
  'pt-BR': Object.freeze({
    labels: Object.freeze({ realName: 'Nome', country: 'País', team: 'Time', role: 'Função', status: 'Momento', highlight: 'Destaque', crosshair: 'Mira para testar', active: 'Em atividade', creator: 'Criador / ex-pro' }),
    countries: Object.freeze({ BR: 'Brasil', AR: 'Argentina' }), roles: Object.freeze({ duelist: 'Duelista', initiator: 'Iniciador', iglFlex: 'IGL / flex', flex: 'Flex', sentinelController: 'Sentinela / controlador', creator: 'Streamer / criador' }),
    highlights: Object.freeze({ champions2022: 'Campeão do VALORANT Champions 2022', champions2022Madrid2024: 'Campeão do Champions 2022 e Masters Madrid 2024', champions2022Igl: 'IGL campeão do Champions 2022', firstStrikeBrazil: 'Campeão e MVP do First Strike Brasil 2020', internationalRookie: 'Chegou ao Masters Toronto e ao Champions na estreia no VCT', mastersLondon2026: 'Campeão do Masters London 2026', brazilCreator: 'Streamer e criador brasileiro de VALORANT' }),
    bios: Object.freeze({ 'aspas-dot': 'Um dos duelistas brasileiros mais conhecidos, famoso por abrir rounds com explosão e fechar clutches com calma.', sacy: 'Iniciador campeão mundial e voz experiente; hoje leva a bagagem competitiva para lives e co-streams.', saadhak: 'IGL argentino muito ligado ao VALORANT brasileiro, conhecido por montar times e ajustar o plano durante a série.', mwzera: 'Rifler brasileiro veterano, agressivo e com longa passagem por alguns dos principais elencos do país.', cortezia: 'Sentinela e controlador brasileiro que chegou ao VCT internacional depois de crescer no Challengers Brasil.', sato: 'Duelista brasileiro da nova geração da LEVIATÁN, com entradas confiantes e flexibilidade de agentes.', tteuw: 'Streamer e criador brasileiro de estilo energético, próximo da comunidade competitiva de VALORANT.' }),
  }),
  'zh-CN': Object.freeze({
    labels: Object.freeze({ realName: '姓名', country: '国家/地区', team: '战队', role: '场上位置', status: '现在', highlight: '代表成绩', crosshair: '试试他的准星', active: '现役选手', creator: '主播 / 退役选手' }),
    countries: Object.freeze({ BR: '巴西', AR: '阿根廷' }), roles: Object.freeze({ duelist: '决斗位', initiator: '先锋位', iglFlex: '指挥 / 多面手', flex: '多面手', sentinelController: '哨卫 / 控场位', creator: '主播 / 内容创作者' }),
    highlights: Object.freeze({ champions2022: '2022 无畏契约全球冠军赛冠军', champions2022Madrid2024: '2022 全球冠军赛、2024 马德里大师赛冠军', champions2022Igl: '2022 全球冠军赛冠军指挥', firstStrikeBrazil: '2020 巴西 First Strike 冠军及 MVP', internationalRookie: '首个 VCT 赛季便打进多伦多大师赛和全球冠军赛', mastersLondon2026: '2026 伦敦大师赛冠军', brazilCreator: '巴西无畏契约主播与内容创作者' }),
    bios: Object.freeze({ 'aspas-dot': '巴西最具代表性的决斗位之一，以大胆的首杀尝试和残局里的冷静处理出名。', sacy: '世界冠军先锋位和老牌指挥型选手，如今主要通过直播与赛事解说分享职业经验。', saadhak: '深耕巴西赛区的阿根廷指挥，擅长搭建队伍体系，也很会在系列赛中临场调整。', mwzera: '巴西老牌枪男，打法主动凶狠，多年来一直活跃在当地一线竞技阵容中。', cortezia: '从巴西挑战者联赛一路打进国际 VCT 的哨卫与控场位选手。', sato: 'LEVIATÁN 新一代巴西决斗位，进点果断，英雄池也不只局限于一种打法。', tteuw: '巴西无畏契约主播与内容创作者，直播风格直接、热闹，与竞技玩家社区联系紧密。' }),
  }),
  ja: Object.freeze({
    labels: Object.freeze({ realName: '本名', country: '国・地域', team: 'チーム', role: 'ロール', status: '現在', highlight: '主な実績', crosshair: 'このクロスヘアを試す', active: '現役選手', creator: '配信者 / 元プロ' }),
    countries: Object.freeze({ BR: 'ブラジル', AR: 'アルゼンチン' }), roles: Object.freeze({ duelist: 'デュエリスト', initiator: 'イニシエーター', iglFlex: 'IGL / フレックス', flex: 'フレックス', sentinelController: 'センチネル / コントローラー', creator: 'ストリーマー / クリエイター' }),
    highlights: Object.freeze({ champions2022: 'VALORANT Champions 2022 優勝', champions2022Madrid2024: 'Champions 2022・Masters Madrid 2024 優勝', champions2022Igl: 'Champions 2022 優勝時のIGL', firstStrikeBrazil: 'First Strike Brazil 2020 優勝・MVP', internationalRookie: 'VCT初年度にMasters TorontoとChampionsへ出場', mastersLondon2026: 'Masters London 2026 優勝', brazilCreator: 'ブラジルのVALORANT配信者・クリエイター' }),
    bios: Object.freeze({ 'aspas-dot': '爆発力のあるエントリーと終盤の落ち着いた判断で知られる、ブラジルを代表するデュエリスト。', sacy: '世界王者のイニシエーター。現在は配信やウォッチパーティーでプロ経験を伝えている。', saadhak: 'ブラジルシーンと深い関わりを持つアルゼンチン人IGL。チーム作りと試合中の修正力で知られる。', mwzera: '長くブラジルのトップチームで戦ってきた、積極的で撃ち合いの強いベテラン。', cortezia: 'ブラジルChallengersから国際VCTへ進んだセンチネル／コントローラー。', sato: 'LEVIATÁNの新世代ブラジル人デュエリスト。大胆なエントリーと幅広いエージェントが持ち味。', tteuw: '競技コミュニティとの距離が近く、勢いのある配信で知られるブラジル人クリエイター。' }),
  }),
})

export function proPlayerProfileCopy(locale, profile) {
  const copy = base[locale] || base.en
  return {
    labels: copy.labels,
    country: copy.countries[profile.countryCode] || profile.countryCode,
    role: copy.roles[profile.roleKey] || profile.roleKey,
    status: copy.labels[profile.statusKey] || profile.statusKey,
    highlight: copy.highlights[profile.highlightKey] || '',
    bio: copy.bios[profile.id] || '',
  }
}
