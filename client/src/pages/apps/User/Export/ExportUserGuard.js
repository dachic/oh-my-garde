import React, { useState, useEffect } from "react";
import Pdf from "react-to-pdf";
import { Button, Row, Col, Card, CardBody, UncontrolledAlert } from 'reactstrap';
import PageTitle from '../../../../components/PageTitle';
import { CardTitle } from 'reactstrap';
import PreLoaderWidget from "../../../../components/Loader";
import userApi from '../../../../api/user';

const ref = React.createRef();

const ExportUserGuard = (props) => {
    const [records, setRecords] = useState(false);
    const [alertColor, setAlertColor] = useState();
    const [alertMessage, setAlertMessage] = useState();
    const [hasMessage, setHasMessage] = useState(false);
    const [loader, setLoader] = useState(false);

    useEffect(() => { // ComponentDidMount
        const { id } = props.match.params

        userApi.getExportUserGuards(id)
            .then(data => {
                setRecords(data)
                setLoader(false)
                if (!data) {
                    setAlertMessage("Aucune donnée à afficher")
                    setAlertColor('info')
                    setHasMessage(true)
                }
            }).catch((error) => {
                setAlertMessage("Un erreur s'est produite lors de la recherche de l'utilisateur")
                setAlertColor('danger')
                setHasMessage(true)
                setLoader(false)
            })
    }, [props]);

    const getCurrentDateAndTime = () => {
        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
        var dateTime = date + '-' + time;

        return dateTime;
    }

    const calculateTotalHourPerDayType = (day) => {
        let sum = 0
        for (let hospital in records.data[day]) {
            for (let guard in records.data[day][hospital]) {
                sum += records.data[day][hospital][guard].guardCount
            }
        }

        return sum;
    }

    if (loader) {
        return <PreLoaderWidget />;
    }

    if (!records) {
        return <React.Fragment>
            {hasMessage && <UncontrolledAlert className="mt-2" color={alertColor}>
                <strong>{alertMessage}</strong>
            </UncontrolledAlert>}
        </React.Fragment>
    }

    return <React.Fragment>
        <Row className="page-title">
            <Col md={8}>
                <PageTitle
                    breadCrumbItems={[]}
                    title={`Récapitulatif des gardes de ${records.user.fullname}`}
                />
            </Col>
        </Row>

        <Row>
            <Col md={12}>
                <div className="ExportUserGuard" ref={ref}>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col md={8}>
                                    <CardTitle>
                                        <h4 className="header-title mt-2 mb-1">{records.user.fullname}</h4>
                                    </CardTitle>
                                </Col>

                                <Col md={4} className="d-flex">
                                    <Pdf targetRef={ref} filename={`${records.user.firstname}-${records.user.lastname}-${getCurrentDateAndTime()}-details-gardes.pdf`}>
                                        {({ toPdf }) => <Button color="primary" className="ml-auto" onClick={toPdf}>Export PDF</Button>}
                                    </Pdf>
                                </Col>
                            </Row>

                            <ul>
                                {Object.keys(records.data).map(day => (
                                    <li key={day} className="GuardDay">
                                        <span>{day} : {calculateTotalHourPerDayType(day)}</span>
                                        {<ul>
                                            {Object.keys(records.data[day]).map(hospital => (
                                                <li key={hospital} className="hospital">
                                                    <span>{hospital} : {records.data[day][hospital][0].guardCount}</span>
                                                    <ul>
                                                        {Object.keys(records.data[day][hospital][0].mapping).map((interval) => (
                                                            <li key={`${hospital}-${interval}-${day}`}>{interval} : {records.data[day][hospital][0].mapping[interval]}</li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            ))}
                                        </ul>}
                                    </li>
                                ))}
                            </ul>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    </React.Fragment>;
}

export default ExportUserGuard;
