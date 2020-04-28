import React from 'react'
import t from '~t'

export default ({ error })=>(
    <b>
        {error.code ?
			t.s('server'+error.code) :
			t.s(error.message)}
    </b>
)