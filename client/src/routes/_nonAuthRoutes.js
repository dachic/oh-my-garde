import React from 'react';
import { Route } from 'react-router-dom';

const GuardConfirm = React.lazy(() => import('../pages/apps/Guard/Confirm'));

const confirmGuardRoute = {
    path: '/guard/confirm',
    name: 'Validateguard',
    component: GuardConfirm,
    route: Route
}

export default { confirmGuardRoute }
