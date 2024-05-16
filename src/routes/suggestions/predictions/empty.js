import React from 'react'
import links from '~config/links'
import { useSelector } from 'react-redux'

import Alert from '~co/common/alert'

export default function MySuggestionsPredictionsEmpty() {
    const updateDate = useSelector(state=>state.predictions.updateDate)

    if (!updateDate)
        return (
            <Alert>
                <b>💭 Thinking&hellip;</b><br />
                Check back later for suggestions tailored to your bookmarks
            </Alert>
        )

    return (
        <Alert>
            <b>Not enough data yet</b><br />
            Add tags, create collections and organize few bookmarks to give AI some clue. <a href={links.help.suggestions.faq} target='_blank'>Learn more</a>
        </Alert>
    )
}