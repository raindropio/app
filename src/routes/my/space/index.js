import React, { useMemo } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { makeCollection } from '~data/selectors/collections'

import AccentColor from '~co/collections/item/accentColor'
import Main, { Content } from '~co/screen/splitview/main'
import Header from './header'
import SearchIn from './search_in'
import Bookmarks from './bookmarks'

export default function PageMySpace() {
    const params = useParams()

    const getCollection = useMemo(makeCollection, [])
    const { title, cover=[] } = useSelector(state=>getCollection(state, params.cId))

    return (
        <AccentColor _id={params.cId}>{style=>(<>
            <Helmet>
                <title>{title}</title>
                {cover.length ? <link rel='icon' href={cover[0]} /> : null}
            </Helmet>

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