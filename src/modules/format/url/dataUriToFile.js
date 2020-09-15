const BASE64_MARKER = ';base64,'

export function dataUriToFile(dataURI) {
    const mime = dataURI.split(BASE64_MARKER)[0].split(':')[1]
    const filename = 'dataURI-file-' + (new Date()).getTime() + '.' + mime.split('/')[1]
    const bytes = atob(dataURI.split(BASE64_MARKER)[1])
    const writer = new Uint8Array(new ArrayBuffer(bytes.length))

    for (var i=0; i < bytes.length; i++) {
        writer[i] = bytes.charCodeAt(i);
    }

    return new File([writer.buffer], filename, { type: mime })
}