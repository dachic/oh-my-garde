import React from 'react';
import * as FeatherIcon from 'react-feather';
import PrivateRoute from './PrivateRoute';

const ListAllUser = React.lazy(() => import('../pages/users/List/List'));
const EditUser = React.lazy(() => import('../pages/users/Edit/EditUser'));
const AddUser = React.lazy(() => import('../pages/users/Edit/AddUser'));
const InternExport = React.lazy(() => import('../pages/export/InternExport'));
const InternPending = React.lazy(() => import('../pages/export/InternPending'));
const InternAll = React.lazy(() => import('../pages/export/InternAll'));

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
            hide: true,
            component: EditUser,
            route: PrivateRoute,
            roles: ['ROLE_ADMIN'],
        }
    ]
};

const guard = {
    path: 'pharmacy',
    name: 'Gardes',
    header: 'Entitées',
    icon: FeatherIcon.FileText,
    children: [
        {
            path: '/interns/export',
            name: 'Export des gardes',
            component: InternExport,
            roles: ['ROLE_ADMIN'],
            route: PrivateRoute
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


export default { usersRoutes, guard }
