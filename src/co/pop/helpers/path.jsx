import React from 'react'
import CollectionsList from '../../collections'

import Icon from 'icon'

export default class PopView extends React.Component {
    displayName = "Pop/helpers/path"

    render() {
    	return (
    		<div className="popLayout">
    			<header>
    				<a className="button" onClick={this.props.onCancel}><Icon name="back" /></a>
                    <div className="title">
                    	<label className="miniHeader" htmlFor="itemTitle">{this.props.title}</label>
                   	</div>
                </header>

                <div className="popOverflow">
                	<CollectionsList
                		navPrefix={"pathCollection"}
                        embeded={true}
                        onlyMy={true}
                        activeCollection={this.props.activeCollection||null}
                        activeGroup={this.props.activeGroup}
                        skipCollection={this.props.skipCollection}
                		onSelectCollection={this.props.onSelectCollection}
                		onSelectGroup={this.props.onSelectGroup} />
                </div>
    		</div>
    	);
    }
}