import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Button, Card, CardBody } from 'reactstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import PageTitle from '../../../components/PageTitle';
import disponibilityApi from '../../../api/disponibility';
import Loader from '../../../components/Loader';
import PaginatedList from '../../../components/PaginatedList';
import { Link } from 'react-router-dom';
import { formatDateForTable } from '../../../helpers/dateUtils';
import getDayMapping from '../../../helpers/dayMapping';

const columns = [
    {
        dataField: 'day',
        text: 'Jour de la semaine',
        sort: false,
        formatter: (cell, row) => {
            return getDayMapping(row.day)
        }
    },
    {
        dataField: 'hour.name',
        text: 'Créneau',
        sort: true,
    },
    {
        dataField: "createdAt",
        text: "Date de création",
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
            return <Link to={{ pathname: `/disponibility/edit/${row.id}` }}>
                <Button color="primary">Modifier </Button>
            </Link>
        }
    }
];

const List = () => {
    const [results, setResults] = useState([]);
    const [sizePerPage] = useState(20);
    const [page] = useState(1);
    const ref = useRef();

    useEffect(() => { // ComponentDidMount
        disponibilityApi.findAllUserDisponibilities()
            .then(results => {
                setResults(results)
            })
        ref.current = true;
    }, [page, sizePerPage]);

    if (results.length === 0) {
        return <Loader />;
    }

    const onRefreshTableData = (newPage, newItemsPerPage) => {
        // not refresh needed
    }

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Toutes mes disponibilités', path: '/disponibility/all', active: true },
                        ]}
                        title={'Toutes mes disponibilités'}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <PaginatedList
                                page={page}
                                data={results}
                                totalSize={results.length}
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
