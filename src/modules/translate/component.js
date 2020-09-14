import s from './component.module.styl'
import React from 'react'
import { connect } from 'react-redux'
import t from './index'

class UtilsTranslateComponent extends React.PureComponent {
    state = {
        loading: true
    }

    componentDidMount() {
        this.setLang()
    }

    componentDidUpdate(prev) {
        if (prev.lang == this.props.lang)
            return
        this.setLang()
    }

    setLang = async()=>{
        this.setState({ loading: true })
        try{await t.init(this.props.lang)}catch(e){console.log(e)}
        this.setState({ loading: false })
    }

    render() {
        const { loading } = this.props

        return (
            <>
                <div 
                    className={s.overlay} 
                    data-show={this.state.loading}>
                    {loading}
                </div>

                <React.Fragment key={this.state.loading}>
                    {this.props.children}
                </React.Fragment>
            </>
        )
    }
}

export default connect(
    state=>({
        lang: state.config.lang
    })
)(UtilsTranslateComponent)