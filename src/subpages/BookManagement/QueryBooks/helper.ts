import { bookREST } from "@/request"
import { Book, BookCategory, BookFilter, BooksResponse, BookState, CategoriesResponse, EditBook } from "@/types"

export const getBooksHelper = async (bookFilter: BookFilter, from = 0, limit = 20) => {
  const query = new URLSearchParams();
  Object.entries({ ...bookFilter, from, limit }).forEach(([key, value]) => {
    if (!value) return;
    query.append(key, typeof value === 'string' ? value.trim() : value.toString())
  });
  return await bookREST.getBooks(query)
}

export const converCategoryIdToName = (books: Book[], categoryMaps: CategoriesResponse[]): BookState[] => {
  (books as BookState[]).forEach(v => {
    const ids = [v.category_id1, v.category_id2, v.category_id3].filter(v => typeof v === 'number') as BookCategory;
    v.book_category = ids
      .map(id => categoryMaps.find(c => c.category_id === id)?.category_name)
      .filter(Boolean) as unknown as BookCategory;
  });
  return books as BookState[];
}

export const deleteBookHelper = async (bookId: number) => {
  return await bookREST.deleteBook(bookId);
}

export const editBookHelper = async (editBook: EditBook) => {
  return await bookREST.editBook(editBook)
}