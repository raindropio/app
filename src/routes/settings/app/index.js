import React from 'react'
import t from '~t'
import { Helmet } from 'react-helmet'
import { Layout, Separator } from '~co/common/form'
import { Header } from '~co/screen/splitview/main'
import { Title } from '~co/common/header'

//common
import Theme from './theme'
import Size from './size'
import Lang from './lang'
import DefaultCollectionView from './default_collection_view'
import RaindropsClick from './raindrops_click'
import RaindropsButtons from './raindrops_buttons'
import RaindropsSearchByScore from './raindrops_search_by_score'
import TagsSort from './tags_sort'
import BrokenLevel from './broken_level'
import NestedViewLegacy from './nested_view_legacy'
import Ai from './ai'

export default ()=>{
	return (
		<>
			<Helmet><title>{t.s('app')} {t.s('settings').toLowerCase()}</title></Helmet>
			<Header data-fancy><Title>{t.s('app')}</Title></Header>
			
			<Layout type='grid'>
				<Lang />
				<Theme />
				<Size />
				<Separator />

				<DefaultCollectionView />
				<RaindropsClick />
				<RaindropsButtons />
				<RaindropsSearchByScore />
				<Separator />
						
				<TagsSort />
				<BrokenLevel />
				<NestedViewLegacy />
				<Separator />
				
				<Ai />
			</Layout>
		</>
	)
}