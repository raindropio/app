import s from './index.module.css'
import React from 'react'
import { useSelector } from 'react-redux'
import { isPro } from '~data/selectors/user'

import Screen from '~co/screen/basic'
import Header, { Title, FirstAction } from '~co/common/header'
import Button from '~co/common/button'
import { Link } from 'react-router-dom'
import Icon from '~co/common/icon'
import Intro from './intro'
import Predictions from './predictions'

export default function PageSuggestions() {
    const enabled = useSelector(state=>state.config.ai_suggestions)
    const pro = useSelector(state=>isPro(state))

    return (
        <Screen className={s.main} appSize='large'>
            <Header className={s.header} data-solid data-no-shadow>
                <FirstAction className='svSidebarShowButton'>
                    <Button as={Link} to='/'>
                        <Icon name='back' />
                    </Button>
                </FirstAction>

                <Title>✦ AI Suggestions</Title>
            </Header>

            <div className={s.split} data-enabled={enabled && pro}>
                <Intro />

                {enabled && pro ? (
                    <div className={s.content}>
                        <Predictions />
                    </div>
                ) : null}
            </div>
        </Screen>
    )
}