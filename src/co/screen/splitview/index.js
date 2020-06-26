import s from './index.module.styl'
import React from 'react'
import Basic from '../basic'

export const Context = React.createContext({})

export default class ScreenSplitView extends React.Component {
    state = {
        sidebar: {
            width: parseInt(localStorage.getItem('splitview-sidebar-width')),
            show: localStorage.getItem('splitview-sidebar-show') !== null ? (localStorage.getItem('splitview-sidebar-show')=='true') : true,
            force: false,

            toggle: (e)=>{
                e && e.preventDefault && e.preventDefault()

                let show = !this.state.sidebar.show
                let force = this.state.sidebar.force

                if (!show && !force && window.innerWidth <= 1000){
                    show = true
                    force = true
                }
                
                this.state.update('sidebar', { show, force })
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
            }, ()=>{
                //persist sidebar preferences
                if (space=='sidebar'){
                    if (obj.width)
                        localStorage.setItem('splitview-sidebar-width', obj.width)

                    if (typeof obj.show != 'undefined')
                        localStorage.setItem('splitview-sidebar-show', obj.show)
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
                    ${sidebar.force ? s.forceSidebar : ''}
                    ${reader.show ? s.showReader : ''}
                    ${reader.fullscreen ? s.showReaderFullscreen : ''}
                `}
                style={sidebar.width ? {'--preferred-sidebar-width': sidebar.width+'px'} : undefined}>
                <Context.Provider value={this.state}>
                    {this.props.children}
                </Context.Provider>
            </Basic>
        )
    }
}