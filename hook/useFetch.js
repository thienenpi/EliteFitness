import { useState, useEffect } from "react"
import axios from "axios"
// import {IP_ADDRESS} from "@env"

const useFetch = ({ collection }) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setIsLoading(true)

    try {
      const response = await axios.get(
        `http://172.16.3.49:3000/api/${collection}`
      )
      setData(response.data)
      setIsLoading(false)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const refetch = () => {
    setIsLoading(true)
    fetchData()
  }

  return { data, isLoading, error, refetch }
}

export default useFetch
