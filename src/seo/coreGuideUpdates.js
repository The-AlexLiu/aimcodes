// Shared factual additions; search-specific titles can still differ by locale.
const shootingSource = { label: 'Riot Games — VALORANT Patch Notes 4.10', url: 'https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-4-10/' }
const graphCopy = {
  'zh-CN': ['射击误差图表和准星反馈有什么区别', '性能设置中的 Shooting Error 图表会记录近期射击的误差；准星设置中的 Firing Error 会让线条随射击失准而变化。关闭准星动画不会消除子弹扩散。', 'Riot 在 4.10 版本加入了射击误差图表，方便交火后回看。它与准星误差反馈显示相关信息，但显示位置和查看方式不同。', ['想回看刚才的射击，使用性能图表。', '想在瞄准点附近看到提示，使用准星误差反馈。', '两种显示都不会改变武器精度。'], '射击误差图表和准星射击误差是同一个设置吗？', '它们是两个显示选项：图表记录近期射击，准星反馈随开枪变化。选自己容易理解的提示即可。', '静态准星能消除射击误差吗？', '不能。关闭误差动画只改变瞄准参照，急停、点射间隔和武器本身仍会影响射击。'],
  es: ['Gráfico de error de disparo y respuesta de la mira', 'El gráfico Shooting Error registra los disparos recientes; Firing Error hace que las líneas de la mira reaccionen a la imprecisión. Desactivar la animación no elimina la dispersión.', 'Riot añadió el gráfico en la versión 4.10 para revisar los disparos después de un enfrentamiento. Ofrece información relacionada con la respuesta de error de la mira, en otra presentación.', ['Usa el gráfico para revisar disparos recientes.', 'Usa la respuesta de la mira para ver la señal junto al punto de mira.', 'Ninguna de las dos opciones cambia la precisión del arma.'], '¿El gráfico y el error de la mira son el mismo ajuste?', 'Son dos visualizaciones: el gráfico conserva información reciente y la mira reacciona al disparar.', '¿Una mira estática elimina el error de disparo?', 'No. Solo fija la referencia visual; detenerse, espaciar los disparos y el arma siguen influyendo.'],
  'pt-BR': ['Gráfico de erro de disparo e resposta da mira', 'O gráfico Shooting Error registra tiros recentes; Firing Error faz as linhas da mira reagirem à imprecisão. Desligar a animação não elimina a dispersão.', 'A Riot adicionou o gráfico na atualização 4.10 para revisar tiros após uma troca. Ele apresenta informações relacionadas ao erro da mira em outro formato.', ['Use o gráfico para revisar tiros recentes.', 'Use a resposta da mira para acompanhar o sinal perto do centro.', 'Nenhuma dessas opções altera a precisão da arma.'], 'O gráfico e o erro da mira são o mesmo ajuste?', 'São duas visualizações: o gráfico registra informações recentes e a mira reage durante os tiros.', 'Uma mira estática elimina o erro de disparo?', 'Não. Ela só mantém a referência fixa; parar, espaçar tiros e o comportamento da arma continuam importantes.'],
  ja: ['射撃エラーグラフとクロスヘアの反応の違い', 'Shooting Errorグラフは直近の射撃を記録し、Firing Errorは射撃の不正確さに応じてクロスヘアの線を動かします。アニメーションを切っても弾の拡散はなくなりません。', 'Riotはパッチ4.10で射撃エラーグラフを追加しました。クロスヘアのエラー表示に関連する情報を、交戦後に見返せる形で表示します。', ['直近の射撃を見直すならグラフを使います。', '照準の周りで確認するならクロスヘアのエラー表示を使います。', 'どちらも武器の精度は変えません。'], 'グラフとクロスヘアの射撃エラーは同じ設定？', '別の表示です。グラフは直近の情報を記録し、クロスヘアは射撃中に反応します。', '静的クロスヘアで射撃エラーはなくなる？', 'なくなりません。照準の表示だけが固定され、停止や射撃間隔、武器の性質は引き続き影響します。'],
}
const importCopy = {
  'zh-CN': ['把网站代码导入游戏', '在 AimCodes 打开想用的准星，选好颜色并复制完整代码。进入设置 → 准星 → 导入准星配置代码，粘贴并保存。', ['观战队友时，在聊天框输入 /cc 或 /crosshair copy。', '网站里的完整代码粘贴到配置导入框，不能发到聊天框或颜色输入框。', '保留原来的配置，在训练场比较后再决定。'], '/crosshair copy 和 /cc 有区别吗？', 'Riot 的 5.04 版本说明将两者列为相同用途的命令：观战时，把当前玩家的准星保存为一个新配置。', '完整准星代码粘贴在哪里？', '在设置 → 准星的配置导入框粘贴全文。/cc 用于观战复制，不接收网站上的代码字符串。'],
  es: ['Importar un código de una web', 'Abre una mira en AimCodes, elige el color y copia el código completo. En Ajustes → Mira → Importar código de perfil, pégalo y guarda.', ['Al observar a un compañero, escribe /cc o /crosshair copy en el chat.', 'Pega el código de una web en la importación de perfiles, no en el chat ni en el campo de color.', 'Conserva tu perfil anterior y compara ambos en el campo de práctica.'], '¿/crosshair copy y /cc son distintos?', 'Riot documenta ambos en la versión 5.04 para guardar la mira del jugador observado como un perfil nuevo.', '¿Dónde pego el código completo?', 'En la importación de perfiles de Ajustes → Mira. /cc copia al jugador observado y no recibe un código de una web.'],
  'pt-BR': ['Importar um código de um site', 'Abra uma mira no AimCodes, escolha a cor e copie o código inteiro. Em Configurações → Mira → Importar código de perfil, cole e salve.', ['Ao observar um colega, digite /cc ou /crosshair copy no chat.', 'Cole o código do site na importação de perfis, não no chat nem no campo de cor.', 'Mantenha o perfil anterior para comparar os dois no treino.'], '/crosshair copy e /cc são diferentes?', 'A Riot documenta ambos na atualização 5.04 para salvar a mira do jogador observado como um novo perfil.', 'Onde colo o código inteiro?', 'Na importação de perfis em Configurações → Mira. /cc copia o jogador observado e não recebe um código de site.'],
}

export function completeCoreGuide(locale, key, content) {
  if (key === 'firingError' && graphCopy[locale]) {
    const [title, summary, body, bullets, question, answer, staticQuestion, staticAnswer] = graphCopy[locale]
    return { ...content, summary,
      sections: [{ id: 'shooting-graph-vs-crosshair', title, paragraphs: [body], bullets }, ...content.sections],
      faq: [[question, answer], ...content.faq, [staticQuestion, staticAnswer]],
      sources: [...(content.sources || []), shootingSource],
    }
  }
  if (key === 'copy' && importCopy[locale]) {
    const [title, body, bullets, commandQuestion, commandAnswer, pasteQuestion, pasteAnswer] = importCopy[locale]
    return { ...content,
      sections: [...content.sections, { id: 'website-code-import', title, paragraphs: [body], bullets }],
      faq: [...content.faq, [commandQuestion, commandAnswer], [pasteQuestion, pasteAnswer]],
    }
  }
  return content
}
