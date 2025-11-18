import { useGetBook } from "@/hooks/useGetBook";
import { useGetProfile } from "@/hooks/useGetProfile";
import { EyeIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
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

	if (books.isLoading) return <>Loading...</>;

	if(profile.data)
		return (
			<div>
				<div role="alert" className="alert alert-info">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="h-6 w-6 shrink-0 stroke-current"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>
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
							<span className="underline font-bold">Apellido:</span>{" "}
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
															handleDelete(value.id)
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
