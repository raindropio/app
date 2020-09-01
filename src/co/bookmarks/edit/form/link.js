import React from 'react'

import { Text, Label } from '~co/common/form'

export default class BookmarkEditFormLink extends React.Component {
    onChangeField = e=>
        this.props.onChange({ [e.target.getAttribute('name')]: e.target.value })

    render() {
        const { autoFocus, status, item: { link }, onSubmit } = this.props

        return (
            <>
                <Label>URL</Label>
                <Text 
                    autoSize={true}
                    autoFocus={autoFocus=='link'}
                    type='url'
                    disabled={status=='loading'}
                    name='link'
                    value={link}
                    onChange={this.onChangeField}
                    onBlur={onSubmit} />
            </>
        )
    }
}