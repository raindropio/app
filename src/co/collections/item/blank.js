import React from 'react'
import t from '~t'
import { withRouter } from 'react-router-dom'

import Icon from '~co/common/icon'
import CollectionIcon from './icon'

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
            this.setState({ loading: false })
        })
    }

    render() {
        const { _id, level } = this.props
        const { title, loading } = this.state

        return (
            <form
                className='collection active'
                data-is-focus='true'
                style={{'--level': level}}
                onSubmit={this.onSubmit}>
                <span className='expand'><Icon name='arrow_alt' /></span>
                
                <CollectionIcon 
                    _id={_id}
                    loading={loading} />

                <input
                    type='text'
                    required
                    autoFocus
                    disabled={loading}
                    value={title}
                    placeholder={t.s('collectionNew')}
                    onKeyUp={this.onKeyUp}
                    onChange={this.onChange}
                    onBlur={this.create} 
                    />
            </form>
        )
    }
}

export default withRouter(CollectionsItemBlank)