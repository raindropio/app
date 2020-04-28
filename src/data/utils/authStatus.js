import {store} from '../index'

const AuthStatus = (store, {onNotAuthorized})=>{
	let currentValue

	store.subscribe(()=>{
		let previousValue = currentValue
		currentValue = store.getState().user.status.authorized

		if (previousValue !== currentValue){
			switch(currentValue) {
				case 'no':
					if (typeof onNotAuthorized == 'function')
						onNotAuthorized()
				break;
			}
		}
	})
}

export default (options)=>AuthStatus(store, options)