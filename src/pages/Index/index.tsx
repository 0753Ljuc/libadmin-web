import { Button, Checkbox, Form, Input } from 'antd';
import './index.less';

import { requestLogin } from './helper';


function BoxTitle({ children }: React.PropsWithChildren) {
  return (
    <div className="box-title">
      <div className="box-title-shape">
        <div className="box-title-shape-mark"></div>
      </div>
      <h2 className='box-title-text'>{children}</h2>
    </div>
  )
}

const onFinish = (values: any) => {
  console.log('Success:', values)
  requestLogin(values)
};


const PasswordPrompt = () => {
  return (
    <ul>
      <li> - Must be 8-20 characters.</li>
      <li>
        - Must contain at least:
        <ul style={{ paddingLeft: '20px' }} >
          <li> - one letter[a-z] or [A-Z]</li>
          <li> - one numeric character [0-9]</li>
        </ul>
      </li>
    </ul>
  )
}

const UsernamePrompt = () => {
  return (
    <ul>
      <li> - Must be 4-16 characters.</li>
      <li> - Consider use _，-，letters or numbers。</li>
    </ul>
  )
}

const Index: React.FC = () => {

  console.log("render page: Index")



  return (
    <div className={'page-index'}>
      <div className={'box'}>
        <BoxTitle children={["LibAdmin 1.0"]} />
        <Form
          className='box-form'
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Please input your username!', },
              { pattern: /^[a-zA-Z0-9_-]{4,16}$/, message: <UsernamePrompt />, }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="pwd"
            rules={[
              { required: true, message: 'Please input your password!' },
              { pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,20}$/, message: <PasswordPrompt />, }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item noStyle >
            <Button type="primary" htmlType="submit" className='box-form-submit-btn' >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div >
  )

}

export default Index;




