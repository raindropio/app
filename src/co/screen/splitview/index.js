import s from './index.module.styl'
import React from 'react'
import _ from 'lodash'
import Basic from '../basic'

export const Context = React.createContext({})

export default class ScreenSplitView extends React.Component {
    state = {
        sidebar: {
            width: parseInt(localStorage && localStorage.getItem('splitview-sidebar-width')),
            show: localStorage && localStorage.getItem('splitview-sidebar-show') !== null ? (localStorage.getItem('splitview-sidebar-show')=='true') : true,

            toggle: (e)=>{
                e && e.preventDefault && e.preventDefault()

                let show = !this.state.sidebar.show
                
                this.update('sidebar', { show })
            },

            close: (e)=>{
                e && e.preventDefault && e.preventDefault()

                this.update('sidebar', { show: false })
            },

            resize: (width)=>{
                if (this.container.current)
                    this.container.current.style.setProperty('--sidebar-width', width+'px')
                this.update('sidebar', { width })
            }
        },
        reader: {
            show: false,
            fullscreen: false,

            update: (props)=>{
                this.update('reader', props)
            }
        }
    }

    update = _.debounce((space, obj)=>{
        let changed = false

        for(const key in obj)
            if (this.state[space][key] != obj[key]){
                changed = true
                break
            }

        if (!changed) return
        
        this.setState({
            [space]: {
                ...this.state[space],
                ...obj
            }
        }, ()=>{
            //persist sidebar preferences
            if (space=='sidebar' && localStorage){
                if (typeof obj.width == 'number')
                    localStorage.setItem('splitview-sidebar-width', obj.width)

                if (typeof obj.show != 'undefined')
                    localStorage.setItem('splitview-sidebar-show', obj.show)
            }
        })
    }, 300, { leading: true })

    container = React.createRef()

    render() {
        const { sidebar, reader } = this.state

        return (
            <Basic {...this.props}>
                <div
                    ref={this.container}
                    className={`
                        ${s.splitview}
                        ${sidebar.show ? s.s : ''}
                        ${reader.show ? s.r : ''}
                        ${reader.fullscreen ? s.f : ''}
                    `}
                    style={sidebar.width ? {'--sidebar-width': sidebar.width+'px'} : undefined}>
                    <Context.Provider value={this.state}>
                        {this.props.children}
                    </Context.Provider>
                </div>
            </Basic>
        )
    }
}