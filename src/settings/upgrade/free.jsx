import React from 'react'
import SuperFrame from '../../co/common/superFrame'

export default ()=>(
	<SuperFrame
		disableProxy={true}
		disableSandbox={true}
		src='https://raindrop.io/pro?frame=1'
		domain='raindrop.io' />
)