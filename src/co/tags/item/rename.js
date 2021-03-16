import React from 'react'
import t from '~t'

import { Error } from '~co/overlay/dialog'
import { Item, ItemTitle, ItemIcon } from '~co/common/list'
import { Text } from '~co/common/form'
import Preloader from '~co/common/preloader'
import TagIcon from './icon'

export default class FiltersTagRename extends React.PureComponent {
    state = {
        name: this.props._id,
        loading: false
    }

    onKeyUp = (e)=>{
        switch(e.keyCode) {
            case 27: return this.props.onRenameCancel()
        }
    }

    onChange = (e)=>{
        this.setState({ name: e.target.value })
    }

    onSubmit = (e)=>{
        e.preventDefault()
        e.stopPropagation()
        this.save()
    }

    save = ()=>{
        //cancel
        if (!this.state.name.trim() || this.state.name == this.props._id)
            return this.props.onRenameCancel()

        //update collection
        this.setState({ loading: true })

        this.props.onRename(this.state.name, this.props.onRenameCancel, e=>{
            Error(e)
            this.props.onRenameCancel()
        })
    }

    render() {
        const { name, loading } = this.state

        return (
            <form onSubmit={this.onSubmit}>
                <Item>
                    {loading ? <ItemIcon><Preloader /></ItemIcon> : <TagIcon />}
                    
                    <ItemTitle>
                        <Text
                            type='text'
                            variant='less'
                            required
                            autoFocus
                            selectAll
                            disabled={loading}
                            value={name}
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