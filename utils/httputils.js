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