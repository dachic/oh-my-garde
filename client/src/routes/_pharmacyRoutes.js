import React from 'react';
import * as FeatherIcon from 'react-feather';
import PrivateRoute from './PrivateRoute';

const GuardApp = React.lazy(() => import('../pages/apps/Guard/Add'));
const GuardsList = React.lazy(() => import('../pages/apps/Guard/List'));
const InternPending = React.lazy(() => import('../pages/export/InternPending'));
const InternAll = React.lazy(() => import('../pages/export/InternAll'));
const PharmacyApp = React.lazy(() => import('../pages/apps/Pharmacy/Add'));
const EditPharmacy = React.lazy(() => import('../pages/apps/Pharmacy/Edit'));
const Matching = React.lazy(() => import('../pages/matching/Matching'));

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

// Guards and matching
const matchingRoute = {
    path: '/guards/matching',
    name: 'Matching',
    header: 'Apps',
    component: Matching,
    route: PrivateRoute,
    roles: ['ROLE_PHARMACY']
}


export default { guardAppRoutes, pharmacyAppRoutes, matchingRoute }
