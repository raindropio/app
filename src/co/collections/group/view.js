import React from 'react'

import { Section, SectionTitle, SectionActions } from '~co/common/list'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default class CollectionsGroupView extends React.Component {
    render() {
        const { title, system, active } = this.props
        const { isDragging, isDropping } = this.props
        const { onClick, onContextMenu, onCreateNewCollectionClick } = this.props

        if (system) return null

        return (
            <Section 
                active={active}
                isDragging={isDragging}
                isDropping={isDropping}
                onContextMenu={onContextMenu}>
                <SectionTitle onClick={onClick}>{title}</SectionTitle>

                <SectionActions>
                    <Button onClick={onCreateNewCollectionClick}>
                        <Icon name='add' />
                    </Button>

                    <Button onClick={onContextMenu}>
                        <Icon name='more_horizontal' />
                    </Button>
                </SectionActions>
            </Section>
        )
    }
}