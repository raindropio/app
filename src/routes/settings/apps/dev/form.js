import React from 'react'
import t from '~t'
import Pop from '~actions/pop'

const emptyObject = {}

export default class AppsDevEdit extends React.PureComponent {
    state = {
        unsaved: false,
        client: {
            redirects: [],
            ...this.props.client||{}
        }
    }

    static getDerivedStateFromProps(props) {
        return {
            client: props.client||emptyObject
        }
    }

    onChange = (e)=>{
        const field = e.target.getAttribute('data-field')
        const array = e.target.getAttribute('data-array')
        const value = e.target.value

        this.setState({
            unsaved: true,
            client: {
                ...this.state.client,
                ...(array ? {[ array ]: [value]} : {}),
                ...(field ? {[ field ]: value} : {})
            }
        })
    }

    onSubmit = e=>{
        e.preventDefault()
        Pop.show('loading')

        this.props.onSubmit(this.state.client, (success)=>{
            Pop.close()
            this.setState({unsaved: !success})
        })
    }

    onCover = e=>{
        e.preventDefault()
        Pop.show('loading')

        this.props.onCover(e.target.files[0], success=>{
            Pop.close()
            document.querySelector('#cover-upload').reset()
        })
    }

    render() {
        const { name='', description='', site='', redirects=[], icon='' } = this.state.client

        return (
            <div>
                <form className="superForm" onSubmit={this.onSubmit}>
                    <figure className="fieldWrap">
                        <label className="fieldName">{t.s("name")} *</label>
                        <input type="text"
                                className="field title"
                                required={true}
                                autoFocus
                                data-field="name"
                                value={name}
                                onChange={this.onChange} />
                    </figure>
                    
                    <figure className="fieldWrap">
                        <label className="fieldName">{t.s("description")}</label>
                        <input type="text"
                                className="field"
                                data-field="description"
                                value={description}
                                onChange={this.onChange} />
                    </figure>

                    <figure className="fieldWrap">
                        <label className="fieldName">{t.s("site")}</label>
                        <input type="text"
                                className="field"
                                type="url"
                                data-field="site"
                                value={site}
                                onChange={this.onChange} />
                    </figure>

                    <figure className="fieldWrap">
                        <label className="fieldName">Redirect URL</label>
                        <input type="text"
                                className="field"
                                type="url"
                                data-array="redirects"
                                value={redirects[0]}
                                onChange={this.onChange} />
                    </figure>

                    {this.props.acceptTerms ? (
                        <figure className="fieldWrap">
                            <div className="field">
                                <label>
                                    <input type="checkbox" required />
                                    &nbsp;
                                    I accept the <a href="https://developer.raindrop.io/terms" target="_blank">Raindrop.io API Terms & Guidelines</a>
                                </label>
                            </div>
                        </figure>
                    ) : null}

                    {this.state.unsaved && <figure className="fieldColumns">
                        <input type="submit" className="button blue standart" value={t.s('save')} />
                    </figure>}
                </form>

                {this.props.onCover && <form className="superForm" id="cover-upload">
                    <figure className="fieldWrap">
                        <label className="fieldName">{t.s('cover')}</label>

                        <div className="field">
                            <div className="client-icon">
                                {icon ? <img src={icon} /> : <span /> }
                            </div>

                            <br />
                            <input 
                                type="file"
                                accept="image/*"
                                onChange={this.onCover}
                                className="field" />
                        </div>
                    </figure>
                </form>}
            </div>
        )
    }
}