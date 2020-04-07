import React from 'react';
import * as FeatherIcon from 'react-feather';
import PrivateRoute from './PrivateRoute';

const InternApp = React.lazy(() => import('../pages/apps/Intern/AddInternship'));
const InternList = React.lazy(() => import('../pages/apps/Intern/AllInternships'));

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

export default { internAppRoutes }
