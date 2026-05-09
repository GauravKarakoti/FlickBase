import { ADD_ARTICLE, AUTH_USER, CHANGE_USER_EMAIL, CLEAR_CURRENT_ARTICLE, CLEAR_NOTIFICATION, ERROR_GLOBAL, GET_ADMIN_ARTICLES, GET_ARTICLE, GET_ARTICLES, REMOVE_ARTICLE, SIGN_OUT, SITE_LAYOUT, SUCCESS_GLOBAL, UPDATE_ARTICLE_STATUS, UPDATE_USER_PROFILE } from "../types";

////////////// ARTICLES //////////////
export const addArticle = (article) => ({
    type: ADD_ARTICLE,
    payload: article
});
export const getArticles = (articles) => ({
    type: GET_ARTICLES,
    payload: articles
});
export const getArticle = (article) => ({
    type: GET_ARTICLE,
    payload: article
});
export const getPaginateArticles = (articles) => ({
    type: GET_ADMIN_ARTICLES,
    payload: articles
});
export const updateArticleStatus = (article) => ({
    type: UPDATE_ARTICLE_STATUS,
    payload: article
});
export const clearCurrentArticle = () => ({
    type: CLEAR_CURRENT_ARTICLE
});
////////////// NOTIFICATIONS //////////////
export const errorGlobal = (msg) => ({
    type: ERROR_GLOBAL,
    payload: msg
})
export const successGlobal = (msg) => ({
    type: SUCCESS_GLOBAL,
    payload: msg
})
export const clearNotifications = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_NOTIFICATION
        })
    }
}
export const removeArticle = () => ({
    type: REMOVE_ARTICLE
});
////////////// USERS //////////////
export const authUser = (user) => ({
    type: AUTH_USER,
    payload: user
});
export const signOut = () => ({
    type: SIGN_OUT
});
export const changeUserEmail = (data) => ({
    type: CHANGE_USER_EMAIL,
    payload: data
});
export const updateUserProfile = (userData) => ({
    type: UPDATE_USER_PROFILE,
    payload: userData
});
////////////// SITE //////////////
export const appLayout = (layout) => ({
    type: SITE_LAYOUT,
    payload: layout
})