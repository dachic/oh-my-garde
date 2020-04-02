import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import Select from 'react-select';
import { getLoggedInUser } from '../../../helpers/authUtils';

import PageTitle from '../../../components/PageTitle';
import Api from '../../../api/hospital';
class Add extends Component {
  constructor(props) {
    super(props);
    const loggedInUser = getLoggedInUser();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      status: '',
      hospitalsOptions: {},
      selectedHospital: '',
      errorSelect: {},
      errorApi: '',
      hospital: '',
      user: `api/users/${loggedInUser.id}`
    };
  }

  handleSubmit(event, errors, values) {
    this.setState({ errors, values });
    // API Call
    if (!errors.length) {
      if (this.state.hospital === '') {
        this.setState({ errorSelect: { hospital: "vous devez sélectionner un hôpital" } });
        return;
      }
      else {
        // TODO: Add logged in user's id to form (representative: the entire user entity)
        let form = this.state.values;
        let hospital = this.state.hospital;
        form.representative = this.state.user;
        form.hospital = hospital;
        form = JSON.stringify(form, null, 2);
        console.log(form);
        Api.addLinkedPharmacy(form).then(pharmacy => {
          this.setState({ status: 'La pharmacie a bien été ajoutée' });
        }).catch((error) => {
          console.log(error);
          this.setState({ errorApi: error.error });
        });
      }
    }
  }

  handleselectedHospital = e => {
    if (e) {
      this.setState({ hospital: `api/hospitals/${e.value}`, selectedHospital: e, errorSelect: {} });
    } else {
      this.setState({ hospital: '', errorSelect: { hospital: "vous devez sélectionner un hôpital" }, selectedHospital: e });
    }
  }

  loadPharmaciesFromServer() {
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

  componentDidMount() {
    this.loadPharmaciesFromServer();
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
            title={'Ajouter une nouvelle pharmacie'}
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
              <AvForm onSubmit={this.handleSubmit}>
                <AvGroup>
                  <Label for="name">Nom de la pharmacie *</Label>
                  <div className="input-group">
                    <AvInput type="text" name="name" required />
                    <AvFeedback>Champ incorrect/requis.</AvFeedback>
                  </div>
                </AvGroup>

                <div style={{ marginBottom: '15px' }}>
                  <Label for="hospital">Nom de l'hôpital relié *</Label>
                  <Select
                    name="hospital"
                    options={this.state.hospitalsOptions}
                    defaultValue={{ label: "L'hôpital ne figure pas dans la liste", value: 0 }}
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
                    <AvInput type="email" placeholder="Email" name="email" />
                    <AvFeedback>Champ incorrect/requis.</AvFeedback>
                  </div>
                </AvGroup>

                <AvGroup>
                  <Label for="phoneNumber">Numéro de téléphone (si défférent de celui du représent)</Label>
                  <div className="input-group">
                    <AvInput type="text" name="phoneNumber" />
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
        {/* {this.state.values && <div>
          <h5>Submission values</h5>
          Invalid: {this.state.errors.join(', ')}<br />
          Values: <pre>{JSON.stringify(this.state.values, null, 2)}</pre>
        </div>} */}
      </Row>
    </React.Fragment>
  }
}


export default Add;
