import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'

import { Row, Col, Card, CardBody, Button, Label, FormGroup, InputGroup, UncontrolledAlert } from 'reactstrap';
import Select from 'react-select';
import { findAllUserByIdApi, saveUserInfoApi } from '../../../helpers/api/usersApi';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import PageTitle from '../../../components/PageTitle';
import Loader from '../../../components/Loader';

const EditUser = () => {
    const statusLabels = {};
    statusLabels['enabled'] = 'Activé';
    statusLabels['disabled'] = 'Désactivé';

    const [user, setUser] = useState(null);
    const [title, setTitle] = useState("Ajout d'un utilisateur");
    const [buttonTitle, setButtonTitle] = useState("Enregister un nouvel utilisateur");
    const [alertColor, setAlertColor] = useState();
    const [alertMessage, setAlertMessage] = useState();
    const [hasMessage, setHasMessage] = useState(false);

    const ref = useRef();

    useEffect(() => { // ComponentDidMount
        ref.current = true;
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        if (id !== null) {
            setTitle("Modification d'un utilisateur")
            setButtonTitle("Enregistrer les modifications")

            findAllUserByIdApi(id)
                .then(user => {
                    setUser(user)
                }).catch((error) => {
                    setAlertMessage("Un erreur s'est produite lors de la recherche de l'utilisateur")
                })
        }
    }, []);

    const changeStatus = ({ value }) => {
        user.status = value
        setUser(user)
    }

    /**
     * Handles the submit
     */
    const handleValidSubmit = (event, values) => {

        if (user !== null) {
            saveUserInfoApi({
                id: user.id,
                firstname: values.firstname,
                lastname: values.lastname,
                status: user.status
            }).then(response => {
                setAlertMessage("Les informations ont été correctement mises à jour")
                setAlertColor("success")
                setHasMessage(true)

                setTimeout(() => {
                    setHasMessage(false)
                }, 3000)
            })
        }
    }


    if (user === null) {
        return <Loader />;
    }

    return (
        <React.Fragment>
            <AvForm onValidSubmit={(event, values) => handleValidSubmit(event, values)} className="user-editt-form">
                <Row className="page-title">
                    <Col md={12}>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Utilisateurs', path: '/users/all' },
                                { label: title, path: '/users/edit?id=1', active: true },
                            ]}
                            title={title}
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
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xl={3}>
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
                                    <Button color="primary" className="btn-block">{buttonTitle}</Button>
                                </FormGroup>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </AvForm>
        </React.Fragment>
    );
};

export default EditUser;
