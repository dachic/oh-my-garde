import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

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

const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total ml-4">
        Résultats de {from} à {to} pour {size} résultats
    </span>
);

const defaultSorted = [{
    dataField: 'updated_at',
    order: 'asc'
}];

const RemoteAll = ({ data, columns, page, sizePerPage, onTableChange, totalSize }) => {

    const paginationOptions = {
        page: page,
        sizePerPage: sizePerPage,
        totalSize: totalSize,
        paginationSize: 5,
        pageStartIndex: 1,
        firstPageText: 'Début',
        prePageText: 'Précédent',
        nextPageText: 'Suivant',
        lastPageText: 'Dernier',
        nextPageTitle: 'Prémière page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Page suivante',
        lastPageTitle: 'Dernière page',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        sizePerPageRenderer: sizePerPageRenderer
    };

    return <div>
        <BootstrapTable
            remote
            keyField="id"
            data={data}
            columns={columns}
            defaultSorted={defaultSorted}
            filter={filterFactory()}
            pagination={paginationFactory(paginationOptions)}
            // cellEdit={cellEditFactory(cellEditProps)}
            onTableChange={onTableChange}
        />
    </div>
};

RemoteAll.propTypes = {
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    totalSize: PropTypes.number.isRequired,
    sizePerPage: PropTypes.number.isRequired,
    onTableChange: PropTypes.func.isRequired
};

class PaginatedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: props.page,
            data: props.data,
            columns: props.columns,
            totalSize: props.totalSize,
            sizePerPage: props.sizePerPage,
            loading: false
        };
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    handleTableChange = (type, { page, sizePerPage }) => {
        // change table here
        this.props.onRefreshTableData(page, sizePerPage);
    }

    render() {
        const { data, sizePerPage, page, columns } = this.state;

        return (
            <RemoteAll
                data={data}
                page={page}
                columns={columns}
                sizePerPage={sizePerPage}
                totalSize={this.state.totalSize}
                onTableChange={this.handleTableChange}
            />
        );
    }
}

PaginatedList.propTypes = {
    page: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    totalSize: PropTypes.number.isRequired,
    sizePerPage: PropTypes.number.isRequired,
    onRefreshTableData: PropTypes.func.isRequired
}

export default PaginatedList;
