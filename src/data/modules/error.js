/*
    Reserved codes:
    - timeout           timeout loading
    - fail              failed to load
    - not_authorized
    - not_found
*/
export default class ApiError extends Error {
    constructor(code, message) {
        if (!message)
            switch(code){
                case 'not_authorized': message = 'Login is required'; break
            }

        super(message)
        this.code = code
        this.name = this.constructor.name
    }
}