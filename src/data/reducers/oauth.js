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

    //Clients
    case c.OAUTH_CLIENT_REVOKE_SUCCESS:{
        const { _id } = action

        const connections = state.connections
            .set('clients', state.connections.clients.filter(client=>client._id != _id))

        return state.set('connections', connections)
    }

    default:
		return state
}}

const initialState = Immutable({
    connections: {
        status: 'idle', //idle|loading|loaded|error
        clients: []
    }
})