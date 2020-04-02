import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Table, Badge, Button } from 'reactstrap';
import { getLoggedInUser } from '../../../helpers/authUtils';
import { DateTime } from 'luxon';

import internshipApi from '../../../api/internship';

class AllInternships extends Component {
  constructor(props) {
    super(props);
    const loggedInUser = getLoggedInUser();

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
      <Row style={{ marginTop: '15px' }}>
        <Col lg={12}>
          <Card>
            <CardBody>
              <h4 className="header-title mt-0 mb-1">Liste des stages</h4>

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
                          <td><Button color="outline-primary" key={index}>Modifier</Button></td>
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
