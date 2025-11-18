import images from "@/assets/img";
import { useNavigate } from "react-router";

function Home() {
	const navigate = useNavigate();
	return (
		<div
			className="hero min-h-screen relative"
			style={{
				backgroundImage: `url(${images.background})`,
			}}
		>
			<div className="hero-overlay"></div>
			<div className="hero-content text-neutral-content text-center">
				<div className="max-w-xl">
					<h1 className="mb-5 text-6xl font-bold">
						Biblioteca Digital
					</h1>
					<p className="mb-5">
						Descubrí y gestioná tus libros desde un solo lugar. Los
						administradores mantienen actualizado el catálogo y los
						usuarios acceden fácilmente a todos los títulos
						disponibles.
					</p>
					<button
						className="btn btn-secondary"
						onClick={() => navigate("/books")}
					>
						Explorar libros
					</button>
				</div>
			</div>
			<div className="text-white absolute bottom-5">
				Foto de{" "}
				<a
					href="https://unsplash.com/es/@tama66?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
					className="link"
				>
					Peter Herrmann
				</a>{" "}
				en{" "}
				<a
					href="https://unsplash.com/es/fotos/una-habitacion-con-un-monton-de-libros-O_DUcg4cDlc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
					className="link"
				>
					Unsplash
				</a>
			</div>
		</div>
	);
}

export default Home;
