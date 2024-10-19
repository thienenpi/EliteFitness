import axios from "axios";
import { HOST_NODEJS, HOST_FLASK } from "../constants";

const ApiManagerNodeJS = axios.create({
  baseURL: HOST_NODEJS,
  responseType: "json",
  withCredentials: true,
});

const ApiManagerFlask = axios.create({
  baseURL: HOST_FLASK,
  responseType: "json",
  withCredentials: true,
});

export { ApiManagerNodeJS, ApiManagerFlask };
