import axios from '../axios';
import processApiResult from '../processApiResult';
import {setToken} from '../localStorage'

export const registerUser = ({username, password, email}) => {
  return processApiResult(
    axios.post('users', {username, password, email}),
    (response) => setToken(response.id_token),
    (error) => error.message,
  );
};
export const loginUser = ({password, email}) => {
  return processApiResult(
    axios.post('sessions/create', {password, email}),
    (response) => setToken(response.id_token),
    (error) => error.message,
  );
};

export const getUserInfo = () => {
  return processApiResult(
    axios.get('api/protected/user-info'),
    (response) => response.user_info_token,
    (error) => error,
  );
};
export const getListUsers = (text) => {
  return processApiResult(
    axios.post('api/protected/users/list', {filter: text}),
    (response) => response.data,
    (error) => error,
  );
};
