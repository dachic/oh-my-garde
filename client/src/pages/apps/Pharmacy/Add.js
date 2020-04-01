import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../../components/PageTitle';
import Api from '../../../api/hospital';
class Add extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      status: ''
    };
  }

  handleSubmit(event, errors, values) {
    this.setState({ errors, values });

    // API Call
    if (!errors.length) {
      // TODO: Add logged in user's id to form (representative: the entire user entity)
      let form = JSON.stringify(this.state.values, null, 2);
      console.log(form);
      Api.add(form).then(pharmacy => {
        console.log(pharmacy);
        this.setState({ status: 'La pharmacie a bien été ajoutée', name: '', hospitalName: '', email: '', phoneNumber: '' });
      }).catch((error) => {
        console.log(error);
      });
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
        {this.state.status &&
          <Col md={12}>
            <div className="mt-2 p-2">
              <div className="alert alert-success" role="alert" aria-label="Close">
                <strong>{this.state.status}</strong>
                <span aria-hidden="true">&times;</span>
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

                <AvGroup>
                  <Label for="hospitalName">Nom de l'hôpital relié *</Label>
                  <div className="input-group">
                    <AvInput type="text" name="hospitalName" required />
                    <AvFeedback>Champ incorrect/requis.</AvFeedback>
                  </div>
                </AvGroup>

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
        {this.state.values && <div>
          <h5>Submission values</h5>
          Invalid: {this.state.errors.join(', ')}<br />
          Values: <pre>{JSON.stringify(this.state.values, null, 2)}</pre>
        </div>}
      </Row>
    </React.Fragment>
  }
}


export default Add;
