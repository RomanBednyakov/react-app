export const getToken = () => {
    return window.localStorage.getItem('access_token');
};

export const setToken = (id_token) => {
    return window.localStorage.setItem('access_token', id_token);
};

export const deleteToken = () => {
    return window.localStorage.removeItem('access_token');
};
