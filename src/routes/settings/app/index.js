import React from 'react'
import { Layout, Separator } from '~co/common/form'
import Theme from './theme'
import Size from './size'
import Lang from './lang'
import RaindropsClick from './raindrops_click'
import TagsSort from './tags_sort'
import BrokenLevel from './broken_level'
import NestedViewLegacy from './nested_view_legacy'

export default (props)=>(
	<Layout type='grid'>
		<Lang />
		<Theme />
		<Size />

		<Separator />

		<RaindropsClick />

		<Separator />
				
		<TagsSort />
		<BrokenLevel />
		<NestedViewLegacy />
	</Layout>
)