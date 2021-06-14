import React, { useRef } from 'react'
import { PropTypes } from 'prop-types'

import { ButtonsGroup } from '~co/common/button'
import { More, Menu } from '~co/overlay/popover'
import Link from './link'
import File from './file'

function BookmarksAdd(props) {
    const group = useRef(null)

    return (
        <ButtonsGroup ref={group}>
            <Link {...props} />
            
            <More variant='primary'>
                <Menu>
                    <File {...props} />
                </Menu>
            </More>
        </ButtonsGroup>
    )
}

BookmarksAdd.propTypes = {
    spaceId:    PropTypes.any,
    onEdit:     PropTypes.func
}

export default BookmarksAdd