# Flow
1. tab.onActivated / tab.onTabsUpdated
    - tab.status = completed
        - load
            - load user
            - have permissions
                - links.has
                    - highlights not yet loaded:
                        - load api
                        - inject JS
                        - send RDH_CONFIG, RDH_APPLY
    - tab.status = any other
        - unset
2. permissions.onAdded / LINKS_CHANGED
    - reset
    - go to 1
3. addCurrentTabSelection()
    - request permissions
        - send RDH_ADD_SELECTION