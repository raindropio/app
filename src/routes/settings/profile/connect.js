import React from 'react'
import t from '~t'
import _ from 'lodash'

import { Label, Checkbox } from '~co/common/form'
import Icon from '~co/common/icon'

function SettingsProfileConnect() {
    return (
        <>
            <Label>{t.s('signInSocial')}</Label>
            <div>
                {['google', 'apple', 'facebook', 'twitter', 'vkontakte'].map(key=>
					<Checkbox 
						key={key}>
						<Icon name={key} />
						{_.capitalize(key)}
					</Checkbox>
				)}
            </div>
        </>
    )
}

export default SettingsProfileConnect