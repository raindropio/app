import Reflux from 'reflux'

var UserActions = Reflux.createActions([
    'load',
    'refresh',
    'toggleGroup',
    'updateGroup',
    'insertGroup',
    'removeGroup',
    'swapGroups',
    'saveGroups',
    'updateCollection',
    'updateLanguage',
    'updateConfig',
    'swapCollections',
    'logOut',
    'signIn',
    'signUp'
]);

export default UserActions;
