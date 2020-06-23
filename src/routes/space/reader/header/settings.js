import s from './settings.module.styl'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as configActions from '~data/actions/config'

import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Popover from '~co/overlay/popover'
import Slider from '~co/common/slider'

class ReaderHeaderSettings extends React.Component {
    state = {
        show: false
    }

    pin = React.createRef()

    onSettingsClick = (e)=>{
        e.preventDefault()
        this.setState({ show: true })
    }

    onSettingsClose = ()=>
        this.setState({ show: false })

    onSettingChange = (e)=>
        this.props.actions.set(e.target.getAttribute('data-key'), e.target.getAttribute('data-val'))

    onFontSizeChange = val=>
        this.props.actions.set('font_size', val)

    render() {
        const { tab, font_color, font_family, font_size } = this.props

        return (
            <>
                <Button ref={this.pin} onClick={this.onSettingsClick}>
                    <Icon name={tab == 'preview' ? 'fonts' : 'settings'} />
                </Button>

                {this.state.show && (
                    <Popover pin={this.pin} onClose={this.onSettingsClose}>
                        <div className={s.switch}>
                            <a className={s.auto+' '+(font_color==''?s.active:'')} data-key='font_color' data-val='' onClick={this.onSettingChange}></a>
                            <a className={s.day+' '+(font_color=='day'?s.active:'')} data-key='font_color' data-val='day' onClick={this.onSettingChange}></a>
                            <a className={s.sunset+' '+(font_color=='sunset'?s.active:'')} data-key='font_color' data-val='sunset' onClick={this.onSettingChange}></a>
                            <a className={s.dark+' '+(font_color=='night'?s.active:'')} data-key='font_color' data-val='night' onClick={this.onSettingChange}></a>
                        </div>

                        <div className={s.font}>
                            <a className={s.default+' '+(font_family==''?s.active:'')} data-key='font_family' data-val='' onClick={this.onSettingChange}>System font</a>
                            <a className={s.georgia+' '+(font_family=='georgia'?s.active:'')} data-key='font_family' data-val='georgia' onClick={this.onSettingChange}>Georgia</a>
                            <a className={s.verdana+' '+(font_family=='verdana'?s.active:'')} data-key='font_family' data-val='verdana' onClick={this.onSettingChange}>Verdana</a>
                        </div>
                        
                        <Slider min='1' max='9' value={font_size} leftIcon='font_small' rightIcon='font_big' onChange={this.onFontSizeChange} />
                    </Popover>
                )}
            </>
        )
    }
}

export default connect(
    state=>({
        font_size: state.config.font_size,
        font_color: state.config.font_color,
        font_family: state.config.font_family
    }),
    (dispatch)=>({
		actions: bindActionCreators(configActions, dispatch)
    }),
)(ReaderHeaderSettings)