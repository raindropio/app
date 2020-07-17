import { store } from '../../'
import { SPACE_PER_PAGE } from '../../constants/bookmarks'
import { blankSpace } from '../../helpers/bookmarks'
import { load } from '../../actions/bookmarks'

export default (spaceId, onlySelected=false, unlimited=false)=>{
    const state = store.getState()
    const { ids } = (onlySelected && !state.bookmarks.selectMode.all ?
        state.bookmarks.selectMode :
        state.bookmarks.spaces[spaceId]) || blankSpace

    if (!ids.length)
        store.dispatch(load(spaceId))

    return ids
        .map(id=>
            state.bookmarks.elements[id] && state.bookmarks.elements[id].link
        )
        .filter(link=>link)
        .slice(0, unlimited ? undefined : SPACE_PER_PAGE)
}