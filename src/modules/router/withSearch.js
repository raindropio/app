import React from 'react'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'

const searchStringToObject = _.memoize(
    (s='')=>Object.fromEntries(new URLSearchParams(s))
)

export default (Component)=>
    withRouter(
        class withSearch extends React.PureComponent {
            displayName = 'withSearch-'+Component.name

            state = {
                search: {
                    params: searchStringToObject(this.props.location.search),

                    set: (key, val, replace)=>
                        this.mutate(params=>
                            params.set(key, val)
                        , replace),

                    delete: (key, replace)=>
                        this.mutate(params=>{
                            const keys = typeof key == 'object' ? key : [key]
                            keys.forEach(k=>params.delete(k))
                        }, replace)
                }
            }
            
            static getDerivedStateFromProps({ location }, { search }) {
                return {
                    search: {
                        ...search,
                        params: searchStringToObject(location.search)
                    }
                }
            }

            mutate = (func, replace=false)=>{
                const params = new URLSearchParams(this.props.location.search)
                func(params)
                this.props.history[replace ? 'replace' : 'push'](this.props.location.pathname+'?'+params.toString())
            }

            render() {
                return (
                    <Component 
                        {...this.props}
                        {...this.state} />
                )
            }
        }
    )