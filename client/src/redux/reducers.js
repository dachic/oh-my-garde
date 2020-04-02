// @flow

import { combineReducers } from 'redux';
import Layout from './layout/reducers';
import Auth from './auth/reducers';
import AppMenu from './appMenu/reducers';
import Matching from './matching/reducers'

export default combineReducers({
    Auth,
    AppMenu,
    Layout,
    Matching
});
