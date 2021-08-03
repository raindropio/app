import './index.css'
import React from 'react'
import { render } from 'react-dom'
import App from './app'

window.onload = ()=>{
	render(
		<App/>,		
		document.getElementById('react')
	)
}