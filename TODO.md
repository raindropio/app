- persist lang change
- show count for duplicates
- fix user load for duplicates, broken

Bugs
- Minor
    - in search results when change bookmark, `highlight` data lost
    - masonry keyboard navigation unordered

Not ready
- electron
- pro banner

Server
- Send screenshot without ?width, then in data/getscreenshot remove regex

Good to have
- Refactor collection/reorder redux to server
- Logic for moving to several parents in the end of the list
- Combined count on each level of collections tree
- data: combine logic of bookmarkMove and bookmarkReorder
- When collection removed open next collection
- Show (?) icon in Filters and Tags sidebar sections, click opens help page about those items
- bookmarks/item remove selectDisabled, and move this logic to /items + css
- Move all logic of Cover to Cloduflare worker

Translation
- leave

Changes
- data
    - filters reducer structure and selectors
    - tags reducer structure and selectors
    - bookmarks search now is string, not array!
    - bookmarks.importantSelected action arguments changed
    - test upload files!
    - new optionalDependencie: @sentry/minimal
- features
    - nested collections showed up in one list
    - web preview better
    - batch remove, merge collections
    - better reorder of collections
    - create new collection fancy, reorderable
    - resizable sidebar
    - virtual list
    - fast batch bookmark actions
    - more reliable file upload
    - filters/tags in sidebar
    - caching
    - bug fixes
    - list cover position
    - unified search field
    - pwa support
    - thumbnail optimized for transfer and speed
    - tags autocomplete shows tags from shared collection too
    - multiline description