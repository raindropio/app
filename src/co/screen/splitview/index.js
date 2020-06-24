import React from 'react'
import Basic from '../basic'

export const Context = React.createContext({})

export default class ScreenSplitView extends React.Component {
    state = {
        sidebar: {
            force: true,

            toggle: (e)=>{
                e && e.preventDefault && e.preventDefault()
                this.state.update('sidebar', { force: !this.state.sidebar.force })
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
        return (
            <Basic
                className={`
                    splitView
                    ${this.state.sidebar.force ? 'mode-force-sidebar' : ''}
                    ${this.state.reader.show ? 'mode-reader' : ''}
                    ${this.state.reader.fullscreen ? 'mode-reader-fullscreen' : ''}
                `}>
                <Context.Provider value={this.state}>
                    {this.props.children}
                </Context.Provider>
            </Basic>
        )
    }
}