import s from './index.module.styl'
import React from 'react'
import Preloader from '~co/common/preloader'

import SplitView from '~co/screen/splitview'
import Sidebar, { Header, Content } from '~co/screen/splitview/sidebar'
import Main from '~co/screen/splitview/main'
import Reader from '~co/screen/splitview/reader'

import Avatar from '~co/common/avatar'
import Button from '~co/common/button'
import { FirstAction } from '~co/common/header'
import CollectionsEmpty from '~co/collections/items/empty'

export default function LoadingRoute() {
    return (
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
}