import { Outlet } from "react-router";
import Header from "../Header";

function MainLayout() {
	return (
		<>
			<div className="flex flex-col min-h-screen bg-base-200">
				<Header />
				<main className="flex justify-center py-10">
					<Outlet />
				</main>
			</div>
		</>
	);
}

export default MainLayout;
