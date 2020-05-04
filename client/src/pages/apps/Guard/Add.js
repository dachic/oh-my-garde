import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button, Label, FormGroup, Spinner, UncontrolledAlert } from 'reactstrap';
import { AvForm, AvGroup } from 'availity-reactstrap-validation';

import PageTitle from '../../../components/PageTitle';
import guardApi from '../../../api/guard';
import agrementApi from '../../../api/agrement';
import userApi from '../../../api/user';
import jobApi from '../../../api/job';
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
            pharmacy: [],
            hours: [],
            errorSelect: {},
            job: '',
            jobsOptions: {},
            selectedJob: '',
            agrements: [],
            agrementsOptions: [],
            selectedAgrements: [],
            areAgrementsLoaded: false,
            day: null,
            hour: null
        };
    }

    handleSubmit(event, errors, values) {
        this.setState({ errors, values });

        // API Call
        if (!errors.length) {
            if (this.state.job === '') {
                this.setState({ errorSelect: { job: "Vous devez sélectionner un poste" } });
                return;
            }
            else if (!this.state.agrements.length) {
                this.setState({ errorSelect: { agrement: "Vous devez sélectionner au moins un agrément" } });
                return;
            }
            else {
                let form = JSON.stringify(
                    {
                        ...this.state.values,
                        'agrements': this.state.agrements,
                        'job': this.state.job,
                        'pharmacy': `api/pharmacies/${this.state.pharmacy.id}`,
                        'day': this.state.day.value,
                        'hour': 'api/disponibility_hours/' + this.state.hour.value
                    }, null, 2);
                guardApi.add(form).then(guard => {
                    this.setState({ status: 'La garde a bien été ajoutée' });
                    this.props.history.push(`/guards/${guard.id}/matching/`);
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    };

    handleChangeDay = day => {
        this.setState(
            { day }
        );
    };

    handleChangeHour = hour => {
        this.setState(
            { hour }
        );
    };

    handleChangeAggrements = aggrement => {
        let tab = [];
        if (aggrement) {
            this.setState({
                errorSelect: {}
            });
            Object.keys(aggrement).forEach(function (key) {
                tab.push(`api/agrements/${aggrement[key]['value']}`);
            });
            this.setState({ agrements: tab, selectedAgrements: aggrement });
        } else {
            this.setState({ errorSelect: { agrement: "vous devez sélectionner au moins un argument" }, agrements: [], selectedAgrements: aggrement });
        }
    };

    loadAgrementsFromServer() {
        agrementApi.getAll().then(agrements => {
            let options = [];
            agrements.forEach(agrement => {
                options.push({ value: agrement.id, label: agrement.name })
            });
            this.setState({ agrementsOptions: options, areAgrementsLoaded: true });
        }).catch((error) => {
            console.log(error);
            this.setState({ agrementsOptions: { value: 0, label: "Aucun agrément trouvé" } });
        });
    };

    handleChangeJob = job => {
        if (job) {
            this.setState({ job: `api/jobs/${job.value}`, selectedJob: job, errorSelect: {} });
        } else {
            this.setState({ job: '', selectedJob: job });
        }
    };

    loadJobsFromServer() {
        jobApi.getAll().then(jobs => {
            let options = [];
            Object.keys(jobs).forEach(function (key) {
                options.push({ value: jobs[key]['id'], label: jobs[key]['title'] });
            });
            this.setState({ jobsOptions: options, areJobsLoaded: true });
        }).catch((error) => {
            console.log(error);
            this.setState({ jobsOptions: { value: 0, label: "Aucun agrément trouvé" } });
        });
    };

    loadPharmacyFromServer() {
        userApi.getPharmacy().then((pharmacy) => {
            this.setState({
                pharmacy: pharmacy.pharmacy
            })
        }).catch(error => {
            console.log(error);
        })
    };

    componentDidMount() {
        const loggedInUser = getLoggedInUser();

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

        this.loadPharmacyFromServer();
        this.loadJobsFromServer();
        this.loadAgrementsFromServer();
    }

    render() {
        const { day } = this.state;
        const { hour } = this.state;

        return <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[]}
                        title={'Ajouter une nouvelle garde'}
                    />
                </Col>
                {this.state.status &&
                    <Col md={12}>
                        <UncontrolledAlert color="success" key="1">
                            <strong>{this.state.status} </strong>
                        </UncontrolledAlert>
                    </Col>}
                {!this.state.pharmacy &&
                    <Col md={12} className='mt-3'>
                        <UncontrolledAlert color="secondary" key="1">
                            Vous devez ajouter une pharmacie avant de créer une demande de garde.
                            <div className="mt-3">
                                <Button href={`/pharmacy/add`} color="outline-success" key="1">
                                    Ajouter une pharmacie
                                </Button>
                            </div>
                        </UncontrolledAlert>
                    </Col>}
            </Row>

            <Row>
                <Col lg={12}>
                    <Card>
                        <CardBody>
                            <AvForm onSubmit={this.handleSubmit}>
                                <AvGroup className="mb-3">
                                    <FormGroup>
                                        <Label for="roleUser">Pharmacie</Label>
                                        {this.state.pharmacy ? <p>{this.state.pharmacy.name}</p> : <p>Aucune pharmacie ajoutée</p>}
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

                                <div style={{ marginBottom: '15px' }}>
                                    <Label for="roleUser">Poste *</Label>
                                    {!this.state.areJobsLoaded ?
                                        <div>
                                            <Spinner key="2" className="m-2" color="primary" />
                                        </div> :
                                        <Select
                                            name="job"
                                            options={this.state.jobsOptions}
                                            className="react-select"
                                            placeholder="Choisir un poste"
                                            value={this.state.selectedJob}
                                            onChange={this.handleChangeJob}
                                            classNamePrefix="react-select"
                                        />}
                                    {this.state.errorSelect &&
                                        <p className="is-invalid" style={{ color: 'red' }}>{this.state.errorSelect.job}</p>}
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
                                            options={this.state.agrementsOptions}
                                            className="react-select"
                                            styles={this.state.errorSelect}
                                            placeholder="Choisir des agréments"
                                            value={this.state.selectedAgrements}
                                            onChange={this.handleChangeAggrements}
                                            classNamePrefix="react-select"></Select>}
                                    {this.state.errorSelect &&
                                        <p className="is-invalid" style={{ color: 'red' }}>{this.state.errorSelect.agrement}</p>}
                                </div>
                                {this.state.pharmacy ?
                                    <Button color="primary" type="submit">
                                        Ajouter
                                </Button> :
                                    <Button color="primary" type="submit" disabled={true}>
                                        Ajouter
                                </Button>
                                }
                            </AvForm>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    }
}

export default Add;
