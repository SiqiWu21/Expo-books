import axios from 'axios';
import Toast from "react-native-toast-message";

export const baseURL = "http://192.168.2.171:5000";

const request = axios.create({
    baseURL
})

request.interceptors.request.use(
    config => {

        return config;
    },
    error => {
        return Promise.reject(error)
    }
)
request.interceptors.response.use(
    response => {

        const {
            code,
            msg
        } = response.data;
        if (code == -1) {
            Toast.show({
                type: "error",
                text1: "Error!",
                text2: msg,
            });
            return Promise.reject();
        }
        return response.data;
    },
    error => {
        return Promise.reject(error)
    }
)
export default request;