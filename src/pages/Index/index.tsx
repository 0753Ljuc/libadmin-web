import { Button, Checkbox, Form, Input, Radio } from 'antd';
import './index.less';
import { requestLoginHelper, requestRegisterHelper } from './helper';
import { Role, LoginParams } from '@/types';
import { useNavigate, } from 'react-router-dom';
import { popError } from '@/utils/pop';
import { useEffect, useState } from 'react';
import Register from './Register';



const BoxTitle = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="box-title">
      <div className="box-title-shape">
        <div className="box-title-shape-mark"></div>
      </div>
      <h2 className='box-title-text'>{children}</h2>
    </div>
  )
}

const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{8,20}$/;

const passwordRules = [
  { required: true, message: 'Please input your password!' },
  { pattern: passwordPattern, message: 'Invalid Password!' }
]



const Index: React.FC = (props) => {
  const [role, setRole] = useState<Role>(Role.User);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const login = async (loginParams: LoginParams) => {
    if (loading) return;
    setLoading(true)
    const resp = await requestLoginHelper(loginParams)
    setLoading(false)
    if (!resp.success) {
      popError(resp.data.error)
      return
    }
    navigate('/home');
  };


  return (
    <div className={'page-index'} style={{ paddingTop: isRegister ? "60px" : "100px" }}>
      <div className={'box'}>
        {isRegister ? <Register onReturn={() => setIsRegister(false)} /> : (
          <>
            <BoxTitle children={["LibAdmin 1.0"]} />
            <Form
              className='box-form'
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ role: 1 }}
              onFinish={login}
              form={form}
              autoComplete="off"
            >
              <Form.Item name={"email"} label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Password" name="password" rules={passwordRules} validateTrigger={"onfinish"} >
                <Input.Password />
              </Form.Item>
              {/* migrate to v2, only admin can create user */}
              {/* {role === Role.User && <div className='box-redirect'>
                <a href="javascript:void(0)" onClick={() => setIsRegister(true)} >注册用户</a>
              </div>} */}
              <Form.Item noStyle >
                <Button type="primary" htmlType="submit" className='box-form-submit-btn' loading={loading}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
            {/* don't need to select, page will render base on the profile type which returen by backend */}
            {/* <Radio.Group className="radio-group-role" size='small' value={role} onChange={e => setRole(e.target.value)}>
              <Radio value={Role.Admin}>管理员</Radio>
              <Radio value={Role.User}>用户</Radio>
            </Radio.Group> */}
          </>
        )}

      </div>
    </div >
  )

}

export default Index;




