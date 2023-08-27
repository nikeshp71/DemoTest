import axios from "axios";
import { get, isNumber } from "lodash";

import storage, { TOKEN_STORAGE } from "@storage/index";
import { EMAIL, PASS } from "@src/constants";

const instance = axios.create({
    baseURL: 'https://api.realworld.io/api'
});

apiHeaders();

export function apiHeaders() {
    const TOKEN_VALUE = storage.getString(TOKEN_STORAGE)
    if (TOKEN_VALUE && !!TOKEN_VALUE) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${TOKEN_VALUE}`;
    }
}

export const loginUser = async () => {
    try {

        let data = JSON.stringify({
            user: {
                email: EMAIL,
                password: PASS
            }
        });

        let config = {
            method: 'post',
            data,
            url: '/users/login',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await instance.request(config)
        const user = get(response, 'data.user')
        if (user) {
            const token = get(user, 'token')
            if (token && !!token) {
                storage.set(TOKEN_STORAGE, token)
                apiHeaders()
                return true
            }
        }
        return false
    } catch (error) {
        return false
    }
}

export const getArticlesList = async (offset = 0) => {
    try {
        let articles = await instance.get(`/articles?limit=20&offset=${offset}`)
        articles = get(articles, 'data.articles')
        if (articles && Array.isArray(articles) && articles.length > 0) {
            return articles
        }
        return null
    } catch (error) {
        return null
    }
}

export const getCommentsList = async (slug = null) => {
    try {
        if (slug && !!slug) {
            let comments = await instance.get(`/articles/${slug}/comments`)
            comments = get(comments, 'data.comments')
            if (comments && Array.isArray(comments) && comments.length > 0) {
                return comments
            }
        }
        return null
    } catch (error) {
        return null
    }
}

export const addComment = async (slug = null, text = null) => {
    try {
        if (slug && !!slug && text && !!text) {
            let bodyData = {
                comment: {
                    body: text
                }
            }
            const data = await instance.post(`/articles/${slug}/comments`, bodyData)
            const commentData = get(data, 'data.comment')
            if (commentData) {
                return commentData
            }
        }
        return null
    } catch (error) {
        return null
    }
}


export const deleteCommentFromApi = async (slug = null, id = null) => {
    try {
        if (slug && !!slug && isNumber(id)) {
            const data = await instance.delete(`/articles/${slug}/comments/${id}`)
            return data?.status === 200
        }
        return null
    } catch (error) {
        return null
    }
}
