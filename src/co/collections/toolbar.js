import React from 'react'
import t from '~t'
import Icon from '~icon'
import SearchInput from '../common/searchInput'
import CollectionsActions from '../../actions/collections'
import Pop from '../../actions/pop'

const buttons = {
    empty: [],
    notFound: [],
    found: [
        { id: 'prev', icon: 'colapse' },
        { id: 'next', icon: 'expand' }
    ]
}

let focusIndex = 0

export default class CollectionsList extends React.PureComponent {
    constructor(props) {
        super(props)
        
        this.state = {
            query: '',
            count: 0,
            searchButtons: []
        }
    }

    focusResult = ()=>{
        const results = document.querySelectorAll('.found')
        if (!results[focusIndex])
            focusIndex = focusIndex > 0 ? 0 : results.length-1

        if (!results[focusIndex]) return

        const old = document.querySelector('.found-active')
        old && old.classList.remove('found-active')

        results[focusIndex].classList.add('found-active')
        results[focusIndex].querySelector('.superLink').focus()
        document.querySelector('#collectionsSearch').focus()
    }

    search = {
        onChange: (val)=>{
            CollectionsActions.search(val, ({ query, found=[] })=>{
                if (query != this.state.query)
                    focusIndex = 0

                let buttonState = 'empty'
                if (!found.length) buttonState = 'notFound'
                if (found.length > 1) buttonState = 'found'

                this.setState(
                    {
                        query,
                        count: found.length,
                        searchButtons: buttons[buttonState]
                    },
                    ()=>setTimeout(this.focusResult, 100)
                )
            })
        },

        onButtonClick: (id)=>{
            switch(id) {
                case 'prev':
                case 'next': {
                    this.search.onChange(this.state.query)
                    focusIndex = focusIndex + (id=='prev' ? -1 : 1)
                    this.focusResult()
                }
            }
        }
    }

    actions = {
        collapseAll: (e)=>{
            e.preventDefault()
            CollectionsActions.collapseAll()
        },

        sortByTitle: (e)=>{
            e.preventDefault()

            clearTimeout(this._sortByTitleTimeout)

            Pop.show('loading')
            CollectionsActions.sortByTitle(Pop.close)
        },

        sortByTitleInfo: (e)=>{
            e.preventDefault()

            clearTimeout(this._sortByTitleTimeout)
            this._sortByTitleTimeout = setTimeout(() => {
                Pop.show('collectionsSortByTitle', {
                    pin: 'collectionsSortByTitlePin',
                    force: 'vertical'
                })
            }, 550)
        }
    }

    render() {
        const sticky = this.state.query ? true : false

        return (
            <div className={'collections-toolbar '+(sticky?'sidebar-block-bg':'')} data-sticky={sticky}>
                <div className='collections-toolbar-search'>
                    <SearchInput 
                        id='collectionsSearch'
                        value=''
                        placeholder={t.s('findCollection')}
                        buttons={this.state.searchButtons}
                        count={this.state.count}
                        {...this.search} />
                </div>

                <div className='collections-toolbar-buttons'>
                    {!this.state.query && (
                        <a  href=''
                            className='button min'
                            id='collectionsSortByTitlePin'
                            title={t.s('collectionsSorting')+' '+t.s('byName').toLowerCase()}
                            onClick={this.actions.sortByTitleInfo}
                            onDoubleClick={this.actions.sortByTitle}>
                            <Icon name='sort_title' />
                        </a>
                    )}

                    <a  href=''
                        className='button min'
                        title={t.s('collapseAll')+' '+t.s('collectionsCount')}
                        onClick={this.actions.collapseAll}>
                        <Icon name='collapse_all' />
                    </a>
                </div>
            </div>
        )
    }
}