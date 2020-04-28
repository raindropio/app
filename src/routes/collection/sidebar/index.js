import React from 'react'
import { withSearch } from '~modules/router'

import Icon from '~co/common/icon'
import Sidebar, { Header, Content } from '~co/screen/splitview/sidebar'
import Tree from '~co/collections/items'

class CollectionsSidebar extends React.Component {
    render() {
        return (
            <Sidebar>
                <Header title={<Icon name='raindrop_logo' className='raindropLogo' />} />
        
                <Content>
                    <Tree 
                        selectedId={this.props.match.params.cid} />
                </Content>
            </Sidebar>
        )
    }
}

export default withSearch(CollectionsSidebar)