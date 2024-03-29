import s from './title.module.styl'
import React from 'react'
import t from '~t'

import { Text } from '~co/common/form'

export default class BookmarkEditFormTitle extends React.Component {
    state = {
        maxRows: {
            title: 3,
            excerpt: 1
        },
        focused: {
            title: false,
            excerpt: false
        }
    }

    onChangeField = e=>
        this.props.onChange({ [e.target.getAttribute('name')]: e.target.value })

    onFocusField = e=>
        this.setState({
            maxRows: {
                ...this.state.maxRows,
                [e.target.getAttribute('name')]: undefined
            },
            focused: {
                ...this.state.focused,
                [e.target.getAttribute('name')]: true
            }
        })

    onBlurField = e=> {
        this.setState({
            focused: {
                ...this.state.focused,
                [e.target.getAttribute('name')]: false
            }
        })
        this.props.onCommit(e)
    }

    render() {
        const { autoFocus, item: { title, excerpt } } = this.props
        const { maxRows } = this.state

        return (
            <div className={s.wrap}>
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
                    onBlur={this.onBlurField} />

                <Text 
                    className={s.excerpt+' '+(!excerpt ? s.empty : '')}
                    variant='less'
                    font='secondary'
                    autoSize={true}
                    type='text'
                    autoComplete='off'
                    spellCheck='false'
                    autoFocus={autoFocus=='excerpt'}
                    name='excerpt'
                    maxLength='10000'
                    multiline={true}
                    value={excerpt}
                    placeholder={t.s('add') + ' ' + t.s('description').toLowerCase()}
                    maxRows={maxRows.excerpt}
                    onChange={this.onChangeField}
                    onFocus={this.onFocusField}
                    onBlur={this.onBlurField} />
            </div>
        )
    }
}