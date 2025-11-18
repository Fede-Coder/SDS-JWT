import apiClient from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteBook = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => apiClient.delete(`/books/${id}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["books"] });
		},
	});
};
