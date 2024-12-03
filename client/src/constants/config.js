//API notification messages

export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: 'Loading...',
        message: 'Data is being loaded, please wait'
    },
    success: {
        title: 'Success',
        message: 'Data Loaded Successfully'
    },
    responseFailure: {
        title: 'Error',
        message: 'An error occured while fetching the response from the server. Please try again'
    },
    requestFailure: {
        title: 'Error',
        message: 'An error occured while parsing the data'
    },
    networkError:{
        title: 'Error',
        message: 'Unable to connect with the server. Please check the internet connectivity and try again later'
    }
}

export const SERVICE_URLS = {
    userSignup: { url: '/signup', method: 'POST'},
    userLogin: {url: '/login', method: 'POST'}
}