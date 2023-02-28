import { CandleProps } from "@/subpages/subpageConfig";
import { popError } from "@/utils/pop";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import { getBorrowsHelper } from "../helper";
import { BorrowItem, BorrowedBorrowStatus } from "@/types";
import { matchBorrowedBookStatus } from "@/utils/helper";
import { renderBorrowedBookStatus } from "@/components/BorrowedBookStatus";


const Index: React.FC<CandleProps> = () => {
  const [borrowItems, setBorrowItems] = useState<BorrowItem[]>([]);

  const init = async () => {
    const resp = await getBorrowsHelper();
    if (!resp.success) return popError(resp.data.error);
    setBorrowItems(resp.data);
  }

  useEffect(() => {
    init();
  }, [])


  return (

    <div>
      <Table columns={columns} dataSource={borrowItems} />
    </div>
  )
}

const columns: ColumnsType<BorrowItem> = [
  {
    title: 'Id',
    dataIndex: 'borrow_id',
    key: 'borrow_id',
  },
  {
    title: '书名',
    dataIndex: 'book_name',
    key: 'book_name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '书本编号',
    dataIndex: 'book_id',
    key: 'book_id',
  },
  {
    title: '借阅日期',
    dataIndex: 'borrow_date',
    key: 'borrow_date',
  },
  {
    title: '借阅人',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '状态',
    dataIndex: 'borrow_status',
    key: 'borrow_status',
    render: renderBorrowedBookStatus
  },

];



export default Index;