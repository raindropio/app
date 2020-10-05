import s from './title.module.styl'
import React from 'react'
import { connect } from 'react-redux'
import { makeCollectionPath } from '~data/selectors/collections'

function CollectionItemTitle({ title, _path }) {
    if (_path)
        return (
            <span className={s.path}>
                <span className={s.parents}>
                    {_path.map(({ title }) => title).join(' / ')} /
                </span>
                &nbsp;
                <span className={s.itself}>
                    {title}
                </span>
            </span>
        )
    
    return title
}

export default connect(
	() => {
        const getCollectionPath = makeCollectionPath()
    
        return (state, { _id, parentId, level })=>({
            _path: (!level && parentId) ? getCollectionPath(state, _id) : undefined
        })
    }
)(CollectionItemTitle)