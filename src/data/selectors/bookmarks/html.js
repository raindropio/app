import { blankHtml } from '../../helpers/bookmarks'

export const getHtml = ({bookmarks}, _id)=>{
    return bookmarks.html[_id] || blankHtml
}