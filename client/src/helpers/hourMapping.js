
const hoursMapping = [
    { value: '1', label: 'Jour' },
    { value: '2', label: 'Nuit' },
    { value: '3', label: 'Jour/Nuit' }
];

const getHourMapping = (hour) => {
    const found = hoursMapping.find(hourMapping => hourMapping.value === hour);
    return found ? found.label : "Hour Mapping not found";
}

export default getHourMapping;
