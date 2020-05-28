import React from 'react'
import t from '~t'
import network from '~modules/network'

import Icon from '~co/common/icon'

export default function CollectionSharingPublic({ _id, onPublicClick, ...etc }) {
    return (
        <div className='item first'>
            <div className='icon'>
                <div className='icon-link'><Icon name='link' /></div>
            </div>

            <div className='title'>
                {t.s('accessViaLink')}
                <input type='text' className={etc.public ? '' : 'hidden'} readOnly autoFocus value={network.fixURL('/collection/'+_id||'')} />
            </div>

            <div className='actions'>
                <div onClick={onPublicClick} className={'extra-checkbox'+(etc.public?' active':'')}></div>
            </div>
        </div>
    )
}