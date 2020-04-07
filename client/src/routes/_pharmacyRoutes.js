import React from 'react';
import * as FeatherIcon from 'react-feather';
import PrivateRoute from './PrivateRoute';

const GuardApp = React.lazy(() => import('../pages/apps/Guard/Add'));
const GuardsList = React.lazy(() => import('../pages/apps/Guard/List'));
// users
const InternPending = React.lazy(() => import('../pages/export/InternPending'));
const InternAll = React.lazy(() => import('../pages/export/InternAll'));

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
        },
        {
            path: '/guards/list',
            name: 'Consulter',
            component: GuardsList,
            route: PrivateRoute,
            roles: ['ROLE_PHARMACY'],
        },
        {
            path: '/interns/pending',
            name: 'Garde en attente',
            component: InternPending,
            roles: ['ROLE_ADMIN'],
            route: PrivateRoute
        },
        {
            path: '/interns/all',
            name: 'Tous les gardes',
            component: InternAll,
            roles: ['ROLE_ADMIN'],
            route: PrivateRoute
        }
    ]
};

export default { guardAppRoutes }
