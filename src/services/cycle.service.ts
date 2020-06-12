import axios from "axios";
import { Icycling } from "../interface/cycle.interface";

export const getData = async () => {
  try {
    const response = await axios.get("http://localhost:3001/data");
    return response.data;
  } catch (error) {
    console.log("Error while getting data");
  }
};

export const postData = async (data: Icycling) => {
  try {
    const response = await axios.post("http://localhost:3001/data", data);
    return response;
  } catch (error) {
    console.log("Error while posting data", error);
  }
};
