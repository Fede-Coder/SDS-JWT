interface IProps {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: IProps) => {
	// Generar los botones de paginación
	
	return (
		<div className="join my-4">
			<button
				className="join-item btn btn-primary"
				onClick={() => onPageChange(Math.max(1, page - 1))}
				disabled={page === 1}
			>
				«
			</button>

			<button className="join-item btn btn-secondary">Page {page}</button>

			<button
				className="join-item btn btn-primary"
				onClick={() => onPageChange(Math.min(totalPages, page + 1))}
				disabled={page === totalPages}
			>
				»
			</button>
		</div>
	);
};

export default Pagination;
