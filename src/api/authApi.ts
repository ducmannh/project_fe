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
    forgotPassword: (email: string) => axiosClient.post('/forgot-password', { email }),
    verifyCode: (email: string, code: string) => axiosClient.post('/verify-code', { email, code }),
    resetPassword: (email: string, code: string, newPassword: string) => axiosClient.post('/reset-password', { email, code, newPassword }),
};

export default authApi;