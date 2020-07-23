import s from './index.module.styl'
import React from 'react'
import t from '~t'

import { Layout, Text, Label } from '~co/common/form'
import Preloader from '~co/common/preloader'
import Button from '~co/common/button'
import Cover from './cover'
import Collection from './collection'
import Tags from './tags'

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
        const { autoFocus, status, item: { title, excerpt, link } } = this.props
        const loading = status=='loading'
        const saving = status == 'saving'

        return (
            <form className={s.form} onSubmit={this.onSubmitForm}>
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
                            required={true}
                            disabled={loading}
                            autoComplete='off'
                            autoFocus={autoFocus=='title'}
                            name='title'
                            placeholder={t.s('title')}
                            value={title}
                            onChange={this.onChangeField}
                            onBlur={this.onSubmitForm} />

                        <Text 
                            variant='less'
                            autoSize={true}
                            multiline={true}
                            type='text'
                            disabled={loading}
                            autoComplete='off'
                            autoFocus={autoFocus=='excerpt'}
                            name='excerpt'
                            maxLength='10000'
                            value={excerpt}
                            placeholder={t.s('description')}
                            onChange={this.onChangeField}
                            onBlur={this.onSubmitForm} />
                    </div>

                    <Collection {...this.props} />

                    <Tags {...this.props} />

                    <Label>URL</Label>
                    <Text 
                        autoSize={true}
                        type='url'
                        disabled={loading}
                        name='link'
                        value={link}
                        onChange={this.onChangeField}
                        onBlur={this.onSubmitForm} />

                    <div />
                    <Button
                        className={saving ? '' : s.invisible}
                        data-block>
                        <Preloader />
                    </Button>
                </Layout>
            </form>
        )
    }
}