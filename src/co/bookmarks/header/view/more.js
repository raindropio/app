import React from 'react'
import t from '~t'
import Icon from '~co/common/icon'
import Contextmenu from '~co/collections/item/contextmenu'

export default class BookmarksHeaderView extends React.Component {
    state = {
        menu: false
    }

    handlers = {
        onContextMenuClick: (e)=>{
            e.preventDefault()
            this.setState({ menu: true })
        },
    
        onContextMenuClose: ()=>
            this.setState({ menu: false }),
    
        onRemoveClick: ()=>{
            if (confirm(t.s('areYouSure')))
                this.props.collectionsActions.oneRemove(this.props.collection._id)
        },
    
        onOpenAllClick: ()=>{
            
        }
    }

    render() {
        const { menu } = this.state
        const { collection } = this.props

        return (
            <>
                <a href='' className='button default' onClick={this.handlers.onContextMenuClick}>
                    <Icon name='more_horizontal' />
                </a>

                {menu && (
                    <Contextmenu 
                        {...collection}
                        {...this.handlers}
                        to={`/collection/${collection._id}`} />
                )}
            </>
        )
    }
}