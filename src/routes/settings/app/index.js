import React from 'react'
import t from '~t'
import { Helmet } from 'react-helmet'
import { Layout, Separator } from '~co/common/form'

//common
import Theme from './theme'
import Size from './size'
import Lang from './lang'
import RaindropsClick from './raindrops_click'
import RaindropsButtons from './raindrops_buttons'
import RaindropsSearchByScore from './raindrops_search_by_score'
import TagsSort from './tags_sort'
import BrokenLevel from './broken_level'
import NestedViewLegacy from './nested_view_legacy'

export default ()=>{
	return (
		<Layout type='grid'>
			<Helmet><title>{t.s('app')} {t.s('settings').toLowerCase()}</title></Helmet>
		
			<Lang />
			<Theme />
			<Size />
			<Separator />

			<RaindropsClick />
			<RaindropsButtons />
			<RaindropsSearchByScore />
			<Separator />
					
			<TagsSort />
			<BrokenLevel />
			<NestedViewLegacy />
		</Layout>
	)
}