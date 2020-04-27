import React from 'react'
import Icon from '~co/common/icon'
import Preloader from '~co/common/preloader'

import SplitView from '../splitview'
import Sidebar, { Header, Content } from '../splitview/sidebar'
import Main from '../splitview/main'

export default ()=>(
    <SplitView>
        <Sidebar>
            <Header title={<Icon name='raindrop_logo' className='raindropLogo' />} />

            <Content>
                <section>
                    <div className='collection placeholder' />
                    <div className='collection placeholder small' />
                </section>

                <section>
                    <div className='group placeholder' />
                    <div className='collection placeholder' />
                </section>
            </Content>
        </Sidebar>

        <Main>
            <div className='centerContentWrap'><div className='centerContent'>
                <Preloader/>
            </div></div>
        </Main>
    </SplitView>
)