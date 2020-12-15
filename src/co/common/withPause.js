import React from 'react'
import { connect } from 'react-redux'
import { setPause } from '~local/actions'

export default Component => {
    class PauseRender extends React.Component {
        static defaultProps = {
            pauseId: ''
        }

        componentDidMount() {
            if (this.props.pauseId && !this.props.pause)
                this.props.setPause(this.props.pauseId)
        }

        componentWillUnmount() {
            if (this.props.pauseId && this.props.pause)
                this.props.setPause('')
        }

        shouldComponentUpdate(next) {
            if (next.pause !== next.pauseId)
                return false
            return true
        }

        render() {
            const { pause, pauseId, forwardedRef, ...etc } = this.props

            return <Component ref={forwardedRef} {...etc} />
        }
    }

    return connect(
        state=>({
            pause: state.local.pause
        }),
        {
            setPause
        },
        undefined,
        { forwardRef: true }
    )(
        React.forwardRef((props, ref) => {
            return <PauseRender {...props} forwardedRef={ref} />
        })
    )
}