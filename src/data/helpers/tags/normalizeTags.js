import { normalizeTag } from './normalizeTag'

export const normalizeTags = tags=>
    (tags||[]).map(normalizeTag)