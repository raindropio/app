import s from './index.module.styl'
import React from 'react'
import Basic from '../basic'

export const Context = React.createContext({})

export default class ScreenSplitView extends React.Component {
    getScreen = ()=>{        
        if (window.innerWidth >= 800)
            return 3
        else if (window.innerWidth >= 600)
            return 2

        return 1
    }

    state = {
        screen: this.getScreen(),

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

    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize)
    }

    onWindowResize = ()=>{
        const screen = this.getScreen()
        if (screen != this.state.screen)
            this.setState({ screen })
    }

    render() {
        const { screen, sidebar, reader } = this.state

        let layout = 'm'
        if (reader.show && (reader.fullscreen || screen == 1))
            layout = 'r'
        else if (screen == 3 && sidebar.show && reader.show)
            layout = 'smr'
        else if (screen >= 2 && reader.show)
            layout = 'mr'
        else if (screen >= 2 && sidebar.show)
            layout = 'sm'
        else if (screen >= 1 && sidebar.show)
            layout = 'm'
        else if (sidebar.force)
            layout = 'sm'

        return (
            <Basic className={s.wrap}>
                <div 
                    className={`${s.splitview} ${s[layout]}`}
                    style={sidebar.width ? {'--preferred-sidebar-width': sidebar.width+'px'} : undefined}>
                    <Context.Provider value={this.state}>
                        {this.props.children}
                    </Context.Provider>
                </div>
            </Basic>
        )
    }
}