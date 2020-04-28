import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

const DocumentBody = ({theme})=>(
    <Helmet>
        <body className={`theme-sidebar-${theme}`} />
    </Helmet>
)

export default connect(
    state => ({
        theme: state.local.theme
    })
)(DocumentBody)