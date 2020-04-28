import React from 'react'
import t from '~t'
import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { userStatus, errorReason } from '~data/selectors/user'
import * as actions from '~data/actions/user'
import withSearch from '~modules/router/withSearch'
import isURL from 'validator/es/lib/isURL'

import Icon from '~icon'
import SuperImg from '~co/common/superImg'
import Screen from '~co/screen/basic'

export default (Component)=>
	withSearch(
		connect(
			(state, { search })=>{
				let redirectUri = ''
				let uriSuffix = ''

				//get redirect uri
				if (search.params.redirect && isURL(search.params.redirect, {
					require_host: false, 
					host_whitelist: ['raindrop.io', /\.raindrop\.io$/]
				})){
					redirectUri = new URL(search.params.redirect, location.href).toString()
					uriSuffix = `?redirect=${redirectUri}`
				}

				return {
					status: userStatus(state),
					error: errorReason(state),

					redirectUri,
					uriSuffix
				}
			},

			actions
		)(
			(props)=>{
				//redirect when authorized
				if (props.status.authorized == 'yes'){
					//use search query
					if (props.redirectUri)
						return location.href = props.redirectUri
						
					return <Redirect to='/' />
				}
		
				return (
					<Screen>
						<div className='accountPageWrap'>
							<Icon name='diamond' className='cloudCloud' />
							<Icon name='default_collection' className='cloudCloud' />
							<Icon name='video' className='cloudCloud' />
							
							<div className='centerContentWrap accountPage'>
								<div className='centerContent'>
									<div className='dots'><span/><span/><span/><span/><span/><span/></div>
				
									<div className='centerContentBlock'>
										<div className='accountLogo'><SuperImg src='marketing/logoIcon.png' height='72' /></div>
				
										<Component {...props} />
									</div>
				
									<div className='otherLogin'>
										{!props.match.path.includes('lost') &&<Link to={`/account/lost${props.uriSuffix}`} className='button active'>{t.s('recoverPassword')}</Link>}
										{!props.match.path.includes('login') && <Link to={`/account/login${props.uriSuffix}`} className='button active'>{t.s('signIn')}</Link>}
										{!props.match.path.includes('signup') && <Link to={`/account/signup${props.uriSuffix}`} className='button active'>{t.s('signUp')}</Link>}
				
										<a href='https://help.raindrop.io/' target='_blank' className='button active'>{t.s('help')}</a>
									</div>
								</div>
							</div>
						</div>
					</Screen>
				)
			}
		)
	)