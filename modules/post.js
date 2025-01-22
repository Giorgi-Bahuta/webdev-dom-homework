import { postComment } from './api.js'
import { updateComments } from './comments.js'
import { renderComments } from './renderComments.js'

const nameEl = document.querySelector('.add-form-name')
const commentEl = document.querySelector('.add-form-text')
const buttonEl = document.querySelector('.add-form-button')

export const addComment = () => {
    buttonEl.addEventListener('click', function (e) {
        nameEl.classList.remove('error')
        commentEl.classList.remove('error')

        if (nameEl.value === '' && commentEl.value === '') {
            nameEl.classList.add('error')
            commentEl.classList.add('error')
            return
        } else if (commentEl.value === '') {
            commentEl.classList.add('error')
            return
        } else if (nameEl.value === '') {
            nameEl.classList.add('error')
            return
        }

        document.querySelector('.form-loading').style.display = 'block'
        document.querySelector('.add-form').style.display = 'none'

        postComment(
            commentEl.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
            nameEl.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
        ).then((data) => {
            updateComments(data)
            renderComments()

            document.querySelector('.form-loading').style.display = 'none'
            document.querySelector('.add-form').style.display = 'flex'

            nameEl.value = ''
            commentEl.value = ''
        })
    })
}
