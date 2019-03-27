import axios from 'axios'

const API_URL = 'www.iodb.info/api/list/industries_3d'

export function getIndustries() {
    return axios.get(`${API_URL}`)
}

export function matchIndustries(state, value){
    return (
        state.label.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
}