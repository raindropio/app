import s from './index.module.styl'
import t from '~t'
import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as configActions from '~data/actions/config'
import { isPro } from '~data/selectors/user'

import Button from '~co/common/button'
import links from '~config/links'
import introImage from './intro.png'

export default function PageSuggestionsIntro() {
    const dispatch = useDispatch()
    const enabled = useSelector(state=>state.config.ai_suggestions)
    const pro = useSelector(state=>isPro(state))
    const enable = useCallback(()=>dispatch(configActions.set('ai_suggestions', true)), [])

    return (
        <div className={s.intro}>
            <img 
                src={introImage} 
                alt='' 
                style={{height: 173}} />

            <div className={s.headline}>
                Reduce repetitive work and organize your bookmarks in a few clicks.
                Tips are based on your collections and tags. <a className={s.learnMore} href={links.help.suggestions.organize} target='_blank'>Learn more</a>
            </div>

            <div className={s.sub}>You get your own private AI categorization model based on your data. Your data is never used for training.</div>

            {!enabled ? (<div>
                <Button variant='primary' onClick={enable}>
                    &nbsp;Enable AI Suggestions&nbsp;
                </Button>
            </div>) : null}

            {!pro ? (<div>
                <Button variant='primary' href={links.pro.buy} target='_blank'>
                    &nbsp;{t.s('upgradeToPro')}&nbsp;
                </Button>
            </div>) : null}
        </div>
    )
}
