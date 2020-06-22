import s from './items.module.styl'
import React from 'react'

export default class CollectionPickerIconItems extends React.Component {
    onIconClick = (e)=>{
        e.preventDefault()
        this.props.onLink(e.target.getAttribute('data-link'))
        this.props.onClose()
    }

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
            <img src={png} loading='lazy' width='24' height='24' />
        </a>
    )

    render() {
        return (
            <div>
                {this.props.items.map(this.renderTemplate)}
            </div>
        )
    }
}