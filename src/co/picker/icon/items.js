import React from 'react'

export default class CollectionPickerIconItems extends React.Component {
    onIconClick = (e)=>{
        e.preventDefault()
        this.props.onLink(e.target.getAttribute('data-link'))
        this.props.onClose()
    }

    renderTemplate = ({ title, icons }, index)=>(
        <div className='nc-template' key={index}>
            <div className='nc-section'>
                {title}
            </div>

            <div className='nc-icons'>
                {icons.map(this.renderIcon)}
            </div>
        </div>
    )

    renderIcon = ({png}, index)=>(
        <a key={index} className='nc-icon' href='' data-link={png} onClick={this.onIconClick}>
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