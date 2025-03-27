import { create } from 'zustand';
import authApi from '../api/authApi';

interface AuthStore {
    email: string | null;
    code: string | null;
    login: (loginInput: string, password: string) => Promise<void>;
    logout: () => void;
    forgotPassword: (email: string) => Promise<void>;
    verifyCode: (email: string, code: string) => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
    email: null,
    code: null,
    login: async (loginInput: string, password: string) => {
        const res = await authApi.login({ loginInput, password });
        const { accessToken, refreshToken } = res.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    },

    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    },

    forgotPassword: async (email: string) => {
        await authApi.forgotPassword(email);
        set({ email: email });
    },

    verifyCode: async (email: string, code: string) => {
        await authApi.verifyCode(email, code);
        set({ code: code });
    }
}));

export default useAuthStore;