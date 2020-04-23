import React from 'react'
import t from '~t'
import settingsHelpers from '../../parts/helpers'
import AppsStore from '~stores/apps'

import Form from './form'

export default class AppsDevEdit extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            client: AppsStore.getClient(props.match.params.id)
        }
    }

    componentDidMount() {
        this._uns = AppsStore.listen(this.onAppsChange.bind(this));

        AppsStore.onLoadClients()

        AppsStore.getTestTokenClient(this.props.match.params.id, test_token=>
            this.setState({ test_token })
        )
    }

    componentWillUnmount() {
        this._uns && this._uns()
    }

	onAppsChange = () =>
        this.setState({
            client: AppsStore.getClient(this.props.match.params.id)
        })

    onSubmit = (client, callback)=>{
        AppsStore.onUpdateClient(this.props.match.params.id, client, callback)
    }

    onCover = (file, callback)=>{
        AppsStore.onUploadIconClient(this.props.match.params.id, file, callback)
    }

    onResetSecretClient = (e)=>{
        e.preventDefault()

        AppsStore.onResetSecretClient(this.props.match.params.id, ()=>{})
    }

    onRevokeAllTokens = (e)=>{
        e.preventDefault()

        AppsStore.onRevoke(this.props.match.params.id)
        this.setState({ test_token: '' })
    }

    onCreateTestToken = (e)=>{
        e.preventDefault()

        AppsStore.createTestTokenClient(this.props.match.params.id, test_token=>
            this.setState({ test_token })
        )
    }

    onRemove = (e)=>{
        e.preventDefault()
        AppsStore.onRemoveClient(this.props.match.params.id, (success)=>{
            if (success)
                window.location.hash = "#/settings/apps/dev"
        })
    }
        
    render() {
        return (
            <section id="main">
				<header>
					<div className="headerWrap">
						{settingsHelpers.backButton.bind(this)()}
                        <h1 className="min">
                            <a href="#/settings/apps/dev">{t.s('dev')}</a>
                            &nbsp;/&nbsp;
                            {this.state.client.name}
                        </h1>
					</div>
				</header>

				<div id="mainBody">
                    <div className="client-edit-page">
                        <div className="edit-form">
                            <h4>{t.s('edit')}</h4>
                        
                            {this.state.client._id && (
                                <Form 
                                    {...this.state}
                                    onSubmit={this.onSubmit}
                                    onCover={this.onCover} />
                            )}

                            <div style={{margin: '16px'}}>
                                <a href="" className="button red standart" onClick={this.onRemove}>{t.s('remove')} this app</a>
                            </div>
                        </div>

                        <div className="secrets">
                            <h4>Credentials</h4>
                            <div className="superForm">
                                <figure className="fieldWrap">
                                    <label className="fieldName">Client ID</label>
                                    <div className="field" disabled>{this.state.client._id||'none'}</div>
                                </figure>

                                <figure className="fieldWrap">
                                    <label className="fieldName">Client Secret <a href="" onClick={this.onResetSecretClient}>Reset secret</a></label>
                                    <div className="field" disabled>{this.state.client.secret}</div>
                                </figure>

                                <figure className="fieldWrap">
                                    <label className="fieldName">
                                        <b>Test token</b> {this.state.test_token && <a href="" onClick={this.onCreateTestToken}>Reset test token</a>}

                                        <p>
                                            To get started quickly with your app development, you may create an access token to your own account without going through the authorization process. The generated token will have the full scope access.
                                        </p>
                                    </label>

                                    {!this.state.test_token && <div className="field"><a href="" onClick={this.onCreateTestToken}>{t.s('create')}</a></div>}
                                    <div className="field" disabled>{this.state.test_token}</div>
                                </figure>

                                <figure className="fieldWrap" style={{padding: '7px'}}>
                                    <a href="" className="button default" onClick={this.onRevokeAllTokens}><b>Revoke all user tokens</b></a>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
			</section>
        )
    }
}