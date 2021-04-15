import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { refresh } from '~data/actions/bookmarks'
import { makeSpaceElements, makeSelectMode, status } from '~data/selectors/bookmarks'
import config from '~config'
import { target, openTab } from '~target'

import Modal, { Header, Content } from '~co/overlay/modal'
import Preloader from '~co/common/preloader'

const _warningKey = 'open-multiple-links-help-ignore'
let showWarning = false

try{
    showWarning = target == 'web' && localStorage && !localStorage.getItem(_warningKey)
} catch(e){}

class BookmarkOpenAll extends React.Component {
    static defaultProps = {
        selected: false,
        onClose: undefined
    }

    componentDidMount() {
        if (!this.props.selected && 
            this.props.status.main != 'loaded')
            this.props.refresh(this.props.spaceId)
        else
            this.open()
    }

    componentDidUpdate(prev) {
        if (prev.status.main != this.props.status.main &&
            this.props.status.main == 'loaded')
            this.open()
    }

    open = ()=>{
        const { onClose, bookmarks, selectMode, selected } = this.props

        const links = Object.entries(bookmarks)
            //only selected in selectMode
            .filter(([_, { _id }])=>{
                if (selected && !selectMode.all)
                    return selectMode.ids.includes(_id)

                return true
            })
            .map(([_, {link}])=>link)

        //open links
        openTab(links)

        //just close dialog when bookmarks less=1, or warning already showen
        if (links.length <= 1 || !showWarning)
            onClose()
        else {
            if (window.localStorage)
                window.localStorage.setItem(_warningKey, 1)
            showWarning = false
        }
    }

    renderBody = ()=>{
        const { status } = this.props

        switch(status.main) {
            case 'loading':
                return (
                    <Header title={t.s('loading')}>
                        <Preloader />
                    </Header>
                )

            case 'empty':
                return (
                    <Header title={t.s('noBookmarks')} />
                )

            case 'loaded':
                return (
                    <>
                        <Header title='Having problems?' data-no-shadow />
                        <Content data-indent>
                            Usually browsers prevent opening too many tabs at once.<br/>
                            To fix that please read our <a href={config.links.help['open-multiple-links']} target='_blank'>help page</a>.
                        </Content>
                    </>
                )

            default:
                return (
                    <Header title={t.s('error')} />
                )
        }
    }

    render() {
        const { onClose } = this.props

        return (
            <Modal onClose={onClose}>
                {this.renderBody()}
            </Modal>
        )
    }
}

export default connect(
	()=>{
        const getSpaceElements = makeSpaceElements()
        const getSelectMode = makeSelectMode()

        return (state, { spaceId })=>({
            bookmarks: getSpaceElements(state, spaceId),
            selectMode: getSelectMode(state, spaceId),
            status: status(state, spaceId)
        })
    },
	{ refresh }
)(BookmarkOpenAll)