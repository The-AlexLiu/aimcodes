// Shared by the interactive entry pages and their crawlable HTML.
const copy = {
  en: { title: 'Copy a code, then try it in game', body: 'Choose a shape and copy its full code. In VALORANT, open Settings → Crosshair → Import Profile Code and paste it into a spare profile.', link: 'See the import steps' },
  es: { title: 'Copia el código y pruébalo en el juego', body: 'Elige una forma y copia el código completo. En VALORANT, abre Ajustes → Mira → Importar código de perfil y pégalo en un perfil aparte.', link: 'Ver cómo importar la mira' },
  'pt-BR': { title: 'Copie o código e teste no jogo', body: 'Escolha o formato e copie o código completo. No VALORANT, abra Configurações → Mira → Importar código de perfil e cole em um perfil separado.', link: 'Veja como importar a mira' },
  'zh-CN': { title: '复制代码，进游戏试试', body: '选好造型后复制完整代码。在无畏契约中打开「设置 → 准星 → 导入配置代码」，粘贴到备用配置中。', link: '查看导入步骤' },
  ja: { title: 'コードをコピーしてゲームで試す', body: '形を選び、コード全体をコピーします。VALORANTの「設定 → クロスヘア → プロファイルコードをインポート」で、別のプロファイルに貼り付けてください。', link: 'インポート手順を見る' },
}
export function entryHelp(locale) { return copy[locale] || copy.en }
