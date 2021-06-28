import s from './index.module.styl'
import React from 'react'

import { Layout, Separator } from '~co/common/form'
import Cover from './cover'
import Collection from './collection'
import Tags from './tags'
import Action from './action'
import Title from './title'
import Link from './link'
import More from './more'

export default class BookmarkEditForm extends React.Component {
    onSubmitForm = e=>{
        e.preventDefault()
        e.stopPropagation()
        
        this.props.onSave().then(()=>{
            if (this.props.autoWindowClose)
                window.close()
        })
    }

    render() {
        return (
            <form 
                className={s.form}
                data-status={this.props.status}
                onSubmit={this.onSubmitForm}>
                <Layout type='grid'>
                    <Cover {...this.props} />
                    <Title  {...this.props} />
                    
                    <Collection {...this.props} />
                    <Tags {...this.props} />
                    <Link {...this.props} />
                    <More {...this.props} />

                    <Separator variant='transparent' />
                    
                    <Action {...this.props} />
                </Layout>
            </form>
        )
    }
}