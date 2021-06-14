import React from 'react'
import t from '~t'
import PickerFile from '~co/picker/file/element'

import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function PickerIconAdd(props) {
    return (
        <Button 
            as='label'
            variant='link'
            title={t.s('upload')+' '+t.s('file').toLowerCase()}>
            <PickerFile {...props}>
                <Icon name='add' />
            </PickerFile>
        </Button>
    )
}