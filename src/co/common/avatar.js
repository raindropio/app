import React from 'react'
import Icon from '~icon'

export default class HelpersAvatar extends React.Component{
  shouldComponentUpdate(nextProps) {
    return (this.props.src != nextProps.src)
  }

  render() {
    if (this.props.src)
        return <img className="icn-circle" src={"https://www.gravatar.com/avatar/"+this.props.src+"?d=mm&s="+(this.props.size||24)} alt="" className={this.props.className} />
    else
        return <Icon name="profile" className={this.props.className} />
  }
}