import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Button, Card, CardBody } from 'reactstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import PageTitle from '../../../components/PageTitle';
import guardApi from '../../../api/guard';
import Loader from '../../../components/Loader';
import PaginatedList from '../../../components/PaginatedList';
import { Link } from 'react-router-dom';
import { formatDateForTable } from '../../../helpers/dateUtils';
import getGuardStatusMapping from '../../../helpers/guardStatusMapping';

const columns = [
    {
        dataField: 'user.fullname',
        text: 'Interne',
        sort: true,
    },
    {
        dataField: 'pharmacy.name',
        text: 'Nom de la pharmacie',
        sort: true,
    },
    {
        dataField: 'hour.name',
        text: 'Horaire',
        sort: false,
    },
    {
        dataField: 'status',
        text: 'Horaire',
        sort: false,
        formatter: (cell, row) => {
            return getGuardStatusMapping(row.status)
        }
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
    }
];

const ListPending = () => {
    const [results, setResults] = useState([]);
    const [sizePerPage, setSizePerPage] = useState(10);
    const [page, setPage] = useState(1);
    const ref = useRef();

    useEffect(() => { // ComponentDidMount
        guardApi.findAllPendingGuardPaginated(page, sizePerPage)
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
        guardApi.findAllGuardPaginated(newPage, newItemsPerPage)
            .then(newResults => {
                setResults(newResults)
            });
    }

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[]}
                        title={'Toutes les gardes'}
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

export default ListPending;
