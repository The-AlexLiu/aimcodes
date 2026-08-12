import {
  catalogCrosshairs,
  crosshairCollectionKeys,
  crosshairCollections,
  indexableCrosshairIds,
  indexableCrosshairs,
} from '../src/data/catalogManifest.js'

const errors = []
const allIds = catalogCrosshairs.map((item) => item.id)
const allIdSet = new Set(allIds)
const indexableIdSet = new Set(indexableCrosshairIds)
const EXPECTED_INDEXABLE_COUNT = 156
let collectionNoindexReferences = 0
const collectionMembership = new Map()

if (allIds.length !== allIdSet.size) errors.push('catalog contains duplicate crosshair IDs')
if (indexableCrosshairIds.length !== indexableIdSet.size) errors.push('indexable list contains duplicate crosshair IDs')
if (indexableCrosshairIds.length !== EXPECTED_INDEXABLE_COUNT) {
  errors.push(`expected ${EXPECTED_INDEXABLE_COUNT} indexable crosshairs, received ${indexableCrosshairIds.length}`)
}
if (indexableCrosshairs.length !== indexableCrosshairIds.length) {
  errors.push(`indexable records mismatch: expected ${indexableCrosshairIds.length}, found ${indexableCrosshairs.length}`)
}

for (const id of indexableCrosshairIds) {
  if (!allIdSet.has(id)) errors.push(`indexable crosshair is missing from catalog: ${id}`)
}

const collectionSlugs = new Set()
for (const key of crosshairCollectionKeys) {
  const collection = crosshairCollections[key]
  if (!collection?.slug) errors.push(`collection ${key} is missing a slug`)
  if (collectionSlugs.has(collection?.slug)) errors.push(`duplicate collection slug: ${collection.slug}`)
  collectionSlugs.add(collection?.slug)

  const ids = collection?.crosshairIds || []
  if (ids.length === 0) errors.push(`collection ${key} has no crosshairs`)
  if (ids.length !== new Set(ids).size) errors.push(`collection ${key} contains duplicate crosshair IDs`)
  for (const id of ids) {
    if (!allIdSet.has(id)) errors.push(`collection ${key} references missing crosshair: ${id}`)
    if (!indexableIdSet.has(id)) collectionNoindexReferences += 1
    if (indexableIdSet.has(id)) collectionMembership.set(id, (collectionMembership.get(id) || 0) + 1)
  }
}

for (const id of indexableCrosshairIds) {
  if (!collectionMembership.has(id)) errors.push(`indexable crosshair has no collection link: ${id}`)
}

if (errors.length) {
  console.error(`Catalog manifest validation failed:\n- ${errors.join('\n- ')}`)
  process.exit(1)
}

console.log(`Catalog manifest validation passed: ${catalogCrosshairs.length} source records, ${indexableCrosshairIds.length} indexable records, ${crosshairCollectionKeys.length} collections, ${collectionNoindexReferences} intentional collection-to-noindex references.`)
