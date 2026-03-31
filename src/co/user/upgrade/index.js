import s from './index.module.styl'
import React, { useCallback } from 'react'
import links from '~config/links'
import t from '~t'

import Modal, { Content, Header } from '~co/overlay/modal'
import Icon from '~co/common/icon'
import Button from '~co/common/button'

export default function UserUpgrade({ onClose }) {
    //close on click buy
    const onBuyClick = useCallback(()=>onClose(), [onClose])

    return (
        <Modal 
            className={s.modal}
            onClose={onClose}>
            <div className={s.container}>
                <div className={s.intro}>
                    <Icon className={s.icon} name='diamond_active' enlarge='4' />

                    <svg className={s.noise} xmlns='http://www.w3.org/2000/svg'>
                        <filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch' /></filter>
                        <rect width='100%' height='100%' filter='url(#noiseFilter)' />
                    </svg>
                </div>

                <div>
                    <Header 
                        data-no-shadow
                        title={t.s('goPro')} />

                    <Content className={s.content}>
                        <p>
                            {t.s('proUnlockDescription')} <a href={links.pro.compare} target='_blank'>{t.s('learnMore')}</a>
                        </p>

                        <h4>{t.s('proIncludes')}</h4>
                        <ul>
                            <li><Icon className={s.icon} name='ai' /> {t.s('suggestedCollectionsAndTags')}</li>
                            <li><Icon className={s.icon} name='sort_score' /> {t.s('fullTextSearch')}</li>
                            <li><Icon className={s.icon} name='export' /> {t.s('webArchive')}</li>
                            <li><Icon className={s.icon} name='highlights' /> {t.s('proAnnotations')}</li>
                            <li><Icon className={s.icon} name='reminder_add' /> {t.s('reminders')}</li>
                            <li><Icon className={s.icon} name='broken' /> {t.s('proDuplicateBroken')}</li>
                            <li><Icon className={s.icon} name='sort_-created' /> {t.s('proDailyBackups')}</li>
                        </ul>

                        <p className={s.more}>
                            {t.s('proAndMore')}
                        </p>

                        <div className={s.actions}>
                            <Button 
                                variant='primary'
                                href={links.pro.buy}
                                target='_blank'
                                onClick={onBuyClick}>
                                {t.s('subscribe')}
                            </Button>
                        </div>
                    </Content>
                </div>
            </div>
        </Modal>
    )
}