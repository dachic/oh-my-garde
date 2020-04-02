import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Table, Badge, Button } from 'reactstrap';
import { DateTime } from 'luxon';

import PageTitle from '../../../components/PageTitle';
import internshipApi from '../../../api/internship';

class AllInternships extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: '',
      intershipsList: []
    };
  }

  loadInternships() {
    internshipApi.getUsersInternships().then(interships => {
      this.setState({ intershipsList: interships });
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
                  {this.state.intershipsList ?
                    this.state.intershipsList.map((record, index) => {
                      return (
                        <tr key={index} className="text-center">
                          <th scope="row">{record.id}</th>
                          <td>{record.position}</td>
                          <td>{record.hospital}</td>
                          <td>{record.agrement.length > 1 ?
                            record.agrement.map((agr, index) => {
                              return <Badge color={`soft-${agr.color}`} key={index} className="mr-1">{agr.name}</Badge>
                            }) : record.agrement.name}</td>
                          <td>{DateTime.fromISO(record.creation).toSQLDate().toString()}</td>
                          <td>
                            <Button href={`/internship/edit?id=${record.id}`} color="outline-primary" key={index}>
                              Modifier
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                    : <td> Aucun stage trouvé</td>}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment >
  }
}

export default AllInternships;
