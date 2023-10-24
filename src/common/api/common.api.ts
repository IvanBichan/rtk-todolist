import axios from "axios";
import process from 'process';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        "API-KEY": process.env.REACT_APP_API_KEY,
    },
});
