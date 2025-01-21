import { renderComments } from './modules/renderComments.js'
import { updateComments } from './modules/comments.js'
import { fetchComments } from './modules/api.js'
import { addComment } from './modules/post.js'

fetchComments().then((data) => {
    updateComments(data)
    renderComments()
})

addComment()
