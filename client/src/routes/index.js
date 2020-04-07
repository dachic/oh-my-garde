import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as FeatherIcon from 'react-feather';

import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';

const Matching = React.lazy(() => import('../pages/matching/Matching'));

// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const ResetPassword = React.lazy(() => import('../pages/auth/ResetPassword'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));

// dashboard
const Dashboard = React.lazy(() => import('../pages/dashboard'));

// apps
const PharmacyApp = React.lazy(() => import('../pages/apps/Pharmacy/Add'));
const EditPharmacy = React.lazy(() => import('../pages/apps/Pharmacy/Edit'));
const InternApp = React.lazy(() => import('../pages/apps/Intern/AddInternship'));
const InternList = React.lazy(() => import('../pages/apps/Intern/AllInternships'));
const EditInternship = React.lazy(() => import('../pages/apps/Intern/EditInternship'));
const GuardApp = React.lazy(() => import('../pages/apps/Guard/Add'));
const GuardConfirm = React.lazy(() => import('../pages/apps/Guard/Confirm'));

// users
const ListAllUser = React.lazy(() => import('../pages/users/List/List'));
const EditUser = React.lazy(() => import('../pages/users/Edit/EditUser'));
const AddUser = React.lazy(() => import('../pages/users/Edit/AddUser'));
const InternExport = React.lazy(() => import('../pages/export/InternExport'));
const InternPending = React.lazy(() => import('../pages/export/InternPending'));
const InternAll = React.lazy(() => import('../pages/export/InternAll'));

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

// dashboards
const dashboardRoutes = {
    path: '/dashboard',
    name: 'Tableau de bord',
    icon: FeatherIcon.Home,
    header: 'Navigation',
    component: Dashboard,
    roles: ['ROLE_ADMIN', 'ROLE_PHARMACY', 'ROLE_INTERN'],
    route: PrivateRoute
};

// Intern export for admin
const internRoutes = {
    path: '/interns/export',
    name: 'Export des gardes',
    icon: FeatherIcon.DownloadCloud,
    component: InternExport,
    roles: ['ROLE_ADMIN'],
    route: PrivateRoute
};
// Intern pending for admin
const internPendingRoutes = {
    path: '/interns/pending',
    name: 'Garde en attente',
    icon: FeatherIcon.AlertTriangle,
    component: InternPending,
    roles: ['ROLE_ADMIN'],
    route: PrivateRoute
};
// Intern all for admin
const internAllRoutes = {
    path: '/interns/all',
    name: 'Tous les gardes',
    icon: FeatherIcon.List,
    component: InternAll,
    roles: ['ROLE_ADMIN'],
    route: PrivateRoute
};
// Routes for pharmacy
const pharmacyAppRoutes = {
    path: 'pharmacy',
    name: 'Pharmacie',
    header: 'Entités',
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
        },
        {
            path: '/pharmacy/test',
            name: 'Test',
            component: GuardConfirm,
            route: PrivateRoute,
            roles: ['ROLE_PHARMACY'],
        },
    ]
};

// Routes for intern
const internAppRoutes = {
    path: 'intern',
    name: 'Interne',
    header: 'Entités',
    icon: FeatherIcon.FileText,
    children: [
        {
            path: '/intern/internship',
            name: 'Expériences',
            component: InternApp,
            route: PrivateRoute,
            children: [
                {
                    path: '/intern/internship/add',
                    name: 'Ajouter',
                    component: InternApp,
                    route: PrivateRoute,
                    roles: ['ROLE_INTERN'],
                },
                {
                    path: '/intern/internship/all',
                    name: 'Consulter',
                    component: InternList,
                    route: PrivateRoute,
                    roles: ['ROLE_INTERN'],
                }
            ],
            roles: ['ROLE_INTERN'],
        },
        {
            path: '/intern/profile',
            name: 'Profil',
            // component: EmailDetail,
            route: PrivateRoute,
            roles: ['ROLE_INTERN'],
        },
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

const guardAppRoutes = {
    path: 'guard',
    name: 'Gardes',
    header: 'Gardes',
    icon: FeatherIcon.FileText,
    children: [
        {
            path: '/guards/add',
            name: 'Ajouter',
            component: GuardApp,
            route: PrivateRoute,
            roles: ['ROLE_PHARMACY'],
        }
    ]
};


const confirmGuardRoute = {
    path: '/guard/confirm',
    name: 'Validateguard',
    component: GuardConfirm,
    route: Route
}

// users
const usersRoutes = {
    path: '/users',
    name: 'Utilisateurs',
    header: 'Entités',
    icon: FeatherIcon.FileText,
    children: [
        {
            path: '/users/all',
            name: 'Liste des utilisateurs',
            component: ListAllUser,
            route: PrivateRoute,
            roles: ['ROLE_ADMIN'],
        },
        {
            path: '/users/add',
            name: 'Ajouter un utilisateur',
            component: AddUser,
            route: PrivateRoute,
            roles: ['ROLE_ADMIN'],
        },
        {
            path: '/users/edit/:id',
            hide: true,
            component: EditUser,
            route: PrivateRoute,
            roles: ['ROLE_ADMIN'],
        }
    ]
};

let appRoutes = [];
if (loggedInUser !== null) {
    if (loggedInUser.role === 'ROLE_PHARMACY') {
        appRoutes = [pharmacyAppRoutes, guardAppRoutes];
    }
    else if (loggedInUser.role === 'ROLE_INTERN') {
        appRoutes = [internAppRoutes];
    }
    else if (loggedInUser.role === 'ROLE_ADMIN'){
        appRoutes = [internRoutes, guardAppRoutes, usersRoutes, internPendingRoutes, internAllRoutes];
    }
}


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
    dashboardRoutes,
    matchingRoute,
    ...appRoutes,
    authRoutes,
    EditInternshipRoutes,
    confirmGuardRoute
];

const authProtectedRoutes = [dashboardRoutes, ...appRoutes, EditInternshipRoutes];
const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
