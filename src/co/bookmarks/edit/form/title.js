import React from 'react'
import t from '~t'

import { Text } from '~co/common/form'

export default class BookmarkEditFormTitle extends React.Component {
    state = {
        maxRows: {
            title: 3,
            excerpt: 3
        }
    }

    onChangeField = e=>
        this.props.onChange({ [e.target.getAttribute('name')]: e.target.value })

    onFocusField = e=>
        this.setState({
            maxRows: {
                ...this.state.maxRows,
                [e.target.getAttribute('name')]: undefined
            }
        })

    render() {
        const { autoFocus, item: { title, excerpt }, onCommit } = this.props
        const { maxRows } = this.state

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
                    maxRows={maxRows.title}
                    onChange={this.onChangeField}
                    onFocus={this.onFocusField}
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
                    maxRows={maxRows.excerpt}
                    onChange={this.onChangeField}
                    onFocus={this.onFocusField}
                    onBlur={onCommit} />
            </div>
        )
    }
}