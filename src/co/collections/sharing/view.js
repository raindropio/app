import React from 'react'
import t from '~t'
import network from '~modules/network'

import Icon from '~co/common/icon'
import Popover from '~co/popover/index'

export default class CollectionSharingView extends React.PureComponent {
    render() {
        const { collection } = this.props
        const { onClose, onPublicClick } = this.props

        return (
            <Popover onClose={onClose}>
                <div className='pop-content'>
                    <div className='list'>
                        <div className='item first'>
                            <div className='icon'>
                                <div className='icon-link'><Icon name='link' /></div>
                            </div>

                            <div className='title'>
                                {t.s('accessViaLink')}
                                <input type='text' className={collection.public ? '' : 'hidden'} readOnly autoFocus value={network.fixURL('/collection/'+collection._id||'')} />
                            </div>

                            <div className='actions'>
                                <div onClick={onPublicClick} className={'extra-checkbox'+(collection.public?' active':'')}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Popover>
        )
    }
}