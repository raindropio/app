import useBookmarksChanged from './useBookmarksChanged'
import useExternalLinks from './useExternalLinks'
import useCloseSidepanel from './useCloseSidepanel'

export default function AppExtension({ children }) {
    useBookmarksChanged()
    useExternalLinks()
    useCloseSidepanel()

    return children
}