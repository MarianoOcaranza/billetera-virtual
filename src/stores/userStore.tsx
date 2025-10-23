import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface User {
  name: string;
  lastname: string;
  alias: string;
  cvu: string;
  balance: number;
  recentTransactions: Transaction[];
}

interface Transaction {
  DestinationName: string;
  DestinationLastName: string;
  OriginName: string;
  OriginLastname: string
  date: string;
  type: string;
  amount: number
}

interface UserStore {
  user: User | null;
  loadingUser: boolean;
  hydrated: boolean
  getUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      loadingUser: false,
      hydrated: false,
      getUser: async () => {
        set({loadingUser: true})
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
            credentials: "include",
          });

          if (res.ok) {
            const data = await res.json();
            set({user: data});
            console.log(data)
          }
        } catch {
          throw new Error("Error inesperado tratando de obtener los datos del usuario");
        } finally {
            set({loadingUser: false, hydrated: true})
        }
      },
    }),
    {name: "user-data"}
  )
)