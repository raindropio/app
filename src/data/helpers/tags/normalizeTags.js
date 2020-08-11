import { normalizeTag } from './normalizeTag'

export const normalizeTags = tags=>
    (tags||[])
        .filter(obj=>obj && (obj._id || obj.name))
        .map(normalizeTag)