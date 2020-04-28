export default function(fn) {
    if (typeof fn == 'function')
        return function() {
            setTimeout(()=>fn.apply(this, arguments), 0)
        }
    else
        return fn
}