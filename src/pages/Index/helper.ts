
import { requestLogin } from '@/request';

const requestLoginFn = (params: Parameters<typeof requestLogin>[0]) => {
  return requestLogin(params)
}

export { requestLoginFn as requestLogin }