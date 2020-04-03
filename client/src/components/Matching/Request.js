import React, { useEffect, useState } from 'react';
import guardAPI from '../../api/guard'
import { Card, CardBody, Media } from 'reactstrap'

const Request = (props) => {
    const [guard, setGuard] = useState(null)

    useEffect(() => {
        guardAPI.get(props.guard).then(data => setGuard(data))
    }, [])

    return (
        <Card>
            <CardBody>
                <h4 className="p-2 card-title mb-0">Ma demande</h4>
                <Media className="border-bottom px-3 py-4">
                    <Media body>
                        <h5 className="mt-0 mb-1 font-weight-normal">Pharmacie</h5>
                        <span className="text-muted">{guard? guard.pharmacy.name : ''}</span>
                    </Media>
                </Media>
                <Media className="border-bottom px-3 py-4">
                    <Media body>
                        <h5 className="mt-0 mb-1 font-weight-normal">Jour</h5>
                        <span className="text-muted">{guard ? guard.day : 'Chargement...'}</span>
                    </Media>
                </Media>
                <Media className="border-bottom px-3 py-4">
                    <Media body>
                        <h5 className="mt-0 mb-1 font-weight-normal">Heure</h5>
                        <span className="text-muted">{guard ? guard.hour.name : 'Chargement...'}</span>
                    </Media>
                </Media>
                <Media className="border-bottom px-3 py-4">
                    <Media body>
                        <h5 className="mt-0 mb-1 font-weight-normal">Poste</h5>
                        <span className="text-muted">{guard ? guard.job.title : 'Chargement...'}</span>
                    </Media>
                </Media>
                <Media className="border-bottom px-3 py-4">
                    <Media body>
                        <h5 className="mt-0 mb-1 font-weight-normal">Aggrements</h5>
                        {guard? guard.agrements.map( agrement =>  <span key={agrement.id} className="text-muted">{agrement.code}</span>
                        ):'Chargement...'}
                        
                    </Media>
                </Media>
            </CardBody>
        </Card>
    );
};

export default Request;
