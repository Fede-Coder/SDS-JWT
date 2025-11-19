import { useRegister } from "@/hooks/useRegisterMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import z from "zod";

const registerSchema = z.object({
	firstName: z.string().min(1, "El nombre es obligatorio"),
	lastName: z.string().min(1, "El apellido es obligatorio"),
	email: z.email("Ingresa un correo válido"),
	password: z
		.string()
		.min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type RegisterForm = z.infer<typeof registerSchema>;

function Register() {
	const navigate = useNavigate();
	const signUp = useRegister();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterForm>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterForm) => {
		signUp.mutate(data, {
			onSuccess: async () => {
				navigate("/auth/login");
			},
		});
	};

	return (
		<form className="card-body" onSubmit={handleSubmit(onSubmit)}>
			<h2 className="card-title">Registrarse</h2>
			<div className="flex gap-2">
				<div className="flex flex-col gap-2">
					<label className="label">Nombre</label>
					<input
						type="firstname"
						className="input"
						{...register("firstName")}
					/>
					{errors.firstName && (
						<span className="text-red-500 text-xs">
							{errors.firstName.message}
						</span>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<label className="label">Apellido</label>
					<input
						type="lastname"
						className="input"
						{...register("lastName")}
					/>
					{errors.lastName && (
						<span className="text-red-500 text-xs">
							{errors.lastName.message}
						</span>
					)}
				</div>
			</div>
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
			<button className="btn btn-primary mt-4" disabled={isSubmitting}>
				Registrarse
			</button>
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
