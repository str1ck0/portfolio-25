import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'portfolio',
  title: 'Portfolio CMS',

  projectId,
  dataset,

  plugins: [
    structureTool(),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },

  basePath: '/studio',
})
