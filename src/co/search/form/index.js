import s from './index.module.styl'
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash-es'

const isCollectionToken = /collection:(-?\d+)/

export default class SearchForm extends React.Component {
    static propTypes = {
        spaceId: PropTypes.any,
        value: PropTypes.string,
        originalValue: PropTypes.string,
        downshift: PropTypes.shape({
            getComboboxProps: PropTypes.func
        }),
        onSubmit: PropTypes.func
    }

    submit = ()=>{
        let { value, spaceId, onSubmit } = this.props

        //collection
        if (isCollectionToken.test(value))
            return onSubmit({
                _id: value.match(isCollectionToken)[1],
                search: ''
            })

        if (value == '#') return

        onSubmit({
            _id: spaceId,
            search: value
        })
    }

    submitBounced = _.debounce(this.submit, 350, { maxWait: 1000 })

    onFormSubmit = (e)=>{
        e.preventDefault()

        const { suggestions } = this.props
        if (suggestions.length)
            return

        this.submit()
    }

    onFormBlur = ()=>{
        if (this.props.value)
            return this.submit()
    }

    componentDidUpdate(prevProps) {
        const { value, originalValue, suggestions } = this.props

        if (prevProps.value == value || 
            (originalValue.trim()||'') == (value||'').trim())
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
                    onSubmit: this.onFormSubmit,
                    onBlur: this.onFormBlur
                })}>
                {children}
            </form>
        )
    }
}