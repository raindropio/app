import React from 'react'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function AddHeaderClose() {
    return (
        <Button onClick={()=>window.close()}>
            <Icon name='close' />
        </Button>
    )
}