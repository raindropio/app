# Lazy
Use power of new `content-visibility` CSS property.
This module also doesn't render React items outside of a viewport thanks to `IntersectionObserver`.
This module wrap each item in a div. This div is empty when item is out of a viewport.
This module doesn't wrap all items in a element.

## How to use?
1. Update render
```jsx
    <Lazy
        data={Array}
        keyExtractor={(item,index)=>{}}>
        {(item,index)=>{}}
    </Lazy>
```

2. Update CSS
You also need to add new CSS variable `--lazy-item-height` equal to approximate height of an item

## Parameters
data
    Any Array

keyExtractor(item,index)
    A function that should return an unique key for each item

children(item,index)
    Render an item

initialNumToRender
    A number how much elements should always visible and rendered. Useful to prevent layout shift on first render.
    Default is 10