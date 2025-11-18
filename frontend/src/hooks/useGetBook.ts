import apiClient from "@/services/api";
import type { IBookResponse } from "@/views/Books/books";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

interface UseGetBooksOptions {
	page: number;
	limit: number;
}

export const useGetBook = ({ page, limit }: UseGetBooksOptions) => {
	return useQuery<IBookResponse | null, AxiosError>({
		queryKey: ["books", page, limit],
		queryFn: () =>
			apiClient
				.get(`/books?page=${page}&limit=${limit}`)
				.then((res) => res.data),
	});
};
