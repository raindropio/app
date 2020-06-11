import React from 'react'
import t from '~t'

import TextareaAutosize from 'react-textarea-autosize'
import Cover from './cover'
import Collection from './collection'

export default class BookmarkEditForm extends React.Component {
    onChangeField = e=>
        this.props.onChange({ [e.target.getAttribute('name')]: e.target.value })

    onKeyDownField = e=>{
        if (e.keyCode == 13 &&
            (
                e.target.getAttribute('data-multiline') == null ||
                e.metaKey || e.ctrlKey || e.shiftKey
            )){
            e.preventDefault()
            this.props.onSubmit()
        }
    }

    onSubmitForm = e=>{
        e.preventDefault()
        this.props.onSubmit()
    }

    render() {
        const { autoFocus, status, unsaved, item: { title, excerpt, link } } = this.props

        return (
            <div className='bookmarkEdit'>
                <Cover {...this.props} />

                <form className='edit-form superForm' onSubmit={this.onSubmitForm}>
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
                            onBlur={this.onSubmitForm}
                            onKeyDown={this.onKeyDownField} />
                    </div>

                    <div className='fieldWrap'>
                        <label className='fieldName'>{t.s('description')}</label>

                        <TextareaAutosize
                            type='text'
                            data-multiline
                            tabIndex='5000'
                            className='field'
                            disabled={status=='loading'}
                            autoComplete='off'
                            autoFocus={autoFocus=='excerpt'}
                            name='excerpt'
                            maxLength='10000'
                            defaultValue={excerpt}
                            onChange={this.onChangeField}
                            onBlur={this.onSubmitForm}
                            onKeyDown={this.onKeyDownField} />
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
                            onBlur={this.onSubmitForm}
                            onKeyDown={this.onKeyDownField} />
                    </div>

                    {(unsaved || status == 'saving') && (
                        <div className='fieldColumns'>
                            <input
                                type='submit'
                                className='button active standart input'
                                disabled={status == 'saving'}
                                value={status == 'saving' ? t.s('loading')+'…' : t.s('save')} />
                        </div>
                    )}
                </form>
            </div>
        )
    }
}