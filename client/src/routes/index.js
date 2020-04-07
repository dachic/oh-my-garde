import React from 'react';
import { Redirect } from 'react-router-dom';

// utils
import PrivateRoute from './PrivateRoute';
import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';

// All routes
import adminRoutes from './_adminRoutes';
import authRoutes from './_authRoutes';
import nonAuthRoutes from './_nonAuthRoutes';
import internRoutes from './_internRoutes';
import pharmacyRoutes from './_pharmacyRoutes';
import dashboardRoutes from './_dashboardRoutes';

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
        appRoutes = [pharmacyRoutes.pharmacyAppRoutes, pharmacyRoutes.guardAppRoutes];
    }
    else if (loggedInUser.role === 'ROLE_INTERN') {
        appRoutes = [internRoutes.internAppRoutes];
    }
    else if (loggedInUser.role === 'ROLE_ADMIN') {
        appRoutes = [adminRoutes.guard, pharmacyRoutes.guardAppRoutes, adminRoutes.usersRoutes];
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
    dashboardRoutes.dashboardRoutes,
    pharmacyRoutes.matchingRoute,
    ...appRoutes,
    authRoutes.authRoutes,
    internRoutes.EditInternshipRoutes,
    nonAuthRoutes.confirmGuardRoute
];

const authProtectedRoutes = [
    dashboardRoutes.dashboardRoutes,
    ...appRoutes,
    internRoutes.EditInternshipRoutes
];

const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
