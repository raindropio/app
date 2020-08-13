import React from 'react'
import t from '~t'
import { API_ENDPOINT_URL } from '~data/constants/app'

import { Buttons } from '~co/common/form'
import Button from '~co/common/button'

function SettingsProfileRemove() {
    return (
        <Buttons>
            <Button 
                href={`${API_ENDPOINT_URL}user/remove`}
                variant='outline'
                target={process.env.APP_TARGET == 'default' ? '' : '_blank'}>
                {t.s('removeAccount')}
            </Button>
        </Buttons>
    )
}

export default SettingsProfileRemove