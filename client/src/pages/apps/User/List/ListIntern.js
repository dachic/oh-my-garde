import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import PageTitle from '../../../../components/PageTitle';
import { findAllInternUsersApi } from '../../../../helpers/api/usersApi';
import Loader from '../../../../components/Loader';
import PaginatedList from '../../../../components/PaginatedList';
import { Link } from 'react-router-dom';
import { formatDateForTable } from '../../../../helpers/dateUtils';

const columns = [
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
        text: 'Actions',
        sort: false,
        formatter: (cell, row) => {
            return <React.Fragment>
                <div className="d-flex flex-column">
                    <Link to={{ pathname: `/users/edit/${row.id}` }}>
                        <Button color="primary">Modifier</Button>
                    </Link>
                    <span className="my-2 mx-2"></span>
                    <Link to={{ pathname: `/users/guard/export/${row.id}` }}>
                        <Button color="secondary">Gardes</Button>
                    </Link>
                </div>
            </React.Fragment>
        }
    }
];

const ListIntern = () => {
    const [results, setResults] = useState([]);
    const [sizePerPage, setSizePerPage] = useState(10);
    const [page, setPage] = useState(1);
    const ref = useRef();

    useEffect(() => { // ComponentDidMount
        findAllInternUsersApi(page, sizePerPage)
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
        findAllInternUsersApi(newPage, newItemsPerPage)
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
                            { label: 'Tous les internes', path: '/users/all-interns', active: true },
                        ]}
                        title={'Tous les internes'}
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

export default ListIntern;
