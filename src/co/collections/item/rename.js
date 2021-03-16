import s from './view.module.styl'
import React from 'react'
import t from '~t'
import { withRouter } from 'react-router-dom'

import { Error } from '~co/overlay/dialog'
import { Item, ItemTitle } from '~co/common/list'
import CollectionIcon from './icon'
import { Text } from '~co/common/form'

class CollectionsItemRename extends React.PureComponent {
    state = {
        title: this.props.title,
        loading: false
    }

    onKeyUp = (e)=>{
        switch(e.keyCode) {
            case 27: return this.props.onRenameCancel()
        }
    }

    onChange = (e)=>{
        this.setState({ title: e.target.value })
    }

    onSubmit = (e)=>{
        e.preventDefault()
        e.stopPropagation()
        this.save()
    }

    save = ()=>{
        //cancel
        if (!this.state.title.trim() || this.state.title == this.props.title)
            return this.props.onRenameCancel()

        //update collection
        this.setState({ loading: true })

        this.props.actions.oneUpdate(this.props._id, {
            title: this.state.title
        }, this.props.onRenameCancel, e => {
            Error(e)
            this.props.onRenameCancel()
        })
    }

    render() {
        const { _id, level, cover, color } = this.props
        const { title, loading } = this.state

        return (
            <form onSubmit={this.onSubmit}>
                <Item
                    color={color}
                    className={s.item}
                    style={{'--level': level}}>
                    <div className={s.expand} />
                    
                    <CollectionIcon
                        cover={cover}
                        _id={_id}
                        active={true}
                        loading={loading} />

                    <ItemTitle>
                        <Text
                            type='text'
                            variant='less'
                            required
                            autoFocus
                            selectAll
                            disabled={loading}
                            value={title}
                            placeholder={t.s('enterTitle')}
                            onKeyUp={this.onKeyUp}
                            onChange={this.onChange}
                            onBlur={this.save} />
                    </ItemTitle>
                </Item>
            </form>
        )
    }
}

export default withRouter(CollectionsItemRename)