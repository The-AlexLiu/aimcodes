import { baseCollectionCopy, seoCopy } from './content.js'
import { growthCollectionCopy } from './growthCollectionContent.js'

export function collectionCopy(locale, collectionKey) {
  return baseCollectionCopy(locale, collectionKey)
    || growthCollectionCopy(locale, collectionKey)
    || seoCopy(locale).collections.best
}
