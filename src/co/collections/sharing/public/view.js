import React from 'react'
import t from '~t'

import { Layout, Text, Checkbox, Label } from '~co/common/form'
import Button from '~co/common/button'

export default class CollectionSharingPublic extends React.Component {
    url = React.createRef()
    rss = React.createRef()

    onCopyURLClick = () =>{
        this.url.current.select()
        this.url.current.setSelectionRange(0, 99999)
        document.execCommand('copy')
    }

    onCopyRSSClick = () =>{
        this.rss.current.select()
        this.rss.current.setSelectionRange(0, 99999)
        document.execCommand('copy')
    }

    render() {
        const { _id, onPublicClick, access, ...etc } = this.props

        return (
            <Layout>
                <div>
                    <Checkbox 
                        checked={etc.public}
                        disabled={access.level < 3}
                        onChange={onPublicClick}>
                        {t.s('access')} {t.s('accessViaLink').toLowerCase()} / RSS
                    </Checkbox>

                    {etc.public && (
                        <>
                            <Label>URL</Label>
                            <Text 
                                ref={this.url}
                                type='text'
                                readOnly
                                autoFocus
                                value={`https://raindrop.io/collection/${_id||''}`}>
                                <Button 
                                    variant='link'
                                    onClick={this.onCopyURLClick}>
                                    {t.s('copyURL')}
                                </Button>
                            </Text>

                            <Label>RSS</Label>
                            <Text 
                                ref={this.rss}
                                type='text'
                                readOnly
                                value={`https://raindrop.io/collection/${_id||''}/feed`}>
                                <Button 
                                    variant='link'
                                    onClick={this.onCopyRSSClick}>
                                    {t.s('copyURL')}
                                </Button>
                            </Text>
                        </>
                    )}
                </div>
            </Layout>
        )
    }
}