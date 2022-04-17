import { target } from '~target'

let Component = target == 'extension' ? 
	require('./extension').default :
	require('./fallback').default

export default Component