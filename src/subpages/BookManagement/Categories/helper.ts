import { categoryREST } from "@/request";
import { CategoriesResponse, CategoryFormDataSource } from "@/types";


export const getCategoriesHelper = async () => {
  return await categoryREST.getCategories();
}

export const updateCategoriesHelper = async (id: number, category_name: string) => {
  return await categoryREST.updateCategory(id, category_name);
}

export const addCategoriesHelper = async (category_name: string) => {
  return await categoryREST.addCategory(category_name);
}

export const deleteCategoryHelper = async (id: number) => {
  return await categoryREST.deleteCategory(id);
}


export const categories2FormDataSource = (categories: CategoriesResponse[]): CategoryFormDataSource[] => {
  return categories.map((category) => ({
    key: category.category_id,
    id: category.category_id,
    category: category.category_name,
  }));
}
