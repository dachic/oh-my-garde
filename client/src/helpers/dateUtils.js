
import { DateTime } from "luxon";

function formatDateForTable(date) {
    let dt = DateTime.fromISO(date, { zone: 'Europe/Paris' }) //=> May 15, 2017 at 8:30
    return dt.toLocaleString({ locale: "fr" }); //=>  '20/04/2017'
}

export { formatDateForTable }
