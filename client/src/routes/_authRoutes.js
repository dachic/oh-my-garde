import React from 'react';
import { Route } from 'react-router-dom';

// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const ResetPassword = React.lazy(() => import('../pages/auth/ResetPassword'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));


// auth
const authRoutes = {
    path: '/account',
    name: 'Auth',
    children: [
        {
            path: '/account/login',
            name: 'Login',
            component: Login,
            route: Route,
        },
        {
            path: '/account/logout',
            name: 'Logout',
            component: Logout,
            route: Route,
        },
        {
            path: '/account/register',
            name: 'Register',
            component: Register,
            route: Route,
        },
        {
            path: '/account/confirm',
            name: 'Confirm',
            component: Confirm,
            route: Route,
        },
        {
            path: '/account/forget-password',
            name: 'Forget Password',
            component: ForgetPassword,
            route: Route,
        },
        {
            path: '/account/reset-password',
            name: 'Reset Password',
            exact: true,
            component: ResetPassword,
            route: Route,
        },
        {
            path: '/account/reset-password/:token',
            exact: true,
            name: 'Reset Password',
            component: ResetPassword,
            route: Route,
        },
    ],
};

export default { authRoutes }
