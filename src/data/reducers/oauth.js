import Immutable from 'seamless-immutable'
import * as c from '../constants/oauth'
import { normalizeClient } from '../helpers/oauth'

export default function(state = initialState, action){switch (action.type) {
    //Connections
    case c.OAUTH_CONNECTIONS_LOAD_REQ:{
        return state
            .setIn(['connections', 'status'], 'loading')
    }

    case c.OAUTH_CONNECTIONS_LOAD_SUCCESS:{
        const { items=[] } = action

        const connections = state.connections
            .set('status', 'loaded')
            .set('clients', items.map(normalizeClient))

        return state.set('connections', connections)
    }

    case c.OAUTH_CONNECTIONS_LOAD_ERROR:{
        return state
            .setIn(['connections', 'status'], 'error')
    }

    //My
    case c.OAUTH_MY_LOAD_REQ:{
        return state
            .setIn(['my', 'status'], 'loading')
    }

    case c.OAUTH_MY_LOAD_SUCCESS:{
        const { items=[] } = action

        const my = state.my
            .set('status', 'loaded')
            .set('clients', items.map(normalizeClient))

        return state.set('my', my)
    }

    case c.OAUTH_MY_LOAD_ERROR:{
        return state
            .setIn(['my', 'status'], 'error')
    }

    //Clients
    case c.OAUTH_CLIENT_CREATE_SUCCESS:{
        const { item={} } = action

        if (typeof action.onSuccess == 'function')
            action.onSuccess(item)

        const my = state.my
            .set('clients', [...state.my.clients, normalizeClient(item)])

        return state.set('my', my)
    }

    case c.OAUTH_CLIENT_CREATE_ERROR:{
        if (typeof action.onFail == 'function')
            action.onFail(action.error)

        return state
    }

    case c.OAUTH_CLIENT_UPDATE_SUCCESS:{
        const { _id, item={} } = action

        if (typeof action.onSuccess == 'function')
            action.onSuccess(item)

        const index = state.my.clients.findIndex(client=>client._id == _id)
        if (index == -1)
            return state

        return state.setIn(['my', 'clients', index], normalizeClient(item))
    }

    case c.OAUTH_CLIENT_UPDATE_ERROR:{
        if (typeof action.onFail == 'function')
            action.onFail(action.error)

        return state
    }

    case c.OAUTH_CLIENT_REVOKE_SUCCESS:{
        const { _id } = action

        const connections = state.connections
            .set('clients', state.connections.clients.filter(client=>client._id != _id))

        return state.set('connections', connections)
    }

    case c.OAUTH_CLIENT_REMOVE_SUCCESS:{
        const { _id } = action

        const my = state.my
            .set('clients', state.my.clients.filter(client=>client._id != _id))

        return state.set('my', my)
    }

    default:
		return state
}}

const initialState = Immutable({
    connections: {
        status: 'idle', //idle|loading|loaded|error
        clients: []
    },

    my: {
        status: 'idle', //idle|loading|loaded|error
        clients: []
    }
})