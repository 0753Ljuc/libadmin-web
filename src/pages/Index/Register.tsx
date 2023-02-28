import { Button, Form, Input, message, Radio } from "antd";
import { LeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Gender, RegisterParams, RegisterProps } from "@/types";
import { requestRegisterHelper } from "./helper";
import { popError } from "@/utils/pop";
import { Rule } from "antd/es/form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const promptMarginBottom = '2px';
const PasswordPrompt = () => {
  return (
    <ul style={{ marginBottom: promptMarginBottom }}>
      <li> - Must be 8-20 characters.</li>
      <li> - at least one uppercase and one lowercase letters</li>
      <li> - at least one numeric character [0-9] </li>
    </ul >
  )
}

const UsernamePrompt = () => {
  return (
    <ul style={{ marginBottom: promptMarginBottom }}>
      <li> - Must be 5-20 non-empty characters.</li>
      <li> - Allow _，-，letters, characters or numbers。</li>
      <li> - Chinese will be considered as 2 chars</li>
    </ul>
  )
}

const usernameValidator = (_: any, value: string) => {
  const testStr = value.replace(/[\u4e00-\u9fa5]/g, 'xx');
  return /^[\w-]{5,20}$/.test(testStr) ? Promise.resolve() : Promise.reject()
}

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/;

const passwrod2Validator: Rule = ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value || getFieldValue('password') === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('The two passwords that you entered do not match!'));
  },
})

const Title = styled.h3`
  margin: 8px 0;
  text-align: center;
  font-size: 20px;
  color: #1f1f1f;
`;




const Register: React.FC<RegisterProps> = (props) => {
  const { onReturn } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const showMessage = (type: 'success' | 'error', content: string) => {
    messageApi.open({ type, content, style: { marginTop: '40vh' } });
  }

  const signup = async (params: RegisterParams) => {
    if (loading) return;
    if (params.password !== params.password2) {
      return showMessage('error', '两次输入的密码不一致')
    }
    setLoading(true);
    const resp = await requestRegisterHelper(params)
    setLoading(false) 
    if (!resp.success) {
      return popError(resp.data.error)
    }
    showMessage('success', '注册成功, 自动跳转到登录页面')
    navigate('/home');
  };

  return (
    <div className="page-index-register">
      {contextHolder}
      <Title>
        <div className="return"> <LeftOutlined onClick={onReturn} /></div>
        注册用户
      </Title>

      <Form
        className='box-form'
        name="register"
        layout="vertical"
        onFinish={signup}
        initialValues={{ gender: Gender.Male }}
        form={form}
        autoComplete="off"
      >
        <Form.Item name={"email"} label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={"username"} label="Username" help={<UsernamePrompt />} rules={[{ required: true, validator: usernameValidator }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" help={<PasswordPrompt />} rules={[{ required: true, pattern: passwordPattern }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label="Confirm Password" name="password2" rules={[{ required: true, message: 'Please confirm your password!' }, passwrod2Validator]} >
          <Input.Password />
        </Form.Item>

        <Form.Item label="Gender" name="gender" >
          <Radio.Group size='small'>
            <Radio value={Gender.Male}>男</Radio>
            <Radio value={Gender.Female}>女</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item noStyle >
          <Button type="primary" htmlType="submit" className='box-form-submit-btn' >
            Submit
          </Button>
        </Form.Item>

      </Form>
    </div >
  )

}

export default Register;