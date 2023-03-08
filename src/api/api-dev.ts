const isProd = process.env.NODE_ENV === "production";
const host = isProd ? "http://106.55.24.94:8090" : "http://localhost:8000";

// refer RESTful API design 
const api = {
  v1: {
    auth: {
      signupUser: `${host}/api/v1/auth/user/signup`,
      loginUser: `${host}/api/v1/auth/user/login`,
      logoutUser: `${host}/api/v1/auth/user/logout`,
    },
    profile: {
      getProfile: `${host}/api/v1/profile`,
      getProfiles: `${host}/api/v1/profile/all`,
    },
    categoryREST: `${host}/api/v1/category`,
    bookREST: `${host}/api/v1/book`,
    borrowREST: `${host}/api/v1/borrow`,
  },
  v2: {
    auth: {
      signupUser: `${host}/api/v2/auth/user/signup`,
    },
  }
}

export default api;