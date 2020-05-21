- sentry
- font-size setting change support
- persist lang change
- show count for duplicates
- fix user load for duplicates, broken
- migrate to css modules
- load exact width covers instead hard-coded
- Toasts!

Design
- account screens dark theme support

Bugs
- Critical
    - virtual grid doesn't render next pages in Firefox
    - change search when results same count (1=1) sometime doesnt show up new results
- Medium
    - update collection counter, because it stale when have been 0 in cache but loaded more; also remove not always fix counter
        - maybe just request this info from server when needed?
- Minor
    - in search results when change bookmark, `highlight` data lost

Not ready
- electron
- bookmark info about cache status, creatorRef
- bookmark info important icon should be bright

Server
- Replace all tags with space to _

Good to have
- Refactor collection/reorder redux to server
- Logic for moving to several parents in the end of the list
- Group is not empty alert on remove
- Change cover img width depends on config
- Combined count on each level of collections tree
- data: combine logic of bookmarkMove and bookmarkReorder

Translation
- leave

Ideas
- Move all logic of Cover to Cloduflare worker

Changes
- data
    - filters reducer structure
    - bookmarks search now is string, not array!
    - bookmarks.importantSelected action arguments changed