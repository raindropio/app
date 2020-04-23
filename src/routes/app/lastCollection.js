import React from 'react'
import { Redirect } from 'react-router-dom'
import UserStore from '~stores/user'

export default ()=>{
	var id
	try{id = parseInt(UserStore.getUser().config.last_collection);}catch(e){}

	return <Redirect to={`/collection/${id||0}`} />
}