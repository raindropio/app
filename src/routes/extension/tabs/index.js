import React, { useState } from 'react'
import Protected from '~co/screen/protected'
import Screen from '~co/screen/basic'
import { Layout, Separator } from '~co/common/form'

import useTabs from './useTabs'
import useSubmit from './useSubmit'
import Header from './header'
import List from './list'
import Collection from './collection'
import Tags from './tags'
import Action from './action'

export default function ExtensionTabsScreen({ match: { params } }) {
    const [tabs, setTabs] = useTabs()
    const [collectionId, setCollectionId] = useState(params.collectionId)
    const [tags, setTags] = useState([])
    const { onSubmit, loading } = useSubmit({ tabs, collectionId, tags })

    return (
        <Protected redirect>
            <Screen safariExtensionBackdrop>
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

                            <Separator variant='transparent' />

                            <Action 
                                tabs={tabs}
                                loading={loading} />
                        </>)}
                    </Layout>
                </form>
            </Screen>
        </Protected>
    )
}