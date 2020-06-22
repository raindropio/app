import s from './paid.module.styl'
import React from 'react'
import t from '~t'
import Icon from '~co/common/icon'
import { humanDate } from '~modules/strings'
import config from '~config'
import UserStore from '~stores/user'

import Loading from './loading'

export default class UpgradePaid extends React.Component {
    constructor(props) {
		super(props);
		this.state = UserStore.getSubscription()
	}

	componentDidMount() {
        this.unsubscribeUser = UserStore.listen(this.onSubscriptionChange)

		UserStore.onLoadSubscription()
    }

    componentWillUnmount() {
        this.unsubscribeUser()
    }

    onSubscriptionChange = ()=>{
        this.setState({
            ...UserStore.getSubscription(),
            loading: false
        })
    }

    getStatus = ()=>{
        if(this.state.status == 'payment_failed')
            return t.s('active').toLowerCase()
        return t.s(this.state.status).toLowerCase()
    }

    getPeriod = (short=false)=>{
        if ((this.state.plan||'').includes('monthly'))
            return short ? 'mo' : t.s('monthly').toLowerCase()
        else if ((this.state.plan||'').includes('annual'))
            return short ? 'yr' : t.s('yearly').toLowerCase()
        return ''
    }

    renderPeriod = ()=>{
        if (this.state.stopAt)
            return (
                <span><b><Icon name='close' data-size='micro' /> {t.s('willStop')}: {humanDate(this.state.stopAt)}</b></span>
            )

        if (this.state.renewAt)
            return (
                <span><Icon name='check' /> {t.s('next')} {this.getPeriod()} {t.s('payment').toLowerCase()}: <b>{humanDate(this.state.renewAt)}</b></span>
            )

        return null
    }

    renderPrice = ()=>{
        if (!this.state.price)
            return null
        
        return (
            <span>
                <span className={s.separator}></span>
                {t.s('price')} <b>{this.state.price.beautiful} / {this.getPeriod(true)}</b>
            </span>
        )
    }

    renderBody = ()=>{
        //legacy
        if (this.state.plan=='legacy')
            return (
                <div>
                    <div className={s.alert + ' ' + s.warning}>
                        You will not be charged automatically when your current subscription is expired. 
                        To avoid any interruptions <a href={config.links.pro['help-legacy-subscription']} target='_blank'>read this post</a>
                    </div>

                    <div className={s.buttons}>
                        <a className={s.button+' button default'} href={config.links.pro.buy} target='_blank'><b>
                            <Icon name='progress' data-size='micro' data-size='20' />
                            {t.s('renewPro')}
                        </b></a>
                    </div>
                </div>
            )

        let alert = null

        switch(this.state.status) {
            case 'canceled':
                alert = (
                    <div className={s.alert + ' ' + s.notice}>
                        Your subscription has been canceled, but is active through {humanDate(this.state.stopAt)}.<br />
                        You'll still be able to take advantage of PRO plan through this date,
                        but you will not be charged a subscription fee moving forward.
                    </div>
                )
            break

            case 'payment_failed':
                alert = (
                    <div className={s.alert + ' ' + s.error}>
                        We attempted to charge the card you have on file but were unable to do so.<br/>
                        We will automatically attempt to charge your card again within 24-48 hours.
                    </div>
                )
            break
        }

        return (
            <div>
                {alert}

                <div className={s.buttons}>
                    <a className={s.button+' button default'} href={this.state.links.manage} target='_blank'><b>
                        <Icon name='note' data-size='micro' data-size='20' />
                        {t.s('manage')} {t.s('subscription').toLowerCase()}
                    </b></a>

                    <a className={s.button+' button default'} href={config.links.pro['help-change-billing-cycle']} target='_blank'><b>
                        <Icon name='calendar' data-size='micro' data-size='20' />
                        {t.s('change')} {t.s('billingCycle').toLowerCase()}
                    </b></a>
                </div>
            </div>
        )
    }

    render() {
        if (this.state.loading)
            return <Loading />

        return (
            <div className={'centerContentWrap '+s.paid}>
                <div className='centerContent'>
                    <div className='centerContentBlock'>
                        <Icon name='diamond_active' data-size='48' className={`${s.status} ${s.status}-${this.state.status}`} />
                        <h1 className={s.head}>{t.s('subscription')} {this.getStatus()}</h1>

                        <p className={s.subhead+' '+s.period}>
                            {this.renderPeriod()}
                            {this.renderPrice()}
                        </p>

                        <div className={s.body}>
                            {this.renderBody()}
                        </div>

                        <div className={s.links}>
                            {this.state.links.payments && <a href={this.state.links.payments} target='_blank'>Invoices</a>}
                            <a href={config.links.pro.compare} target='_blank'>{t.s('all')} {t.s('features').toLowerCase()}</a>
                            <a href={config.links.pro.buy} target='_blank'>{t.s('comparePlans')}</a>
                            <a href={config.links.pro.faq} target='_blank'>FAQ</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}