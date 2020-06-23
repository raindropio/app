import s from './edit.module.styl'
import React from 'react'
import t from '~t'
import AppsStore from '~stores/apps'

import { Header, Content } from '~co/screen/splitview/main'
import Form from './form'
import Button from '~co/common/button'

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
                window.location.hash = '#/settings/apps/dev'
        })
    }
        
    render() {
        return (
            <>
				<Header title={(<span>
                    <a href='#/settings/apps/dev'>{t.s('dev')}</a>
                    &nbsp;/&nbsp;
                    {this.state.client.name}
                </span>)} />

				<Content>
                    <div className={s.page}>
                        <div>
                            <h4>{t.s('edit')}</h4>
                        
                            {this.state.client._id ? (
                                <Form 
                                    {...this.state}
                                    onSubmit={this.onSubmit}
                                    onCover={this.onCover} />
                            ) : null}

                            <div style={{margin: '16px'}}>
                                <Button href='' variant='primary' onClick={this.onRemove}>{t.s('remove')} this app</Button>
                            </div>
                        </div>

                        <div className={s.secrets}>
                            <h4>Credentials</h4>
                            <div className='superForm'>
                                <figure className='fieldWrap'>
                                    <label className='fieldName'>Client ID</label>
                                    <div className='field' disabled>{this.state.client._id||'none'}</div>
                                </figure>

                                <figure className='fieldWrap'>
                                    <label className='fieldName'>Client Secret <a href='' onClick={this.onResetSecretClient}>Reset secret</a></label>
                                    <div className='field' disabled>{this.state.client.secret}</div>
                                </figure>

                                <figure className='fieldWrap'>
                                    <label className='fieldName'>
                                        <b>Test token</b> {this.state.test_token && <a href='' onClick={this.onCreateTestToken}>Reset test token</a>}

                                        <p>
                                            To get started quickly with your app development, you may create an access token to your own account without going through the authorization process. The generated token will have the full scope access.
                                        </p>
                                    </label>

                                    {!this.state.test_token && <div className='field'><a href='' onClick={this.onCreateTestToken}>{t.s('create')}</a></div>}
                                    <div className='field' disabled>{this.state.test_token}</div>
                                </figure>

                                <figure className='fieldWrap' style={{padding: '7px'}}>
                                    <Button variant='outline' onClick={this.onRevokeAllTokens}>Revoke all user tokens</Button>
                                </figure>
                            </div>
                        </div>
                    </div>
                </Content>
			</>
        )
    }
}