import {
	SHARING_LOAD_REQ, SHARING_LOAD_SUCCESS, SHARING_LOAD_ERROR, SHARING_UNSHARE_REQ, SHARING_UNSHARE_SUCCESS,
	SHARING_SEND_INVITES_REQ, SHARING_SEND_INVITES_SUCCESS, SHARING_SEND_INVITES_ERROR
} from '../../constants/collections'

export default function(state, action) {switch (action.type) {
	//Load
	case SHARING_LOAD_REQ:
	case SHARING_UNSHARE_REQ:{
		return state.setIn(['sharing', 'status', action.collectionId], 'loading')
	}

	case SHARING_LOAD_SUCCESS:{
		return state
            .setIn(['sharing', 'status', action.collectionId], 'loaded')
            .setIn(['sharing', 'items', action.collectionId], action.items)
	}

	case SHARING_LOAD_ERROR:{
		return state
            .setIn(['sharing', 'status', action.collectionId], 'errorLoading')
	}

	//Invites
	case SHARING_SEND_INVITES_REQ:{
		return state
			.setIn(['sharing', 'sendInvitesStatus', action.collectionId], 'loading')
			.setIn(['sharing', 'sendInvitesTo', action.collectionId], [])
	}

	case SHARING_SEND_INVITES_SUCCESS:{
		return state
			.setIn(['sharing', 'sendInvitesStatus', action.collectionId], 'done')
			.setIn(['sharing', 'sendInvitesTo', action.collectionId], action.emails)
	}

	case SHARING_SEND_INVITES_ERROR:{
		return state
			.setIn(['sharing', 'sendInvitesStatus', action.collectionId], 'error')
	}

	//Unshare
	case SHARING_UNSHARE_SUCCESS:{
		//unset `collaborators` field
		if (state.items[action.collectionId])
			state = state.setIn(['items', action.collectionId, 'collaborators'], undefined)

		return state
			.setIn(['sharing', 'status'], state.sharing.status.without(action.collectionId))
			.setIn(['sharing', 'items'], state.sharing.items.without(action.collectionId))
			.setIn(['sharing', 'sendInvitesTo'], state.sharing.sendInvitesTo.without(action.collectionId))
			.setIn(['sharing', 'sendInvitesStatus'], state.sharing.sendInvitesStatus.without(action.collectionId))
	}
}}