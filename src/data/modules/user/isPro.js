import { store } from '../../'

export default ()=>{
    const state = store.getState()
    return state.user.current && state.user.current.pro
}