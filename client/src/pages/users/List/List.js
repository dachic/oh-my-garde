import React, { useState, useRef, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import PageTitle from '../../../components/PageTitle';
import UserListWithPaginationAndSort from './UserListWithPaginationAndSort';
import { findAllUsersApi } from '../../../helpers/api/usersApi';
import Loader from '../../../components/Loader';


const List = () => {
    const [users, setUsers] = useState([]);
    const ref = useRef();

    useEffect(() => { // ComponentDidMount
        findAllUsersApi()
            .then(users => {
                setUsers(users)
            })
        ref.current = true;
    }, []);

    if (users.length === 0) {
        return <Loader />;
    }

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
                    <UserListWithPaginationAndSort users={users} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default List;
