import React, { useRef, useMemo } from 'react'
import t from '~t'
import { useSelector } from 'react-redux'
import { query as getQuery, makeSelectMode, count as getCount } from '~data/selectors/bookmarks'
import { getUrlQuery } from '~data/helpers/bookmarks'
import { API_ENDPOINT_URL } from '~data/constants/app'

import Popover, { Menu, MenuItem, MenuSeparator, MenuSection } from '~co/overlay/popover'

export default function BookmarksExportPopover({ spaceId = 0, pin, onClose }) {
    //space
    const query = useSelector(state=>getQuery(state, spaceId))
    const count = useSelector(state=>getCount(state, spaceId))

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
                {spaceId == 0 && !query.search && !selectMode.ids.length ? (
                    <MenuItem to='/settings/backups'>
                        Download complete backup
                    </MenuItem>
                ) : (<>
                    <MenuSection>
                        {t.s('export')}{' '}
                        {selectMode.ids.length > 0 ? selectMode.ids.length : count}{' '}
                        {t.s('bookmarks')}
                    </MenuSection>

                    <MenuItem href={`${prefix}/export.html${suffix}`} download>
                        HTML
                    </MenuItem>

                    <MenuItem href={`${prefix}/export.csv${suffix}`} download>
                        CSV
                    </MenuItem>

                    <MenuItem href={`${prefix}/export.txt${suffix}`} download>
                        Text
                    </MenuItem>
                </>)}
            </Menu>
        </Popover>
    )
}