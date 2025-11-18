import { useAuthStore } from "@/store/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/services/api";

export const useLogin = () => {
	const queryClient = useQueryClient();
	const setToken = useAuthStore((s) => s.setToken);

	return useMutation({
		mutationFn: (data: { email: string; password: string }) =>
			apiClient.post("/auth/login", data),
		onSuccess: async (res) => {
			const token = res.data.access_token;
			setToken(token);
			apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			await queryClient.refetchQueries({ queryKey: ["profile"] });
		},
	});
};
