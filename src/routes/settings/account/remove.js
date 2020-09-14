import React from 'react'
import t from '~t'
import { API_ENDPOINT_URL } from '~data/constants/app'

import { Buttons } from '~co/common/form'
import Button from '~co/common/button'

function SettingsProfileRemove() {
    //don't do target=_blank, otherwise it can make a mistake (due to different auth in app and browser)
    return (
        <Buttons>
            <Button 
                href={`${API_ENDPOINT_URL}user/remove`}
                variant='link'
                accent='danger'>
                {t.s('removeAccount')}
            </Button>
        </Buttons>
    )
}

export default SettingsProfileRemove