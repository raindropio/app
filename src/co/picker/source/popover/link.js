import React from 'react'
import SuperInput from '~co/common/superInput'

export default class PickerSourceLink extends React.Component {
    state = {
        link: '',
        status: ''
    }
    
    onLinkChange = (e)=>
        this.setState({ link: e.target.value })

    onLinkSubmit = async(e)=>{
        e.preventDefault()
        
        this.setState({ status: 'loading' })

        try{
            await this.props.onLink(this.state.link)
            this.props.onClose()
        } catch (e) {
            this.setState({ status: 'error' })
        }
    }

    render() {
        const { link, status='' } = this.state

        return (
            <form onSubmit={this.onLinkSubmit} className='fieldWrap'>
                <label className='fieldName'>URL</label>

                <SuperInput
                    type='url'
                    required
                    className='field'
                    placeholder='https://'
                    value={link}
                    disabled={status=='loading'}
                    onChange={this.onLinkChange}
                    autoFocus />

                {link && (<div className='fieldColumns'>
                    <input
                        type='submit'
                        className='button active standart input'
                        disabled={status=='loading'}
                        />
                </div>)}
            </form>
        )
    }
}