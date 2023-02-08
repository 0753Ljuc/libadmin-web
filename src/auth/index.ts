import { redirect } from "react-router-dom";

let auth = true;

function authorize() {
  return auth ? true : redirect('/');
}

export { authorize };