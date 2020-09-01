import React from 'react'
import t from '~t'

import { Checkbox } from '~co/common/form'

export default class BookmarkEditFormMore extends React.Component {
    onChange = e=>{
        this.props.onChange({ important: e.target.checked })
        this.props.onSubmit()
    }

    render() {
        const { item: { important } } = this.props

        return (
            <>
                <div />
                <Checkbox
                    checked={important}
                    onChange={this.onChange}>
                    {t.s('favoriteSites')}
                </Checkbox>
            </>
        )
    }
}