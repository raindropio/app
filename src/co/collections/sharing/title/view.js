import React from 'react'
import t from '~t'
import { Header } from '~co/overlay/modal'

export default function CollectionSharingTitleView({ title }) {
    return (
        <Header 
            title={t.s('share')+' '+title+' '+t.s('collection').toLowerCase()} />
    )
}