import React from 'react'
import _ from 'lodash'
import t from '~t'

import { Section, SectionTitle, SectionActions } from '~co/common/list'
import Button from '~co/common/button'
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
            <Section tabIndex='-1' onContextMenu={onContextMenu}>
                <SectionTitle onClick={onClick} >{title}</SectionTitle>
                <SectionActions>
                    <Button onClick={onContextMenu}>
                        <Icon name='more_horizontal' />
                    </Button>
                </SectionActions>
            </Section>
        )
    }
}