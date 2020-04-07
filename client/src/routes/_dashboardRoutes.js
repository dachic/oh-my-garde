import React from 'react';
import * as FeatherIcon from 'react-feather';
import PrivateRoute from './PrivateRoute';

// dashboard
const Dashboard = React.lazy(() => import('../pages/dashboard'));

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

export default { dashboardRoutes }
