import apiClient from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

interface Profile {
	sub: string;
	email: string;
	firstName: string;
	lastName: string;
	role: string;
	iat: number;
	exp: number;
}

export const useGetProfile = () => {
	return useQuery<Profile | null, AxiosError>({
		queryKey: ["profile"],
		queryFn: () => apiClient.get("/auth/profile").then((res) => res.data),
		retry: 0,
	});
};
