import React from 'react'
import Icon from '~co/common/icon'
import { withSearch } from '~modules/router'
import Sidebar, { Header, Content } from '~co/screen/splitview/sidebar'

class CollectionsSidebar extends React.Component {
    render() {
        return (
            <Sidebar>
                <Header title={<Icon name='raindrop_logo' className='raindropLogo' />} />
        
                <Content>
                    {this.props.match.params.cid}
                </Content>
            </Sidebar>
        )
    }
}

export default withSearch(CollectionsSidebar)