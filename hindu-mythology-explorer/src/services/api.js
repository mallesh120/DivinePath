import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const getGods = () => {
    return axios.get(`${API_URL}/gods`);
};

export const getRamayana = () => {
    return axios.get(`${API_URL}/ramayana`);
};