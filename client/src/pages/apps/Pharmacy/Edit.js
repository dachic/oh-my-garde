import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import Select from 'react-select';
import { getLoggedInUser } from '../../../helpers/authUtils';

import PageTitle from '../../../components/PageTitle';
import Api from '../../../api/hospital';
import pharmacyApi from '../../../api/pharmacy';

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
      pharmacyId: loggedInUser.pharmacy,
      currentPharmacy: {}
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
        console.log("not empty state");
        hospital = this.state.hospital;
      }
      else {
        hospital = `api/hospitals/${this.state.currentPharmacy.hospital.id}`;
      }

      form.representative = this.state.user;
      form.hospital = hospital;
      form = JSON.stringify(form, null, 2);
      console.log(form);
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
      this.setState({ hospitalsOptions: options });
    }).catch((error) => {
      this.setState({ hospitalsOptions: { value: 0, label: "Aucun hôpital trouvé" } });
    });
  }

  loadPharmacy() {
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
    }).catch((error) => {
      this.setState({ hospitalsOptions: { value: 0, label: "Aucun hôpital trouvé" } });
    });
  }

  componentDidMount() {
    this.loadPharmacy();
    this.loadHospitalsFromServer();
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
            title={'Mettre à jour ma pharmacie'}
          />
        </Col>
        {this.state.status &&
          <Col md={12}>
            <div className="mt-2 p-2">
              <div className="alert alert-success" role="alert" aria-label="Close">
                <strong>{this.state.status}</strong>
              </div>
            </div>
          </Col>}
        {this.state.errorApi &&
          <Col md={12}>
            <div className="mt-2 p-2">
              <div className="alert alert-danger" role="alert" aria-label="Close">
                <strong>{this.state.errorApi}</strong>
              </div>
            </div>
          </Col>}
      </Row>

      <Row>
        <Col lg={12}>
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
                  <Select
                    name="hospital"
                    options={this.state.hospitalsOptions}
                    className="react-select"
                    placeholder="Choisir un hôpital"
                    value={this.state.selectedHospital}
                    onChange={this.handleselectedHospital}
                    classNamePrefix="react-select"></Select>
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
          </Card>
        </Col>
      </Row>
    </React.Fragment >
  }
}


export default Edit;
