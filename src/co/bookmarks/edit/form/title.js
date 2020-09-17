import React from 'react'
import t from '~t'

import { Text } from '~co/common/form'

export default class BookmarkEditFormTitle extends React.Component {
    onChangeField = e=>
        this.props.onChange({ [e.target.getAttribute('name')]: e.target.value })

    render() {
        const { autoFocus, item: { title, excerpt }, onCommit } = this.props

        return (
            <div>
                <Text 
                    variant='less'
                    font='title'
                    autoSize={true}
                    type='text'
                    required={true}
                    autoComplete='off'
                    spellCheck='false'
                    autoFocus={autoFocus=='title'}
                    name='title'
                    placeholder={t.s('title')}
                    value={title}
                    onChange={this.onChangeField}
                    onBlur={onCommit} />

                <Text 
                    variant='less'
                    autoSize={true}
                    multiline={true}
                    type='text'
                    autoComplete='off'
                    spellCheck='false'
                    autoFocus={autoFocus=='excerpt'}
                    name='excerpt'
                    maxLength='10000'
                    value={excerpt}
                    placeholder={t.s('enterDescription')}
                    onChange={this.onChangeField}
                    onBlur={onCommit} />
            </div>
        )
    }
}