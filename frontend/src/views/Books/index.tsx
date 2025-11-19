import { useGetBook } from "@/hooks/useGetBook";
import { useGetProfile } from "@/hooks/useGetProfile";
import {
	EyeIcon,
	InfoIcon,
	PencilSimpleIcon,
	TrashIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import Pagination from "./pagination";
import { useDeleteBook } from "@/hooks/useDeleteBook";
import dayjs from "dayjs";

const format = "DD/MM/YYYY HH:mm:ss";

function Books() {
	const [page, setPage] = useState(1);
	const limit = 10;

	const books = useGetBook({ page, limit });
	const deleteBook = useDeleteBook();
	const profile = useGetProfile();

	const handleDelete = (id: string) => {
		if (confirm("¿Estás seguro que quieres eliminar este libro?")) {
			deleteBook.mutate(id);
		}
	};

	if (books.isLoading || profile.isLoading)
		return (
			<div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
				<table className="table">
					<thead>
						<tr>
							<th>Título</th>
							<th>Autor</th>
							<th>Género</th>
							<th>Año</th>
							<th>Páginas</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<div className="skeleton h-4 w-full"></div>
							</td>
							<td>
								<div className="skeleton h-4 w-full"></div>
							</td>
							<td>
								<div className="skeleton h-4 w-full"></div>
							</td>
							<td>
								<div className="skeleton h-4 w-full"></div>
							</td>
							<td>
								<div className="skeleton h-4 w-full"></div>
							</td>
							<td>
								<div className="skeleton h-4 w-full"></div>
							</td>
						</tr>
						<tr>
							<td>
								<div className="skeleton h-4 w-full"></div>
							</td>
							<td>
								<div className="skeleton h-4 w-full"></div>
							</td>
							<td>
								<div className="skeleton h-4 w-full"></div>
							</td>
							<td>
								<div className="skeleton h-4 w-full"></div>
							</td>
							<td>
								<div className="skeleton h-4 w-full"></div>
							</td>
							<td>
								<div className="skeleton h-4 w-full"></div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);

	if (books.isError || !books.data || profile.isError || !profile.data)
		return (
			<div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
				<table className="table">
					<thead>
						<tr>
							<th>Título</th>
							<th>Autor</th>
							<th>Género</th>
							<th>Año</th>
							<th>Páginas</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td colSpan={6} className="text-center py-6">
								Debe iniciar la sesión para ver lista de libros
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);

	if (books.data && profile.data)
		return (
			<div>
				<div role="alert" className="alert alert-info">
					<InfoIcon size={32} />
					<div>
						<p>
							<span className="underline font-bold">Id:</span>{" "}
							{profile.data.sub}
						</p>
						<p>
							<span className="underline font-bold">Email:</span>{" "}
							{profile.data.email}
						</p>
						<p>
							<span className="underline font-bold">Nombre:</span>{" "}
							{profile.data.firstName}
						</p>
						<p>
							<span className="underline font-bold">
								Apellido:
							</span>{" "}
							{profile.data.lastName}
						</p>
						<p>
							<span className="underline font-bold">Role:</span>{" "}
							{profile.data.role}
						</p>
						<p>
							<span className="underline font-bold">Iat:</span>{" "}
							{dayjs.unix(profile.data.iat).format(format)}
						</p>
						<p>
							<span className="underline font-bold">Exp:</span>{" "}
							{dayjs.unix(profile.data.exp).format(format)}
						</p>
					</div>
				</div>
				<br />
				<div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
					<table className="table">
						<thead>
							<tr>
								<th>Título</th>
								<th>Autor</th>
								<th>Género</th>
								<th>Año</th>
								<th>Páginas</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{books.data?.data.map((value) => (
								<tr key={value.id}>
									<td>{value.title}</td>
									<td>{value.author}</td>
									<td>{value.genre}</td>
									<td>
										{new Date(
											value.publicationDate
										).getFullYear()}
									</td>
									<td>{value.pages}</td>
									<td className="flex gap-1">
										<button className="btn btn-sm btn-info btn-square">
											<EyeIcon size={20} />
										</button>
										{profile.data &&
											profile.data.role === "ADMIN" && (
												<>
													<button className="btn btn-sm btn-warning btn-square">
														<PencilSimpleIcon
															size={20}
														/>
													</button>
													<button
														className="btn btn-sm btn-error btn-square"
														onClick={() =>
															handleDelete(
																value.id
															)
														}
													>
														<TrashIcon size={20} />
													</button>
												</>
											)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="flex justify-center">
					{books.data && (
						<Pagination
							page={page}
							totalPages={books.data.totalPages}
							onPageChange={setPage}
						/>
					)}
				</div>
			</div>
		);
}

export default Books;
