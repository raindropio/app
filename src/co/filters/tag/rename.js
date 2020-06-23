import React from 'react'
import t from '~t'

import { Item, ItemExpand } from '~co/common/list'
import Icon from '~co/common/icon'
import SuperInput from '~co/common/superInput'

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
        this.save()
    }

    save = ()=>{
        //cancel
        if (!this.state.name.trim() || this.state.name == this.props._id)
            return this.props.onRenameCancel()

        //update collection
        this.setState({ loading: true })

        this.props.onRename(this.state.name, this.props.onRenameCancel, ()=>{
            this.setState({ loading: false })
        })
    }

    render() {
        const { name, loading } = this.state

        return (
            <form onSubmit={this.onSubmit}>
                <Item>
                    <ItemExpand />
                    
                    <SuperInput
                        type='text'
                        required
                        autoFocus
                        selectAll={true}
                        disabled={loading}
                        value={name}
                        placeholder={t.s('enterTitle')}
                        onKeyUp={this.onKeyUp}
                        onChange={this.onChange}
                        onBlur={this.save} />
                </Item>
            </form>
        )
    }
}