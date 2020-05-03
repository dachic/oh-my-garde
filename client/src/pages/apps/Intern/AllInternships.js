import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Table, Badge, Button, Spinner } from 'reactstrap';
import { DateTime } from 'luxon';

import PageTitle from '../../../components/PageTitle';
import internshipApi from '../../../api/internship';

class AllInternships extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: '',
      intershipsList: [],
      isloaded: false
    };
  }

  loadInternships() {
    internshipApi.getUsersInternships().then(interships => {
      this.setState({ intershipsList: interships, isloaded: true });
    }).catch((error) => {
      console.log(error);
    });
  }

  componentDidMount() {
    this.loadInternships();
  }

  render() {
    return <React.Fragment>
      <Row className="page-title">
        <Col md={12}>
          <PageTitle
            breadCrumbItems={[
              { label: 'Forms', path: '/forms/validation' },
              { label: 'Back', path: '/forms/validation', active: true },
            ]}
            title={'Liste de mes stages'}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              {!this.state.isloaded ?
                <div className="d-flex justify-content-center">
                  <Spinner key="2" className="m-2" color="primary" />
                </div> :
                <Table className="mb-0" responsive striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Intitulé du stage</th>
                      <th>Hôpital</th>
                      <th >Agréments</th>
                      <th className="text-center">Date de création</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.intershipsList.length ?
                      this.state.intershipsList.map((record, index) => {
                        return (
                          <tr key={index} className="text-center">
                            <th scope="row">{record.id}</th>
                            <td>{record.position}</td>
                            <td>{record.hospital}</td>
                            <td>{
                              record.agrement.map((agr, index) => {
                                return <Badge color={`soft-${agr.color}`} key={index} className="mr-1">{agr.name}</Badge>
                              })}
                            </td>
                            <td>{DateTime.fromISO(record.creation).toSQLDate().toString()}</td>
                            <td>
                              <Button href={`/internship/edit/${record.id}`} color="outline-primary" key={index}>
                                Modifier
                            </Button>
                            </td>
                          </tr>
                        );
                      })
                      : <tr>
                        <td colSpan="6" className="text-center">
                          <strong><p>Vous n'avez pas encore renseigné de stage.</p></strong>
                          <Button href={`/intern/internship/add`} color="outline-primary" key="1">
                            Ajouter un stage
                              </Button>
                        </td>
                      </tr>
                    }
                  </tbody>
                </Table>}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment >
  }
}

export default AllInternships;
