import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://stried-assignment-1-revive-backend.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
