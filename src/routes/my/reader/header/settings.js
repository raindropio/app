import s from './settings.module.styl'
import React from 'react'
import t from '~t'
import _ from 'lodash'
import { connect } from 'react-redux'
import { set } from '~data/actions/config'

import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Popover from '~co/overlay/popover'
import { Layout, Radio, Label, Range } from '~co/common/form'

const fonts = ['', 'serif', 'Palatino', 'Times New Roman', 'Trebuchet MS', 'georgia', 'verdana', 'monospace']

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
        this.props.set(e.target.getAttribute('data-key'), e.target.getAttribute('data-val'))

    onFontSizeChange = e=>
        this.props.set('font_size', e.target.value)

    renderFont = (font='')=>(
        <Radio 
            key={font}
            checked={this.props.font_family==font}
            data-key='font_family'
            data-val={font}
            style={{fontFamily: font}}
            onChange={this.onSettingChange}>
            {_.capitalize(font)||'System'}
        </Radio>
    )

    render() {
        const { font_color, font_size } = this.props

        return (
            <>
                <Button ref={this.pin} title={t.s('settings')} onClick={this.onSettingsClick}>
                    <Icon name='settings' />
                </Button>

                {this.state.show && (
                    <Popover pin={this.pin} onClose={this.onSettingsClose}>
                        <Layout>
                            <Label>{t.s('interfaceStyle')}</Label>
                            <div className={s.switch}>
                                <a className={s.auto+' '+(font_color==''?s.active:'')} data-key='font_color' data-val='' onClick={this.onSettingChange}></a>
                                <a className={s.day+' '+(font_color=='day'?s.active:'')} data-key='font_color' data-val='day' onClick={this.onSettingChange}></a>
                                <a className={s.sunset+' '+(font_color=='sunset'?s.active:'')} data-key='font_color' data-val='sunset' onClick={this.onSettingChange}></a>
                                <a className={s.dark+' '+(font_color=='night'?s.active:'')} data-key='font_color' data-val='night' onClick={this.onSettingChange}></a>
                            </div>

                            <Label>{t.s('fontFamily')}</Label>
                            <div>{fonts.map(this.renderFont)}</div>

                            <Label>{t.s('fontSize')}</Label>
                            <Range min='1' max='9' value={font_size} onChange={this.onFontSizeChange} />
                        </Layout>
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
    { set },
)(ReaderHeaderSettings)