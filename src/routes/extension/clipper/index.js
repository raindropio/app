import React from 'react'
import { currentTab } from '~target'

import Protected from '~co/screen/protected'
import Screen from '~co/screen/basic'
import Header from './header'
import Content from './content'

//faster load of current tab
let _item = {}
async function getItem() {
    if (!currentTab) return

    const { url, title } = await currentTab()
    _item = {
        link: url,
        title
    }
    return _item
}
getItem()
//-----

export default class Clipper extends React.Component {
    state = {
        item: _item
    }

    async componentDidMount() {
        this.setState({
            item: await getItem()
        })
    }

    render() {
        const { item } = this.state

        return (
            <Protected redirect>
                <Screen>
                    <Header {...this.props} item={item} />
                    <Content {...this.props} item={item} />
                </Screen>
            </Protected>
        )
    }
}