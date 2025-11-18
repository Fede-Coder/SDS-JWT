import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/hooks/useAuthMutation";

const loginSchema = z.object({
	email: z
		.email("Debe ser un correo válido")
		.nonempty("El correo es obligatorio"),
	password: z
		.string()
		.min(6, "La contraseña debe tener mínimo 6 caracteres")
		.nonempty("La contraseña es obligatoria"),
});

// Tipado inferido de Zod
type LoginForm = z.infer<typeof loginSchema>;

function Login() {
	const login = useLogin();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginForm>({
		resolver: zodResolver(loginSchema),
	});

	// 3. Handler del submit
	const onSubmit = async (data: LoginForm) => {
		login.mutate(data, {
			onSuccess: async () => {
				navigate("/books");
			},
		});
	};

	return (
		<form className="card-body" onSubmit={handleSubmit(onSubmit)}>
			<h2 className="card-title">Iniciar sesion</h2>
			<div className="flex flex-col gap-2">
				<label className="label">Correo</label>
				<input
					type="email"
					className="input w-full"
					{...register("email")}
				/>
				{errors.email && (
					<span className="text-red-500 text-xs">
						{errors.email.message}
					</span>
				)}
			</div>
			<div className="flex flex-col gap-2">
				<label className="label">Contraseña</label>
				<input
					type="password"
					className="input w-full"
					{...register("password")}
				/>
				{errors.password && (
					<span className="text-red-500 text-xs">
						{errors.password.message}
					</span>
				)}
			</div>
			<div>
				<a className="link link-hover text-xs">
					¿Has olvidado la contraseña?
				</a>
			</div>
			<button className="btn btn-primary mt-4" disabled={isSubmitting}>
				{isSubmitting ? "Cargando..." : "Iniciar cuenta"}
			</button>
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
