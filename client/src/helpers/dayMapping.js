
const daysMapping = [
    { value: 'monday', label: 'Lundi' },
    { value: 'tuesday', label: 'Mardi' },
    { value: 'wednesday', label: 'Mercredi' },
    { value: 'thursday', label: 'Jeudi' },
    { value: 'friday', label: 'Vendredi' },
    { value: 'saturday', label: 'Samedi' },
    { value: 'sunday', label: 'Dimanche' }
];

const getDayMapping = (day) => {
    const found = daysMapping.find(dayMapping => dayMapping.value === day);
    return found ? found.label : "Day Mapping not found";
}

export default getDayMapping;
