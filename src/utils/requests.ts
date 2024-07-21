import axios from 'axios';

import type {Axios, AxiosRequestConfig} from 'axios';

export type MyAxiosPromise<T = any> = Promise<T>;

interface AxiosInstance extends Axios {
    (config: AxiosRequestConfig): MyAxiosPromise;
    (url: string, config?: AxiosRequestConfig): MyAxiosPromise;
}


class MyAxiosClass {
    // axios 实例
    instance: AxiosInstance;

    constructor(config: AxiosRequestConfig) {
        // 创建axios实例  ts-ignore
        this.instance = axios.create(config);
    

        // 请求拦截器
        this.instance.interceptors.request.use(
            (config) => {
                // 
                return config;
            },
            (error) => {
                // 
                return Promise.reject(error);
            }
        );
        // 响应拦截器
        this.instance.interceptors.response.use(
            (response) => {
                // 
                return response;
            },
            (error) => {
                return Promise.reject(error);
            }
        );    
    }
    // 封装get请求
    get<T = any>
    (url: string, config?: AxiosRequestConfig<any> | undefined): 
    MyAxiosPromise<T> {
        return this.instance.get(url, config);
    }
    // 封装post请求
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined):
    MyAxiosPromise<T> {
        return this.instance.post(url, data, config);
    }

    // 封装put请求
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined):
    MyAxiosPromise<T> {
        return this.instance.put(url, data, config);
    }

    // 封装delete请求
    delete<T = any>(url: string, config?: AxiosRequestConfig<any> | undefined):
    MyAxiosPromise<T> {
        return this.instance.delete(url, config);
    }
}

export const MyAxios = new MyAxiosClass({
    timeout: 5000,
});