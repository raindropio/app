import { target } from '~target'

let Component = target == 'extension' ? 
	require('./routes').default :
	function(){return null}

export default Component