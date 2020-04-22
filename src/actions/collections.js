import Reflux from 'reflux'
export default Reflux.createActions([
    'load',
    'refresh',
    'setCurrent',
    'updateCollection',
    'insertCollection',
    'removeCollection',
    'updateCountCollection',
    'updateColorCollection',

    'uploadCover',
    'search',
    'toggleExpanded',
    'collapseAll',
    'sortByTitle'
])