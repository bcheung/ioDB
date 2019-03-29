import axios from 'axios';
import { proxyurl } from './constants';

export async function fetchListData(tablename) {
    try {
        const url = `${proxyurl}http://www.iodb.info/api/list/${tablename}`;
        const response = await axios.get(url);
        const { data } = response;
        console.log('fetch request', data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function fetchInstanceData(tablename, id) {
    try {
        const url = `${proxyurl}http://www.iodb.info/api/instance/${tablename}/${id}`;
        const response = await axios.get(url);
        const { data } = response;
        console.log('fetch request', data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function fetchTopTenData(tablename, columnName) {
    try {
        const url = `${proxyurl}http://www.iodb.info/api/top_ten/${tablename}/${columnName}`;
        const response = await axios.get(url);
        const { data } = response;
        console.log('fetch request', data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function fetchJoinedInstanceData(tablename, keyModel, id) {
    try {
        const url = `${proxyurl}http://www.iodb.info/api/joined_instance/${tablename}/${keyModel}/${id}`;
        const response = await axios.get(url);
        const { data } = response;
        console.log('fetch request', data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function fetchJoinedTopTenData(tablename, keyModel, id, columnName) {
    try {
        const url = `${proxyurl}http://www.iodb.info/api/joined_top_ten/${tablename}/${keyModel}/${id}/${columnName}`;
        const response = await axios.get(url);
        const { data } = response;
        console.log('fetch request', data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}
