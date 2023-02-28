import { Book, BookStatus } from "@/types";
import { matchBookStatus } from "@/utils/helper";
import { Tag } from "antd";

export const renderBookStatus = (_: any, { status }: Book) => {
  const text = matchBookStatus(status);
  switch (Number(status)) {
    case BookStatus.AVAILABLE:
      return <Tag color='success' >{text}</Tag>
    case BookStatus.BORROWED:
      return <Tag color='warning' >{text}</Tag>
    case BookStatus.RESERVED:
      return <Tag color='red' >{text}</Tag>
    default:
      break;
  }
}