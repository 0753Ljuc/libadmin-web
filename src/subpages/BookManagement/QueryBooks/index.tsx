import { popError, popSuccess } from "@/utils/pop";
import { Button, Divider, Form, FormInstance, Input, InputRef, PaginationProps, Select, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { AnchorHTMLAttributes, ComponentType, createContext, DOMAttributes, useCallback, useContext, useEffect, useRef, useState } from "react";
import styled, { StyledComponent } from "styled-components";
import { getCategoriesHelper } from "../Categories/helper";
import { converCategoryIdToName, deleteBookHelper, editBookHelper, getBooksHelper } from "./helper";
import { Book, BookFilter, BookState, BookStatus, CategoriesResponse, ColumnTypes, EditableCellProps, EditableRowProps, EditBook, ProfileType } from "@/types";
import { renderBookStatus } from "@/components/BookStatus";
import { CandleProps } from "@/subpages/subpageConfig";
import { getEditable } from "@/components/Edtiable";
import Marquee from "react-fast-marquee";


const pageSize = 20;
const components = getEditable();

const QueryBooks: React.FC<CandleProps> = ({ profileType }) => {

  const [categories, setCategories] = useState<CategoriesResponse[]>([]);
  const [filter, setFilter] = useState<BookFilter>({ book_name: undefined, book_author: undefined, book_category: undefined })
  const [books, setBooks] = useState<BookState[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [form] = Form.useForm();
  const isAdmin = profileType === ProfileType.ADMIN;

  const initialize = async () => {
    const categoriesResp = await getCategoriesHelper();
    setLoading(false);
    if (!categoriesResp.success) return popError(categoriesResp.data.error);
    setCategories(categoriesResp.data)
  }

  const onPageChange: PaginationProps['onChange'] = async (page, pageSize) => {

    const bookFilter = form.getFieldsValue() as BookFilter;
    if (filter.book_author !== bookFilter.book_author
      || filter.book_category !== bookFilter.book_category
      || filter.book_name !== bookFilter.book_name) {
      return await onClickSearch(bookFilter)
    }

    const selectedBookSlice = books.slice((page - 1) * pageSize, page * pageSize);
    if (selectedBookSlice.length === 0) {
      setLoading(true);
      const resp = await getBooksHelper(bookFilter, (page - 1) * pageSize, pageSize);
      setLoading(false);
      if (!resp.success) return popError(resp.data.error);
      const { books: newBooks, total } = resp.data;
      converCategoryIdToName(newBooks, categories)
      setTotal(total);
      setBooks([...books, ...newBooks as BookState[]])
    }
    setCurrent(page)
  }

  const showTotal = (total: number) => `共 ${total} 条`;

  const onClickSearch = async (bookFilter: BookFilter) => {
    setFilter(bookFilter);
    setLoading(true);
    const resp = await getBooksHelper(bookFilter);
    setLoading(false);
    if (!resp.success) return popError(resp.data.error);
    const { books, total } = resp.data;
    converCategoryIdToName(books, categories)
    setTotal(total);
    setBooks(books as BookState[])
    setCurrent(1)
  };

  const onDelete = async ({ book_id }: BookState) => {

    const resp = await deleteBookHelper(Number(book_id));
    if (!resp.success) {
      return popError(resp.data.error)
    }
    popSuccess("删除成功")
    setBooks(books => books.filter(b => b.book_id != book_id))
  }

  const save = async (newBook: BookState, oldBook: BookState) => {

    // @ts-ignore
    const changedKey = Object.keys(oldBook).filter((key) => newBook[key] !== oldBook[key]) as (keyof EditBook)[];
    if (!changedKey.length) return;

    const editBook: EditBook = { book_id: oldBook.book_id };
    changedKey.forEach(key => {
      if (key === "book_category") {
        // todo 
        console.log(newBook)
      } else {
        // @ts-ignore
        editBook[key] = newBook[key]
      }
    })

    const resp = await editBookHelper(editBook);
    if (!resp.success) {
      return popError(resp.data.error)
    }
    setBooks(books => {
      const bs = books.map(v => v.book_id === oldBook.book_id ? { ...v, ...editBook } : v)
      return [...bs]
    })
  }

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: '编号',
      dataIndex: 'book_id',
      width: 50,
    },
    {
      title: '书名',
      dataIndex: 'book_name',
      ellipsis: true,
      editable: isAdmin
    },
    {
      title: '作者',
      dataIndex: 'book_author',
      ellipsis: true,
      editable: isAdmin
    },
    {
      title: '出版社',
      dataIndex: 'book_publisher',
      ellipsis: true,
      editable: isAdmin
    },
    {
      title: '类别',
      dataIndex: 'book_category',
      render: (categories: string[]) => <CategoryColumn categories={categories} />
    },
    {
      title: '描述',
      dataIndex: 'book_description',
      ellipsis: true,
      editable: isAdmin
    },
    {
      title: '状态',
      dataIndex: 'status',
      //@ts-ignore
      render: renderBookStatus,
    },
    isAdmin ? {
      title: '操作',
      dataIndex: 'operation',
      //@ts-ignore
      render: (_, obj) => <a onClick={() => onDelete(obj)}>删除</a>,
    } : undefined as any
  ];


  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: BookState) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        ellipsis: col.ellipsis,
        handleSave: (newValue: BookState) => save(newValue, record),
      }),
    };
  });

  useEffect(() => {
    initialize()
  }, [])
  return (
    <div>
      <Filter>
        <Form onFinish={onClickSearch} form={form} layout="inline" >

          <Form.Item name="book_name" label="关键字" >
            <Input placeholder="请输入关键字" />
          </Form.Item>

          <Form.Item name="book_author" label="作者" >
            <Input placeholder="请输入作者" />
          </Form.Item>

          <Form.Item name="book_category" label="类别"  >
            <Select placeholder="选择类别" style={{ textAlign: 'left' }} >
              {categories.map(v => (
                <Select.Option value={v.category_id} key={v.category_id}>
                  {v.category_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit"> 查询 </Button>
          <Button onClick={() => form.resetFields()} > 清空 </Button>

        </Form>
      </Filter>

      <Content>
        <Table
          columns={columns as ColumnsType<BookState>}
          dataSource={books}
          components={components}
          size="small"
          rowKey={record => record.book_id}
          loading={false}
          scroll={{ y: 300 }}
          pagination={{ pageSize, total, onChange: onPageChange, showTotal, current }}
        />
      </Content>
    </div >
  )
}

const CategoryCell = styled.span`
  margin-right: 8px;
  padding: 0 4px;
  font-size: 12px;
  background-color: teal;
  color: white;
  border-radius: 4px;
`

const CategoryColumn: React.FC<{ categories: string[] }> = ({ categories }) => {
  return (
    <div >
      {categories.length > 0
        ? <Marquee gradient={false} >
          {categories.map(v => <CategoryCell key={v}>{v}</CategoryCell>)}
        </Marquee>
        : <span style={{ color: 'gray' }}>无</span>
      }
    </div >
  )
}


const Filter = styled.div`
  margin-bottom: 8px;
`

const Content = styled.div` `

export default QueryBooks;