import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    assetsInlineLimit: 4096,
    sourcemap: false,
    rolldownOptions: {
      output: {
        codeSplitting: {
          // Keep shared core data separate from route-specific editorial text.
          groups: [{
            name: 'collection-editorial',
            test: /\/src\/(seo\/(collectionContent|demandCollectionContent|growthCollectionContent|nextCollectionContent|searchIntentCollections|searchOpportunityContent)\.js|components\/SeoTopicLinks\.jsx)$/,
            includeDependenciesRecursively: false,
          }, {
            name: 'seo-core',
            test: /\/src\/seo\/(routes|content|collectionExpansionContent|japaneseContent)\.js$/,
            includeDependenciesRecursively: false,
          }],
        },
      },
    },
  },
})
