import React, { useRef, useMemo } from 'react'
import t from '~t'
import { useSelector } from 'react-redux'
import { query as getQuery, makeSelectMode } from '~data/selectors/bookmarks'
import { getUrlQuery } from '~data/helpers/bookmarks'
import { API_ENDPOINT_URL } from '~data/constants/app'

import Popover, { Menu, MenuItem, MenuSection } from '~co/overlay/popover'

export default function BookmarksExportPopover({ spaceId = 0, pin, onClose }) {
    //space
    const query = useSelector(state=>getQuery(state, spaceId))

    //select mode
    const getSelectMode = useRef(makeSelectMode()).current
    const selectMode = useSelector(state=>getSelectMode(state, spaceId))

    //url generation
    const prefix = useMemo(()=>
        `${API_ENDPOINT_URL}raindrops/${spaceId}`,
        [spaceId]
    )
    const suffix = useMemo(()=>
        getUrlQuery(query) 
        + (selectMode.ids.length ? `&ids=${encodeURIComponent(selectMode.ids.join(','))}` : ''),
        [spaceId, query, selectMode.ids]
    )

    return (
        <Popover
            pin={pin}
            onClose={onClose}>
            <Menu>
                {spaceId == 0 && !query.search && !selectMode.ids.length ? (<>
                    <MenuSection>
                        Click “Get backup” to download all your<br/>
                        collections, bookmarks, tags, and highlights.<br/><br/>
                        Or click “Download uploaded files” to download<br/>
                        only your uploaded files, if available.
                    </MenuSection>

                    <br/>

                    <MenuItem to='/settings/backups'>
                        Get backup
                    </MenuItem>

                    <MenuItem href={`${prefix}/export.zip${suffix}`} download>
                        Download uploaded files
                    </MenuItem>
                </>) : (<>
                    <MenuSection>
                        The ZIP file will contain your bookmarks,<br/>
                        tags, highlights, and any uploaded files.
                    </MenuSection>

                    <MenuItem href={`${prefix}/export.zip${suffix}`} download>
                        Download {selectMode.ids.length ? 'selection' : 'collection'}
                    </MenuItem>
                </>)}
            </Menu>
        </Popover>
    )
}