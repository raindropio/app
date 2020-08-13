import * as c from '../constants/oauth'
import wrapFunc from '../utils/wrapFunc'

//Clients
export const connectionsLoad = ()=>({
	type: c.OAUTH_CONNECTIONS_LOAD_REQ
})

export const myLoad = ()=>({
	type: c.OAUTH_MY_LOAD_REQ
})

//Single
export const clientCreate = (obj, onSuccess, onFail)=>({
    type: c.OAUTH_CLIENT_CREATE_REQ,
    obj,
    onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

export const clientRevoke = (_id)=>({
    type: c.OAUTH_CLIENT_REVOKE_REQ,
    _id
})

export const clientRemove = (_id)=>({
    type: c.OAUTH_CLIENT_REMOVE_REQ,
    _id
})