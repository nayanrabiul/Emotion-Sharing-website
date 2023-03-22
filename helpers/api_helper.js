import axios from "axios"

//apply base url for axios
const API_URL = 'https://jsonplaceholder.typicode.com'

const axiosApi = axios.create({
    baseURL: API_URL, validateStatus: function (status) {
        return status >= 200 && status < 600 // default
    },
})

axiosApi.interceptors.response.use(response => response, error => Promise.reject(error))

export async function get(url, data, config = {}) {
    return await axiosApi.
        get(url, {...config, params: data}).
        then(response => response)
}

export async function post(url, data, config = {}) {
    return axiosApi
        .post(url, data, {...config})
        .then(response => response.data)
}

export async function put(url, data, config = {}) {
    return axiosApi
        .put(url, {...data}, {...config})
        .then(response => response.data)
}

export async function del(url, data, config = {}) {
    return await axiosApi
        .delete(url, {...config, params: data})
        .then(response => response.data)
}