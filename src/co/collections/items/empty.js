import React from 'react'
import Preloader from '~co/common/preloader'

export default function CollectionsItemsEmpty() {
    return (
        <div className='centerContentWrap'><div className='centerContent'>
            <Preloader/>
        </div></div>
    )
}