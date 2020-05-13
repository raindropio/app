import React from 'react'
import _ from 'lodash'
import t from '~t'
import Icon from '~co/common/icon'

export default class FiltersSection extends React.Component {
    render() {
        const { _id } = this.props
        const { onClick, onContextMenu } = this.props
        let title

        switch (_id) {
            case 'tags': title = t.s('tags'); break
            case 'types': title = _.capitalize(t.s('fastFilter')); break
        }

        return (
            <div className='group' tabIndex='-1' onContextMenu={onContextMenu}>
                <div className='title' onClick={onClick} >{title}</div>
                <div className='toggle'><Icon name='more_horizontal' onClick={onContextMenu} /></div>
            </div>
        )
    }
}