import React from 'react';
import * as FeatherIcon from 'react-feather';
import PrivateRoute from './PrivateRoute';

const InternApp = React.lazy(() => import('../pages/apps/Intern/AddInternship'));
const InternList = React.lazy(() => import('../pages/apps/Intern/AllInternships'));
const EditInternship = React.lazy(() => import('../pages/apps/Intern/EditInternship'));
const DisponibilityAdd = React.lazy(() => import('../pages/apps/Disponibility/Add'));
const DisponibilityEdit = React.lazy(() => import('../pages/apps/Disponibility/Edit'));
const DisponibilityList = React.lazy(() => import('../pages/apps/Disponibility/List'));

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
            path: '/internship/edit/:id(\\d+)',
            component: EditInternship,
            route: PrivateRoute,
            roles: ['ROLE_INTERN'],
            hidden: true
        }
    ],
};

const disponibility = {
    path: 'disponibility',
    name: 'Disponibilités',
    icon: FeatherIcon.Clock,
    children: [
        {
            path: '/disponibility/add',
            name: 'Ajouter une disponibilité',
            component: DisponibilityAdd,
            route: PrivateRoute,
            roles: ['ROLE_INTERN'],
        },
        {
            path: '/disponibility/all',
            name: 'Toutes mes disponibilités',
            component: DisponibilityList,
            route: PrivateRoute,
            roles: ['ROLE_INTERN'],
        },
        {
            path: '/disponibility/edit/:id',
            component: DisponibilityEdit,
            route: PrivateRoute,
            roles: ['ROLE_INTERN'],
            hidden: true
        }
    ],
};

export default { internship, disponibility }
