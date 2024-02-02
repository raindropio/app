import s from './lang.module.styl'
import React from 'react'
import t from '~t'
import _ from 'lodash'
import { connect } from 'react-redux'
import { set } from '~data/actions/config'
import supported from '~assets/languages/index.json'

import { Label } from '~co/common/form'
import Select from '~co/common/select'

class SettingsAppLang extends React.Component {
    list = _.sortBy(Object.entries(supported), ([key, label])=>label)

    onChange = (e)=>{
        this.props.set('lang', e.target.value)
    }

    render() {
        const { lang } = this.props

        return (
            <>
                <Label>{t.s('language')}</Label>
                <div className={s.lang}>
                    <Select 
                        autoFocus
                        variant='outline'
                        value={lang}
                        onChange={this.onChange}>
                        {this.list.map(([key, label])=>
                            <option key={key} value={key}>{label}</option>
                        )}
                    </Select>
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