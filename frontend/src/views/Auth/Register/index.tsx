import { Link } from "react-router";

function Register() {
	return (
		<form className="card-body">
			<h2 className="card-title">Registrarse</h2>
			<div className="flex gap-2">
				<div className="flex flex-col gap-2">
					<label className="label">Nombre</label>
					<input type="firstname" className="input" />
				</div>
				<div className="flex flex-col gap-2">
					<label className="label">Apellido</label>
					<input type="lastname" className="input" />
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<label className="label">Correo</label>
				<input type="email" className="input w-full" />
			</div>
			<div className="flex flex-col gap-2">
				<label className="label">Contraseña</label>
				<input type="password" className="input w-full" />
			</div>
			<button className="btn btn-primary mt-4">Registrarse</button>
			<div className="text-xs flex gap-1 justify-center">
				<span className="font-extralight">¿Ya tienes una cuenta?</span>
				<Link to={"/auth/login"} className="link link-hover">
					Iniciar sesión
				</Link>
			</div>
		</form>
	);
}

export default Register;
