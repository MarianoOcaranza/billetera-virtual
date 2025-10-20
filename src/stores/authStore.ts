/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'

const BACKEND_URL = 'https://8d5fada2fd20.ngrok-free.app/api'

interface AuthState {
    isLogged: boolean;
    loading: boolean;
    error: string | null;
    login: (userData: {username: string, password: string}) => Promise<Response | undefined>
    logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    isLogged: false,
    loading: false,
    error: null,

    login: async (userData) => {
        set({loading: true, error: null})
        try {
            const res = await fetch(`${BACKEND_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(userData)
            })
            set({loading: false, isLogged: true})
            return res
        } catch (err: any) {
            set({error: err?.response.data || "Error no controlado", loading: false, isLogged: false})
        }
    },

    logout: () => {
        const response = fetch(`${BACKEND_URL}/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        set({isLogged: false});
        return response;
    }
}))