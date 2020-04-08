import React from 'react';
import * as FeatherIcon from 'react-feather';
import PrivateRoute from './PrivateRoute';

const InternApp = React.lazy(() => import('../pages/apps/Intern/AddInternship'));
const InternList = React.lazy(() => import('../pages/apps/Intern/AllInternships'));
const EditInternship = React.lazy(() => import('../pages/apps/Intern/EditInternship'));

const internship = {
    path: 'internship',
    name: 'Stages',
    header: 'Entités',
    icon: FeatherIcon.FileText,
    children: [
        {
            path: '/internship/add',
            name: 'Ajouter un stage',
            component: InternApp,
            route: PrivateRoute,
            roles: ['ROLE_INTERN'],
        },
        {
            path: '/internship/all',
            name: 'Tous mes stages',
            component: InternList,
            route: PrivateRoute,
            roles: ['ROLE_INTERN'],
        },
        {
            path: '/internship/edit',
            component: EditInternship,
            route: PrivateRoute,
            roles: ['ROLE_INTERN'],
            hidden: true
        }
    ],
};


export default { internship }