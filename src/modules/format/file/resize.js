export function resize(file, { width, format='jpeg', quality=90 }) {
    return new Promise((res, rej)=>{
        const img = new Image()

        try{
            img.src = URL.createObjectURL(file)
        }catch(e) {return rej(e)}

        img.onload = () => {
            const elem = document.createElement('canvas')
            const ctx = elem.getContext('2d')
            
            const scaleFactor = width / img.width
            elem.width = width
            elem.height = img.height * scaleFactor

            try{
                ctx.drawImage(img, 0, 0, width, img.height * scaleFactor)
            } catch (e) { return rej(e) }

            ctx.canvas.toBlob((blob) => {
                res(
                    new File(
                        [blob], 
                        `img.${format}`, 
                        {
                            type: `image/${format}`,
                            lastModified: Date.now()
                        }
                    )
                )
            }, `image/${format}`, quality/100)
        }

        img.onerror = rej
    })
}