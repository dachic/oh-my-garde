import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, UncontrolledAlert, Spinner } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import Select from 'react-select';
import { getLoggedInUser } from '../../../helpers/authUtils';

import PageTitle from '../../../components/PageTitle';
import Api from '../../../api/hospital';
import pharmacyApi from '../../../api/pharmacy';
import userApi from '../../../api/user';

class Edit extends Component {
  constructor(props) {
    super(props);
    const loggedInUser = getLoggedInUser();
    console.log(loggedInUser.token);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      status: '',
      hospitalsOptions: {},
      selectedHospital: '',
      errorSelect: {},
      errorApi: '',
      hospital: '',
      user: `api/users/${loggedInUser.id}`,
      pharmacyId: '',
      currentPharmacy: {},
      isPharmacyLoaded: false,
      areHospitalsLoaded: false
    };
  }

  handleSubmit(event, errors, values) {
    this.setState({ errors, values });
    // API Call
    if (!errors.length) {
      let form = this.state.values;
      let hospital = this.state.hospital;

      // hospital
      if (this.state.hospital !== '') {
        hospital = this.state.hospital;
      }
      else {
        hospital = `api/hospitals/${this.state.currentPharmacy.hospital.id}`;
      }

      form.representative = this.state.user;
      form.hospital = hospital;
      form = JSON.stringify(form, null, 2);
      pharmacyApi.updateSpecific(form, this.state.pharmacyId).then(pharmacy => {
        document.getElementById("pharmacy-form").reset();
        this.setState({ status: 'Les informations de la pharmacie ont bien été mises à jour' });
      }).catch((error) => {
        console.log(error);
        this.setState({ errorApi: error.error });
      });
    }
  }

  handleselectedHospital = e => {
    if (e) {
      console.log(e.value);
      this.setState({
        hospital: `api/hospitals/${e.value}`, selectedHospital: e
      });
    }
  }

  loadHospitalsFromServer() {
    Api.getAll().then(pharmacyList => {
      let options = [];
      Object.keys(pharmacyList).forEach(function (key) {
        options.push({ value: pharmacyList[key]['id'], label: pharmacyList[key]['name'] });
      });
      this.setState({ hospitalsOptions: options, areHospitalsLoaded: true });
    }).catch((error) => {
      this.setState({ hospitalsOptions: { value: 0, label: "Aucun hôpital trouvé" } });
    });
  }

  loadPharmacy() {
    userApi.getPharmacy(this.state.pharmacyId).then(pharmacy => {
      this.setState({
        pharmacyId: pharmacy.pharmacyId,
        isPharmacyLoaded: true
      });
      if (pharmacy.pharmacyId !== '') {
        pharmacyApi.getSpecific(this.state.pharmacyId).then(pharmacy => {
          this.setState({
            selectedHospital: { label: pharmacy.hospital.name, value: pharmacy.hospital.id },
            currentPharmacy: {
              name: pharmacy.name,
              email: pharmacy.email,
              phone: pharmacy.phone,
              hospital: pharmacy.hospital
            }
          });
          this.loadHospitalsFromServer();
        }).catch((error) => {
          this.setState({ hospitalsOptions: { value: 0, label: "Aucun hôpital trouvé" } });
        });
      }
    }).catch((error) => {
      this.setState({ pharmacyId: '' });
    });
  }

  componentDidMount() {
    this.loadPharmacy();
  }

  render() {
    return <React.Fragment >
      <Row className="page-title">
        <Col md={12}>
          <PageTitle
            breadCrumbItems={[
              { label: 'Forms', path: '/forms/validation' },
              { label: '', path: '/forms/validation', active: true },
            ]}
            title={'Mettre à jour les inforlations de ma pharmacie'}
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
      {!this.state.isPharmacyLoaded ?
        <div className="d-flex justify-content-center">
          <Spinner key="2" className="m-2" color="primary" />
        </div> :

        <Row>
          <Col lg={12}>
            {this.state.pharmacyId ?
              <Card>
                <CardBody>
                  <AvForm onSubmit={this.handleSubmit} id="pharmacy-form">
                    <AvGroup>
                      <Label for="name">Nom de la pharmacie *</Label>
                      <div className="input-group">
                        <AvInput type="text" name="name" value={this.state.currentPharmacy.name} required />
                        <AvFeedback>Champ incorrect/requis.</AvFeedback>
                      </div>
                    </AvGroup>

                    <div style={{ marginBottom: '15px' }}>
                      <Label for="hospital">Nom de l'hôpital relié *</Label>
                      {!this.state.areHospitalsLoaded ?
                        <div>
                          <Spinner key="2" className="m-2" color="primary" />
                        </div> :
                        <Select
                          name="hospital"
                          options={this.state.hospitalsOptions}
                          className="react-select"
                          placeholder="Choisir un hôpital"
                          value={this.state.selectedHospital}
                          onChange={this.handleselectedHospital}
                          classNamePrefix="react-select"></Select>
                      }
                      {this.state.errorSelect &&
                        <p className="is-invalid" style={{ color: 'red' }}>{this.state.errorSelect.hospital}</p>}
                    </div>

                    <AvGroup>
                      <Label for="email">Adresse email (si défférente de celle du représent)</Label>
                      <div className="input-group">
                        <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                        <AvInput type="email" placeholder="Email" name="email" value={this.state.currentPharmacy.email} />
                        <AvFeedback>Champ incorrect/requis.</AvFeedback>
                      </div>
                    </AvGroup>

                    <AvGroup>
                      <Label for="phoneNumber">Numéro de téléphone (si défférent de celui du représent)</Label>
                      <div className="input-group">
                        <AvInput type="text" name="phoneNumber" value={this.state.currentPharmacy.phone} />
                        <AvFeedback>Champ incorrect/requis.</AvFeedback>
                      </div>
                    </AvGroup>
                    <Button color="primary" type="submit">
                      Ajouter
                </Button>
                  </AvForm>
                </CardBody>
              </Card> :
              <Col md={8} className="mx-auto">
                <Card className="text-center">
                  <CardBody>
                    <div>
                      <strong><p>Vous n'avez pas encore créé de pharmacie</p></strong>
                      <div className="mt-3">
                        <Button href={`/pharmacy/add`} color="outline-primary" key="1">
                          Ajouter une pharmacie
                      </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>}
          </Col>
        </Row>}
    </React.Fragment >
  }
}

export default Edit;
