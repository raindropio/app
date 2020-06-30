import React from 'react'
import t from '~t'

import { Layout, Text, Checkbox, Title } from '~co/common/form'
import Button from '~co/common/button'

export default class CollectionSharingPublic extends React.Component {
    input = React.createRef()

    onCopyClick = () =>{
        this.input.current.select()
        this.input.current.setSelectionRange(0, 99999)
        document.execCommand('copy')
    }

    render() {
        const { _id, onPublicClick, ...etc } = this.props

        return (
            <Layout>
                <Title>
                    {t.s('public')} URL
                </Title>

                <Checkbox 
                    checked={etc.public}
                    onChange={onPublicClick}>
                    {t.s('access')} {t.s('accessViaLink').toLowerCase()}
                </Checkbox>

                {etc.public && (
                    <Text 
                        ref={this.input}
                        type='text'
                        readOnly
                        autoFocus
                        value={`https://raindrop.io/collection/${_id||''}`}>
                        <Button 
                            variant='link'
                            onClick={this.onCopyClick}>
                            {t.s('copyLink')}
                        </Button>
                    </Text>
                )}
            </Layout>
        )
    }
}