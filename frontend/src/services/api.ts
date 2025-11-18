import { useAuthStore } from "@/store/useAuth";
import axios from "axios";

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

const apiClient = axios.create({
	baseURL: "http://localhost:3000/s",
	withCredentials: true,
});

// REQUEST: agrega token
apiClient.interceptors.request.use((config) => {
	const token = useAuthStore.getState().accessToken;
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

// RESPONSE: maneja 401
apiClient.interceptors.response.use(
	(res) => res,
	async (error) => {
		const originalRequest = error.config;
		const auth = useAuthStore.getState();

		// ⛔ Si el usuario está deslogueado → NO refrescar
		if (auth.loggedOut) {
			return Promise.reject(error);
		}

		// 401 y no se intentó reintentar
		if (error.response?.status === 401 && originalRequest && !originalRequest.__retry) {
			originalRequest.__retry = true;

			// 🍃 Si no estamos refrescando aún
			if (!isRefreshing) {
				isRefreshing = true;

				refreshPromise = apiClient
					.post("/auth/refresh")
					.then((res) => {
						const newToken = res.data.access_token;
						useAuthStore.getState().setToken(newToken);
						return newToken;
					})
					.catch((err) => {
						// ❌ Si refresh falla → cerrar sesión REAL
						useAuthStore.getState().clear();
						throw err;
					})
					.finally(() => {
						isRefreshing = false;
					});
			}

			const newToken = await refreshPromise;
			originalRequest.headers.Authorization = `Bearer ${newToken}`;

			return apiClient(originalRequest);
		}

		return Promise.reject(error);
	}
);

export default apiClient;
