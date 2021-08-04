import s from './index.module.styl'
import React from 'react'
import debounce from '~modules/format/callback/debounce'
import Basic from '../basic'

export const Context = React.createContext({})

export default class ScreenSplitView extends React.Component {
    state = {
        sidebar: {
            width: window.localStorage ? parseInt(window.localStorage.getItem('splitview-sidebar-width')) : 0,
            show: window.localStorage && window.localStorage.getItem('splitview-sidebar-show') !== null ? (window.localStorage.getItem('splitview-sidebar-show')=='true') : true,

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

    update = debounce((space, obj)=>{
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
            if (space=='sidebar' && window.localStorage){
                if (typeof obj.width == 'number')
                    window.localStorage.setItem('splitview-sidebar-width', obj.width)

                if (typeof obj.show != 'undefined')
                    window.localStorage.setItem('splitview-sidebar-show', obj.show)
            }
        })
    }, 300, { leading: true })

    container = React.createRef()

    render() {
        const { sidebar, reader } = this.state
        const { children, className='', ...etc } = this.props

        return (
            <Basic 
                {...etc}
                className={s.page+' '+className}>
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
                        {children}
                    </Context.Provider>
                </div>
            </Basic>
        )
    }
}