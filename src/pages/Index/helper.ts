
import { requestLogin, requestRegister } from '@/request';
import { LoginParams, LoginResponse, RegisterParams } from '@/types';

const requestLoginFn = async (params: LoginParams) => {
  params.email = params.email.toLowerCase();
  const formData = new FormData();
  Object.entries(params).forEach(([key, value]) => formData.append(key, value))
  return await requestLogin(formData);
}

const requestRegisterFn = async (params: RegisterParams) => {
  const formData = new FormData();
  formData.append('username', params.username);
  formData.append('gender', params.gender + "");
  formData.append('signup[email]', params.email.toLowerCase());
  formData.append('signup[password]', params.password);
  return await requestRegister(formData);
}

export {
  requestLoginFn as requestLoginHelper,
  requestRegisterFn as requestRegisterHelper
}