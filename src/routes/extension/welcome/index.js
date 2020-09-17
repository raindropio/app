import s from './index.module.styl'
import React from 'react'
import { Link } from 'react-router-dom'
import t from '~t'
import config from '~config'
import { connect } from 'react-redux'
import { set } from '~data/actions/config'

import { Layout, Buttons, Separator } from '~co/common/form'
import Header, { Title } from '~co/common/header'
import Button from '~co/common/button'
import Logo from '~assets/brand/icon_raw.svg?component'
import Icon from '~co/common/icon'

import Screen from '~co/screen/basic'
import BrowserExtensionMode from '~routes/settings/app/extension/browser_extension_mode'
import Language from '~routes/settings/app/lang'

class ExtensionWelcome extends React.Component {
    componentDidMount() {
        this.props.set('browser_extension_mode', 'clipper')
    }

    render() {
        return (
            <Screen>
                <Logo className={s.logo} />
    
                <Header>
                    <Title>{t.s('welcome')} Raindrop.io</Title>
                </Header>
                
                <Layout type='grid'>
                    <BrowserExtensionMode />
                    <Language showContribute={false} />
    
                    <Separator />
    
                    <Buttons variant='between'>
                        <Button 
                            link={config.links.help.index}
                            target='_blank'
                            data-block>
                            <Icon name='help' />
                            {t.s('help')}
                        </Button>
    
                        <Button 
                            as={Link}
                            to='/'
                            variant='primary'
                            data-block>
                            {t.s('continue')}
                        </Button>
                    </Buttons>
                </Layout>
            </Screen>
        )
    }
}

export default connect(
    undefined,
    { set }
)(ExtensionWelcome)