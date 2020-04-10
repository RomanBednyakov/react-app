import axios from './axios';

export const registerUser = async ({username, password, email}) => {
    try {
        const response = await axios.post('users', {username, password, email});
        setToken(response.data.id_token);
    } catch (error) {
        return error.message
    }
};
export const loginUser = async ({password, email}) => {
    try {
        const response = await axios.post('sessions/create', {password, email});
        setToken(response.data.id_token);
    } catch (error) {
        return error.message
    }
};
export const getToken = () => {
    return window.localStorage.getItem('access_token');
};

export const setToken = (id_token) => {
    return window.localStorage.setItem('access_token', id_token);
};

export const deleteToken = () => {
    return window.localStorage.removeItem('access_token');
};

export const getUserInfo = async () => {
    try {
        const response = await axios.get('api/protected/user-info');
        return response.data
    } catch (error) {
        return false;
    }
};
export const getListUsers= async (text) => {
    try {
        const response = await axios.post('api/protected/users/list', {filter: text});
        return response.data
    } catch (error) {
        return {error, errorState: true};
    }
};
export const createTransaction= async ({name, amount}) => {
    try {
        const response = await axios.post('api/protected/transactions', {name, amount});
        return response.data
    } catch (error) {
        return {error, errorState: true};
    }
};
export const getAllTransactions= async () => {
    try {
        const response = await axios.get('api/protected/transactions');
        return response.data
    } catch (error) {
        return {error, errorState: true};
    }
};
