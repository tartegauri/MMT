import axios from "axios";
import { APIS } from "../api/apiUrls";

const useRecommendation = () => {
    const getRecommendation = (data) =>{
        console.log(data);
        return axios.get(APIS.recommend,{params:data});
    }
    return {
    getRecommendation,
  };
};

export default useRecommendation;