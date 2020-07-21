import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { refresh } from '~data/actions/bookmarks'
import { makeSpaceElements, makeSelectMode, status } from '~data/selectors/bookmarks'
import config from '~config'

import Modal, { Header, Content } from '~co/overlay/modal'
import Preloader from '~co/common/preloader'

const _warningKey = 'open-multiple-links-help-ignore'
let showWarning = !localStorage.getItem(_warningKey)

class BookmarkOpenAll extends React.Component {
    static defaultProps = {
        selected: false,
        onClose: undefined
    }

    componentDidMount() {
        this.props.refresh(this.props.spaceId)
    }

    componentDidUpdate(prev) {
        const { onClose, bookmarks, status, selectMode, selected } = this.props
        if (prev.status.main == status.main) return

        if (status.main == 'loaded'){
            const links = Object.entries(bookmarks)
                //only selected in selectMode
                .filter(([_, { _id }])=>{
                    if (selected)
                        return selectMode.ids.includes(_id)

                    return true
                })
                .map(([_, {link}])=>link)

            //open links
            for(const link of links)
                window.open(link)

            //just close dialog when bookmarks less=1, or warning already showen
            if (links.length <= 1 || !showWarning)
                onClose()
            else {
                localStorage.setItem(_warningKey, 1)
                showWarning = false
            }
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