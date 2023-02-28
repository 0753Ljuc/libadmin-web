import { bookREST } from "@/request"
import { NewBook } from "@/types"

export const addBookHelper = async (body: NewBook) => {
  return await bookREST.addbook(body)
}