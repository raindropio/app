import styles from './index.module.styl'
import React from 'react'
import Popover from '~co/overlay/popover'

import withBase from '../base'
import DropModule from '../drop/module'
import Link from './link'
import File from './file'

class PickerSourcePopover extends React.Component {
    static defaultProps = {
        //..same as ../base
        pin: undefined,
        onClose: undefined
    }

    render() {
        return (
            <Popover 
                className={styles.popover}
                pin={this.props.pin}
                closable={!this.props.files.length}
                hidden={this.props.files.length}
                onClose={this.props.onClose}>
                <DropModule onDropFiles={this.props.onDropFiles}>
                    {({ isDropping, dropHandlers })=>
                        <div
                            className={`${isDropping && styles.isDropping}`}
                            {...dropHandlers}>
                            <Link {...this.props} />
                            <File {...this.props} />
                        </div>
                    }
                </DropModule>
            </Popover>
        )
    }
}

export default withBase(PickerSourcePopover)