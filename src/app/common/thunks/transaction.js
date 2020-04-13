import axios from '../axios';
import processApiResult from '../processApiResult';

export const createTransaction = ({name, amount}) => {
  return processApiResult(
    axios.post('api/protected/transactions', {name, amount}),
    (response) => response.data,
    (error) => error,
  );
};
export const getAllTransactions = () => {
  return processApiResult(
    axios.get('api/protected/transactions'),
    (response) => response.data,
    (error) => error,
  );
};
