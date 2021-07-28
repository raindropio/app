import React from 'react'
import { getMeta } from '~target'

import Protected from '~co/screen/protected'
import Screen from '~co/screen/basic'
import Header from './header'
import Content from './content'

//faster load of current tab
let item = {}
async function getItem() {
    item = await getMeta()
    return item
}
getItem().catch(()=>{})
//-----

export default class Clipper extends React.Component {
    constructor(props) {
        super(props)
        this.state = { item }
    }

    async componentDidMount() {
        if (!this.state.item.link)
            this.setState({
                item: await getItem()
            })
    }

    render() {
        const { item } = this.state

        return (
            <Protected redirect>
                <Screen safariExtensionBackdrop>
                    <Header {...this.props} item={item} />
                    <Content {...this.props} item={item} />
                </Screen>
            </Protected>
        )
    }
}