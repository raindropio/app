import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { set } from '~data/actions/config'

import { Label, Checkbox } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

class SettingsAppRaindropsButtons extends React.Component {
    _button = React.createRef()

    options = [
        ['select',      t.s('select'), 'select_all'],
        ['current_tab', t.s('open'), 'click'],
        ['new_tab',     t.s('open') + ' ' + t.s('inNewTab'), 'open'],
        ['preview',     t.s('preview'), 'show'],
        ['web',         'Web', 'web'],
        ['copy',        t.s('copyLinkToClipboard'), 'duplicates'],
        ['important',   t.s('add') +' ' + t.s('to') + ' ' + t.s('favorites').toLowerCase(), 'like'],
        ['tags',        t.s('tags'), 'tag'],
        ['edit',        t.s('edit'), 'edit'],
        ['remove',      t.s('remove'), 'trash']
    ]

    getOption = (find)=>
        (this.options.find(([id])=>id==find) || [])

    state = {
        show: false
    }

    onShowClick = ()=>
        this.setState({ show: true })

    onToggleButton = e => {
        const id = e.currentTarget.name
        let raindrops_buttons = [...this.props.raindrops_buttons]

        if (raindrops_buttons.includes(id))
            raindrops_buttons = raindrops_buttons.filter(b=>b!=id)
        else
            raindrops_buttons.push(id)

        this.props.set('raindrops_buttons', raindrops_buttons)

        e.preventDefault()
    }

    render() {
        const { raindrops_buttons } = this.props
        const { show } = this.state

        return (
            <>
                <Label>{t.s('buttons')}</Label>

                {show ? (
                    <div>
                        {this.options.map(([id, title, icon])=>{
                            const checked = raindrops_buttons.includes(id)

                            return (
                                <Checkbox
                                    key={id}
                                    name={id}
                                    checked={checked}
                                    disabled={raindrops_buttons.length >= 5 && !checked}
                                    onChange={this.onToggleButton}>
                                    <Icon name={icon} />
                                    {title}
                                </Checkbox>
                            )
                        })}
                    </div>
                ) : (
                    <div>
                        <Button
                            ref={this._button}
                            variant='outline'
                            onClick={this.onShowClick}>
                            {raindrops_buttons.length ? 
                                //icons
                                this.options
                                    .filter(([id])=>raindrops_buttons.includes(id))
                                    .map(([id])=>
                                        <Icon 
                                            key={id}
                                            name={this.getOption(id)[2]} />
                                    ) :
                                //nothing selected
                                <span>{t.s('hide')} {t.s('all').toLowerCase()}</span>
                            }
                            <Icon name='expand' size='micro' />
                        </Button>
                    </div>
                )}
            </>
        )
    }
}

export default connect(
    state=>({
        raindrops_buttons: state.config.raindrops_buttons
    }),
    { set }
)(SettingsAppRaindropsButtons)