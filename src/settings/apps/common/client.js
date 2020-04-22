import React from 'react'
import t from 't'
import AppsActions from '../../../actions/apps'

export default class Client extends React.PureComponent {
    onRevokeOrRemove = (e)=>{
        e.preventDefault()

        if (this.props.secret)
            AppsActions.removeClient(this.props._id)
        else
            AppsActions.revoke(this.props._id)
    }

    render() {
        const { _id, name, description, icon, site, secret } = this.props
        
        return (
            <div className="client">
                <div className="client-icon">
                    {icon ? <img src={icon} /> : <span /> }
                </div>
    
                <div className="about">
                    <a href={site} target="_blank" className="name">
                        {name}
                    </a>
    
                    <div className="description">
                        {description}
                    </div>
                </div>
                
                <div className="actions">
                    {secret && <a href={"#/settings/apps/dev/edit/"+_id} className="button active">
                        <b>{t.s('edit')}</b>
                    </a>}
    
                    <a href="" className="button default" onClick={this.onRevokeOrRemove}>
                        <b>{t.s('removeIt')}</b>
                    </a>
                </div>
            </div>
        )
    }
}