import React, { useState, useEffect } from 'react';

import { Row, Col, Card, CardBody, Button, Label, FormGroup, InputGroup, UncontrolledAlert } from 'reactstrap';
import Select from 'react-select';
import userApi from '../../../api/user';

import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import PageTitle from '../../../components/PageTitle';
import Loader from '../../../components/Loader';
import regionApi from '../../../api/region';

const AddUser = (props) => {
    const statusLabels = {};
    statusLabels['enabled'] = 'Activé';
    statusLabels['disabled'] = 'Désactivé';

    const roleLabels = {
        'ROLE_ADMIN': 'Administrateur',
        'ROLE_PHARMACY': "Chef de Service",
        'ROLE_INTERN': "Interne"
    };

    const userInitial = {
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        password: 'x',
        region: '',
        role: '',
        status: 'disabled'
    }

    const [user, setUser] = useState(userInitial);
    const [alertColor, setAlertColor] = useState();
    const [alertMessage, setAlertMessage] = useState();
    const [hasMessage, setHasMessage] = useState(false);
    const [regions, setRegions] = useState(false);
    const [loader, setLoader] = useState(false);

    useEffect(() => { // ComponentDidMount
        regionApi.getAllRegions()
            .then(regions => {
                let rg = regions.map(region => {
                    return { value: region.id, label: region.name }
                });
                setRegions(rg)
            }).catch((error) => {
                setAlertMessage("Un erreur s'est produite lors de la recherche de l'utilisateur")
            })
    }, []);

    const changeStatus = ({ value }) => {
        user.status = value
        setUser(user)
    }

    const changeRegion = ({ value }) => {
        user.region = value
        setUser(user)
    }

    const changeRole = ({ value }) => {
        user.role = value
        setUser(user)
    }

    /**
     * Handles the submit
     */
    const handleValidSubmit = (event, values) => {
        setLoader(true);
        if (user !== null) {
            user.firstname = values.firstname;
            user.lastname = values.lastname;
            user.email = values.email;
            user.phoneNumber = values.phoneNumber;
            user.roles = [user.role]
            user.region = "/api/regions/" + user.region

            userApi.registerUser(user).then(response => {
                setAlertMessage("Les informations ont été correctement enregistrées")
                setAlertColor("success")
                setHasMessage(true)
                setLoader(false);
                setUser(userInitial)
                setTimeout(() => {
                    setHasMessage(false)
                }, 3000)
            }).catch(error => {
                console.log(error, 'ici error')
            })
        }
    }

    if (!regions || loader) {
        return <Loader />;
    }

    return (
        <React.Fragment>
            <AvForm onValidSubmit={(event, values) => handleValidSubmit(event, values)} className="user-editt-form">
                <Row className="page-title">
                    <Col md={12}>
                        <PageTitle
                            breadCrumbItems={[]}
                            title={"Ajouter un utilisateur"}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col md={9}>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col xl={12}>
                                        <h4 className="header-title mt-0 mb-1">Informations principales</h4>

                                        {hasMessage && <UncontrolledAlert className="mt-2" color={alertColor}>
                                            <strong>{alertMessage}</strong>
                                        </UncontrolledAlert>}

                                        <AvGroup className="mt-2">
                                            <Label for="firstname">Prénom</Label>
                                            <InputGroup>
                                                <AvInput type="text" name="firstname" id="firstname" placeholder="Prénom" value={user.firstname} required />
                                            </InputGroup>

                                            <AvFeedback>Saisissez un prénom</AvFeedback>
                                        </AvGroup>

                                        <AvGroup className="">
                                            <Label for="lastname">Nom de famille</Label>
                                            <InputGroup>
                                                <AvInput type="text" name="lastname" id="lastname" placeholder="Nom de famille" value={user.lastname} required />
                                            </InputGroup>

                                            <AvFeedback>Saisissez un nom de famille</AvFeedback>
                                        </AvGroup>

                                        <AvGroup className="">
                                            <Label for="email">Email</Label>
                                            <InputGroup>
                                                <AvInput type="text" name="email" id="email" placeholder="Email" value={user.email} required />
                                            </InputGroup>

                                            <AvFeedback>Saisissez un email</AvFeedback>
                                        </AvGroup>

                                        <AvGroup className="">
                                            <Label for="email">Numéro de téléphone</Label>
                                            <InputGroup>
                                                <AvInput type="text" name="phoneNumber" id="phoneNumber" placeholder="Numéro de téléphone" value={user.phoneNumber} required />
                                            </InputGroup>

                                            <AvFeedback>Saisissez un numéro de téléphone</AvFeedback>
                                        </AvGroup>

                                        <AvGroup className="">
                                            <Label for="region">Région</Label>
                                            <Select
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                isClearable="true"
                                                placeholder="Status"
                                                onChange={changeRegion}
                                                options={regions}></Select>

                                            <AvFeedback>Choisissez une région</AvFeedback>
                                        </AvGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xl={3}>

                        <Card>
                            <CardBody>
                                <h4 className="header-title mt-0 mb-4">Rôle de l'utilisateur</h4>
                                <Select
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    defaultValue={{ value: user.role, label: roleLabels[user.role] }}
                                    placeholder="Rôle"
                                    onChange={changeRole}
                                    options={[
                                        { value: 'ROLE_ADMIN', label: 'Administrateur' },
                                        { value: 'ROLE_PHARMACY', label: "Chef de Service" },
                                        { value: 'ROLE_INTERN', label: "Interne" },
                                    ]}></Select>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody>
                                <h4 className="header-title mt-0 mb-4">Status de l'utilisateur</h4>
                                <Select
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    defaultValue={{ value: user.status, label: statusLabels[user.status] }}
                                    placeholder="Status"
                                    onChange={changeStatus}
                                    options={[
                                        { value: 'enabled', label: 'Activé' },
                                        { value: 'disabled', label: 'Désactivé' },
                                    ]}></Select>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody>
                                <FormGroup className="form-group mb-0 text-center">
                                    <Button color="primary" className="btn-block">Enregistrer l'utilisateur</Button>
                                </FormGroup>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </AvForm>
        </React.Fragment>
    );
};

export default AddUser;
