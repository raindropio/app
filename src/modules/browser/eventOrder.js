export const eventOrder = {
    add(elem) {
        window._eventOrder = window._eventOrder||[]
        window._eventOrder.push(elem)
    },

    delete(elem) {
        if (window._eventOrder)
            window._eventOrder = window._eventOrder.filter(e => e != elem)
    },

    isLast(elem) {
        if (!window._eventOrder)
            return true

        return (window._eventOrder[window._eventOrder.length-1] == elem)
    }
}