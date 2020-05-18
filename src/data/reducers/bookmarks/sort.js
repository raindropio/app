import { SPACE_LOAD_REQ, SPACE_RELOAD_REQ, SPACE_REFRESH_REQ, SPACE_CHANGE_SORT } from '../../constants/bookmarks'
import { blankSpace } from '../../helpers/bookmarks'

export default function(state, action) {switch (action.type) {
    case SPACE_LOAD_REQ:
    case SPACE_RELOAD_REQ:
    case SPACE_REFRESH_REQ:
    case SPACE_CHANGE_SORT:{
        if (action.ignore) return state

        const space = state.getIn(['spaces', action.spaceId])

        if (!space) return state

        //Available sorts
        const sorts = blankSpace.sorts
            .setIn(
                ['sort', 'enabled'],
                parseInt(action.spaceId) != 0 && !space.getIn(['query', 'search']).length
            )
            .setIn(
                ['score', 'enabled'],
                space.getIn(['query', 'search']).length
            )

        //Sort value
        let sort = space.getIn(['query', 'sort'])

        //Reset to default if sort value is disabled, or unavailable
        if (!sorts[sort] || !sorts[sort].enabled)
            sort = '-created'

        return state
            .setIn(['spaces', action.spaceId, 'sorts'], sorts)
            .setIn(['spaces', action.spaceId, 'query', 'sort'], sort)
    }
}}