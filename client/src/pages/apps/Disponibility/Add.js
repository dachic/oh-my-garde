import React, { useState } from 'react';
import { Row, Col, Card, CardBody, Button, Label, FormGroup, UncontrolledAlert } from 'reactstrap';
import { AvForm, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import PageTitle from '../../../components/PageTitle';
import Select from 'react-select';
import disponibilityApi from '../../../api/disponibility';
import Loader from '../../../components/Loader';

const hours = [
    { value: "1", label: "Jour" },
    { value: "2", label: "Nuit" },
    { value: "3", label: "Jour et Nuit" }
];

const days = [
    { value: 'monday', label: 'Lundi' },
    { value: 'tuesday', label: 'Mardi' },
    { value: 'wednesday', label: 'Mercredi' },
    { value: 'thursday', label: 'Jeudi' },
    { value: 'friday', label: 'Vendredi' },
    { value: 'saturday', label: 'Samedi' },
    { value: 'sunday', label: 'Dimanche' }
];

const DisponibilityAdd = (props) => {

    const [alertColor, setAlertColor] = useState();
    const [alertMessage, setAlertMessage] = useState();
    const [hasMessage, setHasMessage] = useState(false);
    const [hour, setHour] = useState();
    const [day, setDay] = useState();
    const [loader, setLoader] = useState(false);

    const changeHour = ({ value }) => {
        setHour(value)
    }

    const changeDay = ({ value }) => {
        setDay(value)
    }

    const handleValidSubmit = (event, values) => {
        setLoader(true);

        disponibilityApi.isAvailable(hour, day).then(hasAlreadyDisponibility => {
            if (hasAlreadyDisponibility) {
                disponibilityApi.saveDisponibility(hour, day).then((disponibility) => {
                    setLoader(false);
                    setAlertColor('success')
                    setHasMessage(true)
                    setAlertMessage('Votre disponibilité a été enregistrée avec succès')
                    props.history.push("/disponibility/all");
                })
            } else {
                setLoader(false);
                setAlertColor('danger')
                setHasMessage(true)
                setAlertMessage('Vous avez déjà une disponibilité identique, vous pouvez la modifier dans la liste de vos disponiblités')
            }
        })
    }

    if (loader) {
        return <Loader />;
    }

    return <React.Fragment>
        <AvForm onValidSubmit={(event, values) => handleValidSubmit(event, values)} className="user-editt-form">
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Disponibilité', path: '/disponibility/all' },
                            { label: "Ajouter une disponibilité", path: "/disponibility/add", active: true },
                        ]}
                        title={"Ajouter une disponibilité"}
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

                                    <AvGroup className="">
                                        <Label for="hour">Créneau horaire</Label>
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            isClearable="true"
                                            placeholder="Choisissez un créneau"
                                            onChange={changeHour}
                                            options={hours}></Select>

                                        <AvFeedback>Choisissez un créneau</AvFeedback>
                                    </AvGroup>

                                    <AvGroup className="">
                                        <Label for="hour">Jour de la semaine</Label>
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            isClearable="true"
                                            placeholder="Choisissez un jour de la semaine"
                                            onChange={changeDay}
                                            options={days}></Select>

                                        <AvFeedback>Choisissez un jour de la semaine</AvFeedback>
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
                                <Button color="primary" className="btn-block">Enregister</Button>
                            </FormGroup>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </AvForm>
    </React.Fragment>;
}

export default DisponibilityAdd;
