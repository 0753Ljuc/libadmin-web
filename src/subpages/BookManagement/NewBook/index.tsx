import { popError } from "@/utils/pop"
import { Button, Divider, Form, InputNumber, message, Select } from "antd"
import Input from "antd/es/input/Input"
import TextArea from "antd/es/input/TextArea"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { getCategoriesHelper } from "../Categories/helper"

import { addBookHelper } from "./helper"
import { NewBook ,CategoriesResponse} from "@/types"


const NewBookSubPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoriesResponse[]>([]);
  const [selectValue, setSelectValue] = useState<number[]>([])
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const onSelectChange = (value: number[]) => {
    if (selectValue.length === 3 && value.length > 3) {
      messageApi.warning("最多只能选择三个类别")
      return;
    }
    setSelectValue(value)
  }

  const submit = async (e: any) => {
    e.book_description = e.book_description || "";
    e.book_category = e.book_category || [];
    const resp = await addBookHelper(e);
    if (!resp.success) return popError(resp.data.error);
    form.resetFields();
    messageApi.success("添加成功")
  }

  const init = async () => {
    const categoriesResp = await getCategoriesHelper();
    if (!categoriesResp.success) return popError(categoriesResp.data.error);
    setCategories(categoriesResp.data)
  }

  useEffect(() => {
    init()
  }, [])
  return (
    <WrapperLayout >
      {contextHolder}
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        size="small"
        style={{ maxWidth: 600, width: '100%' }}
        onFinish={submit}
      >
        <Divider> 新增书籍 </ Divider >

        <Form.Item label="书名" name="book_name" rules={[{ required: true, message: "书名不能为空" }]} >
          <Input />
        </Form.Item>

        <Form.Item label="作者" name="book_author" rules={[{ required: true, message: "作者不能为空" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="出版社" name="book_publisher" rules={[{ required: true, message: "出版社不能为空" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="类别" name="book_category">
          <Select
            mode="multiple"
            allowClear
            placeholder="Please select"
            value={selectValue}
            options={categories2Options(categories)}
            onChange={onSelectChange}
          />
        </Form.Item>

        <Form.Item label="价格" name="book_price" rules={[{ required: true, message: "价格不能为空" }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item label="描述" name="book_description" >
          <TextArea rows={3} maxLength={256} />
        </Form.Item>

        <Divider >
          <Button type="primary" htmlType="submit" >提交</Button>
        </Divider>

      </Form>
    </WrapperLayout>
  )
}

const categories2Options = (categories: CategoriesResponse[]) => {
  return categories.map(v => ({ label: v.category_name, value: v.category_id }))
}

const WrapperLayout = styled.div`
  display: flex;
  justify-content: center;
`

export default NewBookSubPage