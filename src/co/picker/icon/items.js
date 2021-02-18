import s from './items.module.styl'
import React from 'react'
import Lazy from '~co/virtual/lazy'

export default class CollectionPickerIconItems extends React.Component {
    onIconClick = (e)=>{
        e.preventDefault()
        this.props.onLink(e.target.getAttribute('data-link'))
        this.props.onClose()
    }

    getTemplateKey = ({ title })=>title

    renderTemplate = ({ title, icons }, index)=>(
        <div className={s.template} key={index}>
            <div className={s.section}>
                {title}
            </div>

            <div className={s.icons}>
                {icons.map(this.renderIcon)}
            </div>
        </div>
    )

    renderIcon = ({png}, index)=>(
        <a key={index} className={s.icon} href='' data-link={png} onClick={this.onIconClick}>
            <img src={png} loading='lazy' />
        </a>
    )

    render() {
        return (
            <div className={s.wrap}>
                <Lazy 
                    data={this.props.items}
                    keyExtractor={this.getTemplateKey}
                    initialNumToRender={1}>
                    {this.renderTemplate}
                </Lazy>
            </div>
        )
    }
}