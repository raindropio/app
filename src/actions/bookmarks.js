import Reflux from 'reflux'
export default Reflux.createActions([
    'load',
    'parseURL',
    'loadBookmark',
    'insertBookmark',
    'updateBookmark',
    'updateSelectedBookmarks',
    'removeBookmark',
    'removeSelectedBookmarks',
    'reparseSelectedBookmarks',
    'copySelectedBookmarks',
    'uploadCover',
    'setScreenshotSelectedBookmarks',

    'afterReorderBookmark',
    'reorderBookmark',

    'initFavorites',
    'setSelected',
    'selectAll',
    'clearSelect',
    'reset',
    'loadUpToId'
]);