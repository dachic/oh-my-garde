import React from 'react';
import * as FeatherIcon from 'react-feather';
import PrivateRoute from './PrivateRoute';

const ListAllUser = React.lazy(() => import('../pages/users/List/List'));
const EditUser = React.lazy(() => import('../pages/users/Edit/EditUser'));
const AddUser = React.lazy(() => import('../pages/users/Edit/AddUser'));
const InternExport = React.lazy(() => import('../pages/export/InternExport'));

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

// Intern export for admin
const guardExportRoute = {
    path: '/interns/export',
    name: 'Export des gardes',
    icon: FeatherIcon.DownloadCloud,
    component: InternExport,
    roles: ['ROLE_ADMIN'],
    route: PrivateRoute
};


export default { usersRoutes, guardExportRoute }
