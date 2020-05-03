import React from 'react';
import { Route } from 'react-router-dom';

const GuardConfirm = React.lazy(() => import('../pages/apps/Guard/Confirm'));

const confirmGuardRoute = {
    path: '/guard/confirm/:id(\\d+)/:guard(\\d+)',
    name: 'Validateguard',
    component: GuardConfirm,
    route: Route
}

export default { confirmGuardRoute }
