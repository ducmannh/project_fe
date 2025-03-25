import axiosClient from './axiosClient';

interface CredentialsLogin {
    loginInput: string;
    password: string;
}

interface CredentialsRegister {
    username: string;
    password: string;
    email: string;
}

const authApi = {
    login: (credentials: CredentialsLogin) => axiosClient.post('/login', credentials),
    register: (credentials: CredentialsRegister) => axiosClient.post('/register', credentials),
    refreshToken: (refreshToken: string) => axiosClient.post('/refresh-token', { refreshToken }),
};

export default authApi;