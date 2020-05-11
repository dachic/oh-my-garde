import React, { Component } from 'react'
import { Row, Col, Card, CardBody, Table, Badge, Spinner } from 'reactstrap';

import PageTitle from '../../../components/PageTitle';
import guardApi from '../../../api/guard';
import { formatDateForTable } from '../../../helpers/dateUtils';

class GuardList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: '',
      guardsList: [],
      isloaded: false,
      colors: ['primary', 'success', 'danger', 'warning', 'info']
    };
  }

  loadGuards() {
    guardApi.getAll('intern').then(guards => {
      this.setState({ guardsList: guards, isloaded: true });
    }).catch((error) => {
      console.log(error);
      this.setState({ isloaded: true });
    });
  }

  formatDay(day) {
    switch (day) {
      case 'monday':
        return 'Lundi';
      case 'tuesday':
        return 'Mardi';
      case 'wednesday':
        return 'Mercredi';
      case 'thursday':
        return 'Jeudi';
      case 'friday':
        return 'Vnedredi';
      case 'saturday':
        return 'Samedi';
      case 'sunday':
        return 'Dimanche';
      default:
        return '';
    }
  }

  dateToFr(date) {
    return formatDateForTable(date);
  }

  formatStatus(day) {
    switch (day) {
      case 'pending':
        return 'En attente';
      case 'accepted':
        return 'Accepté';
      case 'canceled':
        return 'Annulé';
      default:
        return '';
    }
  }

  shuffle(arr) {
    let i,
      j,
      temp;
    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };

  componentDidMount() {
    this.loadGuards();
    this.shuffle(this.state.colors);
  }

  render() {
    return (
      <React.Fragment>
        <Row className="page-title">
          <Col md={12}>
            <PageTitle
              breadCrumbItems={[]}
              title={'Liste de mes gardes'}
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
                        <th>Poste</th>
                        <th>Pharmacie</th>
                        <th >Agréments</th>
                        <th className="text-center">Horaires</th>
                        <th className="text-center">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {this.state.guardsList.length ?
                        this.state.guardsList.map((record, index) => {
                          return (
                            <tr key={index} className="text-center">
                              <th scope="row">{record.id}</th>
                              <td>{record.job.title}</td>
                              <td>{record.pharmacy.name}</td>
                              <td>{
                                record.agrements.map((agr, index) => {
                                  return <Badge color={`soft-${this.state.colors[2]}`} key={index} className="mr-1">{agr.name}</Badge>
                                })}
                              </td>
                              <td>{this.formatDay(record.day)} {this.dateToFr(record.date)} / {record.hour.name}</td>
                              <td>{this.formatStatus(record.status)}</td>
                            </tr>
                          );
                        })
                        : <tr>
                          <td colSpan="8" className="text-center">
                            <strong><p>Vous n'avez pas encore effectué de gardes.</p></strong>
                          </td>
                        </tr>}
                    </tbody>
                  </Table>}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment >
    )
  }
}
export default GuardList;
