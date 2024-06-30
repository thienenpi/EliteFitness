import { useState, useEffect } from 'react';
import axios from 'axios';
import { HOST } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetch = ({ collection }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const TOKEN = await AsyncStorage.getItem('userToken');
      const response = await axios.get(`${HOST}${collection}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      //   const response = await axios.get(`${HOST}${collection}`)
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
