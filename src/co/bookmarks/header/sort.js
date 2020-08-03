import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { makeSort, makeSorts } from '~data/selectors/bookmarks'
import { changeSort } from '~data/actions/bookmarks'

import Popover from '~co/overlay/popover'
import { Layout, Radio, Label } from '~co/common/form'
import Icon from '~co/common/icon'
import Button from '~co/common/button'

class BookmarksHeaderSort extends React.Component {
    static defaultProps = {
        spaceId: 0
    }

    pin = React.createRef()

    state = {
        menu: false
    }

    options = {
        'sort':         t.s('manual'),
        'created':      t.s('byDate')+' ↑',
        '-created':     t.s('byDate')+' ↓',
        'title':        t.s('byName')+' (A-Z)',
        '-title':       t.s('byName')+' (Z-A)',
        'domain':       t.s('sites')+' (A-Z)',
        '-domain':      t.s('sites')+' (Z-A)',
        'score':        t.s('byRelevance')
    }

    onContextMenuClick = (e)=>{
        e.preventDefault()
        this.setState({ menu: true })
    }

    onContextMenuClose = ()=>
        this.setState({ menu: false })

    onSortClick = (e)=>
        this.props.changeSort(this.props.spaceId, e.target.getAttribute('data-sort'))

    render() {
        const { menu } = this.state
        const { sort, sorts } = this.props

        return (
            <>
                <Button 
                    ref={this.pin}
                    title={t.s('sortBy')}
                    variant={sort!='sort'?'link':''}
                    onClick={this.onContextMenuClick}>
                    <Icon name={'sort_'+sort} />
        
                    <span className='hide-on-small-body'>
                        {this.options[sort]||''}
                    </span>
                </Button>

                {menu ? (
                    <Popover pin={this.pin} onClose={this.onContextMenuClose}>
                        <Layout>
                            <Label>{t.s('sortBy')} {t.s('elements2')}</Label>
                            <div>
                                {Object.keys(this.options).map((item, index)=>(
                                    <Radio 
                                        key={item}
                                        autoFocus={!index}
                                        data-sort={item}
                                        checked={item==sort}
                                        disabled={sorts[item] && !sorts[item].enabled}
                                        onClick={this.onSortClick}>
                                        <Icon name={'sort_'+item} />
                                        {this.options[item]}{item=='sort' ? ' (Drag\'n\'drop)' : ''}
                                    </Radio>
                                ))}
                            </div>
                        </Layout>
                    </Popover>
                ) : null}
            </>
        )
    }
}

export default connect(
	() => {
        const getSort = makeSort()
        const getSorts = makeSorts()
    
        return (state, { spaceId })=>({
            sort: getSort(state, spaceId),
            sorts: getSorts(state, spaceId)
        })
    },
	{ changeSort }
)(BookmarksHeaderSort)