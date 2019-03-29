import axios from 'axios';
import { proxyurl } from './constants';

const API_URL = 'www.iodb.info/api/list/industries_3d';

export function getIndustries() {
    return axios.get(`${API_URL}`);
}

export function matchIndustries(state, value) {
    return state.label.toLowerCase().indexOf(value.toLowerCase()) !== -1;
}

export async function fetchInstanceData(tablename, id) {
    try {
        const response = await fetch(`${proxyurl}http://www.iodb.info/api/instance/${tablename}/${id}`);
        const data = await response.json();
        console.log('fetch request', data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}
