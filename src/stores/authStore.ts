/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'

const BACKEND_URL = 'https://localhost:8443/api'

type LoginResponse =
  | { success: true; data: any }
  | { success: false; error: Record<string, string> };

interface AuthState {
    isLogged: boolean;
    loading: boolean;
    error: string[] | null;
    login: (userData: {username: string, password: string}) => Promise<LoginResponse>;
    register: (userData: {
        username: string,
        dni: string,
        email: string,
        password: string,
        repeatPassword: string,
        name: string,
        lastname: string,
        birthdate: string,
        phone: string
    }) => Promise<any>;
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

            const data = await res.json();

            if(!res.ok) {
                set({error: data.details, loading: false})
                return { success: false, error: data.details };
            }

            set({loading: false, isLogged: true})
            return { success: true, data };
        } catch (err: any) {
            set({error: err?.response.data || "Error no controlado", loading: false, isLogged: false})
            return { success: false, error: err };
        }
    },

    register: async(userData) => {
        set({loading: true, error: null})
        try {
            const res = await fetch(`${BACKEND_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
            })        

            const data = await res.json();

            if(!res.ok) {
                set({loading: false, error: data.details})
                return { success: false, error: data.details };
            }

            set ({loading: false, error: null})
            return { success: true, data };
            
        } catch(err: any) {
            set({error: err?.response.data || "Error no controlado", loading: false, isLogged: false})
            return { success: false, error: err };
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