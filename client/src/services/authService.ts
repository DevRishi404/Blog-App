import axios, { AxiosError } from "axios";

interface signUpLoginData {
    email: string,
    password: string
}

export const signUp = async (data: signUpLoginData): Promise<any> => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', data);
        return response.data;
    } catch (e) {
        const error = e as AxiosError;
        throw error.response?.data || error.message;
    }
}

export const login = async (data: signUpLoginData): Promise<any> => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', data);
        return response.data;
    } catch (e) {
        const error = e as AxiosError;
        throw error.response?.data || error.message;
    }
}