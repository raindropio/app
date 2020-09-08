import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { setMode } from '~data/actions/import'

import { Label, Radio } from '~co/common/form'
import Alert from '~co/common/alert'

class ImportMode extends React.Component {
    modes = [
        [
            'all',
            t.s('import')+' '+t.s('all').toLowerCase()
        ],
        [
            'new',
            t.s('only')+' '+(t.s('newString')+' '+t.s('folders')+' '+t.s('und')+' '+t.s('bookmarks')).toLowerCase()
        ],
        [
            'from_scratch',
            t.s('startFromScratch'),
            t.s('startFromScratchD'),
            'danger'
        ]
    ]

    onChange = e =>
        this.props.setMode(e.currentTarget.getAttribute('data-mode'))

    renderMode = ([key, title, warning, alertVariant])=>{
        const { mode, parcel: { status } } = this.props

        return (
            <React.Fragment key={key}>
                <Radio
                    name='mode'
                    data-mode={key}
                    disabled={status!='idle'}
                    checked={mode == key}
                    onChange={this.onChange}>
                    {title}
                </Radio>

                {mode == key && warning && (
                    <Alert
                        variant={alertVariant}>
                        {warning}
                    </Alert>
                )}
            </React.Fragment>
        )
    }

    render() {
        const { file: { status } } = this.props

        if (status != 'loaded')
            return null

        return (
            <>
                <Label>{t.s('mode')}</Label>

                <div>
                    {this.modes.map(this.renderMode)}
                </div>
            </>
        )
    }
}

export default connect(
    state => state.import,
    { setMode }
)(ImportMode)