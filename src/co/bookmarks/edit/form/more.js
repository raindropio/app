import React from 'react'
import t from '~t'

import { Checkbox } from '~co/common/form'

export default class BookmarkEditFormMore extends React.Component {
    onChange = e=>{
        this.props.onChange({ important: e.target.checked })
        this.props.onCommit()
    }

    render() {
        const { item: { important }, status } = this.props
        const loading = status=='loading'

        return (
            <>
                <div />
                <Checkbox
                    checked={important}
                    disabled={loading}
                    onChange={this.onChange}>
                    {t.s('favorites')}
                </Checkbox>
            </>
        )
    }
}