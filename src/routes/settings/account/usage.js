import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { user } from '~data/selectors/user'
import { collection } from '~data/selectors/collections'
import { refresh as userRefresh } from '~data/actions/user'
import { refresh as collectionsRefresh } from '~data/actions/collections'

import { Link } from 'react-router-dom'
import { Label, Progress } from '~co/common/form'
import { LongDate } from '~modules/format/date'

class SettingsAccountUsage extends React.Component {
    componentDidMount() {
        this.props.userRefresh()
        this.props.collectionsRefresh()
    }

    render() {
        const { user: { _id, registered, files, pro }, allBookmarksCollection } = this.props

        return (
            <>
                {/* Type */}
                <Label>{t.s('account')} {t.s('type').toLowerCase()}</Label>
                <div>{pro ? (
                    <Link to='/settings/pro'>PRO {t.s('subscription')}</Link>
                ) : t.s('free')}</div>
    
                {/* Space */}
                <Label>{t.s('usedSpace')}</Label>
                <Progress
                    display='file_size'
                    min='0'
                    max={files.size}
                    value={files.used}>
                    {t.s('usedThisMonth').toLowerCase()} {t.s('forUploads')}
                    {!pro && (
                        <>. <Link to='/settings/pro'>{t.s('upgradeToPro')}</Link></>  
                    )}
                </Progress>
    
                <div />
                <Progress
                    display='infinite'
                    value={allBookmarksCollection.count}>
                    {t.s('bookmarks')}
                </Progress>
    
                {/* User */}
                <Label>User ID</Label>
                <div>{_id}</div>
    
                <Label>{t.s('registered')}</Label>
                <LongDate date={registered} />
            </>
        )
    }
}

export default connect(
	(state)=>({
        user: user(state),
        allBookmarksCollection: collection(state, 0)
    }),
    { userRefresh, collectionsRefresh }
)(SettingsAccountUsage)