import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button, Label, FormGroup } from 'reactstrap';
import { AvForm, AvGroup } from 'availity-reactstrap-validation';

import PageTitle from '../../../components/PageTitle';
import Api from '../../../api/guard';
import { getLoggedInUser } from '../../../helpers/authUtils';

import Select from 'react-select';

const options = [
    { value: 'monday', label: 'Lundi' },
    { value: 'tuesday', label: 'Mardi' },
    { value: 'wednesday', label: 'Mercredi' },
    { value: 'thursday', label: 'Jeudi' },
    { value: 'friday', label: 'Vendredi' },
    { value: 'saturday', label: 'Samedi' },
    { value: 'sunday', label: 'Dimanche' }
];

class Add extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            status: '',
            pharmacies: [],
            hours: [],
            jobs: [],
            aggrements: [],
            day: null,
            hour: null,
            pharmacy: null,
            job: null
        };
    }

    handleChangeDay = day => {
        this.setState(
            { day },
            () => console.log(`Option selected:`, this.state.day.value)
        );
    };

    handleChangeJob = job => {
        this.setState(
            { job },
            () => console.log(`Option selected:`, this.state.job.value)
        );
    };

    handleChangePharmacy = pharmacy => {
        this.setState(
            { pharmacy },
            () => console.log(`Option selected:`, this.state.pharmacy.value)
        );
    };

    handleChangeHour = hour => {
        this.setState(
            { hour },
            () => console.log(`Option selected:`, this.state.hour.value)
        );
    };

    handleChangeAggrements = aggrement => {
        this.setState(
            { aggrement }
        );
    };

    componentDidMount() {
        const loggedInUser = getLoggedInUser();
        var url = new URL(process.env.REACT_APP_API_URL + "/pharmacies");
        url.search = new URLSearchParams({
            'hospital.region.id': 1,
        })
        var opt = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser.token
            }
        };
        fetch(url, opt).then((response) => {
            return response.json()
        }).then(pharmacies => {
            const opts = [];
            pharmacies.forEach(pharmacy => {
                opts.push({ value: pharmacy.id, label: pharmacy.name })
            });

            this.setState({
                pharmacies: opts
            })
        })


        var url2 = new URL(process.env.REACT_APP_API_URL + "/disponibility_hours");
        var opt2 = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser.token
            }
        };
        fetch(url2, opt2).then((response) => {
            return response.json()
        }).then(hours => {
            const opts = [];
            hours.forEach(hour => {
                opts.push({ value: hour.id, label: hour.name })
            });

            this.setState({
                hours: opts
            })
        })

        var url3 = new URL(process.env.REACT_APP_API_URL + "/jobs");
        var opt3 = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser.token
            }
        };
        fetch(url3, opt3).then((response) => {
            return response.json()
        }).then(jobs => {
            const opts = [];
            jobs.forEach(job => {
                opts.push({ value: job.id, label: job.title })
            });

            this.setState({
                jobs: opts
            })
        })

        var url4 = new URL(process.env.REACT_APP_API_URL + "/agrements");
        var opt4 = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser.token
            }
        };
        fetch(url4, opt4).then((response) => {
            return response.json()
        }).then(aggrements => {
            const opts = [];
            aggrements.forEach(agrement => {
                opts.push({ value: agrement.id, label: agrement.name })
            });

            this.setState({
                aggrements: opts
            })
        })
    }

    handleSubmit(event, errors, values) {
        this.setState({ errors, values });

        // API Call
        if (!errors.length) {
            let form = JSON.stringify(
                {
                    'day': this.state.day.value,
                    'hour': 'api/disponibility_hours/' + this.state.hour.value,
                    'pharmacy': 'api/pharmacies/' + this.state.pharmacy.value,
                    'job': 'api/jobs/' + this.state.job.value,
                    'agrements': ['api/agrements/' + this.state.aggrement.value],
                }, null, 2);

            Api.add(form).then(guard => {
                this.setState({ status: 'La garde a bien été ajoutée', hour: null, day: null, pharmacy: null, job: null, aggrement: null });
                this.props.history.push('/guards/matching/' + guard.id);
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    render() {
        const { day } = this.state;
        const { pharmacy } = this.state;
        const { hour } = this.state;
        const { job } = this.state;
        const { aggrement } = this.state

        return <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Forms', path: '/forms/validation' },
                            { label: '', path: '/forms/validation', active: true },
                        ]}
                        title={'Ajouter une nouvelle garde'}
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


                                <AvGroup className="mb-3">
                                    <FormGroup>
                                        <Label for="roleUser">Pharmacie *</Label>
                                        <Select
                                            placeholder="Choisir une pharmacie"
                                            isSearchable="true"
                                            name="pharmacy"
                                            value={pharmacy}
                                            onChange={this.handleChangePharmacy}
                                            options={this.state.pharmacies}
                                            required
                                        />
                                    </FormGroup>
                                </AvGroup>

                                <AvGroup className="mb-3">
                                    <FormGroup>
                                        <Label for="roleUser">Jour *</Label>
                                        <Select
                                            placeholder="Choisir un jour"
                                            isSearchable="true"
                                            name="day"
                                            value={day}
                                            onChange={this.handleChangeDay}
                                            options={options}
                                            required
                                        />
                                    </FormGroup>
                                </AvGroup>

                                <AvGroup className="mb-3">
                                    <FormGroup>
                                        <Label for="roleUser">Créneau horaire *</Label>
                                        <Select
                                            placeholder="Choisir un créneau"
                                            isSearchable="true"
                                            name="hour"
                                            value={hour}
                                            onChange={this.handleChangeHour}
                                            options={this.state.hours}
                                            required
                                        />
                                    </FormGroup>
                                </AvGroup>

                                <AvGroup className="mb-3">
                                    <FormGroup>
                                        <Label for="roleUser">Poste *</Label>
                                        <Select
                                            placeholder="Choisir un poste"
                                            isSearchable="true"
                                            name="job"
                                            value={job}
                                            onChange={this.handleChangeJob}
                                            options={this.state.jobs}
                                            required
                                        />
                                    </FormGroup>
                                </AvGroup>

                                <AvGroup className="mb-3">
                                    <FormGroup>
                                        <Label for="roleUser">Agréments *</Label>
                                        <Select
                                            placeholder="Choisir un aggrement"
                                            isSearchable="true"
                                            name="job"
                                            value={aggrement}
                                            onChange={this.handleChangeAggrements}
                                            options={this.state.aggrements}
                                            required
                                        />
                                    </FormGroup>
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
