import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
// import Flatpickr from 'react-flatpickr'
// import { ChevronDown, Mail, Printer, File, Users, Image, ShoppingBag } from 'react-feather';

import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';

import InternDashboard from './InternDashboard';
import PharmacyDashboard from './PharmacyDashboard';
import AdminDashboard from './AdminDashboard';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: getLoggedInUser(),
        };
    }

    render() {

        return (
            <React.Fragment>
                <div>
                    { /* preloader */}
                    {this.props.loading && <Loader />}

                    <Row className="page-title align-items-center mb-3">
                        <Col sm={4} xl={6}>
                            <h4 className="mb-1 mt-0">Tableau de board</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={10} xl={12}>
                            {
                                {
                                    'ROLE_INTERN': <InternDashboard />,
                                    'ROLE_PHARMACY': <PharmacyDashboard />,
                                    'ROLE_ADMIN': <AdminDashboard />
                                }[this.state.user.role]
                            }
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}

export default Dashboard;
