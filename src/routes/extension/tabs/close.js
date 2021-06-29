import React from 'react'
import t from '~t'
import { Checkbox } from '~co/common/form'

export default function ExtensionTabsClose({ close, setClose }) {
    return (
        <>
            <div />
            <Checkbox
                checked={close}
                onChange={e=>setClose(e.target.checked)}>
                {t.s('close')} {t.s('tabs').toLowerCase()}
            </Checkbox>
        </>
    )
}