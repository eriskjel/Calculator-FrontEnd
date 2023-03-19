// contents of utils/httputils.js file
import axios from "axios";

const baseurl = "http://localhost:3000";

export const loginRequest = () => {
    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };
    return axios.get(baseurl + "/contact-form", config);
}

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/eriskjel',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export const postContactForm = (contactForm) => {
        return apiClient.post('/full-stack/contact-form', contactForm)
}

const calcClient = axios.create({
    baseURL: 'http://localhost:8081/api/calculator',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})


export const postCalcSolve = (calcSolve) => {
    return calcClient.post('/solve', calcSolve)
}

export const getAnswer = () => {
    return calcClient.get('/ans')
}

const loginAPI = axios.create({
    baseURL: 'http://localhost:8081/api/auth',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export const postLogin = (login) => {
    return loginAPI.post('/login', login)
}

export const getCalculations = () => {
    return calcClient.get('/allcalculations');
};

export const postRegister = (registerData) => {
    console.log(registerData);
    return loginAPI.post('/register', registerData);
};

