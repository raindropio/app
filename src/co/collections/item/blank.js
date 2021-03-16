import s from './view.module.styl'
import React from 'react'
import t from '~t'
import { withRouter } from 'react-router-dom'

import { Error } from '~co/overlay/dialog'
import { Item, ItemTitle } from '~co/common/list'
import CollectionIcon from './icon'
import { Text } from '~co/common/form'

class CollectionsItemBlank extends React.PureComponent {
    state = {
        title: '',
        loading: false
    }

    onKeyUp = (e)=>{
        switch(e.keyCode) {
            case 27: return this.cancel()
        }
    }

    onChange = (e)=>{
        this.setState({ title: e.target.value })
    }

    onSubmit = (e)=>{
        e.preventDefault()
        e.stopPropagation()
        this.create()
    }

    cancel = ()=>{
        this.props.actions.removeBlank()
    }

    create = ()=>{
        //cancel
        if (!this.state.title.trim())
            return this.cancel()

        //create collection
        this.setState({ loading: true })

        this.props.actions.createFromBlank({
            title: this.state.title
        }, (newItem)=>{
            if (this.props.events.onItemClick)
                this.props.events.onItemClick(newItem)
            else
                this.props.history.push(this.props.to.replace(this.props._id, newItem._id))
        }, e=>{
            Error(e)
            this.cancel()
        })
    }

    render() {
        const { _id, level } = this.props
        const { title, loading } = this.state

        return (
            <form onSubmit={this.onSubmit}>
                <Item
                    active={true}
                    className={s.item}
                    style={{'--level': level}}>
                    <div className={s.expand} />
                    
                    <CollectionIcon 
                        _id={_id}
                        loading={loading} />

                    <ItemTitle>
                        <Text
                            type='text'
                            variant='less'
                            required
                            autoFocus
                            disabled={loading}
                            value={title}
                            placeholder={t.s('collectionNew')}
                            onKeyUp={this.onKeyUp}
                            onChange={this.onChange}
                            onBlur={this.create} />
                    </ItemTitle>
                </Item>
            </form>
        )
    }
}

export default withRouter(CollectionsItemBlank)