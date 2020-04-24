import React from 'react'
import Basic from '../basic'

export const Context = React.createContext({})

export default class ScreenSplitView extends React.PureComponent {
    state = {
        sidebar: {
            force: false,

            toggle: (e)=>{
                e && e.preventDefault && e.preventDefault()

                this.setState({
                    sidebar: {
                        ...this.state.sidebar,
                        force: !this.state.sidebar.force
                    }
                })
            }
        },
        panel: {
            show: false,

            toggle: (e)=>{
                e && e.preventDefault && e.preventDefault()

                this.setState({
                    panel: {
                        ...this.state.panel,
                        show: !this.state.panel.show
                    }
                })
            }
        },
        reader: {
            show: false,
            fullScreen: false,

            toggle: (e)=>{
                e && e.preventDefault && e.preventDefault()

                this.setState({
                    reader: {
                        ...this.state.reader,
                        show: !this.state.reader.show
                    }
                })
            },

            toggleFullScreen: (e)=>{
                e && e.preventDefault && e.preventDefault()

                this.setState({
                    reader: {
                        ...this.state.reader,
                        fullScreen: !this.state.reader.fullScreen
                    }
                })
            }
        }
    }

    render() {
        return (
            <Basic
                className={`
                    ${this.state.sidebar.force ? 'mode-force-sidebar' : ''}
                    ${this.state.panel.show ? 'mode-panel' : ''}
                    ${this.state.panel.show ? 'mode-reader' : ''}
                    ${this.state.panel.fullScreen ? 'mode-reader-fullscreen' : ''}
                `}>
                <Context.Provider value={this.state}>
                    {this.props.children}
                </Context.Provider>
            </Basic>
        )
    }
}

export const withSplitView = (Component)=>(
    class withSplitView extends React.PureComponent {
        displayName = 'withSplitView'+Component.name

        renderBody = consumerProps=>(
            <Component 
                {...consumerProps}
                {...this.props} />
        )

        render() {
            return (
                <Context.Consumer children={this.renderBody} />
            )
        }
    }
)