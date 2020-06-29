- font-size setting change support
- persist lang change
- show count for duplicates
- fix user load for duplicates, broken
- migrate to css modules
- Toasts!

Design
- account screens dark theme support

Bugs
- Critical
    - Collection share via link, link is incorrect
    - Such tagname kils app "$%^&()(#@#$!. a"
    - "select" collection doesn't show up correctly
- Minor
    - in search results when change bookmark, `highlight` data lost
    - search as type sometime doesn't recognize last type
    - masonry keyboard navigation unordered
    - on drag file to bookmarks body no overlay color

Not ready
- head title
- electron
- pro banner

Server
- Replace all tags with space to _
- Send screenshot without ?width, then in data/getscreenshot remove regex

Good to have
- Refactor collection/reorder redux to server
- Logic for moving to several parents in the end of the list
- Combined count on each level of collections tree
- data: combine logic of bookmarkMove and bookmarkReorder
- When collection removed open next collection
- Show (?) icon in Filters and Tags sidebar sections, click opens help page about those items
- bookmarks/item remove selectDisabled, and move this logic to /items + css
- Ctrl+F focus on search field

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