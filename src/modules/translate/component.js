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
        return (
            <React.Fragment key={this.state.lang}>
                {this.props.loading && this.props.loading}
                {!this.state.loading && this.props.children}
            </React.Fragment>
        )
    }
}