import s from './index.module.styl'
import React from 'react'
import t from '~t'
import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { userStatus, errorReason } from '~data/selectors/user'
import * as actions from '~data/actions/user'
import withSearch from '~modules/router/withSearch'
import isURL from 'validator/es/lib/isURL'

import Button from '~co/common/button'
import SuperImg from '~co/common/superImg'
import Icon from '~co/common/icon'
import Screen from '~co/screen/basic'
import Bg from './bg'

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
					<Screen className={s.page}>
						<Bg />
						
						<div className={s.content}>
							<div className={s.logo}><SuperImg src='marketing/logoIcon.png' height='72' /></div>
		
							<Component {...props} />
		
							<div className={s.nav}>
								{!props.match.path.includes('lost') &&<Link to={`/account/lost${props.uriSuffix}`} component={Button} data-block>{t.s('recoverPassword')}</Link>}
								{!props.match.path.includes('login') && <Link to={`/account/login${props.uriSuffix}`} component={Button} data-block>{t.s('signIn')}</Link>}
								{!props.match.path.includes('signup') && <Link to={`/account/signup${props.uriSuffix}`} component={Button} data-block>{t.s('signUp')}</Link>}
		
								<Button 
									href='https://help.raindrop.io/' 
									target='_blank' 
									data-block>
									<Icon name='open' size='micro' />
									{t.s('help')}
								</Button>
							</div>
						</div>
					</Screen>
				)
			}
		)
	)