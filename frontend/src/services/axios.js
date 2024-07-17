import axios from 'axios'

const headers = {
    post: {
        'Content-Type': 'application/json',
        'Access-Controller-Origin': '*',
    }
};

export const axiosMusicLibrary = axios.create({
    baseURL: 'http://localhost:8081',
    headers: headers
})