import React from 'react';
import { Redirect } from 'react-router-dom';

// utils
import PrivateRoute from './PrivateRoute';
import { getLoggedInUser } from '../helpers/authUtils';

// All routes
import adminRoutes from './_adminRoutes';
import authRoutes from './_authRoutes';
import nonAuthRoutes from './_nonAuthRoutes';
import internRoutes from './_internRoutes';
import pharmacyRoutes from './_pharmacyRoutes';
import accountRoutes from './_accountRoutes';

const loggedInUser = getLoggedInUser();

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard" />,
    route: PrivateRoute,
};

let appRoutes = [];
if (loggedInUser !== null) {
    if (loggedInUser.role === 'ROLE_PHARMACY') {
        appRoutes = [pharmacyRoutes.pharmacyAppRoutes, pharmacyRoutes.guard];
    }
    else if (loggedInUser.role === 'ROLE_INTERN') {
        appRoutes = [internRoutes.internship, internRoutes.disponibility, internRoutes.guard];
    }
    else if (loggedInUser.role === 'ROLE_ADMIN') {
        appRoutes = [adminRoutes.guard, adminRoutes.usersRoutes];
    }
}

// flatten the list of all nested routes
const flattenRoutes = routes => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach(item => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const allRoutes = [
    rootRoute,
    accountRoutes.dashboard,
    accountRoutes.accountProfile,
    ...appRoutes,
    authRoutes.authRoutes,
    nonAuthRoutes.confirmGuardRoute
];

const authProtectedRoutes = [
    accountRoutes.dashboard,
    accountRoutes.accountProfile,
    ...appRoutes,
];

const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
