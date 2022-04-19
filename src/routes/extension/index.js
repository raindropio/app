import { target } from '~target'

let Component = target == 'extension' ? 
	require('./index.extension').default :
	function(){return null}

export default Component