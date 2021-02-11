import { SPACE_LOAD_PRE, SPACE_LOAD_REQ, SPACE_REFRESH_REQ, SPACE_CHANGE_SORT } from '../../constants/bookmarks'
import { blankSpace } from '../../helpers/bookmarks'

export default function(state, action) {switch (action.type) {
    case SPACE_LOAD_PRE:
    case SPACE_LOAD_REQ:
    case SPACE_REFRESH_REQ:
    case SPACE_CHANGE_SORT:{
        const { ignore, spaceId } = action

        if (ignore) return state
        let space = state.getIn(['spaces', spaceId])
        if (!space) return state

        //Available sorts
        space = space.set(
            'sorts',
            blankSpace.sorts
                .setIn(
                    ['sort', 'enabled'],
                    parseInt(spaceId) != 0 && !space.getIn(['query', 'search']).length ? true : false
                )
                .setIn(
                    ['score', 'enabled'],
                    space.getIn(['query', 'search']).length ? true : false
                )
        )

        //Reset to default if sort value is disabled, or unavailable
        if (!space.sorts[space.query.sort] || !space.sorts[space.query.sort].enabled)
            space = space.setIn(
                ['query', 'sort'], 
                space.sorts['sort'].enabled ? 'sort' : '-created'
            )

        //update query in action
        action.query = space.query

        return state.setIn(['spaces', spaceId], space)
    }
}}