import { BorrowedBorrowStatus, BorrowItem } from "@/types";
import { matchBorrowedBookStatus } from "@/utils/helper";
import { Tag } from "antd";

export const renderBorrowedBookStatus = (_: any, { borrow_status }: BorrowItem) => {
  const text = matchBorrowedBookStatus(borrow_status);
  switch (Number(borrow_status)) {
    case BorrowedBorrowStatus.RETURNED:
      return <Tag color='success' >{text}</Tag>
    case BorrowedBorrowStatus.UNRETURNED:
      return <Tag color='warning' >{text}</Tag>
    default:
      return <Tag color='red' >{text}</Tag>
  }
}