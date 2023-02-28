import { borrowREST } from "@/request"
import { BorrowItem, BorrowParams } from "@/types";

export const newBorrowHelper = async (params: BorrowParams) => {
  return await borrowREST.newBorrow(params);
}

export const getBorrowsHelper = async () => {
  return await borrowREST.getBorrows();
}

export const returnBookHelper = async (params: BorrowParams) => {
  return await borrowREST.returnBook(params);
}