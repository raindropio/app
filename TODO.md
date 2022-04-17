# Refactor 13 apr 2022
- co/bookmarks/edit/index.js save on route change (only unsaved && status != 'new')
- co/bookmarks/item(s) remove `events`, refactor item full
- co/bookmarks remove /full part

# Extension manifest v3 refactor
- browser.browserAction -> browser.action || browser.browserAction
- browser.tabs.executeScript({code: ''}) -> browser.scripting.executeScript({func: func})
- manifest.json
    - background = { service_worker:'background.js' }
    - browser_action -> action
    - content_security_policy -> content_security_policy: { extension_pages }
    - web_accessible_resources -> web_accessible_resources: { resources }

# Server
- Send screenshot without ?width, then in data/getscreenshot remove regex

# Good to have
- Refactor collection/reorder redux to server
- Logic for moving to several parents in the end of the list
- Combined count on each level of collections tree
- data: combine logic of bookmarkMove and bookmarkReorder
- When collection removed open next collection
- Show (?) icon in Filters and Tags sidebar sections, click opens help page about those items
- bookmarks/item remove selectDisabled, and move this logic to /items + css
- Move all logic of Cover to Cloduflare worker