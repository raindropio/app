import { store } from '../../'
import { SPACE_PER_PAGE } from '../../constants/bookmarks'

export default (spaceId, onlySelected=false, unlimited=false)=>{
    const state = store.getState()
    const ids = onlySelected && !state.bookmarks.selectMode.all ?
        state.bookmarks.selectMode.ids :
        state.bookmarks.spaces[spaceId].ids

    return ids
        .map(id=>
            state.bookmarks.elements[id] && state.bookmarks.elements[id].link
        )
        .filter(link=>link)
        .slice(0, unlimited ? undefined : SPACE_PER_PAGE)
}