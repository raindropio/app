import React from 'react'
import _ from 'lodash'
import t from '~t'

import Alert from '~co/common/alert'

export default function ExtensionWelcomeIsUpdate({ location: { search } }) {
    const { is_update } = Object.fromEntries(new URLSearchParams(search))||{}

    if (!is_update) return null

    return (
        <>
            <br />
            <Alert variant='warning'>
                Thank you for using Raindrop.io {_.capitalize(process.env.EXTENSION_VENDOR)} extension!<br />
                Recently we have updated all our apps with a lot of new features and improvements.<br/>
                <br/>
                <a href='https://blog.raindrop.io'><b>{t.s('whatsNew')}?</b></a>
            </Alert>
        </>
    )
}