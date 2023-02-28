import { CandleProps } from "@/subpages/subpageConfig";
import { BorrowParams } from "@/types";
import { popError, popSuccess } from "@/utils/pop";
import { Button, Form, Input } from "antd";
import { returnBookHelper } from "../helper";

const ReturnBook: React.FC<CandleProps> = () => {

  const [form] = Form.useForm();

  const search = async ({ book_id }: BorrowParams) => {
    if (book_id === undefined) return popError("请输入书本编号");
    const resp = await returnBookHelper({ book_id });
    if (!resp.success) return popError(resp.data.error);
    popSuccess("归还成功");
    form.resetFields();
  }

  return (
    <div>

      <div>
        <Form layout="inline" onFinish={search} form={form} >

          <Form.Item name="book_id" label="书本编号" >
            <Input placeholder="请输入书本编号" />
          </Form.Item>

          <Button type="primary" htmlType="submit"> 归还 </Button>

        </Form>
      </div>

    </div>
  )
}

export default ReturnBook;