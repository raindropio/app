import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as configActions from '~data/actions/config'

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
                <a ref={this.pin} className='button' onClick={this.onSettingsClick}>
                    <Icon name={tab == 'preview' ? 'fonts' : 'settings'} />
                </a>

                {this.state.show && (
                    <Popover pin={this.pin} onClose={this.onSettingsClose}>
                        <div className='popBodyPreview'>
                            <div className='popBodyPreviewSwitch pop-block-shadow'>
                                <a className={'auto '+(font_color==''?'active':'')} data-key='font_color' data-val='' onClick={this.onSettingChange}></a>
                                <a className={'day '+(font_color=='day'?'active':'')} data-key='font_color' data-val='day' onClick={this.onSettingChange}></a>
                                <a className={'sunset '+(font_color=='sunset'?'active':'')} data-key='font_color' data-val='sunset' onClick={this.onSettingChange}></a>
                                <a className={'dark '+(font_color=='night'?'active':'')} data-key='font_color' data-val='night' onClick={this.onSettingChange}></a>
                            </div>

                            <div className='popBodyPreviewFont pop-block-shadow'>
                                <a className={'default '+(font_family==''?'active':'')} data-key='font_family' data-val='' onClick={this.onSettingChange}>System font</a>
                                <a className={'georgia '+(font_family=='georgia'?'active':'')} data-key='font_family' data-val='georgia' onClick={this.onSettingChange}>Georgia</a>
                                <a className={'verdana '+(font_family=='verdana'?'active':'')} data-key='font_family' data-val='verdana' onClick={this.onSettingChange}>Verdana</a>
                            </div>
                            
                            <div className='pop-block-shadow'>
                                <Slider min='1' max='9' value={font_size} leftIcon='font_small' rightIcon='font_big' onChange={this.onFontSizeChange} />
                            </div>
                        </div>
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