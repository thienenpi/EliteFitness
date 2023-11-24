import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = ({ collection }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {  
    setIsLoading(true);

    try {
<<<<<<< HEAD
      const response = await axios.get(
        `http://192.168.100.171:3000/api/${collection}`
      );
      setData(response.data);
      setIsLoading(false);
=======
      const response = await axios.get(`http://10.0.190.1:3000/api/${collection}`)
      setData(response.data)
      setIsLoading(false)
>>>>>>> d94e94cea79dd41bd5f2f6bd8abb65fe5fe8689a
    } catch (error) {
      setError(error);
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
