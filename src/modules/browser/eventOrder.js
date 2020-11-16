export const eventOrder = {
    add(elem) {
        if (!window._eventOrder)
            window._eventOrder = new Set([])

        window._eventOrder.add(elem)
    },

    delete(elem) {
        if (window._eventOrder)
            window._eventOrder.delete(elem)
    },

    isLast(elem) {
        if (!window._eventOrder)
            return true

        let value;
        for(value of window._eventOrder);
        return value == elem
    }
}