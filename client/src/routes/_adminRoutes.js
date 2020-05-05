import React from 'react';
import * as FeatherIcon from 'react-feather';
import PrivateRoute from './PrivateRoute';

const ListAllUser = React.lazy(() => import('../pages/apps/User/List/List'));
const ListAllInternUser = React.lazy(() => import('../pages/apps/User/List/ListIntern'));
const EditUser = React.lazy(() => import('../pages/apps/User/Edit/EditUser'));
const AddUser = React.lazy(() => import('../pages/apps/User/Edit/AddUser'));
const ExportUserGuards = React.lazy(() => import('../pages/apps/User/Export/ExportUserGuard'));

const ListAllGuard = React.lazy(() => import('../pages/apps/Guard/ListAll'));
const ListAllPendingGuard = React.lazy(() => import('../pages/apps/Guard/ListPending'));


// users
const usersRoutes = {
    path: '/users',
    name: 'Utilisateurs',
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
            hidden: true,
            component: EditUser,
            route: PrivateRoute,
            roles: ['ROLE_ADMIN'],
        },
        {
            path: '/users/interns-all',
            name: 'Tous les internes',
            component: ListAllInternUser,
            roles: ['ROLE_ADMIN'],
            route: PrivateRoute
        },
        {
            path: '/users/guard/export/:id',
            hidden: true,
            component: ExportUserGuards,
            roles: ['ROLE_ADMIN'],
            route: PrivateRoute
        },
    ]
};

const guard = {
    path: 'pharmacy',
    name: 'Gardes',
    header: 'Entitées',
    icon: FeatherIcon.FileText,
    children: [
        {
            path: '/guard/all',
            name: 'Tous les gardes',
            component: ListAllGuard,
            roles: ['ROLE_ADMIN'],
            route: PrivateRoute
        },
        {
            path: '/guard/pending',
            name: 'Garde en attente',
            component: ListAllPendingGuard,
            roles: ['ROLE_ADMIN'],
            route: PrivateRoute
        }
    ]
};


export default { usersRoutes, guard }
