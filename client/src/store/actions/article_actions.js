import { getAuthHeader } from '../../utils/tools';
import * as articles from './index'
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
export const getArticles = (sort) => {
    return async (dispatch, getState) => {
        try {
            const arts = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/articles/loadmore`, sort);
            const prevArts = getState().articles.articles;
            let newArts = [...arts.data];
            if(prevArts) {
                newArts = [...prevArts, ...arts.data];
            }
            dispatch(articles.getArticles(newArts));
            dispatch(articles.successGlobal('AWESOME'));
        } catch(error) {
            dispatch(articles.errorGlobal('OOPS Error loading articles'));
        }
    }
}
export const getArticle = (id) => {
    return async (dispatch) => {
        try {
            const request = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/articles/get_byid/${id}`);
            dispatch(articles.getArticle(request.data[0]));
        } catch(error) {
            dispatch(articles.errorGlobal(error.response.data.message));
        }
    }
}
export const addArticle = (article) => {
    return async(dispatch) => {
        try {
            const request = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/articles/admin/add_articles`,
                article,
                getAuthHeader()
            );
            dispatch(articles.addArticle(request.data));
            dispatch(articles.successGlobal("Good one!!"));
        } catch(error) {
            dispatch(articles.errorGlobal(error.response.data.message));
        }
    }
}
export const getPaginateArticles = (page=1, limit=10, keywords='') => {
    return async(dispatch) => {
        try {
            const request = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/articles/admin/paginate`, {
                keywords,
                page,
                limit
            }, getAuthHeader());
            dispatch(articles.getPaginateArticles(request.data));
        } catch(error) {
            dispatch(articles.errorGlobal(error.response.data.message));
        }
    }
}
export const changeStatusArticle = (status, _id) => {
    return async(dispatch, getState) => {
        try {
            const article = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/articles/admin/${_id}`, {
                status
            }, getAuthHeader());
            let art = article.data;
            let state = getState().articles.adminArticles.docs;     // previous state
            let position = state.findIndex(art => art._id === _id); // find the position
            state[position] = art;
            dispatch(articles.updateArticleStatus(state));
            dispatch(articles.successGlobal("Cool!!"));
        } catch(error) {
            dispatch(articles.errorGlobal(error.response.data.message));
        }
    }
}
export const removeArticle = (id) => {
    return async(dispatch) => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/articles/admin/${id}`, getAuthHeader());
            dispatch(articles.removeArticle());
            dispatch(articles.successGlobal());
        } catch(error) {
            dispatch(articles.errorGlobal(error.response.data.message));
        }
    }
}
export const getAdminArticle = (id) => {
    return async(dispatch) => {
        try {
            const request = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/articles/admin/${id}`, getAuthHeader());
            dispatch(articles.getArticle(request.data));
        } catch(error) {
            dispatch(articles.errorGlobal(error.response.data.message));
        }
    }
}
export const updateArticle = (article, id) => {
    return async(dispatch) => {
        try {
            const newArticle = await axios.patch(
                `${process.env.REACT_APP_SERVER_URL}/api/articles/admin/${id}`,
                article,
                getAuthHeader()
            );
            dispatch(articles.getArticle(newArticle.data));
            dispatch(articles.successGlobal('Update done!!'));
        } catch(error) {
            dispatch(articles.errorGlobal('Error, Try Again!!'));
        }
    }
}
export const getCategories = () => {
    return async(dispatch) => {
        try {
            const categories = await axios(`${process.env.REACT_APP_SERVER_URL}/api/articles/categories`);
            dispatch(articles.getCategories(categories.data));
        } catch(error) {
            dispatch(articles.errorGlobal('Error, Try Again!!'));
        }
    }
}
export const addCategory = (values) => {
    return async(dispatch, getState) => {
        try {
            const category = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/articles/categories`,
                values,
                getAuthHeader()
            );
            let newState = [
                ...getState().articles.categories,
                category.data
            ];
            dispatch(articles.addCategory(newState));
            dispatch(articles.successGlobal('Category Added!!'));
        } catch(error) {
            dispatch(articles.errorGlobal('Error, Try Again!!'));
        }
    }
}
export const getSearchNavResults = (page=1, limit=5, keywords='') => {
    return async(dispatch) => {
        try {
            const request = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/articles/user/search`, {
                keywords,
                page,
                limit
            });
            dispatch(articles.navSearch(request.data));
        } catch(error) {
            dispatch(articles.errorGlobal(error.response.data.message));
        }
    }
}