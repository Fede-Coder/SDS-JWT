import { useGetProfile } from "@/hooks/useGetProfile";
import { useLogout } from "@/hooks/useLogout";
import { useNavigate } from "react-router";

function UserMenu() {
	const navigate = useNavigate();
	const profile = useGetProfile();
	const logout = useLogout();

	if (!profile.data) {
		return (
			<button
				className="btn btn-secondary px-2 py-1 rounded-md text-white font-bold"
				onClick={() => navigate("/auth/login")}
			>
				Iniciar sesión
			</button>
		);
	}

	return (
		<div className="flex items-center gap-2">
			<p className="text-base lg:text-xl">
				Hola <span className="">{profile.data?.firstName}</span>!
			</p>
			<button
				className="btn btn-primary text-base lg:text-xl"
				onClick={() => logout.mutate()}
				disabled={logout.isPending || profile.isFetching}
			>
				Cerrar sesión
			</button>
		</div>
	);
}

export default UserMenu;
