import Api from '../api'

export default async function(bookmarkID){
    const { link='' } = await Api._get(`raindrop/${bookmarkID}/cache?json=1`)
    return link
}