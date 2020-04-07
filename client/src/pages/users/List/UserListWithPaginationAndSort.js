import React from 'react';
import { Card, CardBody, Input, Row, Col, Button } from 'reactstrap';
import BootstrapTable, { TableHeaderColumn } from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import { Link } from 'react-router-dom';
import { formatDateForTable } from '../../../helpers/dateUtils';

const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => (
    <React.Fragment>
        <label className="d-inline mr-1">Affichage</label>
        <Input type="select" name="select" id="no-entries" className="custom-select custom-select-sm d-inline col-1"
            defaultValue={currSizePerPage}
            onChange={(e) => onSizePerPageChange(e.target.value)}>
            {options.map((option, idx) => {
                return <option key={idx}>{option.text}</option>
            })}
        </Input>
        <label className="d-inline ml-1">éléments</label>
    </React.Fragment>
);

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

const defaultSorted = [
    {
        dataField: 'id',
        order: 'asc',
    },
];

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

const UserListWithPaginationAndSort = ({ users }) => {
    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total ml-4">
            Résultats de {from} à {to} pour {size} résultats
        </span>
    );

    const paginationOptions = {
        paginationSize: 5,
        pageStartIndex: 1,
        firstPageText: 'Début',
        prePageText: 'Précédent',
        nextPageText: 'Suivant',
        lastPageText: 'Dernier',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        sizePerPageRenderer: sizePerPageRenderer,
        sizePerPageList: [
            {
                text: '20',
                value: 20,
            },
            {
                text: '40',
                value: 40,
            },
            {
                text: '60',
                value: 60,
            },
            {
                text: 'Tous',
                value: users.length,
            },
        ], // A numeric array is also available. the purpose of above example is custom the text
    };

    return (
        <Card>
            <CardBody>
                <ToolkitProvider
                    bootstrap4
                    keyField="id"
                    data={users}
                    columns={columns}
                    search
                    exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                    {props => (
                        <React.Fragment>
                            <Row>
                                <Col>
                                    <SearchBar {...props.searchProps} />
                                </Col>
                                <Col className="text-right">
                                    <ExportCSVButton {...props.csvProps} className="btn btn-primary">
                                        Export CSV
                                            </ExportCSVButton>
                                </Col>
                            </Row>

                            <BootstrapTable
                                {...props.baseProps}
                                bordered={false}
                                defaultSorted={defaultSorted}
                                bootstrap4
                                keyField="id"
                                data={users}
                                columns={columns}
                                pagination={paginationFactory(paginationOptions)}
                                wrapperClasses="table-responsive"
                            >
                                <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
                            </BootstrapTable>
                        </React.Fragment>
                    )}
                </ToolkitProvider>
            </CardBody>
        </Card>
    );
};

export default UserListWithPaginationAndSort;
