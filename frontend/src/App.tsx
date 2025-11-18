import "./index.css";
import { Route, Routes } from "react-router";
import Auth from "./views/Auth";
import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register";
import Home from "./views/Home";
import Books from "./views/Books";
import MainLayout from "./components/MainLayout";

function App() {
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
		</>
	);
}

export default App;
