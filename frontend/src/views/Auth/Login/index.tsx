import { Link } from "react-router";

function Login() {
	return (
		<form className="card-body">
			<h2 className="card-title">Iniciar sesion</h2>
			<div className="flex flex-col gap-2">
				<label className="label">Correo</label>
				<input type="email" className="input w-full" />
			</div>
			<div className="flex flex-col gap-2">
				<label className="label">Contraseña</label>
				<input type="password" className="input w-full" />
			</div>
			<div>
				<a className="link link-hover text-xs">
					¿Has olvidado la contraseña?
				</a>
			</div>
			<button className="btn btn-primary mt-4">Iniciar cuenta</button>
			<div className="text-xs flex gap-1 justify-center">
				<span className="font-extralight">¿No tienes cuenta?</span>
				<Link to={"/auth/register"} className="link link-hover ">
					Registrarse
				</Link>
			</div>
		</form>
	);
}

export default Login;
