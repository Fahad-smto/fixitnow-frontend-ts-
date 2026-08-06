import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';
import { setCookie, removeCookie } from './cookies';

interface AuthState {
  user: User | null;
  token: string | null;
  // Called right after a successful login/register to save the session
  setAuth: (user: User, token: string) => void;
  // Called on logout to clear everything
  clearAuth: () => void;
}

// zustand + persist automatically saves this to localStorage under the key below,
// and loads it back on page refresh — so the user stays logged in.
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        // Cookies are what our Next.js middleware reads to protect dashboard routes
        setCookie('fixitnow_token', token);
        setCookie('fixitnow_role', user.role);
        set({ user, token });
      },
      clearAuth: () => {
        removeCookie('fixitnow_token');
        removeCookie('fixitnow_role');
        set({ user: null, token: null });
      },
    }),
    { name: 'fixitnow-auth' }
  )
);
