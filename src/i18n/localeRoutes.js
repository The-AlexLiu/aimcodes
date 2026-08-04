export const DEFAULT_LOCALE = 'en'

export const localeRoutes = Object.freeze({
  en: Object.freeze({ path: '/en/', htmlLang: 'en', hreflang: 'en', ogLocale: 'en_US' }),
  es: Object.freeze({ path: '/es/', htmlLang: 'es', hreflang: 'es', ogLocale: 'es_ES' }),
  'pt-BR': Object.freeze({ path: '/pt-br/', htmlLang: 'pt-BR', hreflang: 'pt-BR', ogLocale: 'pt_BR' }),
  'zh-CN': Object.freeze({ path: '/zh-cn/', htmlLang: 'zh-CN', hreflang: 'zh-Hans', ogLocale: 'zh_CN' }),
})

const localeAliases = Object.freeze({
  en: 'en',
  es: 'es',
  pt: 'pt-BR',
  'pt-br': 'pt-BR',
  zh: 'zh-CN',
  'zh-cn': 'zh-CN',
  'zh-hans': 'zh-CN',
})

export function normalizeLocale(value) {
  if (!value) return null
  return localeAliases[String(value).trim().toLowerCase()] || null
}

export function localeFromPath(pathname = '/') {
  const segments = String(pathname).split('/').filter(Boolean)
  for (const segment of segments) {
    const locale = normalizeLocale(segment)
    if (locale) return locale
  }
  return null
}

export function localePath(locale) {
  return (localeRoutes[normalizeLocale(locale)] || localeRoutes[DEFAULT_LOCALE]).path
}

export function buildLocalizedUrl(locale, options = {}) {
  const params = new URLSearchParams(options.search || '')
  params.delete('lang')

  Object.entries(options.params || {}).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') params.delete(key)
    else params.set(key, String(value))
  })

  const query = params.toString()
  return `${localePath(locale)}${query ? `?${query}` : ''}${options.hash || ''}`
}

export function redirectLegacyLanguageUrl(locationLike = window.location) {
  const params = new URLSearchParams(locationLike.search || '')
  const legacyLocale = normalizeLocale(params.get('lang'))
  if (!legacyLocale) return false

  const target = buildLocalizedUrl(legacyLocale, {
    search: locationLike.search,
    hash: locationLike.hash,
  })

  locationLike.replace(target)
  return true
}
