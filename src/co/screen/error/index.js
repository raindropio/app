import React from 'react'
import t from '~t'
import Basic from '../basic'

const refresh = (e)=>{
    e.preventDefault()
    window.location.reload()
}

export default ()=>(
    <Basic>
        <div className='centerContentWrap'><div className='centerContent'><div>
            <h2 className='headLabel'>{t.s('server')}</h2>
            <p className='subHeadLabel'>
                {t.s('noInternetError')}<br />
                <a href='#/' onClick={refresh}>{t.s('refresh')}</a>
            </p>
            
        </div></div></div>
    </Basic>
)