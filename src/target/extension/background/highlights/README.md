# Flow
- tab activated / page loaded / BOOKMARKS_CHANGED
    - sync: links cache → load highlights → push to page (inject script if needed)
- page sends RDH_ADD / RDH_UPDATE / RDH_REMOVE
    - save to server → push verified state back to page
    - on failure → sync, page reverts to real state
- RDH_READY is ignored: every injection is followed by push with config
- addCurrentTabSelection()
    - request permissions → RDH_ADD_SELECTION → page sends RDH_ADD
