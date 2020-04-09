import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, UncontrolledAlert, Spinner } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import Select from 'react-select';
import { getLoggedInUser, setLoggedInUser } from '../../../helpers/authUtils';

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
            userRelation: `api/users/${loggedInUser.id}`,
            user: loggedInUser,
            areHospitalsLoaded: false
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
                let form = this.state.values;
                let hospital = this.state.hospital;
                form.representative = this.state.userRelation;
                form.hospital = hospital;
                form = JSON.stringify(form, null, 2);
                Api.addLinkedPharmacy(form).then(pharmacy => {
                    this.setState({
                        status: 'La pharmacie a bien été ajoutée',
                        user: { ...this.state.user, pharmacy: pharmacy.id }
                    });
                    setLoggedInUser(this.state.user);
                    document.getElementById("pharmacy-form").reset();
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
            this.setState({ hospitalsOptions: options, areHospitalsLoaded: true });
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

            <Row>
                <Col lg={12}>
                    <Card>
                        <CardBody>
                            <AvForm onSubmit={this.handleSubmit} id="pharmacy-form">
                                <AvGroup>
                                    <Label for="name">Nom de la pharmacie *</Label>
                                    <div className="input-group">
                                        <AvInput type="text" name="name" required />
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
                                            defaultValue={{ label: "L'hôpital ne figure pas dans la liste", value: 0 }}
                                            className="react-select"
                                            placeholder="Choisir un hôpital"
                                            value={this.state.selectedHospital}
                                            onChange={this.handleselectedHospital}
                                            classNamePrefix="react-select"></Select>}
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
            </Row>
        </React.Fragment>
    }
}


export default Add;
