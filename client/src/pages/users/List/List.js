import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Button, Card, CardBody } from 'reactstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import PageTitle from '../../../components/PageTitle';
import { findAllUsersApi } from '../../../helpers/api/usersApi';
import Loader from '../../../components/Loader';
import PaginatedList from '../../../components/PaginatedList';
import { Link } from 'react-router-dom';
import { formatDateForTable } from '../../../helpers/dateUtils';

const columns = [
    // {
    //     dataField: 'id',
    //     text: 'ID',
    //     sort: true,
    // },
    {
        dataField: 'firstname',
        text: 'Prénom',
        sort: true,
    },
    {
        dataField: 'lastname',
        text: 'Prénom',
        sort: true,
    },
    {
        dataField: 'email',
        text: 'Email',
        sort: true,
    },
    {
        dataField: 'phoneNumber',
        text: 'Numéro de téléphone',
        sort: false,
    },
    {
        dataField: 'roleAsString',
        text: 'Rôle',
        sort: true,
    },
    {
        dataField: "createdAt",
        text: "Date d'inscription",
        sort: true,
        formatter: (cell, row) => {
            return formatDateForTable(row.createdAt)
        }
    },
    {
        dataField: 'updatedAt',
        text: 'Dernière modificaiton',
        sort: true,
        formatter: (cell, row) => {
            return formatDateForTable(row.updatedAt)
        }
    },
    {
        dataField: 'id',
        text: 'Modifier',
        sort: false,
        formatter: (cell, row) => {
            return <Link to={{ pathname: `/users/edit/${row.id}` }}>
                <Button color="primary">Modifier </Button>
            </Link>
        }
    }
];

const List = () => {
    const [results, setResults] = useState([]);
    const [sizePerPage, setSizePerPage] = useState(10);
    const [page, setPage] = useState(1);
    const ref = useRef();

    useEffect(() => { // ComponentDidMount
        findAllUsersApi(page, sizePerPage)
            .then(results => {
                setResults(results)
            })
        ref.current = true;
    }, [page, sizePerPage]);

    if (results.length === 0) {
        return <Loader />;
    }

    const onRefreshTableData = (newPage, newItemsPerPage) => {
        setResults([])
        // important to update (newPage, newItemsPerPage)
        // before api call
        setSizePerPage(newItemsPerPage)
        setPage(newPage);

        // api call to get paginated users data
        findAllUsersApi(newPage, newItemsPerPage)
            .then(newResults => {
                setResults(newResults)
            });
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
                    <Card>
                        <CardBody>
                            <PaginatedList
                                page={page}
                                data={results['hydra:member']}
                                totalSize={results['hydra:totalItems']}
                                columns={columns}
                                sizePerPage={sizePerPage}
                                onRefreshTableData={onRefreshTableData}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default List;
