import Api from '../api'

export default async function(url){
    const { result=false } = await Api._get(`import/url/iframeable?url=${encodeURIComponent(url)}`)
    return result
}