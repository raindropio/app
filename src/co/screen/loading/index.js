import s from './index.module.styl'
import React from 'react'
import Preloader from '~co/common/preloader'

import SplitView from '../splitview'
import Sidebar, { Header, Content } from '../splitview/sidebar'
import Main from '../splitview/main'
import Reader from '../splitview/reader'

import Avatar from '~co/common/avatar'
import Button from '~co/common/button'
import { FirstAction } from '~co/common/header'
import CollectionsEmpty from '~co/collections/items/empty'

export default ()=>(
    <SplitView>
        <Sidebar>
            <Header>
                <FirstAction>
                    <Button disabled>
                        <Avatar />
                        &mdash;&mdash;&mdash;&mdash;
                    </Button>
                </FirstAction>
            </Header>

            <Content>
                <CollectionsEmpty />
            </Content>
        </Sidebar>

        <Main className={s.main}>
            <Preloader enlarge='1.5' />
        </Main>

        <Reader />
    </SplitView>
)