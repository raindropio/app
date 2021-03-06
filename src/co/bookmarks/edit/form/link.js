import React from 'react'

import { Text, Label } from '~co/common/form'

export default class BookmarkEditFormLink extends React.Component {
    onChangeField = e=>
        this.props.onChange({ [e.target.getAttribute('name')]: e.target.value })

    render() {
        const { autoFocus, item: { link }, onCommit } = this.props

        return (
            <>
                <Label>URL</Label>
                <Text 
                    type='url'
                    required
                    autoFocus={autoFocus=='link'}
                    name='link'
                    placeholder='https://'
                    value={link}
                    onChange={this.onChangeField}
                    onBlur={onCommit} />
            </>
        )
    }
}