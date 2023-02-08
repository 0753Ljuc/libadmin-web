import api from '@/api';


interface LoginParams {
  username: string;
  pwd: string;
}
const requestLogin = ({ username, pwd }: LoginParams): Promise<Response> => {
  return fetch(api.v1.auth.login, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ username, pwd }),
    credentials: 'include',
  });
}

export { requestLogin };