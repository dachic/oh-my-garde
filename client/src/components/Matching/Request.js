import React, { useEffect, useState } from 'react';
import guardAPI from '../../api/guard'
import { Card, CardBody, Media } from 'reactstrap'
import Loader from '../../components/Loader';
import getDayMapping from '../../helpers/dayMapping'

const Request = (props) => {
    const [guard, setGuard] = useState(null)

    useEffect(() => {
        guardAPI.get(props.guard).then(data => {
            setGuard(data)
        })
    }, [props.guard])

    if (!guard) {
        return <Loader />
    }

    return (
        <Card>
            <CardBody>
                <h4 className="p-2 card-title mb-0">Ma demande</h4>
                <Media className="border-bottom px-3 py-4">
                    <Media body>
                        <h5 className="mt-0 mb-1 font-weight-normal">Pharmacie</h5>
                        <span className="text-muted">{guard.pharmacy.name}</span>
                    </Media>
                </Media>
                <Media className="border-bottom px-3 py-4">
                    <Media body>
                        <h5 className="mt-0 mb-1 font-weight-normal">Jour</h5>
                        <span className="text-muted">{getDayMapping(guard.day)}</span>
                    </Media>
                </Media>
                <Media className="border-bottom px-3 py-4">
                    <Media body>
                        <h5 className="mt-0 mb-1 font-weight-normal">Horaire</h5>
                        <span className="text-muted">{guard.hour.name}</span>
                    </Media>
                </Media>
                <Media className="border-bottom px-3 py-4">
                    <Media body>
                        <h5 className="mt-0 mb-1 font-weight-normal">Poste</h5>
                        <span className="text-muted">{guard.job.title}</span>
                    </Media>
                </Media>
                <Media className="border-bottom px-3 py-4">
                    <Media body>
                        <h5 className="mt-0 mb-1 font-weight-normal">Aggrements</h5>
                        {guard.agrements.map(agrement => <span key={agrement.id} className="text-muted">{agrement.code}</span>
                        )}
                    </Media>
                </Media>
            </CardBody>
        </Card>
    );
};

export default Request;
