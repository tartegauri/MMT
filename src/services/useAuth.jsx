import axios from "axios";
import { APIS } from "../api/apiUrls";

const useAuth = () => {
  const createUser = (data) => {
    return axios.post(APIS.createUser, data);
  };

  const verifyOtp = (data) => {
    return axios.post(APIS.verifyOtp, data);
  };

  const addName = (data)=>{
    console.log(data)
    const response = axios.put(`${APIS.addName}/${data.phone}`,{name:data.name})
    console.log(response)
    return axios.put(`${APIS.addName}/${data.phone}`,{name:data.name})
  };

  const addAddress = (data) =>{
    return axios.put(`${APIS.addAddress}/${data.id}`,(data.data))
  };
  return {
    createUser,
    verifyOtp,
    addName,
    addAddress,
  };
};

export default useAuth;