import s from './index.module.styl'
import React from 'react'
import Basic from '../basic'

export const Context = React.createContext({})

export default class ScreenSplitView extends React.Component {
    state = {
        sidebar: {
            show: true,

            toggle: (e)=>{
                e && e.preventDefault && e.preventDefault()
                this.state.update('sidebar', { show: !this.state.sidebar.show })
            },
        },
        reader: {
            show: false,
            fullscreen: false
        },

        update: (space, obj)=>{
            this.setState({
                [space]: {
                    ...this.state[space],
                    ...obj
                }
            })
        }
    }

    render() {
        const { sidebar, reader } = this.state

        return (
            <Basic
                className={`
                    ${s.splitview}
                    ${sidebar.show ? s.showSidebar : ''}
                    ${reader.show ? s.showReader : ''}
                    ${reader.fullscreen ? s.showReaderFullscreen : ''}
                `}>
                <Context.Provider value={this.state}>
                    {this.props.children}
                </Context.Provider>
            </Basic>
        )
    }
}