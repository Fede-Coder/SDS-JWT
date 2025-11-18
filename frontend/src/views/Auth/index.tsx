import images from "@/assets/img";
import { Outlet, useNavigate } from "react-router";
import { HouseLineIcon } from "@phosphor-icons/react";

function Auth() {
	const navigate = useNavigate()
	return (
		<>
			<div className="flex flex-col items-center w-full min-h-screen justify-center bg-base-200">
				<div>
					<img src={images.logo} alt="asd" className="size-64" />
				</div>
				<div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl min-w-sm">
					<div className="px-6 pt-6">
						<button className="btn btn-secondary" onClick={() => navigate("/")}>
							<HouseLineIcon size={18} />
						</button>
					</div>
					<Outlet />
				</div>
			</div>
		</>
	);
}

export default Auth;
