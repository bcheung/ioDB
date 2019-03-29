import axios from 'axios';
import { proxyurl } from './constants';

export async function fetchInstanceData(tablename, id) {
    try {
        const response = await axios.get(`${proxyurl}http://www.iodb.info/api/instance/${tablename}/${id}`);
        const { data } = response;
        console.log('fetch request', data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}
