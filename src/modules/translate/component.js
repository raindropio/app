import React from 'react'
import t from './index'

export default class UtilsTranslateComponent extends React.PureComponent {
    constructor(props){
        super(props)

        t.onChange(this.onTranslateChange)
        
        this.state = {
            loading: !t.loaded,
            lang: t.currentLang
        }
    }

    onTranslateChange = (loaded)=>{
        if (this.state)
            this.setState({
                loading: !loaded,
                lang: t.currentLang
            })
    }

    render() {
        const { Loading } = this.props
        return (
            <React.Fragment key={this.state.lang}>
                {this.state.loading && Loading && <Loading />}
                {!this.state.loading && this.props.children}
            </React.Fragment>
        )
    }
}