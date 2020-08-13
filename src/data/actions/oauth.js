import * as c from '../constants/oauth'

export const loadConnections = ()=>({
	type: c.OAUTH_CONNECTIONS_LOAD_REQ
})

export const clientRevoke = (_id)=>({
    type: c.OAUTH_CLIENT_REVOKE_REQ,
    _id
})