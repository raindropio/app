import React from 'react'
import t from '~t'
import _ from 'lodash'
import { connect } from 'react-redux'
import { set } from '~data/actions/config'
import supported from '~assets/languages/index.json'
import config from '~config'

import { Label } from '~co/common/form'
import Select from '~co/common/select'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

class SettingsAppLang extends React.Component {
    static defaultProps = {
        showContribute: true
    }

    list = _.sortBy(Object.entries(supported), ([key, label])=>label)

    onChange = (e)=>{
        this.props.set('lang', e.target.value)
    }

    render() {
        const { lang, showContribute } = this.props

        return (
            <>
                <Label>{t.s('language')}</Label>
                <div>
                    <Select 
                        autoFocus
                        variant='outline'
                        value={lang}
                        onChange={this.onChange}>
                        {this.list.map(([key, label])=>
                            <option key={key} value={key}>{label}</option>
                        )}
                    </Select>
                    
                    &nbsp;&nbsp;

                    {showContribute && (
                        <Button 
                            href={config.links.translation}
                            target='_blank'
                            variant='flat'>
                            <Icon name='open' size='micro' />
                            Help in translation
                        </Button>
                    )}
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