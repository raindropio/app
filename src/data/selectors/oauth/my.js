import { blankClient } from '../../helpers/oauth'
import { createSelector } from 'reselect'

export const getMyClients = ({ oauth })=>
    oauth.my.clients

export const makeClient = ()=>createSelector(
    [
        ({ oauth })=>oauth.my.clients,
        (state, _id)=>_id
    ],
    (clients, _id)=>
        clients.find(client=>client._id == _id) || blankClient
)

export const getTestToken = ({ oauth }, _id)=>
    oauth.my.testToken[_id] || null