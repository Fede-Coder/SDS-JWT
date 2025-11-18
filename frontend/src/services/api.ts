import { useAuthStore } from "@/store/useAuth";
import axios from "axios";

const BASE_URL_ROOT = "http://localhost:3000";

const apiClient = axios.create({
	baseURL: `${BASE_URL_ROOT}/s`,
	withCredentials: true,
});

// REQUEST: agregar access token
apiClient.interceptors.request.use((config) => {
	const { accessToken, apiMode } = useAuthStore.getState();
	config.baseURL = `${BASE_URL_ROOT}/${apiMode}`;
	if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
	return config;
});

// RESPONSE: capturar nuevo access token que envía el backend
apiClient.interceptors.response.use(
	(res) => {
		const newToken = res.headers["authorization"]?.split(" ")[1];

		if (newToken) {
			useAuthStore.getState().setToken(newToken);
			console.log("Nuevo token guardado:", newToken);
		}
		return res;
	},
	(error) => {
		// Si la request falla, simplemente rechazar
		return Promise.reject(error);
	}
);

export default apiClient;
