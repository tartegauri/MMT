import axios from "axios";
import { APIS } from "../api/apiUrls";

const useTiffin = () => {
    const getTiffinById = (id) =>{
        return axios.get(`${APIS.tiffins}/${id}`);
    };

    const getAllTiffins = () =>{
        return axios.get(APIS.tiffins);
    };

    const createTiffin = (data) =>{
        return axios.post(APIS.tiffins,data);
    };
 
    const getTiffinsByMessId = (id) =>{
        const response = axios.get(`${APIS.tiffins}/mess/:id`);
        console.log(response);
        return axios.get(`${APIS.tiffins}/mess/${id}`);
    };
    return {
    getTiffinById,
    getAllTiffins,
    createTiffin,
    getTiffinsByMessId,
  };
};

export default useTiffin;