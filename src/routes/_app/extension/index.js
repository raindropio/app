import React from 'react'
import useBookmarksChanged from './useBookmarksChanged'
import useExternalLinks from './useExternalLinks'

export default function AppExtension({ children }) {
    useBookmarksChanged()
    useExternalLinks()

    return children
}