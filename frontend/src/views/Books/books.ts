interface IBook {
	id: string;
	title: string;
	author: string;
	genre: string;
	publicationDate: Date;
    pages: number;
	description: string;
	isbn: string;
}

export interface IBookResponse {
	page: number,
	limit: number,
	totalPages: number,
	data: IBook[]
}