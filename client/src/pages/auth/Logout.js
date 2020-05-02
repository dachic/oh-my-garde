import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { logoutUser } from '../../redux/actions';

class Logout extends Component {

    componentDidMount() {
        this.props.logoutUser(this.props.history);
        document.location.reload(true); // hack redux re-initialization
    }

    render() {
        return (<React.Fragment>
        </React.Fragment>)
    }
}

export default withRouter(connect(null, { logoutUser })(Logout));
