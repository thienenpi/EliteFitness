import axios from 'axios';
import { HOST } from '../constants';

const ApiManager = axios.create({
  baseURL: HOST,
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager;
