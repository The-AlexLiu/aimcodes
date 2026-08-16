export function crosshairDisplayName(creative) {
  const match = String(creative.socialCopy || '').match(/matched crosshair is ([^.\n]+)\./i)
  return match?.[1]?.trim() || String(creative.crosshair || '').replaceAll('-', ' ').trim()
}

export function validateCopy(copy, platform, creative) {
  const errors = []
  const caption = String(copy.caption || '').trim()
  const title = String(copy.title || '').trim()
  const description = String(copy.description || '').trim()
  const publicationText = platform === 'youtube' ? description : caption
  const publicCopy = `${title}\n${publicationText}`
  const crosshairName = String(creative.crosshairName || crosshairDisplayName(creative)).trim()
  const technicalId = String(creative.crosshair || '').trim()

  if (platform === 'youtube') {
    if (description.length < 45 || description.length > 1200) errors.push('YouTube description length must be 45-1200 characters')
  } else if (caption.length < 45 || caption.length > 520) {
    errors.push('caption length must be 45-520 characters')
  }
  if (!publicationText.includes(String(creative.average))) errors.push('published text must include the actual average score')
  if (!publicationText.toLowerCase().includes(crosshairName.toLowerCase())) errors.push('published text must mention the rendered crosshair display name')
  if (technicalId && technicalId.toLowerCase() !== crosshairName.toLowerCase() && publicCopy.toLowerCase().includes(technicalId.toLowerCase())) {
    errors.push('published copy must not expose the technical crosshair id')
  }
  if (/creative\s*seed|database\s*(?:id|identifier)|automation|prompt/i.test(publicCopy)) {
    errors.push('published copy must not expose internal production terms')
  }

  const urls = publicationText.match(/https?:\/\/[^\s)]+/gi) || []
  const normalizedUrls = urls.map((url) => url.replace(/[.,!?;:]+$/, ''))
  if (platform === 'youtube') {
    if (normalizedUrls.length !== 1 || normalizedUrls[0] !== 'https://aimcodes.com/en/reaction-time-test/') {
      errors.push('YouTube description must contain exactly one clean AimCodes reaction-test URL')
    }
  } else if (urls.length || /www\./i.test(publicationText)) {
    errors.push('Instagram and TikTok captions must not contain a raw URL')
  }

  const hashtags = publicationText.match(/#[A-Za-z0-9_]+/g) || []
  if (hashtags.length < 2 || hashtags.length > 5) errors.push('published text must contain 2-5 hashtags')
  if (platform === 'youtube' && (!title || title.length > 100)) errors.push('YouTube title must be 1-100 characters')
  return errors
}
