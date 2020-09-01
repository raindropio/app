import React from 'react'
import { connect } from 'react-redux'
import { makeCollection } from '~data/selectors/collections'
import HexToHsl from '~modules/format/color/hextToHsl'

const emptyObj = {}

export default connect(
	() => {
        const getCollection = makeCollection()
    
        return (state, { _id })=>{
            const { color } = getCollection(state, _id)

            return {
                color,
                theme: state.local.theme
            }
        }
    }
)(function CollectionAccentColor({ color, theme, children }) {
    let hsl = ''
    try{ hsl = HexToHsl(color) }catch(e){}

    return children(theme.app=='night' || !color ? emptyObj : {
        '--accent-color': color,
        '--accent-hsl': hsl
    })
})