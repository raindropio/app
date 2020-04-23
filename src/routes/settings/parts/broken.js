import React from 'react'
import t from '~t'
import Toasts from '~actions/toast'
import UserStore from '~stores/user'

export default class CommonBroken extends React.Component {
    displayName = "settings/parts/broken"

    levels = [
        { id: 'basic',      title: 'Basic mode',     description: 'Mark only nonexistent links'},
        { id: 'default',    title: 'Default mode',   description: 'Mark nonexistent links with unresolved domain name'},
        { id: 'strict',     title: 'Strict mode',    description: 'Server should always respond correctly'},
        { id: 'off',        title: t.s('disable'), }
    ]

    constructor(props) {
        super(props)
        this.state = {
            broken_level:'',
            show: false
        }
    }

    componentDidMount() {
        this.unsubscribeUser = UserStore.listen(this.onUserChange.bind(this))
        UserStore.onLoad()
    }

    componentWillUnmount() {
        this.unsubscribeUser()
    }

    onUserChange(user={}) {
		this.setState({
            ...user.config || {},
            show: user.pro
        })
	}

    onChange = (broken_level)=>{
        UserStore.onUpdateConfig({ broken_level })
        Toasts.show({text: t.s("importingInfo1")})
    }

    renderLevel = ({ id, title, description })=>(
        <div key={id} className="fieldLink fieldColumns" onClick={()=>this.onChange(id)}>
            <input type="radio" name="broken_level" checked={this.state.broken_level==id} readOnly />

            <span>
                {title}<br/>
                <span style={{opacity: .5, fontSize: '90%'}}>{description}</span>
            </span>
        </div>
    )

    render() {
        if (!this.state.show)
            return null
            
        return (
            <div>
                <figure className="fieldWrap no-border">
                    <label className="fieldName">{t.s("broken")} {t.s('links').toLowerCase()}</label>
                </figure>

                {this.levels.map(this.renderLevel)}
            </div>
        )
    }
}