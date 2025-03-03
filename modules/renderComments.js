import { name, token } from './api.js'
import { comments } from './comments.js'
import { addComment } from './post.js'
import { renderLogin } from './renderLogin.js'

export const renderComments = () => {
    const container = document.querySelector('.container')

    const commentsHtml = comments
        .map((comment, index) => {
            return `
        <li class="comment">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div data-index=${index} class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index=${index} class="${
                  comment.isLiked ? 'like-button -active-like' : 'like-button'
              }"></button>
            </div>
          </div>
        </li>`
        })
        .join('')

    const addCommentsHtml = `
            <div class="add-form">
                <input
                    type="text"
                    class="add-form-name"
                    placeholder="Введите ваше имя"
                    readonly
                    value="${name}"
                />
                <textarea
                    type="textarea"
                    class="add-form-text"
                    placeholder="Введите ваш коментарий"
                    rows="4"
                ></textarea>
                <div class="add-form-row">
                    <button class="add-form-button">Написать</button>
                </div>
            </div>
            <div class="form-loading" style="display: none; margin-top: 20px">
                Комментарий добавляется, подождите...
            </div>
    `

    const linkToLoginTaxt = `<p>Чтобы отправить комментарий, <span class="link-login">войти</span></p>`

    const baseHtml = `
    <ul class="comments">${commentsHtml}</ul>
    ${token ? addCommentsHtml : linkToLoginTaxt}
    `

    container.innerHTML = baseHtml

    if (token) {
        //Внутрь рендер функции добавим обработчик лайка и дизлайка, чтобы он каждый раз вешался при добавлении новых комментов
        const likeButtons = document.querySelectorAll('.like-button')

        for (const likeButton of likeButtons) {
            likeButton.addEventListener('click', function (e) {
                const index = likeButton.dataset.index
                const comment = comments[index]

                comment.isLiked ? comment.likes-- : comment.likes++

                comment.isLiked = !comment.isLiked

                renderComments()
            })
        }

        // Внутрь рендер функции добавим ответ на коммент. При нажатии на любой коммент, на него можно будет ответить
        const commentTexts = document.querySelectorAll('.comment-body')
        const commentEl = document.querySelector('.add-form-text')

        for (const commentText of commentTexts) {
            commentText.addEventListener('click', function (e) {
                const index = commentText.dataset.index
                const comment = comments[index]
                const name = comment.name
                const text = comment.text
                commentEl.value = `Ответ на ${name}: ${text} -> `
            })
        }

        addComment()
    } else {
        document.querySelector('.link-login').addEventListener('click', () => {
            renderLogin()
        })
    }
}
