import { baseCollectionCopy, seoCopy } from './content.js'
import { demandCollectionCopy } from './demandCollectionContent.js'
import { growthCollectionCopy } from './growthCollectionContent.js'

export function collectionCopy(locale, collectionKey) {
  return baseCollectionCopy(locale, collectionKey)
    || demandCollectionCopy(locale, collectionKey)
    || growthCollectionCopy(locale, collectionKey)
    || seoCopy(locale).collections.best
}
