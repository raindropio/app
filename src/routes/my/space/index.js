import React, { useMemo, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import { makeCollection } from '~data/selectors/collections'
import { setVisitedSpace } from '~local/actions'

import AccentColor from '~co/collections/item/accentColor'
import Main, { Content } from '~co/screen/splitview/main'
import Header from './header'
import SearchIn from './search_in'
import Bookmarks from './bookmarks'

export default function PageMySpace() {
    const params = useParams()

    //used for browser tab title
    const getCollection = useMemo(makeCollection, [])
    const { title } = useSelector(state=>getCollection(state, params.cId))

    //update last visited space
    const dispatch = useDispatch()
    useEffect(()=>{ dispatch(setVisitedSpace(params)) }, [params])

    return (
        <AccentColor _id={params.cId}>{style=>(<>
            <Helmet>
                <title>{title}</title>
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