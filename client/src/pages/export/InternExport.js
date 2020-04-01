import React, { Component } from 'react'
import { Row, Col, Card, CardBody, Input, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const columns = [
    {
        dataField: 'LastName',
        text: 'firstname',
        sort: true,
    },
    {
        dataField: 'lastname',
        text: 'lastname',
        sort: false,
    },
    {
        dataField: 'horaire',
        text: 'Horaire',
        sort: true,
    },
    {
        dataField: 'name',
        text: 'Hopital',
        sort: false,
    },
    {
        dataField: 'nbJours',
        text: 'Nombre de jour',
        sort: true,
    },
];

const defaultSorted = [
    {
        dataField: 'id',
        order: 'asc',
    },
];
const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;
const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => (
    <React.Fragment>
        <label className="d-inline mr-1">Show</label>
        <Input type="select" name="select" id="no-entries" className="custom-select custom-select-sm d-inline col-1"
            defaultValue={currSizePerPage}
            onChange={(e) => onSizePerPageChange(e.target.value)}>
            {options.map((option, idx) => {
                return <option key={idx}>{option.text}</option>
            })}
        </Input>
        <label className="d-inline ml-1">entries</label>
    </React.Fragment>
);
export default class InternExport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            interns: []
        };
    }
    
    componentDidMount() {
        // Ici tu mettras ton appel API
        fetch("http://api.localhost/user/guard/count").then(response => {
            return response.json()
        }).then(response => {
          
           this.setState({
               interns: response
           })
        })
        .catch(() => {
           
        }); 
    }

    render() {
        
        // affichage du tableaux
        if (this.state.interns.length === 0) {
            return (<div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>);
        }
        return (
            <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Search and Export</h4>
                <p className="sub-header">A Table allowing search and export the data in CSV format</p>

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
                                pagination={paginationFactory({ sizePerPage: 5, sizePerPageRenderer: sizePerPageRenderer, sizePerPageList: [{ text: '5', value: 5, }, { text: '10', value: 10 }, { text: '25', value: 25 }, { text: 'All', value: this.state.interns.length }] })}
                                wrapperClasses="table-responsive"
                            />
                        </React.Fragment>
                    )}
                </ToolkitProvider>
            </CardBody>
        </Card>
        )
    }
}
