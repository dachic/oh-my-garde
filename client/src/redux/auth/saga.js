// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { loginApi, registerApi, forgetPasswordApi, resetPasswordApi } from '../../helpers/api/authentication';

import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, FORGET_PASSWORD, RESET_PASSWORD } from './constants';

import {
    loginUserSuccess,
    loginUserFailed,
    registerUserSuccess,
    registerUserFailed,
    forgetPasswordSuccess,
    forgetPasswordFailed,
    resetPasswordSuccess,
    resetPasswordFailed,
} from './actions';

/**
 * Sets the session
 * @param {*} user
 */
const setSession = user => {
    let cookies = new Cookies();
    if (user) cookies.set('user', JSON.stringify(user), { path: '/' });
    else cookies.remove('user', { path: '/' });
};
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({ payload: { username, password } }) {
    const options = {
        body: JSON.stringify({ email: username, password }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const response = yield call(loginApi, '/login', options);
        setSession(response);
        yield put(loginUserSuccess(response));
        document.location.reload(true); // hack redux re-initialization
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(loginUserFailed(message));
        setSession(null);
    }
}

/**
 * Logout the user
 * @param {*} param0
 */
function* logout({ payload: { history } }) {
    try {
        setSession(null);
        yield call(() => {
            history.push('/account/login');
        });
    } catch (error) { }
}

/**
 * Register the user
 */
function* register({ payload: { firstname, lastname, email, phoneNumber, password, role, region } }) {
    const options = {
        body: JSON.stringify({ firstname, lastname, email, phoneNumber, password, role, region }),
        method: 'POST',
        headers: { "Content-Type": "application/json" },
    };

    try {
        const response = yield call(registerApi, '/register', options);
        yield put(registerUserSuccess(response));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(registerUserFailed(message));
    }
}

/**
 * Forget password
 */
function* forgetPassword({ payload: { email } }) {
    const options = {
        body: JSON.stringify({ email }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const response = yield call(forgetPasswordApi, `/forgot-password-request`, options);
        yield put(forgetPasswordSuccess(response));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(forgetPasswordFailed(message));
    }
}

/**
 * Reset password
 */
function* resetPassword({ payload: { token, password } }) {
    const options = {
        body: JSON.stringify({ token, password }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const response = yield call(resetPasswordApi, `/reset-password`, options);
        yield put(resetPasswordSuccess(response));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(resetPasswordFailed(message));
    }
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, login);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, register);
}

export function* watchForgetPassword() {
    yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

export function* watchResetPassword() {
    yield takeEvery(RESET_PASSWORD, resetPassword);
}

function* authSaga() {
    yield all([fork(watchLoginUser), fork(watchLogoutUser), fork(watchRegisterUser), fork(watchForgetPassword), fork(watchResetPassword)]);
}

export default authSaga;
