import React from 'react';
import * as FeatherIcon from 'react-feather';
import PrivateRoute from './PrivateRoute';

// dashboard
const Dashboard = React.lazy(() => import('../pages/dashboard'));

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
    // component: EmailDetail,
    route: PrivateRoute,
    roles: ['ROLE_ADMIN', 'ROLE_PHARMACY', 'ROLE_INTERN'],
};

export default { dashboard, accountProfile }
