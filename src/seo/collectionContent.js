import { baseCollectionCopy, seoCopy } from './content.js'
import { demandCollectionCopy } from './demandCollectionContent.js'
import { growthCollectionCopy } from './growthCollectionContent.js'
import { nextCollectionCopy } from './nextCollectionContent.js'
import { searchIntentCollectionCopy } from './searchIntentCollections.js'
const BATCH_TITLES = {
  es: ['Mejores miras de Sheriff', 'Miras más visibles'],
  'pt-BR': ['Códigos de mira para Sheriff', 'Miras com alta visibilidade'],
  'zh-CN': ['警长准星代码', '高可见度准星'],
  ja: ['シェリフ用クロスヘア', '見やすいクロスヘア'],
}
const BATCH_EN_TITLES = ['Best Sheriff crosshairs', 'Most visible crosshair codes']
const BATCH_EN_TERMS = ['Guardian', 'Outlaw', 'Marshal', 'Burst', 'Spray', 'Long-range']
const BATCH_TERMS = {
  es: ['Guardian', 'Outlaw', 'Marshal', 'ráfaga', 'spray', 'larga distancia'],
  'pt-BR': ['Guardian', 'Outlaw', 'Marshal', 'rajada', 'spray', 'longa distância'],
  'zh-CN': ['戍卫', 'Outlaw', 'Marshal', '连发', '压枪', '远距离'],
  ja: ['ガーディアン', 'アウトロー', 'マーシャル', 'バースト', 'スプレー', '遠距離'],
}
const BATCH_INDEX = { sheriff: 0, visibility: 1, guardian: 2, outlaw: 3, marshal: 4, burst: 5, spray: 6, longRange: 7 }

export function collectionCopy(locale, collectionKey) {
  const batchIndex = BATCH_INDEX[collectionKey] ?? -1
  const batchTerm = batchIndex >= 2 ? (BATCH_TERMS[locale] || BATCH_EN_TERMS)[batchIndex - 2] : null
  const batchTitle = batchIndex < 0 ? null : batchIndex < 2
    ? (BATCH_TITLES[locale] || BATCH_EN_TITLES)[batchIndex]
    : locale === 'zh-CN' ? `无畏契约${batchTerm}准星`
      : locale === 'ja' ? `VALORANT ${batchTerm}用クロスヘア`
        : locale === 'en' ? `${batchTerm} VALORANT crosshairs`
          : `${locale === 'pt-BR' ? 'Miras de' : 'Miras para'} ${batchTerm} VALORANT`
  const localizedBatchTitle = batchTitle && batchIndex < 2 && locale === 'zh-CN' ? `无畏契约${batchTitle}` : batchTitle && batchIndex < 2 && locale === 'ja' ? `VALORANT ${batchTitle}` : batchTitle && batchIndex < 2 && locale !== 'en' ? `${batchTitle} VALORANT` : batchTitle
  const batchBase = localizedBatchTitle ? baseCollectionCopy(locale, 'best') : null
  const content = searchIntentCollectionCopy(locale, collectionKey) || (localizedBatchTitle ? { ...batchBase, label: localizedBatchTitle, title: localizedBatchTitle, metaTitle: `${localizedBatchTitle} | AimCodes`, metaDescription: `${localizedBatchTitle}. ${batchBase.metaDescription}` } : null) || baseCollectionCopy(locale, collectionKey)
    || demandCollectionCopy(locale, collectionKey)
    || growthCollectionCopy(locale, collectionKey)
    || nextCollectionCopy(locale, collectionKey)
    || seoCopy(locale).collections.best
  const links = {
    plus: { collections: ['horizontal', 'static'], articles: ['stretched'] },
    minimalist: { collections: ['static'], articles: [] },
    cyan: { collections: [], articles: ['yellowEnemies'] },
    white: { collections: [], articles: ['invisible'] },
  }[collectionKey]
  if (!links) return content
  return { ...content,
    relatedCollectionKeys: [...new Set([...(content.relatedCollectionKeys || []), ...links.collections])],
    relatedArticleKeys: [...new Set([...(content.relatedArticleKeys || []), ...links.articles])],
  }
}
