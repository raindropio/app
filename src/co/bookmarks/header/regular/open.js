import React from 'react'
import t from '~t'
import config from '~config'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default ({ className, spaceId })=>(
    <Button 
        className={className}
        href={new URL(`/my/${spaceId}`, config.links.app.index).toString()}
        target='_blank'
        title={t.s('open')+' '+t.s('inNewTab')}>
        <Icon name='open' />
    </Button>
)