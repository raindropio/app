const timers = new Map()

export default (func, ms, options={})=>{
    const { leading=false } = options

    return function(){
        let inProgress = false
        let timer = timers.get(func)
        if (timer){
            inProgress = true
            clearTimeout(timer)
            timers.delete(func)
        }
    
        timer = setTimeout(
            ()=>{
                func(...arguments)
                timers.delete(func)
            }, 
            leading && !inProgress ? 0 : ms
        )
        timers.set(func, timer)
    }
}