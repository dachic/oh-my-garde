import React from 'react';
import OverviewWidget from '../../components/OverviewWidget'

const Request = () => {
    const items = [
        {'title':'Pharmacie','description':'Pharmacie des internes'},
        {'title':'Date','description':'01/04/2020'},
        {'title':'Heure','description':'6h à 8h'},
        {'title':'Poste','description':'CRPV'},
        {'title':'Aggrements','description':'106'}]

    return ( <OverviewWidget title='Ma demande' items={items}/>
    
    );
};

export default Request;
