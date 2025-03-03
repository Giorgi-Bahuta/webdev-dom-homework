import { formatCustomDate } from './date.js'

const host = 'https://wedev-api.sky.pro/api/v2/Giorgi-Bahuta'
const authHost = 'https://wedev-api.sky.pro/api/user'

export let token = ''

export const setToken = (newToken) => {
    token = newToken
}

export let name = ''

export const setName = (newName) => {
    name = newName
}

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
        headers: {
            Authorization: `Bearer ${token}`,
        },
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

export const login = (login, password) => {
    return fetch(authHost + '/login', {
        method: 'POST',
        body: JSON.stringify({ login: login, password: password }),
    })
}

export const registration = (name, login, password) => {
    return fetch(authHost, {
        method: 'POST',
        body: JSON.stringify({ name: name, login: login, password: password }),
    })
}
