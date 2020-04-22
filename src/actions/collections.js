import Reflux from 'reflux'
module.exports = Reflux.createActions([
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