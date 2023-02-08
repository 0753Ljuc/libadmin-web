
const host = "http://localhost:8080";

const api = {
  v1: {
    auth: {
      login: `${host}/api/v1/auth/login`,
      logout: `${host}/api/v1/auth/logout`,
      register: `${host}/api/v1/auth/register`,
      verify: `${host}/api/v1/auth/verify`,
    },
  }
}

export default api;