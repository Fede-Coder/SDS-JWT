import "./index.css";
import { Route, Routes } from "react-router";
import Auth from "./views/Auth";
import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register";
import Home from "./views/Home";
import Books from "./views/Books";
import MainLayout from "./components/MainLayout";
import { useAuthStore } from "./store/useAuth";

function App() {
	const authStore = useAuthStore();
	const apiModeDisplay =
		authStore.apiMode === "s" ? "Solution" : "Vulnerability";
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route element={<MainLayout />}>
					<Route path="/books" element={<Books />} />
				</Route>
				<Route path="auth" element={<Auth />}>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>
			</Routes>

			<div
				className="fixed bottom-2.5 left-2.5 bg-black/70 text-white px-2.5 py-1 rounded-md z-1000 cursor-pointer"
				onClick={() => authStore.toggleApiMode()}
			>
				API Actual: {apiModeDisplay}
			</div>
		</>
	);
}

export default App;
