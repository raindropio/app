import React from 'react'
import t from '~t'

import TextareaAutosize from 'react-textarea-autosize'
import Cover from './cover'
import Collection from './collection'

export default class BookmarkEditForm extends React.Component {
    onChangeField = e=>
        this.props.onChange({ [e.target.getAttribute('name')]: e.target.value })

    onPreventMultilineField = e=>{
        if (e.keyCode == 13)
            e.preventDefault()
    }

    render() {
        const { autoFocus, status, item: { title, excerpt, link } } = this.props
        const { onSubmit } = this.props

        return (
            <div className='bookmarkEdit'>
                <Cover {...this.props} />

                <form className='edit-form superForm' onSubmit={onSubmit}>
                    <div className='fieldWrap'>
                        <label className='fieldName'>{t.s('title')}</label>

                        <TextareaAutosize 
                            type='text'
                            tabIndex='5000'
                            className='field title'
                            required={true}
                            disabled={status=='loading'}
                            autoComplete='off'
                            autoFocus={autoFocus=='title'}
                            name='title'
                            placeholder={t.s('title')}
                            defaultValue={title}
                            onChange={this.onChangeField}
                            onBlur={onSubmit}
                            onKeyDown={this.onPreventMultilineField} />
                    </div>

                    <div className='fieldWrap'>
                        <label className='fieldName'>{t.s('description')}</label>

                        <TextareaAutosize
                            type='text'
                            tabIndex='5000'
                            className='field'
                            disabled={status=='loading'}
                            autoComplete='off'
                            autoFocus={autoFocus=='excerpt'}
                            name='excerpt'
                            maxlength='10000'
                            defaultValue={excerpt}
                            onChange={this.onChangeField}
                            onBlur={onSubmit} />
                    </div>

                    <Collection 
                        {...this.props}
                        tabIndex='5000' />

                    <div className='fieldWrap'>
                        <label className='fieldName'>URL</label>

                        <TextareaAutosize
                            tabIndex='5000'
                            type='url' 
                            className='field'
                            disabled={status=='loading'}
                            name='link'
                            value={link}
                            onChange={this.onChangeField}
                            onBlur={onSubmit}
                            onKeyDown={this.onPreventMultilineField} />
                    </div>
                </form>
            </div>
        )
    }
}