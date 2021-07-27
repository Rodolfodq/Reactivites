import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { setTimeout } from 'timers';
import { history } from '../..';
import { Activity } from '../models/activity';

const sleep = (delay: number) =>{
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

//axios.defaults.baseURL = 'https://localhost:44393/api/';
axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;    
}, (error: AxiosError) => {
    const {data, status} = error.response!; 
    switch(status){
        case 400:
            if(data.errors){
                const modalStateErros = [];
                for (const key in data.errors){
                    if(data.errors[key]){
                        modalStateErros.push(data.errors[key])
                    }
                }
                throw modalStateErros.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            toast.error('server error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (acitivity: Activity) => requests.post<void>('/activities', acitivity),
    update: (acitivity: Activity) => requests.put<void>(`/activities/${acitivity.id}`, acitivity),
    delete: (id: string) => requests.del<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;