import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as FeatherIcon from 'react-feather';

import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';

import adminRoutes from './_adminRoutes';
import authRoutes from './_authRoutes';
import internRoutes from './_internRoutes';
import pharmacyRoutes from './_pharmacyRoutes';
import dashboardRoutes from './_dashboardRoutes';

const Matching = React.lazy(() => import('../pages/matching/Matching'));

// apps
const PharmacyApp = React.lazy(() => import('../pages/apps/Pharmacy/Add'));
const EditPharmacy = React.lazy(() => import('../pages/apps/Pharmacy/Edit'));

const EditInternship = React.lazy(() => import('../pages/apps/Intern/EditInternship'));
const GuardConfirm = React.lazy(() => import('../pages/apps/Guard/Confirm'));

const loggedInUser = getLoggedInUser();

// handle auth and authorization
const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (!isUserAuthenticated()) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />;
            }

            const loggedInUser = getLoggedInUser();

            // check if route is restricted by role
            if (roles && roles.indexOf(loggedInUser.role) === -1) {
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: '/' }} />;
            }

            // authorised so return component
            return <Component {...props} />;
        }}
    />
);

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard" />,
    route: PrivateRoute,
};

// Routes for pharmacy
const pharmacyAppRoutes = {
    path: 'pharmacy',
    name: 'Pharmacie',
    header: 'Entitée',
    icon: FeatherIcon.FileText,
    children: [
        {
            path: '/pharmacy/add',
            name: 'Ajouter',
            component: PharmacyApp,
            route: PrivateRoute,
            roles: ['ROLE_PHARMACY'],
        },
        {
            path: '/pharmacy/edit',
            name: 'Modifier',
            component: EditPharmacy,
            route: PrivateRoute,
            roles: ['ROLE_PHARMACY'],
        }
    ]
};

const EditInternshipRoutes = {
    path: '/internship/edit',
    component: EditInternship,
    route: PrivateRoute,
    roles: ['ROLE_INTERN']
};

// Guards and matching
const matchingRoute = {
    path: '/guards/matching',
    name: 'Matching',
    header: 'Apps',
    component: Matching,
    route: PrivateRoute,
    roles: ['ROLE_PHARMACY']
}

const confirmGuardRoute = {
    path: '/guard/confirm',
    name: 'Validateguard',
    component: GuardConfirm,
    route: Route
}

let appRoutes = [];
if (loggedInUser !== null) {
    if (loggedInUser.role === 'ROLE_PHARMACY') {
        appRoutes = [pharmacyAppRoutes, pharmacyRoutes.guardAppRoutes];
    }
    else if (loggedInUser.role === 'ROLE_INTERN') {
        appRoutes = [internRoutes.internAppRoutes];
    }
    else if (loggedInUser.role === 'ROLE_ADMIN') {
        appRoutes = [adminRoutes.guardExportRoute, pharmacyRoutes.guardAppRoutes, adminRoutes.usersRoutes];
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
    matchingRoute,
    ...appRoutes,
    authRoutes.authRoutes,
    EditInternshipRoutes,
    confirmGuardRoute
];

const authProtectedRoutes = [dashboardRoutes.dashboardRoutes, ...appRoutes, EditInternshipRoutes];
const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
