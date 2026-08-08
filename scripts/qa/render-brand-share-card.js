async (page) => {
  await page.setViewportSize({ width: 1200, height: 630 })
  await page.goto('http://127.0.0.1:4182/zh-cn/')

  const dataUrl = await page.evaluate(async () => {
    const [{ createResultShareCard }, { crosshairs }] = await Promise.all([
      import('/src/utils/shareResultCard.js'),
      import('/src/data/crosshairs.js'),
    ])
    const crosshair = { ...crosshairs[0], name: 'TenZ — 经典青色准星' }
    const blob = await createResultShareCard({
      format: 'landscape',
      title: '你的反应段位',
      rankName: '钻石',
      rankRange: '211–230 毫秒',
      average: 218,
      unit: '毫秒',
      taunt: '这枪够快，下一把别让队友先送。',
      pickLabel: '为你选的准星',
      crosshair,
      footer: 'aimcodes.com · 免费测试并复制代码',
      rankColor: '#6d9bd1',
    })
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  })

  await page.setContent(`<!doctype html><html><head><style>*{box-sizing:border-box}body{margin:0;background:#071016}img{display:block;width:1200px;height:630px}</style></head><body><img alt="AimCodes 分享成绩图" src="${dataUrl}"></body></html>`)
  await page.waitForTimeout(200)
}
