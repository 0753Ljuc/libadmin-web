import api from '@/api';
import { BooksResponse, BorrowItem, CategoriesResponse, EditBook, Gender, LoginParams, LoginResponse, Profile, RegisterParams } from '@/types';
import { NewBook, BorrowParams } from '@/types';

interface Error {
  error: string;
}

type Result<T = any> = { success: true, data: T; } | { success: false, data: Error }

async function handleReqest<T>(request: () => Promise<Response>): Promise<Result<T>> {
  const resp = await request();
  let data: any;
  const contentType = resp.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    data = await resp.json();
  } else if (contentType?.includes('text/html')) {
    data = await resp.text();
  } else {
    data = await resp.blob();
  }
  if (resp.status === 401) {
    window.location.href = '/';
  }
  return { success: resp.ok, data }
}

const commonConfig: RequestInit = {
  credentials: 'include'
}

const requestLogin = (body: FormData) => {
  return handleReqest<LoginResponse>(() => fetch(api.v1.auth.loginUser, {
    ...commonConfig,
    method: 'POST',
    body,
  }))
}

const requestRegister = (body: FormData) => {
  return handleReqest<{}>(() => fetch(api.v2.auth.signupUser, {
    ...commonConfig,
    method: 'POST',
    body,
  }))
}

const requestLogout = () => {
  return handleReqest<{}>(() => fetch(api.v1.auth.logoutUser, commonConfig))
}

const getProfile = () => {
  return handleReqest<Profile>(() => fetch(api.v1.profile.getProfile, commonConfig))
}

const getProfiles = () => {
  return handleReqest<Profile[]>(() => fetch(api.v1.profile.getProfiles, commonConfig))
}


const categoryREST = {
  getCategories: () => {
    return handleReqest<CategoriesResponse[]>(() => fetch(api.v1.categoryREST, commonConfig))
  },
  updateCategory: (id: number, category_name: string) => {
    return handleReqest<{}>(() => fetch(api.v1.categoryREST + `/${id}`, {
      ...commonConfig,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category_name }),
    }))
  },
  addCategory: (category_name: string) => {
    return handleReqest<{}>(() => fetch(api.v1.categoryREST, {
      ...commonConfig,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category_name }),
    }))
  },
  deleteCategory: (id: number) => {
    return handleReqest<{}>(() => fetch(api.v1.categoryREST + `/${id}`, {
      ...commonConfig,
      method: 'DELETE',
    }))
  }
}

const bookREST = {
  getBooks: (query: URLSearchParams) => {
    const url = new URL(api.v1.bookREST);
    url.search = query.toString();
    return handleReqest<BooksResponse>(() => fetch(url, commonConfig))
  },
  addbook: (book: NewBook) => {
    return handleReqest<{}>(() => fetch(api.v1.bookREST, {
      ...commonConfig,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    }))
  },
  editBook(book: EditBook) {
    return handleReqest<{}>(() => fetch(api.v1.bookREST, {
      ...commonConfig,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    }))
  },
  deleteBook(bookId: number) {
    return handleReqest<{}>(() => fetch(api.v1.bookREST + `/${bookId}`, {
      ...commonConfig,
      method: "DELETE"
    }))
  }
}

const borrowREST = {
  newBorrow: (body: BorrowParams) => {
    return handleReqest<{}>(() => fetch(api.v1.borrowREST, {
      ...commonConfig,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }))
  },
  getBorrows: () => {
    return handleReqest<BorrowItem[]>(() => fetch(api.v1.borrowREST, commonConfig))
  },
  returnBook: ({ book_id }: BorrowParams) => {
    return handleReqest<{}>(() => fetch(`${api.v1.borrowREST}/${book_id}`, {
      ...commonConfig,
      method: 'PUT',
    }))
  }
}

export {
  requestLogin,
  requestRegister,
  getProfile,
  getProfiles,
  requestLogout,
  categoryREST,
  bookREST,
  borrowREST
};