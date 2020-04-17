import React from 'react';
import * as FeatherIcon from 'react-feather';
import PrivateRoute from './PrivateRoute';

const GuardApp = React.lazy(() => import('../pages/apps/Guard/Add'));
const GuardsList = React.lazy(() => import('../pages/apps/Guard/List'));
const PharmacyApp = React.lazy(() => import('../pages/apps/Pharmacy/Add'));
// const EditPharmacy = React.lazy(() => import('../pages/apps/Pharmacy/Edit'));
const Matching = React.lazy(() => import('../pages/apps/Guard/Matching'));

const guard = {
    path: 'guard',
    name: 'Gardes',
    icon: FeatherIcon.FileText,
    children: [
        {
            path: '/guards/add',
            name: 'Ajouter une garde',
            component: GuardApp,
            route: PrivateRoute,
            roles: ['ROLE_PHARMACY'],
        },
        {
            path: '/guards/list',
            name: 'Toutes les gardes',
            component: GuardsList,
            route: PrivateRoute,
            roles: ['ROLE_PHARMACY'],
        },
        {
            path: '/guards/:id(\\d+)/matching',
            exact: true,
            name: 'Matching',
            header: 'Apps',
            component: Matching,
            hidden: true,
            route: PrivateRoute,
            roles: ['ROLE_PHARMACY']
        }
    ]
};

// Routes for pharmacy
const pharmacyAppRoutes = {
    path: 'pharmacy',
    name: 'Pharmacie',
    header: 'Entitées',
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

export default { guard, pharmacyAppRoutes }
