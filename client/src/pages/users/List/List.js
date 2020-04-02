import React from 'react';
import { Row, Col } from 'reactstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import PageTitle from '../../../components/PageTitle';
import UserListWithPaginationAndSort from './UserListWithPaginationAndSort';

const List = () => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Tous les utilisateurs', path: '/users/all', active: true },
                        ]}
                        title={'Tous les utilisateurs'}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <UserListWithPaginationAndSort />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default List;
