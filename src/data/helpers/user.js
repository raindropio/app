import Immutable from 'seamless-immutable'

export const normalizeUser = (user={})=>{
	const clean = {
		_id: 				user._id,
		email: 				user.email||'',
		email_MD5: 			user.email_MD5||'',
		fullName: 			user.fullName||'',
		password: 			Boolean(user.password)||false,
		pro: 				Boolean(user.pro)||false,
		proExpire: 			user.proExpire||null,
		files:				user.files||{ size: 0, used: 0 },

		//connect
		google:				user.google || {},
		apple:				user.apple || {},
		facebook:			user.facebook || {},
		twitter:			user.twitter || {},
		vkontakte:			user.vkontakte || {},
		dropbox:			user.dropbox || {},
		gdrive:				user.gdrive || {},
	}

	return Immutable(clean)
}

export const blankCurrent = normalizeUser({})

export const blankSubscription = Immutable({
	plan: '',
	links: {},
	gateway: {},
	loading: false
})