import React from 'react'
import t from '~t'

import { Link } from 'react-router-dom'
import { FirstAction } from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

class BookmarksHeaderBack extends React.Component {
    render() {
        const { index, collection } = this.props

        if (!collection.parentId || index) return null

        return (
            <FirstAction>
                <Button 
                    as={Link}
                    title={t.s('back')}
                    to={`/space/${collection.parentId || collection._id}`}>
                    <Icon name='back' />
                </Button>
            </FirstAction>
        )
    }
}

export default BookmarksHeaderBack