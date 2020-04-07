
import { DateTime } from "luxon";

function formatDateForTable(date) {
    let dt = DateTime.fromISO(date) //=> May 15, 2017 at 8:30
    return dt.toLocaleString(DateTime.DATE_SHORT); //=>  '4/20/2017'
}

export { formatDateForTable }
