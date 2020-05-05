
const getGuardsStatusMapping = [
    { value: 'pending', label: 'En attente' },
    { value: 'accepted', label: 'Accepté' },
    { value: 'canceled', label: 'Annulé' },
];

const getGuardStatusMapping = (guardStatus) => {
    const found = getGuardsStatusMapping.find(guardStatusMapping => guardStatusMapping.value === guardStatus);
    return found ? found.label : "Guard Status Mapping not found";
}

export default getGuardStatusMapping;
