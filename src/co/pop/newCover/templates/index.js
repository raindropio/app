import React from 'react'
import CoversStore from '../../../../stores/covers'

import Listing from './listing'
import Search from './search'

export default class NewCoverTemplates extends React.Component {
    constructor(props) {
        super(props)

        this.state = CoversStore.getState()
    }

    componentDidMount() {
        this._uns = CoversStore.listen(this.onCoversChange.bind(this));

        CoversStore.onLoad()
    }

    componentWillUnmount() {
        this._uns && this._uns()
    }

    onCoversChange = (state) => this.setState(state)

    render() {
        return (
            <div className='nc-templates'>
                <Search {...this.state} {...this.props} />
                <Listing {...this.state} {...this.props} />
            </div>
        )
    }
}