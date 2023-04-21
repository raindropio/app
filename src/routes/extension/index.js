import { target } from '~target'

let Component = target == 'extension' ? 
	require('./index.extension').default :
	require('./index.fallback').default

export default Component