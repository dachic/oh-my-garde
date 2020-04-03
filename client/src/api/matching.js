import {fetchJSON} from '../helpers/api'

const url = process.env.REACT_APP_API_URL

export default{
    async getInternsRankingForGuard(guard){
        const res = fetchJSON(url + '/guard/matching/' + guard)
        return await res
    },
} 