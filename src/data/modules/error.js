export default class ApiError extends Error {
    constructor({ status, error, errorMessage }) {
        if (!errorMessage)
            switch(status){
                case 401: errorMessage = 'Login is required'; break
                case 408: errorMessage = 'timeout'; break
                case 400: errorMessage = 'validation failed'; break
                case 404: errorMessage = 'not found'; break
            }
            
        super(errorMessage)
        this.code = error
        this.error = error
        this.status = status
        this.name = this.constructor.name
    }
}