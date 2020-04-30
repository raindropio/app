import React from 'react'
import t from '~t'
import { withSearch } from '~modules/router'

import Icon from '~co/common/icon'
import Sidebar, { Header } from '~co/screen/splitview/sidebar'
import Tree from '~co/collections/items'

class CollectionsSidebar extends React.Component {
    tree = React.createRef()

    events = {
        onItemEditClick: (item)=>{
            
        }
    }

    render() {
        const { createNewCollection } = this.tree.current||{}

        return (
            <Sidebar>
                <Header title={<Icon name='raindrop_logo' className='raindropLogo' />}>
                    <a 
                        href=''
                        className='button default'
                        title={t.s('createNewCollection')}
                        onClick={createNewCollection}>
                        <b><Icon name='new_collection' /></b>
                    </a>
                </Header>
        
                <Tree 
                        ref={this.tree}
                        uriPrefix='/collection/'
                        selectedId={this.props.match.params.cid}
                        events={this.events} />
            </Sidebar>
        )
    }
}

export default withSearch(CollectionsSidebar)