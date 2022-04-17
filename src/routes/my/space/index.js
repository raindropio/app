import React from 'react'
import { Outlet, useParams } from 'react-router-dom'

import AccentColor from '~co/collections/item/accentColor'
import Main, { Content } from '~co/screen/splitview/main'
import Header from './header'
import SearchIn from './search_in'
import Bookmarks from './bookmarks'

export default function PageMySpace() {
    const params = useParams()

    return (
        <AccentColor _id={params.cId}>{style=>(<>
            <Main style={style}>
                <Header {...params} />
                <SearchIn {...params} />

                <Content>    
                    <Bookmarks {...params} />
                </Content>
            </Main>

            <Outlet />
        </>)}</AccentColor>
    )
}