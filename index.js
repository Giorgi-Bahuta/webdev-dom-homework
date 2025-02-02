import { renderComments } from './modules/renderComments.js'
import { updateComments } from './modules/comments.js'
import { fetchComments } from './modules/api.js'
import { addComment } from './modules/post.js'

// document.querySelector('.comments').innerHTML =
//     'Список комментариев загружается, пожалуйста подождите'

export const fetchAndRenderComments = () => {
    fetchComments().then((data) => {
        updateComments(data)
        renderComments()
    })
}
fetchAndRenderComments()
