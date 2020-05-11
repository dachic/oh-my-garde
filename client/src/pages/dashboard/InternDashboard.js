import React, { Component } from 'react'
import { Row, Col, Table, Card, CardBody, Spinner, Badge, Button } from 'reactstrap';
import { DateTime } from "luxon";

import guardApi from '../../api/guard';
import { getLoggedInUser } from '../../helpers/authUtils';
import { formatDateForTable } from '../../helpers/dateUtils';

export default class InternDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: getLoggedInUser(),
      upcomingGuardsList: {},
      pendingGuardsList: {},
      isloaded:
      {
        upcomingGuards: false,
        pendingGuards: false
      },
      colors: ['primary', 'success', 'danger', 'warning', 'info']
    };
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

  loadGuards() {
    guardApi.getAll('intern').then(guards => {
      let optionsPending = []
      let optionsUpcoming = []
      guards.forEach(guard => {
        switch (guard.status) {
          case 'pending':
            optionsPending.push(guard);
            break;
          case 'accepted':
            let duration = DateTime.fromISO(guard.date).diffNow()
            if (duration > 0)
              optionsUpcoming.push(guard);
            break;
          default:
            break;
        }
      });
      this.setState({ pendingGuardsList: optionsPending, upcomingGuardsList: optionsUpcoming, isloaded: { ...this.state.isloaded, upcomingGuards: true } });
    }).catch((error) => {
      console.log(error);
      this.setState({ isloaded: true });
    });
  }

  componentDidMount() {
    this.loadGuards();
    this.shuffle(this.state.colors);
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm={8} xl={12} className='mb-3'>
            <Card>
              <CardBody>
                <h5 className="card-title mt-0 mb-0 header-title">Prochaines gardes</h5>
                {!this.state.isloaded.upcomingGuards ?
                  <div className="d-flex justify-content-center">
                    <Spinner key="2" className="m-2" color="primary" />
                  </div> :
                  <Table className="mb-0" responsive striped>
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">Poste</th>
                        <th className="text-center">Pharmacie</th>
                        <th>Agréments</th>
                        <th className="text-center">Horaires</th>
                      </tr>
                    </thead>

                    <tbody>
                      {this.state.upcomingGuardsList.length ?
                        this.state.upcomingGuardsList.map((record, index) => {
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
                            </tr>
                          );
                        })
                        : <tr>
                          <td colSpan="8" className="text-center">
                            <strong><p>Vous n'avez pas de gardes à venir.</p></strong>
                          </td>
                        </tr>}
                    </tbody>
                  </Table>}
              </CardBody>
            </Card>
          </Col>
          <Col sm={8} xl={12}>
            <Card>
              <CardBody>
                <h5 className="card-title mt-0 mb-0 header-title">Guardes en attente d'acceptation</h5>
                {!this.state.isloaded.upcomingGuards ?
                  <div className="d-flex justify-content-center">
                    <Spinner key="2" className="m-2" color="primary" />
                  </div> :
                  <Table className="mb-0" responsive striped>
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">Poste</th>
                        <th className="text-center">Pharmacie</th>
                        <th>Agréments</th>
                        <th className="text-center">Horaires</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {this.state.pendingGuardsList.length ?
                        this.state.pendingGuardsList.map((record, index) => {
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
                              <td>{this.formatDay(record.day)} {this.dateToFr(record.date)}  / {record.hour.name}</td>
                              <td>
                                <Button href={`/guard/confirm/${this.state.user.id}/${record.id}`} color="outline-primary" key="1">
                                  Accepter
                                </Button>
                              </td>
                            </tr>
                          );
                        })
                        : <tr>
                          <td colSpan="8" className="text-center">
                            <strong><p>Vous n'avez pas de gardes en attente.</p></strong>
                          </td>
                        </tr>}
                    </tbody>
                  </Table>}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
