import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Screen from '~co/screen/basic'
import { Layout, Separator } from '~co/common/form'
import { numericDate } from '~modules/format/date'

import useTabs, { preload } from './useTabs'
import useSubmit from './useSubmit'
import Header from './header'
import List from './list'
import Collection from './collection'
import Tags from './tags'
import Close from './close'
import Action from './action'

export { preload }

export default function ExtensionTabsScreen() {
    const params = useParams()
    const [tabs, setTabs] = useTabs()
    const [collectionId, setCollectionId] = useState(params.collectionId)
    const [tags, setTags] = useState(()=>[numericDate(new Date())])
    const [close, setClose] = useState(true)
    const {onSubmit, loading} = useSubmit({ tabs, collectionId, tags, close })

    return (
        <Screen>
            <Header />
            
            <form onSubmit={onSubmit}>
                <Layout type='grid'>
                    <List 
                        tabs={tabs}
                        setTabs={setTabs} />

                    {tabs.length>0 && (<>
                        <Collection
                            loading={loading}
                            collectionId={collectionId}
                            setCollectionId={setCollectionId} />

                        <Tags
                            loading={loading}
                            collectionId={collectionId}
                            tags={tags}
                            setTags={setTags} />

                        <Close 
                            close={close}
                            setClose={setClose} />

                        <Separator variant='transparent' />

                        <Action 
                            tabs={tabs}
                            loading={loading} />
                    </>)}
                </Layout>
            </form>
        </Screen>
    )
}