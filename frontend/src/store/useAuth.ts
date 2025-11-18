import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
	apiMode: "s" | "v";
	accessToken: string | null;
	setToken: (value: string) => void;
	clear: () => void;
	toggleApiMode: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			apiMode: "s",
			accessToken: null,
			setToken: (token) => set({ accessToken: token }),
			clear: () => set({ accessToken: null }),
			toggleApiMode: () =>
				set((state) => ({
					apiMode: state.apiMode === "s" ? "v" : "s",
				})),
		}),
		{
			name: "auth-storage",
			partialize(state) {
				return { apiMode: state.apiMode };
			},
		}
	)
);
