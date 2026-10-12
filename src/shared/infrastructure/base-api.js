import axios from 'axios';

const hignApi = import.meta.env.VITE_HIGN_API_URL;

export class BaseApi {
    #http;

    constructor() {
        this.#http = axios.create({
            baseURL: hignApi,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    get http() {
        return this.#http;
    }
}