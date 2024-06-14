import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isPro, userStatus } from '~data/selectors/user'
import { acknowledge } from '~data/actions/config'

import UserUpgrade from '~co/user/upgrade'

const ack_key = 'onboard_upgrade'

export default function OnboardUpgrade(){
    const dispatch = useDispatch()
    const acknowledged = useSelector(state=>(state.config?.acknowledge||[]).includes(ack_key))
    const status = useSelector(state=>userStatus(state).authorized)
    const pro = useSelector(isPro)
    const onClose = useCallback(()=>{ dispatch(acknowledge(ack_key)) }, [dispatch])

    if (status != 'yes' || pro || acknowledged)
        return null

    return (
        <UserUpgrade onClose={onClose} />
    )
}