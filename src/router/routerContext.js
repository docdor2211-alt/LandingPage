import { createContext, useContext } from "react";
import { ROUTES } from "./routes";

export const RouterContext = createContext({
  pathname: ROUTES.HOME,
  search: "",
  hash: "",
  navigate: () => {},
  isActive: () => false,
});

export const useRouter = () => useContext(RouterContext);

