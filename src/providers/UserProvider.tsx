import { createContext, ReactElement, useContext, useReducer, useState } from "react";

interface UserContextData {
  id?: string,
  email?: string,
  image?: string,

}


interface Action {
  type: "UPDATE",
  payload: Partial<UserContextData>
}


interface ContextType {
  store: UserContextData
  dispatch: React.Dispatch<Action>
}


const initialData: UserContextData = {};

const UserContext = createContext<ContextType | null>(null);

const reducer = (state: UserContextData, action: Action) => {
  switch (action.type) {
    case "UPDATE":
      return { ...state, ...action.payload };


    default: return { ...state };
  }
}

const UserProvider: React.FC<{
  children?: ReactElement,
}> = ({ children }) => {

  const [store, dispatch] = useReducer(reducer, initialData);


  return (
    <UserContext.Provider value={{ store, dispatch }} >
      {children}
    </UserContext.Provider>
  )
}

const useUserContext = (): NonNullable<ContextType> => useContext(UserContext)!
export { UserProvider, useUserContext }