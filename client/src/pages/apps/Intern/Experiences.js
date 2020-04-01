import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import Select from 'react-select';

import PageTitle from '../../../components/PageTitle';
import pharmacyApi from '../../../api/pharmacy';
import agrementApi from '../../../api/agrement';
import internshipApi from '../../../api/internship';

class Add extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      status: '',
      pharmaciesOptions: {},
      agrementsOptions: {},
      agrements: [],
      selectedAgrements: [],
      pharmacy: '',
      selectedPharmacy: '',
      user: '',
      errorSelect: {},
    };
  }

  handleSubmit(event, errors, values) {
    this.setState({ errors, values });
    // API Call
    if (!errors.length) {
      let form = this.state.values;
      let agrements = this.state.agrements;
      let pharmacy = this.state.pharmacy;
      form.users = "api/users/2";
      form.agrements = agrements;
      form.pharmacy = pharmacy;
      console.log(form);
      form = JSON.stringify(form, null, 2);
      internshipApi.add(form).then(pharmacy => {
        console.log(pharmacy);
        this.setState({ status: 'Les expériences ont bien été ajoutées', position: '', pharmacy: '', selectedAgrements: '', agrements: '', selectedPharmacy: '' });
      }).catch((error) => {
        console.log(error);
      });
    }
  }


  loadPharmaciesFromServer() {
    pharmacyApi.getAll().then(pharmacyList => {
      let options = [];
      Object.keys(pharmacyList).forEach(function (key) {
        options.push({ value: pharmacyList[key]['id'], label: pharmacyList[key]['name'] });
      });
      this.setState({ pharmaciesOptions: options });
    }).catch((error) => {
      console.log(error);
    });
  }

  loadAgrementsFromServer() {
    agrementApi.getAll().then(pharmacyList => {
      let options = [];
      Object.keys(pharmacyList).forEach(function (key) {
        options.push({ value: pharmacyList[key]['id'], label: pharmacyList[key]['name'] });
      });
      this.setState({ agrementsOptions: options });
    }).catch((error) => {
      console.log(error);
    });
  }

  handleSelectedAgrement = e => {
    let tab = [];
    if (e) {
      Object.keys(e).forEach(function (key) {
        tab.push(`api/agrements/${e[key]['value']}`);
      });
      this.setState({ agrements: tab });
      this.setState({ selectedAgrements: e });
    } else {
      // TODO: color in red
      this.setState({ errorSelect: { agrement: "vous devez sélectionner au moins un argument" } });
      this.setState({ agrements: [] });
      this.setState({ selectedAgrements: e });
    }
  }

  handleSelectedPharmacy = e => {
    if (e) {
      this.setState({ pharmacy: `api/pharmacies/${e.value}` });
      this.setState({ selectedPharmacy: e });
    } else {
      this.setState({ pharmacy: '' });
      this.setState({ selectedPharmacy: e });
    }
  }

  componentDidMount() {
    this.loadPharmaciesFromServer();
    this.loadAgrementsFromServer();
  }

  render() {
    return <React.Fragment>
      <Row className="page-title">
        <Col md={12}>
          <PageTitle
            breadCrumbItems={[
              { label: 'Forms', path: '/forms/validation' },
              { label: '', path: '/forms/validation', active: true },
            ]}
            title={'Ajouter mes expériences'}
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
      </Row>

      <Row>
        {this.state.values && <div>
          <h5>Submission values</h5>
          Invalid: {this.state.errors.join(', ')}<br />
          Values: <pre>{JSON.stringify(this.state.values, null, 2)}</pre>
        </div>}
        <Col lg={12}>
          <Card>
            <CardBody>
              <h4 className="header-title mt-0 mb-1">Créer une garde</h4>
              <AvForm onSubmit={this.handleSubmit}>
                <AvGroup>
                  <Label for="position">Intitulé du poste *</Label>
                  <div className="input-group">
                    <AvInput type="text" name="position" required />
                    <AvFeedback>Champ incorrect/requis.</AvFeedback>
                  </div>
                </AvGroup>

                <Label for="pharmacy">Hôpital dans lequel le stage a été effectué</Label>
                <Select
                  name="pharmacy"
                  options={this.state.pharmaciesOptions}
                  defaultValue={{ label: "L'hôpital ne figure pas dans la liste", value: 0 }}
                  className="react-select"
                  placeholder="Choisir un hôpital"
                  value={this.state.selectedPharmacy}
                  onChange={this.handleSelectedPharmacy}
                  classNamePrefix="react-select"></Select>

                <Label for="agrements">Agréments *</Label>
                <Select
                  name="agrements"
                  isMulti={true}
                  options={this.state.agrementsOptions ? this.state.agrementsOptions :
                    { value: 0, label: "Aucun agrément trouvé" }}
                  className="react-select"
                  placeholder="Choisir des agréments"
                  value={this.state.selectedAgrements}
                  required
                  onChange={this.handleSelectedAgrement}
                  classNamePrefix="react-select"></Select>
                {this.state.errorSelect &&
                  <p className="av-invalid is-invalid">{this.state.errorSelect.agrement}</p>}
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

export default Add;
