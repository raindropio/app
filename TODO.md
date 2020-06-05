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
- Minor
    - in search results when change bookmark, `highlight` data lost

Not ready
- electron
- bookmark info about cache status, creatorRef
- bookmark info important icon should be bright
- bookmark drag preview

Server
- Replace all tags with space to _

Good to have
- Refactor collection/reorder redux to server
- Logic for moving to several parents in the end of the list
- Change cover img width depends on config
- Combined count on each level of collections tree
- data: combine logic of bookmarkMove and bookmarkReorder
- When collection removed open next collection
- Show (?) icon in Filters and Tags sidebar sections, click opens help page about those items

Translation
- leave

Ideas
- Move all logic of Cover to Cloduflare worker

Changes
- data
    - filters reducer structure
    - bookmarks search now is string, not array!
    - bookmarks.importantSelected action arguments changed
    - test upload files!
    - new optionalDependencie: @sentry/minimal