import React from 'react'
import _ from 'lodash'
import t from '~t'

export default class FiltersSection extends React.Component {
    render() {
        const { _id, hidden } = this.props
        const { onClick, onContextMenu } = this.props
        let title

        switch (_id) {
            case 'tags': title = t.s('tags'); break
            case 'types': title = _.capitalize(t.s('fastFilter')); break
        }

        return (
            <div className='group' tabIndex='-1' onClick={onClick} onContextMenu={onContextMenu}>
                <div className='title'>{title}</div>
                <span className='toggle'>{t.s(hidden ? 'show' : 'hide')}</span>
            </div>
        )
    }
}