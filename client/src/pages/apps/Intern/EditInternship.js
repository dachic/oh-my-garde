import React, { Component } from 'react';
import { getLoggedInUser } from '../../../helpers/authUtils';
import { Row, Col, Card, CardBody, Button, Label, UncontrolledAlert, Spinner } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import Select from 'react-select';

import PageTitle from '../../../components/PageTitle';
import hospitalApi from '../../../api/hospital';
import agrementApi from '../../../api/agrement';
import internshipApi from '../../../api/internship';

class EditInternship extends Component {
  constructor(props) {
    super(props);
    const loggedInUser = getLoggedInUser();
    const { id } = props.match.params;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      status: '',
      pharmaciesOptions: {},
      agrementsOptions: {},
      agrements: [],
      selectedAgrements: [],
      hospital: '',
      selectedPharmacy: '',
      errorApi: '',
      user: `api/users/${loggedInUser.id}`,
      paramId: id,
      currentInternship: {},
      isInternshipLoaded: false,
      areHospitalsLoaded: false,
      areAgrementsLoaded: false
    };
  }

  handleSubmit(event, errors, values) {
    this.setState({ errors, values });

    if (!errors.length) {
      let form = this.state.values;
      let agrements = [];
      let hospital = '';
      // agrements
      if (this.state.agrements.length) {
        agrements = this.state.agrements;
      }
      else {
        let agrs = this.state.currentInternship.agrements;
        Object.keys(agrs).forEach(function (key) {
          agrements.push(`api/agrements/${agrs[key]['id']}`);
        });
      }
      // hospital
      if (this.state.hospital !== '') {
        hospital = this.state.hospital;
      }
      else {
        hospital = `api/hospitals/${this.state.currentInternship.hospital.id}`;
      }

      form.user = this.state.user;
      form.agrements = agrements;
      form.hospital = hospital;
      form = JSON.stringify(form, null, 2);
      internshipApi.add(form, 3).then(pharmacy => {
        this.setState({ status: 'Le stage a bien été mis à jour' });
      }).catch((error) => {
        this.setState({ errorApi: error.error });
      });
    }
  }
  handleSelectedAgrement = e => {
    let tab = [];
    if (e) {
      Object.keys(e).forEach(function (key) {
        tab.push(`api/agrements/${e[key]['value']}`);
      });
      this.setState({ agrements: tab, selectedAgrements: e });
    }
  }
  handleSelectedPharmacy = e => {
    if (e) {
      this.setState({
        hospital: `api/hospitals/${e.value}`, selectedPharmacy: e
      });
    }
  }

  loadPharmaciesFromServer() {
    hospitalApi.getAll().then(pharmacyList => {
      let options = [];
      Object.keys(pharmacyList).forEach(function (key) {
        options.push({ value: pharmacyList[key]['id'], label: pharmacyList[key]['name'] });
      });
      this.setState({ pharmaciesOptions: options, areHospitalsLoaded: true });
    }).catch((error) => {
      console.log(error.error);
      this.setState({ pharmaciesOptions: { value: 0, label: "Aucun hôpital trouvé" } });
    });
  }
  loadAgrementsFromServer() {
    agrementApi.getAll().then(pharmacyList => {
      let options = [];
      Object.keys(pharmacyList).forEach(function (key) {
        options.push({ value: pharmacyList[key]['id'], label: pharmacyList[key]['name'] });
      });
      this.setState({ agrementsOptions: options, areAgrementsLoaded: true });
    }).catch((error) => {
      this.setState({ pharmaciesOptions: { value: 0, label: "Aucun agrément trouvé" } });
    });
  }
  loadInternship() {
    internshipApi.getSpecific(this.state.paramId).then(internship => {
      let options = [];
      Object.keys(internship.agrement).forEach(function (key) {
        options.push({ value: internship.agrement[key]['id'], label: internship.agrement[key]['name'] });
      });
      this.setState({
        selectedPharmacy: { label: internship.hospital.name, value: internship.hospital.id },
        selectedAgrements: options,
        currentInternship: {
          position: internship.position,
          hospital: internship.hospital,
          agrements: internship.agrement
        },
        isInternshipLoaded: true
      });
      this.loadPharmaciesFromServer();
      this.loadAgrementsFromServer();
    }).catch((error) => { });
  }

  componentDidMount() {
    this.loadInternship();
  }

  render() {
    return <React.Fragment>
      <Row className="page-title">
        <Col md={12}>
          <PageTitle
            breadCrumbItems={[]}
            title={'Modifier les données de mon stage'}
          />
        </Col>
        {this.state.status &&
          <Col md={12} className="mt-2">
            <UncontrolledAlert color="success" key="1">
              <strong>{this.state.status} </strong>
            </UncontrolledAlert>
          </Col>}
        {this.state.errorApi &&
          <Col md={12}>
            <UncontrolledAlert color="danger" key="1">
              <strong>{this.state.errorApi} </strong>
            </UncontrolledAlert>
          </Col>}
      </Row>
      {!this.state.isInternshipLoaded ?
        <div className="d-flex justify-content-center">
          <Spinner key="2" className="m-2" color="primary" />
        </div> :
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                {this.state.currentInternship ?
                  <AvForm onSubmit={this.handleSubmit}>
                    <AvGroup>
                      <Label for="position">Intitulé du poste *</Label>
                      <div className="input-group">
                        <AvInput type="text" name="position" value={this.state.currentInternship.position} required />
                        <AvFeedback>Champ incorrect/requis.</AvFeedback>
                      </div>
                    </AvGroup>
                    <div style={{ marginBottom: '15px' }}>
                      <Label for="pharmacy">Hôpital dans lequel le stage a été effectué *</Label>
                      {!this.state.areHospitalsLoaded ?
                        <div>
                          <Spinner key="2" className="m-2" color="primary" />
                        </div> :
                        <Select
                          name="pharmacy"
                          options={this.state.pharmaciesOptions}
                          defaultValue={{ label: "L'hôpital ne figure pas dans la liste", value: 0 }}
                          className="react-select"
                          placeholder="Choisir un hôpital"
                          value={[this.state.selectedPharmacy]}
                          onChange={this.handleSelectedPharmacy}
                          classNamePrefix="react-select"></Select>}
                      {this.state.errorSelect &&
                        <p className="is-invalid" style={{ color: 'red' }}>{this.state.errorSelect.hospital}</p>}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <Label for="agrements" style={this.state.errorSelect && { border: 'red' }}>Agréments *</Label>
                      {!this.state.areAgrementsLoaded ?
                        <div>
                          <Spinner key="2" className="m-2" color="primary" />
                        </div> :
                        <Select
                          name="agrements"
                          isMulti={true}
                          options={this.state.agrementsOptions ? this.state.agrementsOptions :
                            { value: 0, label: "Aucun agrément trouvé" }}
                          value={this.state.selectedAgrements}
                          className="react-select"
                          styles={this.state.errorSelect && { border: '1px solid red' }}
                          placeholder="Choisir des agréments"
                          defaultValue={this.state.currentInternship.agrement}
                          onChange={this.handleSelectedAgrement}
                          classNamePrefix="react-select"></Select>}
                      {this.state.errorSelect &&
                        <p className="is-invalid" style={{ color: 'red' }}>{this.state.errorSelect.agrement}</p>}
                    </div>
                    <Button color="primary" type="submit">
                      Mettre à jour le stage
                    </Button>
                  </AvForm> :
                  <Col md={8} className="mx-auto">
                    <Card className="text-center">
                      <CardBody>
                        <div>
                          <strong><p>Nous n'avons pas trouvé le stage correspondant à la demande</p></strong>
                          <div className="mt-3">
                            <Button href={`/intern/internship/all`} color="outline-secondary" key="1">
                              Retour à la liste des stages
                          </Button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>}
              </CardBody>
            </Card>
          </Col>
        </Row>}
    </React.Fragment >
  }
}

export default EditInternship;
