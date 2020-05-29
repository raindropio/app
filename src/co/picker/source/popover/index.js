import React from 'react'
import Popover from '~co/overlay/popover'

import withBase from '../base'
import DropModule from '../drop/module'
import Link from './link'
import File from './file'

class PickerSourcePopover extends React.Component {
    static defaultProps = {
        //..same as ../base
        onClose: undefined
    }

    render() {
        return (
            <Popover onClose={this.props.onClose}>
                <DropModule onDropFile={this.props.onDropFiles}>
                    {({ isDropping, dropHandlers })=>
                        <div 
                            className={`superForm form-link-or-file ${isDropping && 'is-dropping'}`}
                            {...dropHandlers}>
                            <div className='fieldsGroup'>
                                <Link 
                                    {...this.props} />
                                
                                <File 
                                    {...this.props} />
                            </div>
                        </div>
                    }
                </DropModule>
            </Popover>
        )
    }
}

export default withBase(PickerSourcePopover)