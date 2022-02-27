import React from 'react'
import Footer from '~co/common/footer'

function SplitViewReaderFooter(props) {
    return <Footer {...props} />
}

SplitViewReaderFooter.defaultProps = {
    'data-fancy': true
}

export default SplitViewReaderFooter