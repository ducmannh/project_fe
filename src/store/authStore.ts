import { create } from 'zustand';
import authApi from '../api/authApi';

interface AuthStore {
    login: (loginInput: string, password: string) => Promise<void>;
    logout: () => void;
}

const useAuthStore = create<AuthStore>(() => ({
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
}));

export default useAuthStore;