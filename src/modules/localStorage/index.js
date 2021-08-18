/*
    Browsers sometime block localStorage due to some settings
    In this case we not want for app to crash
*/
export default {
    getItem(key) {
        try{
            return localStorage.getItem(key)
        } catch(e) {
            console.log(e)
        }
    },
    setItem(key, val) {
        try{
            return localStorage.setItem(key, val)
        } catch(e) {
            console.log(e)
        }
    },
    removeItem(key) {
        try{
            return localStorage.removeItem(key)
        } catch(e) {
            console.log(e)
        }
    },
    clear() {
        try{
            return localStorage.clear()
        } catch(e) {
            console.log(e)
        }
    }
}