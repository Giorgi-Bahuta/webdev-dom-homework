import { renderComments } from './modules/renderComments.js'
import { updateComments } from './modules/comments.js'
import { fetchComments } from './modules/api.js'
import { addCommetn } from './modules/post.js'

fetchComments().then((data) => {
    updateComments(data)
    renderComments()
})

addCommetn()
