import s from './index.module.styl'
import React from 'react'

import { Layout } from '~co/common/form'
import Cover from './cover'
import Collection from './collection'
import Tags from './tags'
import Buttons from './buttons'
import Title from './title'
import Link from './link'
import More from './more'

export default class BookmarkEditForm extends React.Component {
    onSubmitForm = e=>{
        e.preventDefault()
        this.props.onSubmit()
    }

    render() {
        return (
            <form className={s.form} onSubmit={this.onSubmitForm}>
                <Layout type='grid'>
                    <Cover {...this.props} />
                    <Title  {...this.props} />
                    <Collection {...this.props} />
                    <Tags {...this.props} />
                    <Link {...this.props} />
                    <More {...this.props} />

                    <Buttons {...this.props} />
                </Layout>
            </form>
        )
    }
}