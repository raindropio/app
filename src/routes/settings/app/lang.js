import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { set } from '~data/actions/config'
import supported from '~assets/languages/index.json'
import config from '~config'

import { Label } from '~co/common/form'
import Select from '~co/common/select'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

class SettingsAppLang extends React.Component {
    onChange = (e)=>{
        this.props.set('lang', e.target.value)
    }

    render() {
        return (
            <>
                <Label>{t.s('language')}</Label>
                <div>
                    <Select 
                        autoFocus
                        variant='outline'
                        value={this.props.lang}
                        onChange={this.onChange}>
                        {Object.entries(supported).map(([key, label])=>
                            <option key={key} value={key}>{label}</option>
                        )}
                    </Select>
                    
                    &nbsp;&nbsp;

                    <Button 
                        href={config.links.translation}
                        target='_blank'
                        variant='flat'>
                        <Icon name='open' size='micro' />
                        Help in translation
                    </Button>
                </div>
            </>
        )
    }
}

export default connect(
    state=>({
        lang: state.config.lang
    }),
    { set }
)(SettingsAppLang)