import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import Select from 'react-select';
import { getLoggedInUser } from '../../../helpers/authUtils';

import PageTitle from '../../../components/PageTitle';
import hospitalApi from '../../../api/hospital';
import agrementApi from '../../../api/agrement';
import internshipApi from '../../../api/internship';

class AddInternship extends Component {
  constructor(props) {
    super(props);
    const loggedInUser = getLoggedInUser();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      status: '',
      pharmaciesOptions: {},
      agrementsOptions: {},
      agrements: [],
      selectedAgrements: [],
      hospital: '',
      selectedPharmacy: '',
      errorSelect: {},
      errorApi: '',
      user: `api/users/${loggedInUser.id}`
    };
  }

  handleSubmit(event, errors, values) {
    this.setState({ errors, values });

    if (!errors.length) {
      if (!this.state.agrements.length) {
        this.setState({ errorSelect: { agrement: "vous devez sélectionner au moins un argument" } });
        return;
      }
      else if (this.state.hospital === '') {
        this.setState({ errorSelect: { hospital: "vous devez sélectionner un hôpital" } });
        return;
      }
      else {
        let form = this.state.values;
        let agrements = this.state.agrements;
        let hospital = this.state.hospital;
        form.user = this.state.user;
        form.agrements = agrements;
        form.hospital = hospital;
        form = JSON.stringify(form, null, 2);
        internshipApi.add(form).then(pharmacy => {
          document.getElementById("internship-form").reset();
          this.setState({ status: 'Le stage a bien été ajouté' });
        }).catch((error) => {
          this.setState({ errorApi: error.error });
        });
      }
    }
  }

  loadPharmaciesFromServer() {
    hospitalApi.getAll().then(pharmacyList => {
      let options = [];
      Object.keys(pharmacyList).forEach(function (key) {
        options.push({ value: pharmacyList[key]['id'], label: pharmacyList[key]['name'] });
      });
      this.setState({ pharmaciesOptions: options });
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
      this.setState({ agrementsOptions: options });
    }).catch((error) => {
      console.log(error);
      this.setState({ pharmaciesOptions: { value: 0, label: "Aucun agrément trouvé" } });
    });
  }

  handleSelectedAgrement = e => {
    let tab = [];
    if (e) {
      this.setState({
        errorSelect: {}
      });
      Object.keys(e).forEach(function (key) {
        tab.push(`api/agrements/${e[key]['value']}`);
      });
      this.setState({ agrements: tab, selectedAgrements: e });
    } else {
      this.setState({ errorSelect: { agrement: "vous devez sélectionner au moins un argument" }, agrements: [], selectedAgrements: e });
    }
  }

  handleSelectedPharmacy = e => {
    if (e) {
      this.setState({ hospital: `api/hospitals/${e.value}`, selectedPharmacy: e, errorSelect: {} });
    } else {
      this.setState({ hospital: '', errorSelect: { hospital: "vous devez sélectionner un hôpital" }, selectedPharmacy: e });
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
            title={'Mes stages'}
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
              <AvForm onSubmit={this.handleSubmit} id="internship-form">
                <AvGroup>
                  <Label for="position">Intitulé du poste *</Label>
                  <div className="input-group">
                    <AvInput type="text" name="position" required />
                    <AvFeedback>Champ incorrect/requis.</AvFeedback>
                  </div>
                </AvGroup>
                <div style={{ marginBottom: '15px' }}>
                  <Label for="pharmacy">Hôpital dans lequel le stage a été effectué *</Label>
                  <Select
                    name="pharmacy"
                    options={this.state.pharmaciesOptions}
                    defaultValue={{ label: "L'hôpital ne figure pas dans la liste", value: 0 }}
                    className="react-select"
                    placeholder="Choisir un hôpital"
                    value={this.state.selectedPharmacy}
                    onChange={this.handleSelectedPharmacy}
                    classNamePrefix="react-select"></Select>
                  {this.state.errorSelect &&
                    <p className="is-invalid" style={{ color: 'red' }}>{this.state.errorSelect.hospital}</p>}
                </div>

                <div>
                  <Label for="agrements" style={this.state.errorSelect && { border: 'red' }}>Agréments *</Label>
                  <Select
                    name="agrements"
                    isMulti={true}
                    options={this.state.agrementsOptions ? this.state.agrementsOptions :
                      { value: 0, label: "Aucun agrément trouvé" }}
                    className="react-select"
                    styles={this.state.errorSelect && { border: '1px solid red' }}
                    placeholder="Choisir des agréments"
                    value={this.state.selectedAgrements}
                    onChange={this.handleSelectedAgrement}
                    classNamePrefix="react-select"></Select>
                  {this.state.errorSelect &&
                    <p className="is-invalid" style={{ color: 'red' }}>{this.state.errorSelect.agrement}</p>}
                </div>
                <Button color="primary" type="submit">
                  Ajouter le stage
                </Button>
              </AvForm>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment >
  }
}

export default AddInternship;
