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

// pages
const Starter = React.lazy(() => import('../pages/other/Starter'));
const Profile = React.lazy(() => import('../pages/other/Profile/'));
const Activity = React.lazy(() => import('../pages/other/Activity'));
const Invoice = React.lazy(() => import('../pages/other/Invoice'));
const Pricing = React.lazy(() => import('../pages/other/Pricing'));
const Error404 = React.lazy(() => import('../pages/other/Error404'));
const Error500 = React.lazy(() => import('../pages/other/Error500'));

// ui
const BSComponents = React.lazy(() => import('../pages/uikit/BSComponents/'));
const FeatherIcons = React.lazy(() => import('../pages/uikit/Icons/Feather'));
const UniconsIcons = React.lazy(() => import('../pages/uikit/Icons/Unicons'));
const Widgets = React.lazy(() => import('../pages/uikit/Widgets/'));

// charts
const Charts = React.lazy(() => import('../pages/charts/'));

// forms
const BasicForms = React.lazy(() => import('../pages/forms/Basic'));
const FormAdvanced = React.lazy(() => import('../pages/forms/Advanced'));
const FormValidation = React.lazy(() => import('../pages/forms/Validation'));
const FormWizard = React.lazy(() => import('../pages/forms/Wizard'));
const FileUpload = React.lazy(() => import('../pages/forms/FileUpload'));
const Editor = React.lazy(() => import('../pages/forms/Editor'));

// tables
const BasicTables = React.lazy(() => import('../pages/tables/Basic'));
const AdvancedTables = React.lazy(() => import('../pages/tables/Advanced'));

// users
const ListAllUser = React.lazy(() => import('../pages/users/List/List'));
const EditUser = React.lazy(() => import('../pages/users/Edit/EditUser'));
const InternExport = React.lazy(() => import('../pages/export/InternExport'));

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
            path: '/users/edit',
            name: 'Edition un utilisateur',
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
        appRoutes = [internRoutes, guardAppRoutes, usersRoutes];
    }
}

// pages
const pagesRoutes = {
    path: '/pages',
    name: 'Pages',
    header: 'Custom',
    icon: FeatherIcon.FileText,
    children: [
        {
            path: '/pages/starter',
            name: 'Starter',
            component: Starter,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/pages/profile',
            name: 'Profile',
            component: Profile,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/pages/activity',
            name: 'Activity',
            component: Activity,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/pages/invoice',
            name: 'Invoice',
            component: Invoice,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/pages/pricing',
            name: 'Pricing',
            component: Pricing,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/pages/error-404',
            name: 'Error 404',
            component: Error404,
            route: Route
        },
        {
            path: '/pages/error-500',
            name: 'Error 500',
            component: Error500,
            route: Route
        },
    ]
};


// components
const componentsRoutes = {
    path: '/ui',
    name: 'UI Elements',
    header: 'Components',
    icon: FeatherIcon.Package,
    children: [
        {
            path: '/ui/bscomponents',
            name: 'Bootstrap UI',
            component: BSComponents,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/ui/icons',
            name: 'Icons',
            children: [
                {
                    path: '/ui/icons/feather',
                    name: 'Feather Icons',
                    component: FeatherIcons,
                    route: PrivateRoute,
                    roles: ['Admin'],
                },
                {
                    path: '/ui/icons/unicons',
                    name: 'Unicons Icons',
                    component: UniconsIcons,
                    route: PrivateRoute,
                    roles: ['Admin'],
                },
            ]
        },
        {
            path: '/ui/widgets',
            name: 'Widgets',
            component: Widgets,
            route: PrivateRoute,
            roles: ['Admin'],
        },

    ]
};

// charts
const chartRoutes = {
    path: '/charts',
    name: 'Charts',
    component: Charts,
    icon: FeatherIcon.PieChart,
    roles: ['Admin'],
    route: PrivateRoute
}


// forms
const formsRoutes = {
    path: '/forms',
    name: 'Forms',
    icon: FeatherIcon.FileText,
    children: [
        {
            path: '/forms/basic',
            name: 'Basic Elements',
            component: BasicForms,
            route: PrivateRoute,
        },
        {
            path: '/forms/advanced',
            name: 'Advanced',
            component: FormAdvanced,
            route: PrivateRoute,
        },
        {
            path: '/forms/validation',
            name: 'Validation',
            component: FormValidation,
            route: PrivateRoute,
        },
        {
            path: '/forms/wizard',
            name: 'Wizard',
            component: FormWizard,
            route: PrivateRoute,
        },
        {
            path: '/forms/editor',
            name: 'Editor',
            component: Editor,
            route: PrivateRoute,
        },
        {
            path: '/forms/upload',
            name: 'File Upload',
            component: FileUpload,
            route: PrivateRoute,
        }
    ]
};


const tableRoutes = {
    path: '/tables',
    name: 'Tables',
    icon: FeatherIcon.Grid,
    children: [
        {
            path: '/tables/basic',
            name: 'Basic',
            component: BasicTables,
            route: PrivateRoute,
        },
        {
            path: '/tables/advanced',
            name: 'Advanced',
            component: AdvancedTables,
            route: PrivateRoute,
        }]
};


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
    pagesRoutes,
    componentsRoutes,
    chartRoutes,
    formsRoutes,
    tableRoutes,
    authRoutes,
    EditInternshipRoutes,
    confirmGuardRoute
];

const authProtectedRoutes = [dashboardRoutes, ...appRoutes, EditInternshipRoutes];
const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
