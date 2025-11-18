import apiClient from "@/services/api";
import { useAuthStore } from "@/store/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
	const clear = useAuthStore((s) => s.clear);
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => apiClient.post("/auth/logout"),
		onSuccess: () => {
			clear();
			delete apiClient.defaults.headers.common["Authorization"];
			queryClient.setQueryData(["profile"], null);
		},
	});
};
