import { create } from "zustand";

interface AuthState {
	accessToken: string | null;
	setToken: (value: string) => void;
	clear: () => void;
	loggedOut: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
	accessToken: null,
	loggedOut: false,
	setToken: (token) => set({ accessToken: token, loggedOut: false }),
	clear: () => set({ accessToken: null, loggedOut: true }),
}));
