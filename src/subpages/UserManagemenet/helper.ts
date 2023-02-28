import { getProfiles } from "@/request"

export const getProfilesHelper = async () => {
  return await getProfiles()
}


import { requestLogin, requestRegister } from '@/request';
import { LoginParams, LoginResponse, RegisterParams } from '@/types';

export const requestRegisterHelper = async (params: RegisterParams) => {
  const formData = new FormData();
  formData.append('username', params.username);
  formData.append('gender', params.gender + "");
  formData.append('signup[email]', params.email.toLowerCase());
  formData.append('signup[password]', params.password);
  return await requestRegister(formData);
}

