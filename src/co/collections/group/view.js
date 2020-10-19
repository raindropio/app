import s from './view.module.styl'
import React from 'react'
import t from '~t'

import { Section, SectionTitle, SectionActions } from '~co/common/list'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default class CollectionsGroupView extends React.Component {
    render() {
        const { title, system, active, hidden } = this.props
        const { isDragging, isDropping } = this.props
        const { onClick, onContextMenu, onCreateNewCollectionClick } = this.props

        if (system) return null

        return (
            <Section 
                className={s.section}
                active={active}
                isDragging={isDragging}
                isDropping={isDropping}
                onClick={onClick}
                onContextMenu={onContextMenu}>
                <SectionTitle>
                    {title}
                </SectionTitle>

                <SectionActions>
                    {/*<Button 
                        title={t.s('createNewCollection')}
                        onClick={onCreateNewCollectionClick}>
                        <Icon name='add' />
                    </Button>*/}

                    {hidden ?
                        <Button 
                            variant='outline'
                            size='small'>
                            {t.s('show')}
                        </Button>
                        :
                        <Button 
                            title={t.s('more')}
                            onClick={onContextMenu}>
                            <Icon name='more_horizontal' />
                        </Button>
                    }
                </SectionActions>
            </Section>
        )
    }
}