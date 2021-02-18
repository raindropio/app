export default class Visibility {
    constructor() {
        this._io = new IntersectionObserver(this.onChange, {
            rootMargin: '150%'
        })
        this._targets = new Map()
    }

    onChange = (e)=>{
        for(const { target, isIntersecting } of e)
            if (this._targets.has(target))
                this._targets.get(target)(isIntersecting)
    }

    //public
    add = (target, callback)=>{
        if (!target) return
        if (this._targets.has(target)) return

        this._targets.set(target, callback)
        this._io.observe(target)
    }

    remove = (target)=>{
        if (!target) return
        this._targets.delete(target)
        this._io.unobserve(target)
    }
}