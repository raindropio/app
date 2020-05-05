import parseISO from 'date-fns/parseISO'

export const parseDate = (d) => typeof d == 'string' ? parseISO(d) : d