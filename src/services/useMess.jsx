import axios from "axios";
import { APIS } from "../api/apiUrls";

const useMess = () => {
    const getMessById = (id) =>{
        // const response = axios.get(`${APIS.mess}/${id}`);
        // console.log(response);
        return axios.get(`${APIS.mess}/${id}`);
    }
    //might have to change this as we have to submit files as well
    const createMess = (data) =>{
        return axios.post(APIS.mess,data);
    }
    return {
    getMessById,
    createMess,
  };
};

export default useMess;