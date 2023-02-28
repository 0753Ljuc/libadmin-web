

import { MenuProps, Table } from "antd";

export interface Profile {
  username: String,
  gender: String,
  user_id: number
  profile_id: number,
  created_at: String,
  profile_type: ProfileType,
  email: String,
}

export enum ProfileType {
  USER = 0,
  ADMIN = 1,
}

type MenuItem = Required<MenuProps>['items'][number];

export interface CustomMunuItem {
  label: string,
  key: React.Key,
  icon?: React.ReactNode,
  children?: CustomMunuItem[],
  type?: 'group',
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  email: string,
  username: string,
  password: string,
  password2: string,
  gender: Gender,
}

export interface RegisterProps {
  onReturn?: () => void,
}

export interface LoginResponse {
  id: string,
  email: string,
  token: string,
  image?: string,
}

export enum Role {
  User = 1,
  Admin = 2,
}

export enum Gender {
  Female = 0,
  Male = 1,
}

export interface EditItem {
  key: string;
  kind: string;
  count: string;
  address: string;
}

export interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof EditItem;
  ellipsis?: boolean,
  record: EditItem;
  handleSave: (record: EditItem) => void;
}

export interface EditableRowProps {
  index: number;
}

export interface CategoriesResponse {
  category_id: number,
  category_name: string,
}

export interface CategoryFormDataSource {
  key: string | number,
  id: number,
  category: string,
}

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;


// export interface NewBook {
//   book_name: string,
//   book_author: string,
//   book_publisher: string,
//   book_price: number,
//   book_description: string,
//   book_category: [number | null, number | null, number | null]
// }
export type NewBook = Pick<Book, 'book_name' | 'book_author' | 'book_publisher' | 'book_price' | 'book_description'>
  & { book_category: BookCategory }

export type EditBook = Partial<NewBook> & { book_id: number };

export interface Book {
  book_id: number,
  book_name: string,
  book_author: string,
  book_publisher: string,
  book_price: number,
  book_description: string,
  category_id1: number | null,
  category_id2: number | null,
  category_id3: number | null,
  status: i32, // 0: 可借, 1: 已借出, 2: 维护
}

export interface BooksResponse {
  books: Book[],
  total: number,
  from: number,
  limit: number,
}

export interface BookFilter {
  book_author: string | undefined,
  book_category: number | undefined,
  book_name: string | undefined,
}
type BookCategory = [number | null, number | null, number | null]
type BookState = Book & { book_category: BookCategory }

export interface BorrowParams {
  book_id: number;
}

export interface BorrowItem {
  book_id: number;
  borrow_date: string;
  borrow_id: number;
  user_id: number;
  book_name: string;
  borrow_status: BorrowStatus; // 0: 未归还, 1: 已归还
  username: string,
}

export enum BorrowedBorrowStatus {
  UNRETURNED = 0,
  RETURNED = 1,
}

export enum BookStatus {
  AVAILABLE = 0,
  BORROWED = 1,
  RESERVED = 2,
}