import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';

const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "content-type": "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function(config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function (response){
        //stop global loader here   
        return processResponse(response);
    },
    function (error) {
        //stop global loader here
        return Promise.reject(processError(error));
    }
)

///////////////////////////
// If Success -> return { isSuccess: true, data: Object}
// If Fail -> return {isFailure: true, status: string, msg: string, code:int }
///////////////////////////
const processResponse = (response) => {
    console.log('response of the API', response)
    if(response?.status === 200 || response?.status === 201){
        return {isSuccess: true, data: response.data || null}
    }else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

///////////////////////////
// If Success -> return { isSuccess: true, data: Object}
// If Fail -> return {isFailure: true, status: string, msg: string, code:int }
///////////////////////////
const processError = (error) => {
    if(error.response){
        // Request made and server responded with a status outside the range (200-299)
        console.log('ERROR IN RESPONSE: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    } else if (error.request) {
        // Request made but no response received
        console.log('ERROR IN REQUEST: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    } else {
        // Something went wrong with the request
        console.log('ERROR IN NETWORK: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}

const API = {};

for(const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) => {
        return axiosInstance({
            method: value.method,
            url: value.url,
            data: body, 
            responseType: value.responseType,
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100)/ progressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100)/ progressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            } 
        })
    }
}

export { API };