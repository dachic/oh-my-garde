import React, { useState } from 'react';
import { getLoggedInUser, setLoggedInUser } from '../../helpers/authUtils';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Row, Col, Card, CardBody, Button, Label, FormGroup, InputGroup, UncontrolledAlert } from 'reactstrap';
import PageTitle from '../../components/PageTitle';
import Loader from '../../components/Loader';
import { saveAccountInformation } from '../../helpers/api/usersApi';

const Profile = (props) => {
    const loggedInUser = getLoggedInUser();
    const [user, setUser] = useState(loggedInUser);
    const [alertColor, setAlertColor] = useState();
    const [alertMessage, setAlertMessage] = useState();
    const [hasMessage, setHasMessage] = useState(false);
    const [loader, setLoader] = useState(false);

    // Handles the form submit
    const handleValidSubmit = (event, values) => {
        setLoader(true);
        user.firstname = values.firstname;
        user.lastname = values.lastname;
        user.email = values.email;
        user.phoneNumber = values.phoneNumber;

        saveAccountInformation(user).then(response => {
            setLoggedInUser(user);
            setAlertMessage("Vos informations ont été enregistrées")
            setAlertColor("success")
            setHasMessage(true)
            setLoader(false);
            setUser(user)

            setTimeout(() => {
                setHasMessage(false)
                props.history.push('/account/profile');
            }, 3000)
        }).catch(error => {
            console.log(error, 'An error occured')
        })
    }

    if (loader) {
        return <Loader />;
    }

    return (
        <React.Fragment>
            <AvForm onValidSubmit={(event, values) => handleValidSubmit(event, values)} className="account-profile-form">
                <Row className="page-title">
                    <Col md={12}>
                        <PageTitle
                            breadCrumbItems={[]}
                            title={"Mon compte"}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col md={9}>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col xl={12}>
                                        {hasMessage && <UncontrolledAlert className="mt-2" color={alertColor}>
                                            <strong>{alertMessage}</strong>
                                        </UncontrolledAlert>}

                                        <AvGroup className="mt-2">
                                            <Label for="firstname">Prénom</Label>
                                            <InputGroup>
                                                <AvInput type="text" name="firstname" id="firstname" placeholder="Nom" value={user.firstname} required />
                                            </InputGroup>

                                            <AvFeedback>Saisissez un prénom</AvFeedback>
                                        </AvGroup>

                                        <AvGroup className="">
                                            <Label for="lastname">Nom de famille</Label>
                                            <InputGroup>
                                                <AvInput type="text" name="lastname" id="lastname" placeholder="Nom" value={user.lastname} required />
                                            </InputGroup>

                                            <AvFeedback>Saisissez un nom de famille</AvFeedback>
                                        </AvGroup>

                                        <AvGroup className="">
                                            <Label for="email">Adresse e-mail</Label>
                                            <InputGroup>
                                                <AvInput type="text" name="email" id="email" placeholder="Email" value={user.email} required />
                                            </InputGroup>

                                            <AvFeedback>Saisissez une adresse e-mail</AvFeedback>
                                        </AvGroup>

                                        <AvGroup className="">
                                            <Label for="phoneNumber">Numéro de téléphone</Label>
                                            <InputGroup>
                                                <AvInput type="text" name="phoneNumber" id="phoneNumber" placeholder="Numéro de téléphone" value={user.phoneNumber} required />
                                            </InputGroup>

                                            <AvFeedback>Saisissez une adresse e-mail</AvFeedback>
                                        </AvGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xl={3}>
                        <Card>
                            <CardBody>
                                <FormGroup className="form-group mb-0 text-center">
                                    <Button color="primary" className="btn-block">Enregistrer</Button>
                                </FormGroup>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </AvForm>
        </React.Fragment>
    )
}

export default Profile;
