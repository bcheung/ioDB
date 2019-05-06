import axios from 'axios';
import { getJoinedTablename } from './constants';

async function getRequest(queryUrl) {
    try {
        const url = queryUrl;
        const response = await axios.get(url);
        const { data } = response;
        console.log(`fetch request to ${queryUrl}`, data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function fetchListData(tablename) {
    const queryUrl = `http://www.iodb.info/api/list/${tablename}`;
    const data = await getRequest(queryUrl);
    return data;
}

export async function fetchFilteredData(reqData) {
    try {
        const response = await axios.post('http://www.iodb.info/api/filter', reqData);
        const { data } = response;
        console.log('fetch request to http://www.iodb.info/api/filter', data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function fetchInstanceData(tablename, id) {
    const queryUrl = `http://www.iodb.info/api/instance/${tablename}/${id}`;
    const data = await getRequest(queryUrl);
    return data;
}

export async function fetchTopTenData(tablename, columnName) {
    const queryUrl = `http://www.iodb.info/api/top_ten/${tablename}/${columnName}`;
    const data = await getRequest(queryUrl);
    return data;
}

export async function fetchFilteredResults(tablename, columnName, operator, value) {
    console.log('fetchFilteredResults tablename', tablename);
    const queryUrl = `http://www.iodb.info/api/filter/${tablename}/${columnName}/${operator}/${value}`;
    const data = await getRequest(queryUrl);
    return data;
}

export async function fetchJoinedInstanceData(primaryTable, secondaryTable, id) {
    const tablename = getJoinedTablename(primaryTable, secondaryTable);
    console.log('fetchJoinedInstanceData tablename', tablename, id);
    const queryUrl = `http://www.iodb.info/api/joined_instance/${tablename}/${primaryTable}/${id}`;
    const data = await getRequest(queryUrl);
    return data;
}

export async function fetchJoinedTopTenData(primaryTable, secondaryTable, id, columnName) {
    const tablename = getJoinedTablename(primaryTable, secondaryTable);
    console.log('fetchJoinedTopTenData tablename', tablename);
    const queryUrl = `http://www.iodb.info/api/joined_top_ten/${tablename}/${primaryTable}/${id}/${columnName}`;
    const data = await getRequest(queryUrl);
    return data;
}
