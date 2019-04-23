import axios from 'axios';
import { getJoinedTablename } from './constants';

export async function fetchListData(tablename) {
    try {
        const queryUrl = `http://www.iodb.info/api/list/${tablename}`;
        const url = queryUrl;
        const response = await axios.get(url);
        const { data } = response;
        console.log(`fetch request to ${queryUrl}`, data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function fetchInstanceData(tablename, id) {
    try {
        const queryUrl = `http://www.iodb.info/api/instance/${tablename}/${id}`;
        const url = queryUrl;
        const response = await axios.get(url);
        const { data } = response;
        console.log(`fetch request to ${queryUrl}`, data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function fetchTopTenData(tablename, columnName) {
    try {
        const queryUrl = `http://www.iodb.info/api/top_ten/${tablename}/${columnName}`;
        const url = queryUrl;
        const response = await axios.get(url);
        const { data } = response;
        console.log(`fetch request to ${queryUrl}`, data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function fetchJoinedInstanceData(primaryTable, secondaryTable, id) {
    const tablename = getJoinedTablename(primaryTable, secondaryTable);
    console.log('fetchJoinedInstanceData tablename', tablename, id);
    try {
        const queryUrl = `http://www.iodb.info/api/joined_instance/${tablename}/${primaryTable}/${id}`;
        const url = queryUrl;
        const response = await axios.get(url);
        const { data } = response;
        console.log(`fetch request to ${queryUrl}`, data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function fetchJoinedTopTenData(primaryTable, secondaryTable, id, columnName) {
    const tablename = getJoinedTablename(primaryTable, secondaryTable);
    console.log('fetchJoinedTopTenData tablename', tablename);
    try {
        const queryUrl = `http://www.iodb.info/api/joined_top_ten/${tablename}/${primaryTable}/${id}/${columnName}`;
        const url = queryUrl;
        const response = await axios.get(url);
        const { data } = response;
        console.log(`fetch request to ${queryUrl}`, data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}
