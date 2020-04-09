import React from 'react';
import * as FeatherIcon from 'react-feather';
import PrivateRoute from './PrivateRoute';

// dashboard
const Dashboard = React.lazy(() => import('../pages/dashboard'));
const AccountProfile = React.lazy(() => import('../pages/account/Profile'));

// dashboards
const dashboard = {
    path: '/dashboard',
    name: 'Tableau de bord',
    icon: FeatherIcon.Home,
    header: 'Navigation',
    component: Dashboard,
    roles: ['ROLE_ADMIN', 'ROLE_PHARMACY', 'ROLE_INTERN'],
    route: PrivateRoute
};

const accountProfile = {
    path: '/account/profile',
    name: 'Profil',
    component: AccountProfile,
    route: PrivateRoute,
    roles: ['ROLE_ADMIN', 'ROLE_PHARMACY', 'ROLE_INTERN'],
    hidden: true
};

export default { dashboard, accountProfile }
