/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

const BACKEND_URL = import.meta.env.VITE_API_URL

type LoginResponse =
    | { success: true; data: any }
    | { success: false; error: Record<string, string> };

interface AuthState {
    isLogged: boolean;
    loading: boolean;
    checked: boolean;
    error: string[] | null;
    username: string | null;
    login: (userData: { username: string, password: string }) => Promise<LoginResponse>;
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
    logout: () => void;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLogged: false,
            loading: false,
            error: null,
            username: null,
            checked: false,
            login: async (userData) => {
                set({ loading: true, error: null })
                try {
                    const res = await fetch(`${BACKEND_URL}/auth/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify(userData)
                    })

                    const data = await res.json();

                    if (!res.ok) {
                        set({ error: data.details, loading: false })
                        return { success: false, error: data.details };
                    }

                    set({ loading: false, isLogged: true, username: data.username })
                    return { success: true, data };
                } catch (err: any) {
                    set({ error: err?.response.data || "Error no controlado", loading: false, isLogged: false })
                    return { success: false, error: err };
                }
            },

            register: async (userData) => {
                set({ loading: true, error: null })
                try {
                    const res = await fetch(`${BACKEND_URL}/auth/register`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(userData)
                    })

                    const data = await res.json();

                    if (!res.ok) {
                        set({ loading: false, error: data.details })
                        return { success: false, error: data.details };
                    }

                    set({ loading: false, error: null })
                    return { success: true, data };

                } catch (err: any) {
                    set({ error: err?.response.data || "Error no controlado", loading: false, isLogged: false })
                    return { success: false, error: err };
                }
            },

            logout: () => {
                const response = fetch(`${BACKEND_URL}/logout`, {
                    method: 'POST',
                    credentials: 'include'
                });
                set({ isLogged: false, username: null });
                localStorage.clear()
                return response;
            },

            checkAuth: async () => {
                try {
                    const res = await fetch(`${BACKEND_URL}/auth/check`, {
                        method: 'GET',
                        credentials: 'include',
                    })

                    if (!res.ok) {
                        set({ isLogged: false, username: null, loading: false })
                        return
                    }

                    const data = await res.json()
                    set({ isLogged: true, username: data.username, loading: false })
                } catch {
                    set({ isLogged: false, username: null, loading: false })
                } finally {
                    set({checked: true})
                }
            }
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                isLogged: state.isLogged,
                username: state.username,
            })
        }
    )
)