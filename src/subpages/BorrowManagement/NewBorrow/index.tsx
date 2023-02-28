import { CandleProps } from "@/subpages/subpageConfig";
import { popError, popSuccess } from "@/utils/pop";
import { Button, Form, Input } from "antd";
import { newBorrowHelper } from "../helper";
import { BorrowParams } from "@/types";


const Index: React.FC<CandleProps> = (props) => {

  const [form] = Form.useForm();

  const search = async ({ book_id }: BorrowParams) => {
    if (book_id === undefined) return popError("请输入书本编号");
    const resp = await newBorrowHelper({ book_id: Number(book_id) });
    if (!resp.success) {
      return popError(resp.data.error);
    }
    popSuccess("借阅成功");

    form.resetFields();
  }

  return (
    <div>

      <div>
        <Form layout="inline" onFinish={search} form={form} >

          <Form.Item name="book_id" label="书本编号" >
            <Input placeholder="请输入编号" />
          </Form.Item>

          <Button type="primary" htmlType="submit"> 借阅 </Button>

        </Form>
      </div>

    </div>
  )
}

export default Index;