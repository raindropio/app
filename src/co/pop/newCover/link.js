import React from 'react'
import t from 't'
import SuperInput from '../../common/superInput'
import Icon from 'icon'

export default class NewCover extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            url: ''
        }
    }

    onSubmit = (e)=>{
        e.preventDefault()
        this.props.onSelect('link', this.state.url)
    }

    onChange = (e)=>{
        this.setState({url: e.target.value})
    }

    render() {
        return (
            <div className='nc-content-center'>
                <div className='nc-link superForm'>
                    <div className='nc-link-icon'>
                        <Icon name='link' size='48' />
                    </div>

                    <form onSubmit={this.onSubmit}>
                        <figure className='fieldWrap'>
                            <label className='fieldName' htmlFor='collectionTitle'>URL (png, jpeg, gif)</label>
                            <SuperInput
                                type='url'
                                required
                                className='field'
                                placeholder='https://'
                                value={this.state.url}
                                onChange={this.onChange}
                                autoFocus />
                        </figure>

                        <input
                            type='submit'
                            className='button blue standart'
                            />
                    </form>
                </div>
            </div>
        )
    }
}