import { formatCustomDate } from './date.js'

const host = 'https://wedev-api.sky.pro/api/v1/Giorgi-Bahuta'

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((res) => {
            return res.json()
        })
        .then((resData) => {
            const appComments = resData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: formatCustomDate(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    isLikes: false,
                }
            })

            return appComments
        })
}

export const postComment = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        body: JSON.stringify({
            text: text,
            name: name,
        }),
    })
        .then((res) => {
            if (res.status === 201) {
                return res.json()
            } else {
                if (res.status === 400) {
                    throw new Error('Неверный запрос')
                }
                if (res.status === 500) {
                    throw new Error('Сервер сломался')
                }

                throw new Error('Что-то пошло не так')
            }
        })

        .then(() => {
            return fetchComments()
        })
}
