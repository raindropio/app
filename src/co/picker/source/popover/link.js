import React from 'react'
import Preloader from '~co/common/preloader'
import SuperInput from '~co/common/superInput'
import normalizeUrl from 'normalize-url'

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
            await this.props.onLink(normalizeUrl(this.state.link, { defaultProtocol: 'https:' }))
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
                    type='text'
                    required
                    className='field'
                    placeholder='https://'
                    value={link}
                    disabled={status=='loading'}
                    onChange={this.onLinkChange}
                    autoFocus />

                {status == 'loading' && (<div className='fieldColumns'><Preloader /></div>)}
                {link && status != 'loading' && (<div className='fieldColumns'>
                    <input
                        type='submit'
                        className='button active standart input'
                        />
                </div>)}
            </form>
        )
    }
}