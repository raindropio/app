import s from './index.module.styl'
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash-es'

const isCollectionToken = /collection:(-?\d+)/

export default class SearchForm extends React.Component {
    static propTypes = {
        spaceId: PropTypes.any,
        value: PropTypes.string,
        parentValue: PropTypes.string,
        downshift: PropTypes.shape({
            getComboboxProps: PropTypes.func
        }),
        onSubmit: PropTypes.func
    }

    submit = e=>{
        e && e.preventDefault && e.preventDefault()

        const { value, spaceId, onSubmit } = this.props

        //collection
        if (isCollectionToken.test(value))
            return onSubmit({
                _id: value.match(isCollectionToken)[1],
                search: ''
            })

        onSubmit({
            _id: spaceId,
            search: value
        })
    }

    blur = (e)=>{
        if (this.props.value)
            return this.submit(e)
    }

    submitBounced = _.debounce(this.submit, 350, { maxWait: 1000 })

    componentDidUpdate(prevProps) {
        const { value, parentValue, suggestions } = this.props

        if (prevProps.value == value || 
            (parentValue.trim()||'') == (value||'').trim())
            return

        this.submitBounced.cancel()

        //submit immediately
        if (!value || value.endsWith(' '))
            return this.submit()
        //ignore when suggestions showed
        else if (suggestions.length)
            return
        //ignore when token is incomplete
        else if (value.includes(':'))
            return

        this.submitBounced()
    }

    render() {
        const { value, children, downshift: { getComboboxProps } } = this.props

        return (
            <form
                {...getComboboxProps({
                    className: s.form,
                    style: { '--value-ch': value.length+'ch' },
                    onSubmit: this.submit,
                    onBlur: this.blur
                })}>
                {children}
            </form>
        )
    }
}