import React from 'react'

//drag'n'drop
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

//import PopComponent from '~co/pop'
//import Toasts from '~co/common/toast'

export default ({ className, children })=>(
    <DndProvider backend={HTML5Backend}>
        <div id='markup' className={className}>
            {children}

            {/*<Toasts />
            <PopComponent/>*/}
        </div>
    </DndProvider>
)