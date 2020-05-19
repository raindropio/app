- remake encodeURIComponent(JSON.stringify for search, current not supported by react-router
- sentry
- font-size setting change support
- persist lang change
- show count for duplicates, broken, tags
- fix user load for duplicates, broken
- migrate to css modules
- load exact width covers instead hard-coded
- migrate to react-virtualized
- co/screen/protected support redirect when not logged
- Toasts!

Design
- replace tabbar to user button
- account screens dark theme support

Bugs
- Critical
    - virtual grid doesn't render next pages in Firefox
    - change search when results same count (1=1) sometime doesnt show up new results
- Medium
    - update collection counter, because it stale when have been 0 in cache but loaded more; also remove not always fix counter
        - maybe just request this info from server when needed?

Not ready
- electron
- edit group
- collections tree context menus
- search bookmarks highlight lables
- bookmark info about cache status, reparse, creatorRef
- bookmark info important icon should be bright
- bookmark path
- empty bookmarks state for search: searchEverywhere click
- bookmarks selectMode incomplete
- bookmark view button contextmenu

Server
- Replace all tags with space to _

Good to have
- Refactor collection/reorder redux to server
- Expand tree for selected id
- Logic for moving to several parents in the end of the list
- Preloader for blank collection
- Fix input focus style on blue background (when rename collection for example)
- Group is not empty alert on remove
- When collection removed increment Trash counter
- Change cover img width depends on config

Translation
- leave

Ideas
- Move all logic of Cover to Cloduflare worker


Changes
- data
    - filters reducer structure
    - bookmarks search now is string, not array!
    - bookmarks.importantSelected action arguments changed