import { createContext } from 'react';

type AuthenticationContextType = [boolean, (value: boolean) => void];

const AuthenticatedContext = createContext<
  AuthenticationContextType | undefined
>(undefined);

export default AuthenticatedContext;
