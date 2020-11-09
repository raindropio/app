import React from 'react'
import t from '~t'
import { API_ENDPOINT_URL } from '~data/constants/app'

import Button from '~co/common/button'

function SettingsProfileRemove() {
    //don't do target=_blank, otherwise it can make a mistake (due to different auth in app and browser)
    return (
        <Button 
            href={`${API_ENDPOINT_URL}user/remove`}
            variant='link'
            accent='danger'>
            {t.s('removeAccount')}
        </Button>
    )
}

export default SettingsProfileRemove