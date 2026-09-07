import { baseCollectionCopy, seoCopy } from './content.js'
import { demandCollectionCopy } from './demandCollectionContent.js'
import { growthCollectionCopy } from './growthCollectionContent.js'
import { nextCollectionCopy } from './nextCollectionContent.js'
import { searchIntentCollectionCopy } from './searchIntentCollections.js'

export function collectionCopy(locale, collectionKey) {
  const content = searchIntentCollectionCopy(locale, collectionKey) || baseCollectionCopy(locale, collectionKey)
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
