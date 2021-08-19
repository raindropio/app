/*
    Browsers sometime block sessionStorage due to some settings
    In this case we not want for app to crash
*/
export default {
    getItem(key) {
        try{
            return sessionStorage.getItem(key)
        } catch(e) {
            console.log(e)
        }
    },
    setItem(key, val) {
        try{
            return sessionStorage.setItem(key, val)
        } catch(e) {
            console.log(e)
        }
    },
    removeItem(key) {
        try{
            return sessionStorage.removeItem(key)
        } catch(e) {
            console.log(e)
        }
    },
    clear() {
        try{
            return sessionStorage.clear()
        } catch(e) {
            console.log(e)
        }
    }
}