import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../../components/PageTitle';

class Add extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {};
  }


  handleSubmit(event, errors, values) {
    event.preventDefault();

    if (errors) {
      this.setState({ errors, values });
    }
    else {
      // API Call
    }
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
      </Row>

      <Row>
        <Col lg={6}>
          <Card>
            <CardBody>
              <h4 className="header-title mt-0 mb-1">Informations sur la pharmacie</h4>
              <AvForm onSubmit={this.handleSubmit}>

                <AvGroup>
                  <Label for="hospitalName">Nom de l'hôpital relié</Label>
                  <div className="input-group">
                    <AvInput type="text" name="hospitalName" required />
                    <AvFeedback>Champ incorrect.</AvFeedback>
                  </div>
                </AvGroup>

                <AvGroup>
                  <Label for="email">Adresse email</Label>
                  <div className="input-group">
                    <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                    <AvInput type="email" placeholder="Email" name="email" required />
                    <AvFeedback>Champ incorrect.</AvFeedback>
                  </div>
                </AvGroup>

                <AvGroup>
                  <Label for="phoneNumber">Numéro de téléphone</Label>
                  <div className="input-group">
                    <AvInput type="text" name="phoneNumber" required />
                    <AvFeedback>Champ incorrect.</AvFeedback>
                  </div>
                </AvGroup>
                <Button color="primary" type="submit">
                  Ajouter
                </Button>
              </AvForm>
            </CardBody>
          </Card>
        </Col>
        {this.state.values && <div>
          <h5>Submission values</h5>
          Invalid: {this.state.errors.join(', ')}<br />
          Values: <pre>{JSON.stringify(this.state.values, null, 2)}</pre>
        </div>}
        <Col lg={6}>
          <Card>
            <CardBody>
              <h4 className="header-title mt-0 mb-1">Besoins</h4>
              <AvForm>
                <AvField name="hospitalName" label="Nom de l'hôpital relié" type="text" required />

                <AvGroup>
                  <Label for="email">Email</Label>
                  <div className="input-group">
                    <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                    <AvInput placeholder="Email" name="email" required />
                    <AvFeedback>Veuillez renseigner une adresse email.</AvFeedback>
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
    </React.Fragment>
  }
}


export default Add;
