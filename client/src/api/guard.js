import {fetchJSON} from '../helpers/api'

const url = process.env.REACT_APP_API_URL

const headers = new Headers({
    "Content-Type": "application/json", 
  });

export default{
    async get(guard){
        const res = fetchJSON(url + '/guards/' + guard)
        return await res
    },

    async getInternsRankingForGuard(guard){
        const res = fetchJSON(url + '/guard/matching/' + guard)
        return await res
    },

    async assignInternToGuard(guard,intern){
        const res = fetchJSON(url + '/guard/assign/',{
            method:'POST',
            headers:headers,
            body: JSON.stringify({guard:guard,intern:intern.id})
        })

        return await res
    }
} 