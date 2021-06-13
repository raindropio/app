import React, { useState, useRef } from 'react'
import { PropTypes } from 'prop-types'
import t from '~t'

import Button, { ButtonsGroup } from '~co/common/button'
import Icon from '~co/common/icon'
import Link from './link'
import File from './file'
import More from './more'

const propTypes = {
    spaceId:    PropTypes.any,
    autoFocus:  PropTypes.bool,
    onEdit:     PropTypes.func
}

function BookmarksAddFallback({ autoFocus, ...etc }) {
    const [show, setShow] = useState('')
    const buttonLink = useRef(null)
    const buttonMore = useRef(null)
    const buttonsGroup = useRef(null)

    return (
        <>
            <ButtonsGroup ref={buttonsGroup}>
                <Button 
                    ref={buttonLink}
                    variant='primary'
                    title={t.s('add')}
                    autoFocus={autoFocus}
                    onClick={()=>setShow('link')}>
                    <Icon name='new_bookmark' />
                    {t.s('add')}
                </Button>

                <Button
                    ref={buttonMore}
                    variant='primary'
                    onClick={()=>setShow('more')}
                    onMouseEnter={()=>setShow('more')}>
                    <Icon name='arrow' size='micro' />
                </Button>
            </ButtonsGroup>

            {show=='link' && (
                <Link
                    {...etc}
                    pin={buttonLink}
                    onClose={()=>setShow('')} />
            )}

            {show=='file' && (
                <File
                    {...etc}
                    pin={buttonsGroup}
                    onClose={()=>setShow('')} />
            )}

            {show=='more' && (
                <More
                    {...etc}
                    pin={buttonsGroup}
                    onFile={()=>setShow('file')}
                    onClose={()=>setShow('')} />
            )}
        </>
    )
}

BookmarksAddFallback.propTypes = propTypes

export default BookmarksAddFallback