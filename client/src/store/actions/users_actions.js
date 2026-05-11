import { getAuthHeader, getTokenCookie, removeTokenCookie } from '../../utils/tools';
import * as users from './index'
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
export const registerUser = (values) => {
    return async(dispatch) => {
        try {
            const user = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/register`, {
                email: values.email,
                password: values.password
            }, { withCredentials: true });
            dispatch(users.authUser({data: user.data, auth: true}));
            dispatch(users.successGlobal('Welcome!! Check your email and validate your account'));
        } catch(error) {
            dispatch(users.errorGlobal(error.response.data.message));
        }
    }
}
export const signInUser = (values) => {
    return async(dispatch) => {
        try {
            const user = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/signin`, {
                email: values.email,
                password: values.password
            }, { withCredentials: true });
            dispatch(users.authUser({data: user.data, auth: true}));
            dispatch(users.successGlobal('Welcome!!'));
        } catch(error) {
            dispatch(users.errorGlobal(error.response.data.message));
        }
    }
}
export const isAuthUser = () => {
    return async (dispatch) => {
        try {
            if(!getTokenCookie()) {
                throw new Error();
            }
            const user = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/isauth`, getAuthHeader());
            dispatch(users.authUser({data: user.data, auth: true}));
        } catch(error) {
            dispatch(users.authUser({data: {}, auth: false}));
        }
    }
}
export const signOut = () => {
    return async (dispatch) => {
        removeTokenCookie();
        dispatch(users.signOut());
    }
}
export const changeEmail = (data) => {
    return async(dispatch) => {
        try {
            await axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/users/update_email`, {
                email: data.email,
                newemail: data.newemail
            }, getAuthHeader());
            dispatch(users.changeUserEmail(data.newemail));
            dispatch(users.successGlobal("Good Job!!"));
        } catch(error) {
            dispatch(users.errorGlobal(error.response.data.message));
        }
    }
}
// update user profile
export const updateUserProfile = (data) => {
    return async(dispatch, getState) => {
        try {
            const profile = await axios.patch(
                `${process.env.REACT_APP_SERVER_URL}/api/users/profile`,
                data,
                getAuthHeader()
            );
            const userData = {
                ...getState().users.data,
                ...profile.data
            }
            dispatch(users.updateUserProfile(userData));
            dispatch(users.successGlobal('Profile Updated'));
        } catch(error) {
            dispatch(users.errorGlobal(error.response.data.message));
        }
    }
}
export const contactUs = (data) => {
    return async(dispatch) => {
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/contact`, data, {
                withCredentials: true
            });
            dispatch(users.successGlobal('We will contact you back'));
        } catch(error) {
            dispatch(users.errorGlobal(error.response.data.message));
        }
    }
}
export const accountVerify = (token) => {
    return async(dispatch, getState) => {
        try {
            const user = getState().users.auth;
            await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/verify?validation=${token}`, {
                withCredentials: true
            });
            if(user) {
                dispatch(users.accountVerify());
            }
            dispatch(users.successGlobal('Account Verified!!'));
        } catch(error) {
            dispatch(users.errorGlobal(error.response.data.message));
        }
    }
}