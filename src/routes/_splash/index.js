import { target } from '~target'

let Component = target == 'extension' ? 
	require('./extension').default :
	require('./app').default

export default Component