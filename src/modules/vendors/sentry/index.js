let Component = process.env.SENTRY_RELEASE ?
    require('./component').default :
    function({children}) { return children }

export default Component