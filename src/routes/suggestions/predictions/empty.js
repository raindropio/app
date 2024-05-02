import React from 'react'
import links from '~config/links'
import Alert from '~co/common/alert'

export default function MySuggestionsPredictionsEmpty() {
    return (
        <Alert>
            <b>Not enough data yet</b><br />
            Add tags, create collections and organize few bookmarks to give AI some clue. <a href={links.help.suggestions.index} target='_blank'>Learn more</a>
        </Alert>
    )
}