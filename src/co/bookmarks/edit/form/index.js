import styles from './index.module.styl'
import React from 'react'
import t from '~t'

import { Layout, Text, Label } from '~co/common/form'
import Button from '~co/common/button'
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
        const loading = status=='loading'
        const saving = status == 'saving'

        return (
            <div className={styles.edit}>
                <form className={styles.form} onSubmit={this.onSubmitForm}>
                    <Layout type='grid'>
                        <div>
                            <Cover {...this.props} />
                        </div>

                        <div>
                            <Text 
                                variant='less'
                                font='title'
                                autoSize={true}
                                type='text'
                                tabIndex='5000'
                                required={true}
                                disabled={loading}
                                autoComplete='off'
                                autoFocus={autoFocus=='title'}
                                name='title'
                                placeholder={t.s('title')}
                                defaultValue={title}
                                onChange={this.onChangeField}
                                onBlur={this.onSubmitForm} />

                            <Text 
                                variant='less'
                                autoSize={true}
                                multiline={true}
                                type='text'
                                tabIndex='5000'
                                disabled={loading}
                                autoComplete='off'
                                autoFocus={autoFocus=='excerpt'}
                                name='excerpt'
                                maxLength='10000'
                                defaultValue={excerpt}
                                placeholder={t.s('description')}
                                onChange={this.onChangeField}
                                onBlur={this.onSubmitForm} />
                        </div>

                        <Collection 
                            {...this.props}
                            tabIndex='5000' />

                        <Label>URL</Label>
                        <Text 
                            autoSize={true}
                            tabIndex='5000'
                            type='url'
                            disabled={loading}
                            name='link'
                            value={link}
                            onChange={this.onChangeField}
                            onBlur={this.onSubmitForm} />

                        {(unsaved || saving) && (
                            <>
                                <div />

                                <Button
                                    Tag='input'
                                    variant='primary'
                                    type='submit'
                                    data-block
                                    disabled={saving}
                                    value={t.s('save') + (saving ? '…' : '')} />
                            </>
                        )}
                    </Layout>
                </form>
            </div>
        )
    }
}