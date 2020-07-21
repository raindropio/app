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
        try{await t.init(this.props.lang)}catch(e){}
        this.setState({ loading: false })
    }

    render() {
        const { Loading, lang } = this.props

        return (
            <React.Fragment key={lang}>
                {this.state.loading && Loading && <Loading />}
                {!this.state.loading && this.props.children}
            </React.Fragment>
        )
    }
}

export default connect(
    state=>({
        lang: state.config.lang
    })
)(UtilsTranslateComponent)