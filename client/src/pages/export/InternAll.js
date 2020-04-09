import React, { Component } from 'react'
import { Row, Col, Card, CardBody, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import userApi from '../../api/user'

const columns = [
    {
        dataField: 'IdUtilisateur',
        text: 'Id',
        sort: true,
    },
    {
        dataField: 'lastname',
        text: 'Nom',
        sort: true,
    },
    {
        dataField: 'firstname',
        text: 'Prenom',
        sort: true,
    },
    {
        dataField: 'horaire',
        text: 'Horaire',
        sort: true,
    },
    {
        dataField: 'hospital',
        text: 'Hopital',
        sort: true,
    },
    {
        dataField: 'date',
        text: 'Date',
        sort: true,
    },
    {
        dataField: 'jour',
        text: 'Jour',
        sort: true,
    }
];

const defaultSorted = [
    {
        dataField: 'lastname',
        order: 'asc',
    },
];
const expandRow = {
    renderer: row => (
        <div>
            <p style={center} className="header-title mt-2">Informations supplementaires sur {`${row.lastname} ${row.firstname}`} </p>
                <div class="list-group" style={tabMargin}>
                    <a href={`mailto:${row.email}`} class="list-group-item list-group-item-action"><b>Email: </b>{`${row.email}`}</a>
                    <a href={`tel:${row.phoneNumber}`} class="list-group-item list-group-item-action"><b>Téléphone: </b>{`${row.phoneNumber}`}</a>
                </div>
            <p style={center} className="header-title mt-2">Informations supplementaires sur {`${row.namePharmacy}`}</p>
                <div class="list-group" style={tabMargin}>
                    <a href={`mailto:${row.emailPharmacy}`} class="list-group-item list-group-item-action"><b>Email: </b>{`${row.emailPharmacy}`}</a>
                    <a href={`tel:${row.phoneNumberPharmacy}`} class="list-group-item list-group-item-action"><b>Téléphone: </b>{`${row.phoneNumberPharmacy}`}</a>
                    <p  class="list-group-item list-group-item-action"><b>Pharmacie: </b>{`${row.namePharmacy}`}</p>
                </div>
       </div>
    ),
    showExpandColumn: true,
    onlyOneExpanding: true,
    expandHeaderColumnRenderer: ({ isAnyExpands }) => {
        return isAnyExpands ? <i className='uil uil-minus'></i> : <i className='uil uil-plus'></i>;
    },
    expandColumnRenderer: ({ expanded }) => {
        return expanded ? <i className='uil uil-minus'></i> : <i className='uil uil-plus'></i>;
    },
};
const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;
const select = {
   padding: '3px',
};
const cardMargin = {
    margin: '30px',
};
const spinner = {
    width: '15rem',
    height: '15rem',
};
const box = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height:"80vh"
};
const center = {
    textAlign: 'center',
};
const tabMargin = {
    marginBottom: '15px',
    marginLeft: '30px',
    marginRight: '30px',
};
const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => (
    <React.Fragment>
        <label className="d-inline mr-1">Show</label>
        <Input style={select} type="select" name="select" id="no-entries" className="custom-select custom-select-sm d-inline col-1"
            defaultValue={currSizePerPage}
            onChange={(e) => onSizePerPageChange(e.target.value)}>
            {options.map((option, idx) => {
                return <option key={idx}>{option.text}</option>
            })}
        </Input>
        <label className="d-inline ml-1">entries</label>
    </React.Fragment>
);

export default class InternPending extends Component {

    constructor(props) {
        super(props);
        this.state = {
            interns: []
        };
    }


    componentDidMount() {
       userApi.allGuard().then(data=>{
            this.setState({
                interns: data
            })
       })
    }

    render() {
        if (this.state.interns.length === 0) {
            return (<div style={box}>
                        <div className="spinner-border" style={spinner} role="status">
                        <span className="sr-only">Loading...</span>
                        </div>
                     </div>
                    );
        }

        return (
            <div>
                <Card style={cardMargin}>
                    <CardBody>
                        <h4 className="header-title mt-0 mb-1">Tableau des gardes acceptés</h4>
                        <p className="sub-header">Ce tableau recapitule toutes les gardes des internes acceptés</p>

                        <ToolkitProvider
                            bootstrap4
                            keyField="id"
                            data={this.state.interns}
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
                                        pagination={paginationFactory({ sizePerPage: 5, sizePerPageRenderer: sizePerPageRenderer, sizePerPageList: [{ text: '5', value: 5, }, { text: '10', value: 10 }, { text: '25', value: 25 }] })}
                                        expandRow={expandRow}
                                        wrapperClasses="table-responsive"
                                    />
                                </React.Fragment>
                            )}
                        </ToolkitProvider>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
