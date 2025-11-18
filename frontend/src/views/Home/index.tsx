import images from "@/assets/img";
import { useNavigate } from "react-router";

function Home() {
	const navigate = useNavigate();
	return (
		<div
			className="hero min-h-screen"
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
					<button className="btn btn-secondary" onClick={() => navigate("/books")}>
						Explorar libros
					</button>
				</div>
			</div>
		</div>
	);
}

export default Home;
