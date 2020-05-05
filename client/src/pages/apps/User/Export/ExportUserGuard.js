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
                    setAlertMessage("Aucun utilisateur trouvé")
                    setAlertColor('info')
                    setHasMessage(true)
                }
            }).catch((error) => {
                setAlertMessage("Un erreur s'est produite lors de la recherche de l'utilisateur")
                setAlertColor('danger')
                setHasMessage(true)
                setLoader(false)
            })
    }, []);

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
                                    <Pdf targetRef={ref} filename="code-example.pdf">
                                        {({ toPdf }) => <Button color="primary" className="ml-auto" onClick={toPdf}>Export PDF</Button>}
                                    </Pdf>
                                </Col>
                            </Row>

                            <ul>
                                {Object.keys(records.data).map(day => (
                                    <li key={day}>
                                        <span>{day}</span>
                                        {<ul>
                                            {Object.keys(records.data[day]).map(hospital => (
                                                <li key={hospital}>
                                                    <span>{hospital} : {records.data[day][hospital][0].guardCount}</span>
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
