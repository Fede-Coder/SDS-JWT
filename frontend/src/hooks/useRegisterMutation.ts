import apiClient from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
	//const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: {
			firstName: string;
			lastName: string;
			email: string;
			password: string;
		}) => apiClient.post("/auth/register", data),
		onSuccess: async () => {},
	});
};
