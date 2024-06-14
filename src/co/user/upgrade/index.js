import s from './index.module.styl'
import React, { useCallback } from 'react'
import links from '~config/links'

import Modal, { Content, Header } from '~co/overlay/modal'
import Icon from '~co/common/icon'
import Button from '~co/common/button'

export default function UserUpgrade({ onClose }) {
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
                        title='Go Pro' />

                    <Content className={s.content}>
                        <p>
                            Unlock powerful features to help you do more with the content you save. <a href={links.pro['help-learn-more']} target='_blank'>Learn more</a>
                        </p>

                        <h4>Includes</h4>
                        <ul>
                            <li><Icon className={s.icon} name='ai' /> Collection & tag suggestions</li>
                            <li><Icon className={s.icon} name='sort_score' /> Full-text search</li>
                            <li><Icon className={s.icon} name='export' /> Forever copies</li>
                            <li><Icon className={s.icon} name='highlights' /> Annotations</li>
                            <li><Icon className={s.icon} name='reminder_add' /> Reminders</li>
                            <li><Icon className={s.icon} name='broken' /> Duplicate & broken links checker</li>
                            <li><Icon className={s.icon} name='sort_-created' /> Daily backups</li>
                        </ul>

                        <p className={s.more}>
                            And more…
                        </p>

                        <div className={s.actions}>
                            <Button 
                                variant='primary'
                                href={links.pro.buy}
                                target='_blank'
                                onClick={onBuyClick}>
                                Upgrade
                            </Button>
                        </div>
                    </Content>
                </div>
            </div>
        </Modal>
    )
}