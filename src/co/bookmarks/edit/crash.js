import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { getDraftError } from '~data/selectors/bookmarks'

import { Layout, Buttons } from '~co/common/form'
import Alert from '~co/common/alert'
import Button from '~co/common/button'

function EditBookmarkCrash({ error, onLoad }) {
    return (
        <Layout data-stretch>
            <Alert variant='danger'>
                {error.error && t.has('server'+error.error) ? t.s('server'+error.error) : error.message}
            </Alert>

            <Buttons>
                <Button
                    data-block
                    variant='primary'
                    onClick={onLoad}>
                    {t.s('tryAgain')}
                </Button>
            </Buttons>
        </Layout>
    )
}

export default connect(
    (state, { _id })=>({
        error: getDraftError(state, _id)
    })
)(EditBookmarkCrash)