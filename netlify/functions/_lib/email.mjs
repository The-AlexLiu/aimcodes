const localized = {
  en: { subject: 'Your AimCodes Crosshair Pack is ready', title: 'Your Aim Pack is ready', body: 'Open your private pack to preview and copy all five crosshair codes.', cta: 'Open My Aim Pack', help: 'Need help? Reply to this email or contact contact@aimcodes.com.' },
  'zh-cn': { subject: '你的 AimCodes 准星包已生成', title: '你的准星包已准备好', body: '打开专属页面，即可预览并复制全部 5 款准星代码。', cta: '打开我的准星包', help: '需要帮助？直接回复邮件或联系 contact@aimcodes.com。' },
  ja: { subject: 'AimCodes Crosshair Packが完成しました', title: 'Aim Packの準備ができました', body: '専用ページで5つのクロスヘアをプレビューし、コードをコピーできます。', cta: 'My Aim Packを開く', help: 'お困りの場合は、このメールに返信するか contact@aimcodes.com へご連絡ください。' },
  es: { subject: 'Tu AimCodes Crosshair Pack está listo', title: 'Tu Aim Pack está listo', body: 'Abre tu pack privado para probar y copiar los cinco códigos de mira.', cta: 'Abrir Mi Aim Pack', help: '¿Necesitas ayuda? Responde a este correo o escribe a contact@aimcodes.com.' },
  'pt-br': { subject: 'Seu AimCodes Crosshair Pack está pronto', title: 'Seu Aim Pack está pronto', body: 'Abra seu pacote privado para testar e copiar os cinco códigos de mira.', cta: 'Abrir Meu Aim Pack', help: 'Precisa de ajuda? Responda este e-mail ou fale com contact@aimcodes.com.' },
}

export async function sendAccessEmail({ email, locale, accessUrl }) {
  if (!process.env.RESEND_API_KEY || !email) return { sent: false, reason: 'not_configured' }
  const copy = localized[locale] || localized.en
  const from = process.env.RESEND_FROM_EMAIL || 'AimCodes <delivery@mail.aimcodes.com>'
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [email],
      reply_to: 'contact@aimcodes.com',
      subject: copy.subject,
      html: `<div style="background:#071018;color:#f6f8fb;font-family:Arial,sans-serif;padding:32px"><div style="max-width:560px;margin:auto;border:1px solid #29404d;border-radius:18px;padding:32px;background:#0c1922"><p style="color:#ff665f;font-weight:700;letter-spacing:.12em">AIMCODES</p><h1 style="font-size:28px">${copy.title}</h1><p style="color:#b8c7d1;line-height:1.6">${copy.body}</p><p style="margin:28px 0"><a href="${accessUrl}" style="background:#ff5b55;color:white;text-decoration:none;padding:14px 22px;border-radius:10px;font-weight:700">${copy.cta}</a></p><p style="color:#80939f;font-size:13px;line-height:1.5">${copy.help}</p></div></div>`,
    }),
    signal: AbortSignal.timeout(8_000),
  })
  if (!response.ok) throw new Error(`email_delivery_failed_${response.status}`)
  return { sent: true }
}
