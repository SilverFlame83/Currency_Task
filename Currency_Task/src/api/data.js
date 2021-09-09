import * as api from './api.js';

const host = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies'
api.settings.host = host;

export async function getCurency(token) {
    return await api.get(host + `${token}.json`);
}