import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Button, Label, FormGroup, UncontrolledAlert } from 'reactstrap';
import { AvForm, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import PageTitle from '../../../components/PageTitle';
import Select from 'react-select';
import disponibilityApi from '../../../api/disponibility';
import Loader from '../../../components/Loader';
import getDayMapping from '../../../helpers/dayMapping';

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

const DisponibilityEdit = (props) => {

    const [disponibility, setDisponibility] = useState(false);
    const [alertColor, setAlertColor] = useState();
    const [alertMessage, setAlertMessage] = useState();
    const [hasMessage, setHasMessage] = useState(false);
    const [hour, setHour] = useState();
    const [day, setDay] = useState();
    const [loader, setLoader] = useState(true);
    const [found, setFound] = useState(false);

    useEffect(() => { // ComponentDidMount
        const { id } = props.match.params;

        if (id !== null) {
            disponibilityApi.findDisponibilityById(id)
                .then(disponibility => {
                    setLoader(false);
                    if (disponibility.length === 0) {
                        setFound(false)
                        setDisponibility(false)
                    } else {
                        setDisponibility(disponibility[0])
                        setFound(true)
                        setDay(disponibility[0].day)
                        setHour(disponibility[0].hour.id)
                    }
                }).catch((error) => {
                    setAlertMessage("Un erreur s'est produite lors de la recherche de la disponibilité")
                })
        } else {
            setAlertMessage("Un erreur s'est produite lors de la recherche de la disponibilité")
        }
    }, [props]);

    const changeHour = ({ value }) => {
        setHour(value)
    }

    const changeDay = ({ value }) => {
        setDay(value)
    }

    const handleValidSubmit = (event, values) => {
        setLoader(true);

        disponibilityApi.findDisponibilityByHourAndDay(hour, day).then(disponibilities => {
            const canBeModified = disponibilities[0] !== undefined ? disponibilities[0].id === disponibility.id : true;

            if (canBeModified) {
                disponibilityApi.updateDisponibility(disponibility.id, hour, day)
                    .then((disponibility) => {
                        setLoader(false);
                        setAlertColor('success')
                        setHasMessage(true)
                        setAlertMessage('Votre disponibilité a été modifiée avec succès')
                        props.history.push("/disponibility/all");
                    })
            } else {
                setLoader(false);
                setAlertColor('danger')
                setHasMessage(true)
                setAlertMessage('Désolé mais il semble que vous ayez déjà une autre disponibilité identique à cette que vous enregistrez')
            }
        })
    }

    if (loader) {
        return <Loader />;
    }

    return <React.Fragment>

        {!found && <UncontrolledAlert className="mt-2" color="danger">
            <strong>Aucune disponibilité trouvée</strong>
        </UncontrolledAlert>}

        {found && <AvForm onValidSubmit={(event, values) => handleValidSubmit(event, values)} className="user-editt-form">
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[]}
                        title={"Modifier une disponibilité"}
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
                                            defaultValue={{ value: disponibility.hour.id, label: disponibility.hour.name }}
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
                                            defaultValue={{ value: disponibility.day, label: getDayMapping(disponibility.day) }}
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
                                <Button color="primary" className="btn-block">Enregistrer la modification</Button>
                            </FormGroup>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </AvForm>}
    </React.Fragment>;
}

export default DisponibilityEdit;
