import s from './index.module.styl'
import React from 'react'

import { Layout, Separator, Group } from '~co/common/form'
import Cover from './cover'
import Collection from './collection'
import Tags from './tags'
import Action from './action'
import Title from './title'
import Link from './link'
import Reminder from './reminder'
import Important from './important'
import Date from './date'

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

                    <div />
                    <Group>
                        <Important {...this.props} />
                        {/* <Reminder {...this.props} /> */}
                    </Group>
                    
                    <Date {...this.props} />

                    <Separator variant='transparent' />
                    
                    <Action {...this.props} />
                </Layout>
            </form>
        )
    }
}